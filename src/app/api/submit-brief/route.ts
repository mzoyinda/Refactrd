import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, what_to_build, timeline, team_size, how_heard } = body;

    // Validate required fields
    if (!name || !company || !email || !what_to_build || !timeline || !team_size) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { data, error: dbError } = await supabase
      .from("brief_submissions")
      .insert({
        name,
        company,
        email,
        what_to_build,
        timeline,
        team_size,
        how_heard: how_heard || null,
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

    // Notify Refactrd team
    await resend.emails.send({
      from: "Refactrd Website <noreply@refactrd.com>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New Brief from ${name} at ${company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
          <div style="background: #1F2A44; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 20px;">New Brief Submission</h1>
            <p style="color: #A2D2FF; margin: 8px 0 0; font-size: 14px;">Someone is ready to build with Refactrd</p>
          </div>

          <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
            <h2 style="color: #1F2A44; font-size: 16px; margin: 0 0 16px;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748B; font-size: 14px; width: 40%;">Name</td>
                <td style="padding: 8px 0; color: #1F2A44; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B; font-size: 14px;">Company</td>
                <td style="padding: 8px 0; color: #1F2A44; font-size: 14px; font-weight: 600;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B; font-size: 14px;">Email</td>
                <td style="padding: 8px 0; color: #1F2A44; font-size: 14px; font-weight: 600;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B; font-size: 14px;">Team Size</td>
                <td style="padding: 8px 0; color: #1F2A44; font-size: 14px; font-weight: 600;">${team_size}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B; font-size: 14px;">Timeline</td>
                <td style="padding: 8px 0; color: #1F2A44; font-size: 14px; font-weight: 600;">${timeline}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B; font-size: 14px;">How they heard</td>
                <td style="padding: 8px 0; color: #1F2A44; font-size: 14px; font-weight: 600;">${how_heard || "Not specified"}</td>
              </tr>
            </table>
          </div>

          <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
            <h2 style="color: #1F2A44; font-size: 16px; margin: 0 0 12px;">What They Want to Build</h2>
            <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0; background: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #A2D2FF;">
              ${what_to_build}
            </p>
          </div>

          <div style="text-align: center; padding: 16px;">
            <p style="color: #94a3b8; font-size: 13px; margin: 0;">
              Submission ID: ${data.id} · ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      `,
    });

    // Send confirmation to submitter
    await resend.emails.send({
      from: "Refactrd <hello@refactrd.com>",
      to: email,
      subject: "We have received your brief",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap" rel="stylesheet" />
          </head>
          <body style="margin: 0; padding: 0; background: #F4F6F9;">
            <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">

              <!-- Header -->
              <div style="background: #1F2A44; padding: 32px 36px; border-radius: 12px 12px 0 0; margin-bottom: 0;">
                <p style="color: #A2D2FF; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px;">Refactrd · AI Engineering Studio</p>
                <h1 style="font-family: 'DM Serif Display', serif; color: white; margin: 0; font-size: 26px; font-weight: 400; line-height: 1.3;">We have received your brief.</h1>
              </div>

              <!-- Body -->
              <div style="background: white; padding: 36px; border: 1px solid #E2E8F0; margin-bottom: 0;">

                <!-- Hi [name] on its own line -->
                <p style="color: #1F2A44; font-size: 17px; font-weight: 600; margin: 0 0 20px; line-height: 1.4;">
                  Hi ${name},
                </p>

                <!-- Rest of message in separate paragraphs -->
                <p style="color: #475569; font-size: 15px; line-height: 1.8; margin: 0 0 16px;">
                  Someone from the Refactrd team will review your brief personally and respond within 24 hours.
                </p>
                <p style="color: #475569; font-size: 15px; line-height: 1.8; margin: 0 0 16px;">
                  We will either reach out to schedule a scoping call or, if a consultation is a better fit for where you are, we will explain why and point you in the right direction.
                </p>
                <p style="color: #475569; font-size: 15px; line-height: 1.8; margin: 0;">
                  No auto-generated proposals. No generic responses. A real reply from a real person.
                </p>
              </div>

              <!-- Brief summary -->
              <div style="background: #F8FAFC; padding: 24px 36px; border: 1px solid #E2E8F0; border-top: none; margin-bottom: 0;">
                <p style="color: #94A3B8; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 10px;">Your brief</p>
                <p style="color: #334155; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 14px; border-left: 3px solid #A2D2FF;">
                  ${what_to_build}
                </p>
              </div>

              <!-- Footer -->
              <div style="background: #F4F6F9; padding: 20px 36px; border-radius: 0 0 12px 12px; border: 1px solid #E2E8F0; border-top: none; text-align: center;">
                <p style="color: #94A3B8; font-size: 13px; margin: 0;">
                  Refactrd · <a href="https://refactrd.com" style="color: #A2D2FF; text-decoration: none;">refactrd.com</a>
                </p>
              </div>

            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Submit brief error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}