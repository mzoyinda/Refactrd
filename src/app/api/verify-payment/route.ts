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
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "No reference provided" }, { status: 400 });
  }

  try {
    // Verify with Paystack
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

    // Update booking in Supabase
    const { data: booking } = await supabase
      .from("consultation_bookings")
      .update({ paystack_status: "success" })
      .eq("paystack_reference", reference)
      .select()
      .single();

    // Send notification to Refactrd
    await resend.emails.send({
      from: "Refactrd Website <noreply@refactrd.com>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New ${meta.consultation_type === "mini" ? "Mini" : "Enterprise"} Consultation Booked - ${meta.full_name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
          </head>
          <body style="margin:0;padding:0;background:#F4F6F9;font-family:'DM Sans',sans-serif;">
            <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
              <div style="background:#1F2A44;padding:32px 36px;border-radius:12px 12px 0 0;">
                <p style="color:#A2D2FF;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 8px;">New Consultation Booking</p>
                <h1 style="color:white;margin:0;font-size:22px;font-weight:700;">
                  ${meta.consultation_type === "mini" ? "Mini Consultation" : "Enterprise Consultation"} Paid
                </h1>
              </div>

              <div style="background:white;padding:32px 36px;border:1px solid #E2E8F0;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;color:#64748B;font-size:14px;width:45%;">Name</td>
                    <td style="padding:10px 0;color:#1F2A44;font-size:14px;font-weight:600;">${meta.full_name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#64748B;font-size:14px;">Email</td>
                    <td style="padding:10px 0;color:#1F2A44;font-size:14px;font-weight:600;">${tx.customer.email}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#64748B;font-size:14px;">Company</td>
                    <td style="padding:10px 0;color:#1F2A44;font-size:14px;font-weight:600;">${meta.company_name || "—"}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#64748B;font-size:14px;">Amount Paid</td>
                    <td style="padding:10px 0;color:#1F2A44;font-size:14px;font-weight:600;">₦${(tx.amount / 100).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#64748B;font-size:14px;">Reference</td>
                    <td style="padding:10px 0;color:#1F2A44;font-size:14px;font-weight:600;">${reference}</td>
                  </tr>
                  ${meta.situation ? `
                  <tr>
                    <td style="padding:10px 0;color:#64748B;font-size:14px;">Situation</td>
                    <td style="padding:10px 0;color:#1F2A44;font-size:14px;font-weight:600;">${meta.situation}</td>
                  </tr>` : ""}
                  ${meta.focus_area ? `
                  <tr>
                    <td style="padding:10px 0;color:#64748B;font-size:14px;">Focus Area</td>
                    <td style="padding:10px 0;color:#1F2A44;font-size:14px;font-weight:600;">${meta.focus_area}</td>
                  </tr>` : ""}
                  ${meta.org_readiness ? `
                  <tr>
                    <td style="padding:10px 0;color:#64748B;font-size:14px;">Org Readiness</td>
                    <td style="padding:10px 0;color:#1F2A44;font-size:14px;font-weight:600;">${meta.org_readiness}</td>
                  </tr>` : ""}
                  ${meta.biggest_blocker ? `
                  <tr>
                    <td style="padding:10px 0;color:#64748B;font-size:14px;">Biggest Blocker</td>
                    <td style="padding:10px 0;color:#1F2A44;font-size:14px;font-weight:600;">${meta.biggest_blocker}</td>
                  </tr>` : ""}
                </table>
              </div>

              <div style="background:#F4F6F9;padding:16px 36px;border-radius:0 0 12px 12px;border:1px solid #E2E8F0;border-top:none;text-align:center;">
                <p style="color:#94A3B8;font-size:13px;margin:0;">Respond within 24 hours · refactrd.com</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Send confirmation to client
    await resend.emails.send({
      from: "Refactrd <hello@refactrd.com>",
      to: tx.customer.email,
      subject: `Your ${meta.consultation_type === "mini" ? "Mini" : "Enterprise"} Consultation is confirmed`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap" rel="stylesheet" />
          </head>
          <body style="margin:0;padding:0;background:#F4F6F9;font-family:'DM Sans',sans-serif;">
            <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
              <div style="background:#1F2A44;padding:32px 36px;border-radius:12px 12px 0 0;">
                <p style="color:#A2D2FF;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 8px;">Booking Confirmed</p>
                <h1 style="font-family:'DM Serif Display',serif;color:white;margin:0;font-size:26px;font-weight:400;line-height:1.3;">
                  You're booked in.
                </h1>
              </div>

              <div style="background:white;padding:36px;border:1px solid #E2E8F0;">
                <p style="color:#1F2A44;font-size:17px;font-weight:600;margin:0 0 20px;">
                  Hi ${meta.full_name},
                </p>
                <p style="color:#475569;font-size:15px;line-height:1.8;margin:0 0 16px;">
                  Your ${meta.consultation_type === "mini" ? "Mini Consultation ($99)" : "Enterprise Consultation ($499)"} has been confirmed and paid.
                </p>
                <p style="color:#475569;font-size:15px;line-height:1.8;margin:0 0 16px;">
                  Someone from the Refactrd team will reach out within 24 hours to schedule your session at a time that works for you.
                </p>
                <p style="color:#475569;font-size:15px;line-height:1.8;margin:0;">
                  Come prepared to walk us through your current workflows. The more context you bring, the more value you will get out of the session.
                </p>
              </div>

              <div style="background:#F8FAFC;padding:24px 36px;border:1px solid #E2E8F0;border-top:none;">
                <p style="color:#94A3B8;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 10px;">Payment Summary</p>
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:6px 0;color:#64748B;font-size:14px;">Consultation</td>
                    <td style="padding:6px 0;color:#1F2A44;font-size:14px;font-weight:600;text-align:right;">
                      ${meta.consultation_type === "mini" ? "Mini Consultation" : "Enterprise Consultation"}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#64748B;font-size:14px;">Amount Paid</td>
                    <td style="padding:6px 0;color:#1F2A44;font-size:14px;font-weight:600;text-align:right;">₦${(tx.amount / 100).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#64748B;font-size:14px;">Reference</td>
                    <td style="padding:6px 0;color:#94A3B8;font-size:13px;text-align:right;">${reference}</td>
                  </tr>
                </table>
              </div>

              <div style="background:#F4F6F9;padding:20px 36px;border-radius:0 0 12px 12px;border:1px solid #E2E8F0;border-top:none;text-align:center;">
                <p style="color:#94A3B8;font-size:13px;margin:0;">
                  Refactrd · <a href="https://refactrd.com" style="color:#A2D2FF;text-decoration:none;">refactrd.com</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      booking: {
        type: booking?.type,
        full_name: meta.full_name,
        email: tx.customer.email,
        amount: tx.amount / 100,
        reference,
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