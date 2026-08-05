import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #F1F5F9; color: #94A3B8; font-size: 13px; width: 38%; vertical-align: top; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">${label}</td>
      <td style="padding: 12px 0; border-bottom: 1px solid #F1F5F9; color: #1F2A44; font-size: 14px; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">${value}</td>
    </tr>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const type = body.type || "mini";

    const {
      name, company, email, role,
      prompt, opportunities, challenges, desired_outcome,
      situation, goals,
      initiative, outcome,
    } = body;

    if (!name || !company || !email) {
      return NextResponse.json(
        { error: "Missing required fields: name, company, email" },
        { status: 400 }
      );
    }

    const { data, error: dbError } = await supabase
      .from("diagnostic_submissions")
      .insert({
        type, name, company, email,
        role: role || null,
        prompt: prompt || null,
        opportunities: opportunities || null,
        challenges: challenges || null,
        desired_outcome: desired_outcome || null,
        situation: situation || null,
        goals: goals || null,
        initiative: initiative || null,
        outcome: outcome || null,
        status: "new",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "Failed to save submission. Please try again." },
        { status: 500 }
      );
    }

    const typeLabels: Record<string, { label: string; desc: string }> = {
      mini: {
        label: "Opportunity Assessment",
        desc: "A focused engagement to identify where AI can create the most value in your organization.",
      },
      enterprise: {
        label: "Executive Discovery",
        desc: "A structured assessment for leadership teams evaluating broader AI initiatives.",
      },
      "build-implement": {
        label: "Build & Implement",
        desc: "Moving from a defined initiative to actual implementation.",
      },
      contact: {
        label: "Introductory Conversation",
        desc: "An introductory conversation about an organization's goals and where Refactrd might help.",
      },
    };
    const meta = typeLabels[type] || { label: "Inquiry", desc: "" };

    const situationLabel = type === "contact" ? "Service Interest" : "Primary goal";
    const goalsLabel = type === "contact" ? "Timeline" : "Goals";
    const challengesLabel = type === "contact" ? "Challenge" : "Challenges";
    const desiredOutcomeLabel = type === "contact" ? "What Success Looks Like" : "Desired outcome";

    const detailRows: string[] = [];
    if (role) detailRows.push(row("Role", role));
    if (prompt) detailRows.push(row("What prompted this", prompt));
    if (opportunities) detailRows.push(row("Opportunity areas", opportunities));
    if (challenges) detailRows.push(row(challengesLabel, challenges));
    if (desired_outcome) detailRows.push(row(desiredOutcomeLabel, desired_outcome));
    if (situation) detailRows.push(row(situationLabel, situation));
    if (goals) detailRows.push(row(goalsLabel, goals));
    if (initiative) detailRows.push(row("Initiative", initiative));
    if (outcome) detailRows.push(row("Problem it solves", outcome));

    // ── INTERNAL NOTIFICATION ──────────────────────────────
    await resend.emails.send({
      from: "Refactrd Website <noreply@refactrd.com>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New ${meta.label} Inquiry — ${name} (${company})`,
      html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0; padding:0; background:#F4F6F9; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <div style="max-width:600px; margin:0 auto; padding:32px 20px;">

            <div style="background:#1F2A44; padding:28px 32px; border-radius:16px 16px 0 0;">
              <p style="color:#A2D2FF; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin:0 0 6px;">New Inquiry</p>
              <h1 style="color:#ffffff; margin:0; font-size:22px; font-weight:700; line-height:1.3;">${meta.label}</h1>
              <p style="color:rgba(255,255,255,0.55); margin:8px 0 0; font-size:13px;">${name} · ${company}</p>
            </div>

            <div style="background:#ffffff; padding:28px 32px; border:1px solid #E2E8F0; border-top:none;">
              <table style="width:100%; border-collapse:collapse;">
                ${row("Name", name)}
                ${row("Company", company)}
                ${row("Email", `<a href="mailto:${email}" style="color:#0e5d7d; text-decoration:none;">${email}</a>`)}
                ${detailRows.join("")}
              </table>
            </div>

            <div style="background:#F8FAFC; padding:18px 32px; border:1px solid #E2E8F0; border-top:none; border-radius:0 0 16px 16px; text-align:center;">
              <p style="color:#94A3B8; font-size:12px; margin:0;">Submission ID: ${data.id} &middot; ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>

          </div>
        </body>
      </html>
      `,
    });

    // ── CUSTOMER CONFIRMATION ──────────────────────────────
    await resend.emails.send({
      from: "Refactrd <hello@refactrd.com>",
      to: email,
      subject: `We've received your ${meta.label} inquiry`,
      html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0; padding:0; background:#F4F6F9; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <div style="max-width:600px; margin:0 auto; padding:32px 20px;">

            <div style="background:#1F2A44; padding:36px 36px 32px; border-radius:16px 16px 0 0;">
              <p style="color:#A2D2FF; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; margin:0 0 10px;">Refactrd &middot; AI Engineering Studio</p>
              <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:700; line-height:1.35;">We've received your inquiry.</h1>
            </div>

            <div style="background:#ffffff; padding:32px 36px; border:1px solid #E2E8F0; border-top:none;">
              <p style="color:#1F2A44; font-size:16px; font-weight:600; margin:0 0 18px;">Hi ${name},</p>
              <p style="color:#475569; font-size:15px; line-height:1.75; margin:0 0 14px;">
                Thank you for reaching out about the <strong style="color:#1F2A44;">${meta.label}</strong>. Someone from the Refactrd team will personally review what you've shared and reach out within 1&ndash;2 business days.
              </p>
              <p style="color:#475569; font-size:15px; line-height:1.75; margin:0;">
                No automated proposals, no generic replies &mdash; just a real conversation about whether and how we can help.
              </p>
            </div>

            <div style="background:#F8FAFC; padding:24px 36px; border:1px solid #E2E8F0; border-top:none;">
              <p style="color:#94A3B8; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; margin:0 0 12px;">What happens next</p>
              <table style="width:100%; border-collapse:collapse;">
                <tr>
                  <td style="padding:6px 0; color:#475569; font-size:14px; line-height:1.6;">&#8226;&nbsp; Personal review within 1&ndash;2 business days</td>
                </tr>
                <tr>
                  <td style="padding:6px 0; color:#475569; font-size:14px; line-height:1.6;">&#8226;&nbsp; A short call to align on scope and fit</td>
                </tr>
                <tr>
                  <td style="padding:6px 0; color:#475569; font-size:14px; line-height:1.6;">&#8226;&nbsp; Clear next steps, whichever way it goes</td>
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

    return NextResponse.json({ success: true, id: data.id }, { status: 200 });
  } catch (error) {
    console.error("Submit diagnostic error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}