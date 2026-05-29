import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Prices in kobo (Paystack uses lowest currency unit)
const PRICES = {
  mini: 14900000,       // ₦149,000 in kobo
  enterprise: 74900000, // ₦749,000 in kobo
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, email, full_name, metadata } = body;

    if (!type || !email || !full_name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const amount = PRICES[type as keyof typeof PRICES];
    if (!amount) {
      return NextResponse.json(
        { error: "Invalid consultation type" },
        { status: 400 }
      );
    }

    // Initialize transaction with Paystack
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount,
        currency: "NGN",
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/consultation/confirm`,
        metadata: {
          full_name,
          consultation_type: type,
          cancel_action: `${process.env.NEXT_PUBLIC_APP_URL}/get-started`,
          ...metadata,
        },
      }),
    });

    const data = await response.json();

    if (!data.status) {
      console.error("Paystack error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to initialize payment" },
        { status: 500 }
      );
    }

    // Save booking as pending in Supabase
    await supabase.from("consultation_bookings").insert({
      type,
      full_name,
      email,
      company_name: metadata?.company_name || "",
      team_size: metadata?.team_size || null,
      industry: metadata?.industry || null,
      company_size: metadata?.company_size || null,
      situation: metadata?.situation || null,
      focus_area: metadata?.focus_area || null,
      departments_involved: metadata?.departments_involved || null,
      org_readiness: metadata?.org_readiness || null,
      biggest_blocker: metadata?.biggest_blocker || null,
      how_heard: metadata?.how_heard || null,
      amount_paid: amount / 100,
      currency: "NGN",
      paystack_reference: data.data.reference,
      paystack_status: "pending",
    });

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("Initialize payment error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}