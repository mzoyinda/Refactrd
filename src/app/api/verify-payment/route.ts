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
      await supabase
        .from("consultation_bookings")
        .update({ paystack_status: "success" })
        .eq("paystack_reference", txRef || tx.tx_ref);

      // Send emails
      await sendEmails({
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
      await supabase
        .from("consultation_bookings")
        .update({ paystack_status: "success" })
        .eq("paystack_reference", reference);

      // Send emails
      await sendEmails({
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
  customerEmail,
  customerName,
  consultationType,
  amountPaid,
  paymentReference,
  notificationEmail,
  meta,
}: {
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

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #F1F5F9; color: #94A3B8; font-size: 13px; width: 40%; vertical-align: top;">${label}</td>
      <td style="padding: 12px 0; border-bottom: 1px solid #F1F5F9; color: #1F2A44; font-size: 14px;">${value}</td>
    </tr>`;

  const detailRows: string[] = [];
  if (meta.situation) detailRows.push(row("Situation", meta.situation));
  if (meta.focus_area) detailRows.push(row("Focus Area", meta.focus_area));
  if (meta.org_readiness) detailRows.push(row("Org Readiness", meta.org_readiness));
  if (meta.biggest_blocker) detailRows.push(row("Biggest Blocker", meta.biggest_blocker));

  // ── INTERNAL NOTIFICATION ──────────────────────────────
  await resend.emails.send({
    from: "Refactrd Website <noreply@refactrd.com>",
    to: notificationEmail,
    subject: `New ${consultationLabel} Booked — ${customerName}`,
    html: `
    <!DOCTYPE html>
    <html>
      <body style="margin:0; padding:0; background:#F4F6F9; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        <div style="max-width:600px; margin:0 auto; padding:32px 20px;">

          <div style="background:#1F2A44; padding:28px 32px; border-radius:16px 16px 0 0;">
            <p style="color:#A2D2FF; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin:0 0 6px;">Payment Confirmed</p>
            <h1 style="color:#ffffff; margin:0; font-size:22px; font-weight:700; line-height:1.3;">${consultationLabel}</h1>
            <p style="color:rgba(255,255,255,0.55); margin:8px 0 0; font-size:13px;">${customerName} · ${meta.company_name || "—"}</p>
          </div>

          <div style="background:#ffffff; padding:28px 32px; border:1px solid #E2E8F0; border-top:none;">
            <table style="width:100%; border-collapse:collapse;">
              ${row("Name", customerName)}
              ${row("Email", `<a href="mailto:${customerEmail}" style="color:#0e5d7d; text-decoration:none;">${customerEmail}</a>`)}
              ${row("Company", meta.company_name || "—")}
              ${row("Amount Paid", `₦${Number(amountPaid).toLocaleString()}`)}
              ${row("Reference", paymentReference)}
              ${detailRows.join("")}
            </table>
          </div>

          <div style="background:#F8FAFC; padding:18px 32px; border:1px solid #E2E8F0; border-top:none; border-radius:0 0 16px 16px; text-align:center;">
            <p style="color:#94A3B8; font-size:12px; margin:0;">Respond within 24 hours &middot; refactrd.com</p>
          </div>

        </div>
      </body>
    </html>
    `,
  });

  // ── CUSTOMER CONFIRMATION ──────────────────────────────
  await resend.emails.send({
    from: "Refactrd <hello@refactrd.com>",
    to: customerEmail,
    subject: `Your ${consultationLabel} is confirmed`,
    html: `
    <!DOCTYPE html>
    <html>
      <body style="margin:0; padding:0; background:#F4F6F9; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        <div style="max-width:600px; margin:0 auto; padding:32px 20px;">

          <div style="background:#1F2A44; padding:36px 36px 32px; border-radius:16px 16px 0 0;">
            <p style="color:#A2D2FF; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; margin:0 0 10px;">Booking Confirmed</p>
            <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:700; line-height:1.35;">You're booked in.</h1>
          </div>

          <div style="background:#ffffff; padding:32px 36px; border:1px solid #E2E8F0; border-top:none;">
            <p style="color:#1F2A44; font-size:16px; font-weight:600; margin:0 0 18px;">Hi ${customerName},</p>
            <p style="color:#475569; font-size:15px; line-height:1.75; margin:0 0 14px;">
              Your <strong style="color:#1F2A44;">${consultationLabel}</strong> has been confirmed and paid. Someone from the Refactrd team will reach out within 24 hours to schedule your session at a time that works for you.
            </p>
            <p style="color:#475569; font-size:15px; line-height:1.75; margin:0;">
              Come prepared to walk us through your current workflows &mdash; the more context you bring, the more value you'll get out of the session.
            </p>
          </div>

          <div style="background:#F8FAFC; padding:24px 36px; border:1px solid #E2E8F0; border-top:none;">
            <p style="color:#94A3B8; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; margin:0 0 12px;">Payment Summary</p>
            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0; color:#64748B; font-size:14px;">Consultation</td>
                <td style="padding:8px 0; color:#1F2A44; font-size:14px; font-weight:600; text-align:right;">${consultationLabel}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; color:#64748B; font-size:14px;">Amount Paid</td>
                <td style="padding:8px 0; color:#1F2A44; font-size:14px; font-weight:600; text-align:right;">₦${Number(amountPaid).toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; color:#64748B; font-size:14px;">Reference</td>
                <td style="padding:8px 0; color:#94A3B8; font-size:13px; text-align:right;">${paymentReference}</td>
              </tr>
            </table>
          </div>

          <div style="background:#F4F6F9; padding:20px 36px; border-radius:0 0 16px 16px; border:1px solid #E2E8F0; border-top:none; text-align:center;">
            <p style="color:#94A3B8; font-size:13px; margin:0;">
              Refactrd &middot; <a href="https://refactrd.com" style="color:#0e5d7d; text-decoration:none; font-weight:600;">refactrd.com</a>
            </p>
          </div>

        </div>
      </body>
    </html>
    `,
  });
}