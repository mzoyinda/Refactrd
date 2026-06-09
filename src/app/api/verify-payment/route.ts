import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Paystack sends: reference
  // Flutterwave sends: transaction_id + tx_ref + status
  const reference = searchParams.get("reference");
  const transactionId = searchParams.get("transaction_id");
  const txRef = searchParams.get("tx_ref");
  const flwStatus = searchParams.get("status");

  const isFlutterwave = !!transactionId || !!txRef;

  if (!reference && !transactionId && !txRef) {
    return NextResponse.json({ error: "No payment reference provided" }, { status: 400 });
  }

  try {
    let bookingData: any = null;
    let customerEmail = "";
    let customerName = "";
    let amountPaid = 0;
    let consultationType = "";
    let paymentReference = "";

    if (isFlutterwave) {
      // ── FLUTTERWAVE VERIFICATION ──────────────────────────
      if (flwStatus !== "successful" && flwStatus !== "completed") {
        return NextResponse.json(
          { error: "Payment was not successful", status: flwStatus },
          { status: 400 }
        );
      }

      const response = await fetch(
        `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
        {
          headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          },
        }
      );

      const data = await response.json();

      if (data.status !== "success" || data.data.status !== "successful") {
        return NextResponse.json(
          { error: "Flutterwave verification failed" },
          { status: 400 }
        );
      }

      const tx = data.data;
      customerEmail = tx.customer.email;
      customerName = tx.meta?.full_name || tx.customer.name;
      amountPaid = tx.amount;
      consultationType = tx.meta?.consultation_type || "mini";
      paymentReference = tx.tx_ref;

      // Update booking in Supabase
      const { data: booking } = await supabase
        .from("consultation_bookings")
        .update({ paystack_status: "success" })
        .eq("paystack_reference", txRef || tx.tx_ref)
        .select()
        .single();

      bookingData = booking;

      // Send emails
      await sendEmails({
        resend,
        customerEmail,
        customerName,
        consultationType,
        amountPaid,
        paymentReference,
        notificationEmail: process.env.NOTIFICATION_EMAIL!,
        meta: tx.meta || {},
      });

    } else {
      // ── PAYSTACK VERIFICATION ────────────────────────────
      const response = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      const data = await response.json();

      if (!data.status || data.data.status !== "success") {
        return NextResponse.json(
          { error: "Payment verification failed", status: data.data?.status },
          { status: 400 }
        );
      }

      const tx = data.data;
      const meta = tx.metadata;

      customerEmail = tx.customer.email;
      customerName = meta.full_name;
      amountPaid = tx.amount / 100;
      consultationType = meta.consultation_type;
      paymentReference = reference!;

      // Update booking in Supabase
      const { data: booking } = await supabase
        .from("consultation_bookings")
        .update({ paystack_status: "success" })
        .eq("paystack_reference", reference)
        .select()
        .single();

      bookingData = booking;

      // Send emails
      await sendEmails({
        resend,
        customerEmail,
        customerName,
        consultationType,
        amountPaid,
        paymentReference,
        notificationEmail: process.env.NOTIFICATION_EMAIL!,
        meta,
      });
    }

    return NextResponse.json({
      success: true,
      booking: {
        type: consultationType,
        full_name: customerName,
        email: customerEmail,
        amount: amountPaid,
        reference: paymentReference,
      },
    });

  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { error: "Verification failed. Please contact support." },
      { status: 500 }
    );
  }
}

// ── SHARED EMAIL SENDER ───────────────────────────────────
async function sendEmails({
  resend,
  customerEmail,
  customerName,
  consultationType,
  amountPaid,
  paymentReference,
  notificationEmail,
  meta,
}: {
  resend: Resend;
  customerEmail: string;
  customerName: string;
  consultationType: string;
  amountPaid: number;
  paymentReference: string;
  notificationEmail: string;
  meta: Record<string, any>;
}) {
  const isMini = consultationType === "mini";
  const consultationLabel = isMini ? "Mini Consultation" : "Enterprise Consultation";

  // Notify Refactrd team
  await resend.emails.send({
    from: "Refactrd Website <noreply@refactrd.com>",
    to: notificationEmail,
    subject: `New ${consultationLabel} Booked - ${customerName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
        <div style="background: #1F2A44; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <h1 style="color: white; margin: 0; font-size: 20px;">New Consultation Booking</h1>
          <p style="color: #A2D2FF; margin: 8px 0 0; font-size: 14px;">${consultationLabel} · Payment confirmed</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #64748B; font-size: 14px; width: 40%;">Name</td><td style="padding: 8px 0; color: #1F2A44; font-size: 14px; font-weight: 600;">${customerName}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748B; font-size: 14px;">Email</td><td style="padding: 8px 0; color: #1F2A44; font-size: 14px; font-weight: 600;">${customerEmail}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748B; font-size: 14px;">Company</td><td style="padding: 8px 0; color: #1F2A44; font-size: 14px; font-weight: 600;">${meta.company_name || "—"}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748B; font-size: 14px;">Amount Paid</td><td style="padding: 8px 0; color: #1F2A44; font-size: 14px; font-weight: 600;">₦${Number(amountPaid).toLocaleString()}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748B; font-size: 14px;">Reference</td><td style="padding: 8px 0; color: #1F2A44; font-size: 14px; font-weight: 600;">${paymentReference}</td></tr>
            ${meta.situation ? `<tr><td style="padding: 8px 0; color: #64748B; font-size: 14px;">Situation</td><td style="padding: 8px 0; color: #1F2A44; font-size: 14px;">${meta.situation}</td></tr>` : ""}
            ${meta.focus_area ? `<tr><td style="padding: 8px 0; color: #64748B; font-size: 14px;">Focus Area</td><td style="padding: 8px 0; color: #1F2A44; font-size: 14px;">${meta.focus_area}</td></tr>` : ""}
            ${meta.org_readiness ? `<tr><td style="padding: 8px 0; color: #64748B; font-size: 14px;">Org Readiness</td><td style="padding: 8px 0; color: #1F2A44; font-size: 14px;">${meta.org_readiness}</td></tr>` : ""}
            ${meta.biggest_blocker ? `<tr><td style="padding: 8px 0; color: #64748B; font-size: 14px;">Biggest Blocker</td><td style="padding: 8px 0; color: #1F2A44; font-size: 14px;">${meta.biggest_blocker}</td></tr>` : ""}
          </table>
        </div>
        <div style="text-align: center; padding: 16px;">
          <p style="color: #94a3b8; font-size: 13px; margin: 0;">Respond within 24 hours · refactrd.com</p>
        </div>
      </div>
    `,
  });

  // Confirm to client
  await resend.emails.send({
    from: "Refactrd <hello@refactrd.com>",
    to: customerEmail,
    subject: `Your ${consultationLabel} is confirmed`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="margin: 0; padding: 0; background: #F4F6F9; font-family: sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: #1F2A44; padding: 32px 36px; border-radius: 12px 12px 0 0;">
              <p style="color: #A2D2FF; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px;">Booking Confirmed</p>
              <h1 style="color: white; margin: 0; font-size: 26px; line-height: 1.3;">You are booked in.</h1>
            </div>
            <div style="background: white; padding: 36px; border: 1px solid #E2E8F0;">
              <p style="color: #1F2A44; font-size: 17px; font-weight: 600; margin: 0 0 20px;">Hi ${customerName},</p>
              <p style="color: #475569; font-size: 15px; line-height: 1.8; margin: 0 0 16px;">Your ${consultationLabel} has been confirmed and paid.</p>
              <p style="color: #475569; font-size: 15px; line-height: 1.8; margin: 0 0 16px;">Someone from the Refactrd team will reach out within 24 hours to schedule your session at a time that works for you.</p>
              <p style="color: #475569; font-size: 15px; line-height: 1.8; margin: 0;">Come prepared to walk us through your current workflows. The more context you bring, the more value you will get out of the session.</p>
            </div>
            <div style="background: #F8FAFC; padding: 24px 36px; border: 1px solid #E2E8F0; border-top: none;">
              <p style="color: #94A3B8; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 10px;">Payment Summary</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #64748B; font-size: 14px;">Consultation</td>
                  <td style="padding: 6px 0; color: #1F2A44; font-size: 14px; font-weight: 600; text-align: right;">${consultationLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B; font-size: 14px;">Amount Paid</td>
                  <td style="padding: 6px 0; color: #1F2A44; font-size: 14px; font-weight: 600; text-align: right;">₦${Number(amountPaid).toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B; font-size: 14px;">Reference</td>
                  <td style="padding: 6px 0; color: #94A3B8; font-size: 13px; text-align: right;">${paymentReference}</td>
                </tr>
              </table>
            </div>
            <div style="background: #F4F6F9; padding: 20px 36px; border-radius: 0 0 12px 12px; border: 1px solid #E2E8F0; border-top: none; text-align: center;">
              <p style="color: #94A3B8; font-size: 13px; margin: 0;">Refactrd · <a href="https://refactrd.com" style="color: #A2D2FF; text-decoration: none;">refactrd.com</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}