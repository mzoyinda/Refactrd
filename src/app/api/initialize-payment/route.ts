import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// USD base prices
const USD_PRICES = {
  mini: 99,
  enterprise: 499,
};

async function getUsdToNgnRate(): Promise<number> {
  try {
    const res = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD",
      { next: { revalidate: 3600 } } // cache for 1 hour
    );
    const data = await res.json();
    return data.rates?.NGN || 1600; // fallback to 1600 if API fails
  } catch {
    return 1600; // safe fallback
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, email, full_name, metadata, provider = "paystack" } = body;

    if (!type || !email || !full_name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const usdPrice = USD_PRICES[type as keyof typeof USD_PRICES];
    if (!usdPrice) {
      return NextResponse.json({ error: "Invalid consultation type" }, { status: 400 });
    }

    // Get live exchange rate
    const rate = await getUsdToNgnRate();
    const ngnAmount = Math.round(usdPrice * rate);
    const amountKobo = ngnAmount * 100; // Paystack uses kobo

    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/consultation/confirm`;

    if (provider === "flutterwave") {
      // ── FLUTTERWAVE ──────────────────────────────────────
      const response = await fetch("https://api.flutterwave.com/v3/payments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tx_ref: `refactrd-${Date.now()}`,
          amount: ngnAmount,
          currency: "NGN",
          redirect_url: callbackUrl,
          customer: {
            email,
            name: full_name,
          },
          meta: {
            full_name,
            consultation_type: type,
            ...metadata,
          },
          customizations: {
            title: "Refactrd",
            description: `${type === "mini" ? "Mini" : "Enterprise"} Consultation - $${usdPrice}`,
            logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
          },
        }),
      });

      const data = await response.json();

      if (data.status !== "success") {
        console.error("Flutterwave error:", data);
        return NextResponse.json(
          { error: data.message || "Failed to initialize Flutterwave payment" },
          { status: 500 }
        );
      }

      // Save pending booking
      await supabase.from("consultation_bookings").insert({
        type,
        full_name,
        email,
        company_name: metadata?.company_name || "",
        situation: metadata?.situation || null,
        focus_area: metadata?.focus_area || null,
        org_readiness: metadata?.org_readiness || null,
        biggest_blocker: metadata?.biggest_blocker || null,
        how_heard: metadata?.how_heard || null,
        amount_paid: ngnAmount,
        currency: "NGN",
        paystack_reference: data.data.tx_ref, // reuse column for flutterwave ref
        paystack_status: "pending",
      });

      return NextResponse.json({
        authorization_url: data.data.link,
        reference: data.data.tx_ref,
        provider: "flutterwave",
        usd_price: usdPrice,
        ngn_amount: ngnAmount,
        rate,
      });

    } else {
      // ── PAYSTACK ─────────────────────────────────────────
      const response = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amountKobo,
          currency: "NGN",
          callback_url: callbackUrl,
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

      // Save pending booking
      await supabase.from("consultation_bookings").insert({
        type,
        full_name,
        email,
        company_name: metadata?.company_name || "",
        situation: metadata?.situation || null,
        focus_area: metadata?.focus_area || null,
        org_readiness: metadata?.org_readiness || null,
        biggest_blocker: metadata?.biggest_blocker || null,
        how_heard: metadata?.how_heard || null,
        amount_paid: ngnAmount,
        currency: "NGN",
        paystack_reference: data.data.reference,
        paystack_status: "pending",
      });

      return NextResponse.json({
        authorization_url: data.data.authorization_url,
        reference: data.data.reference,
        provider: "paystack",
        usd_price: usdPrice,
        ngn_amount: ngnAmount,
        rate,
      });
    }
  } catch (error) {
    console.error("Initialize payment error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}