import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { renderAssessmentEmail } from "@/lib/emails/assessmentEmail";
import {
  ASSESSMENT_ROW_COLUMNS,
  reportFromRow,
  type AssessmentRow,
} from "@/lib/assessment/report";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (typeof id !== "string" || !id.trim()) {
      return NextResponse.json({ error: "Missing assessment id." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("assessment_submissions")
      .select(ASSESSMENT_ROW_COLUMNS)
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Assessment email: row lookup failed", error);
      return NextResponse.json({ error: "Assessment not found." }, { status: 404 });
    }

    const row = data as unknown as AssessmentRow;

    // The address comes from the stored row, never the request body, so this
    // endpoint can't be used to mail a report to an arbitrary recipient.
    const report = reportFromRow(row);
    const email = renderAssessmentEmail(report);

    const { error: sendError } = await resend.emails.send({
      from: "Refactrd <hello@refactrd.com>",
      to: row.email,
      replyTo: "info@refactrd.com",
      subject: email.subject,
      html: email.html,
      text: email.text,
    });

    if (sendError) {
      console.error("Assessment email: send failed", sendError);
      return NextResponse.json(
        { error: "We couldn't send your report. Please try again." },
        { status: 502 }
      );
    }

    const { error: flagError } = await supabase
      .from("assessment_submissions")
      .update({ email_sent: true })
      .eq("id", id);
    if (flagError) console.error("Assessment email: flag update failed", flagError);

    return NextResponse.json({ success: true, sentTo: row.email }, { status: 200 });
  } catch (error) {
    console.error("Assessment email error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
