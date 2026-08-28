import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import {
  renderBookingLinkEmail,
  renderMeetingRequestTeamEmail,
} from "@/lib/emails/meetingEmails";
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

const TEAM_INBOX = process.env.CONTACT_NOTIFICATION_EMAIL || "info@refactrd.com";
const BOOKING_URL = process.env.NEXT_PUBLIC_CAL_BOOKING_URL || "https://cal.com/refactrd";

const MAX_NOTE = 2000;

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    const id = typeof raw.id === "string" ? raw.id.trim() : "";
    const note = typeof raw.note === "string" ? raw.note.trim().slice(0, MAX_NOTE) : "";

    if (!id) {
      return NextResponse.json({ error: "Missing assessment id." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("assessment_submissions")
      .select(ASSESSMENT_ROW_COLUMNS)
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Meeting request: row lookup failed", error);
      return NextResponse.json({ error: "Assessment not found." }, { status: 404 });
    }

    const row = data as unknown as AssessmentRow;
    const report = reportFromRow(row);

    // Record the request first — the emails matter less than knowing they asked.
    const { error: updateError } = await supabase
      .from("assessment_submissions")
      .update({
        meeting_requested: true,
        meeting_requested_at: new Date().toISOString(),
        meeting_note: note || null,
      })
      .eq("id", id);

    if (updateError) {
      console.error("Meeting request: update failed", updateError);
      return NextResponse.json(
        { error: "We couldn't record your request. Please try again." },
        { status: 500 }
      );
    }

    const teamEmail = renderMeetingRequestTeamEmail(report, note);
    const bookingEmail = renderBookingLinkEmail(report, BOOKING_URL);

    // Address comes from the stored row, never the request body.
    const [teamResult, bookingResult] = await Promise.allSettled([
      resend.emails.send({
        from: "Refactrd Assessment <noreply@refactrd.com>",
        to: TEAM_INBOX,
        replyTo: row.email,
        subject: teamEmail.subject,
        html: teamEmail.html,
        text: teamEmail.text,
      }),
      resend.emails.send({
        from: "Refactrd <hello@refactrd.com>",
        to: row.email,
        replyTo: TEAM_INBOX,
        subject: bookingEmail.subject,
        html: bookingEmail.html,
        text: bookingEmail.text,
      }),
    ]);

    const teamSent = teamResult.status === "fulfilled" && !teamResult.value.error;
    const bookingSent = bookingResult.status === "fulfilled" && !bookingResult.value.error;

    if (!teamSent) {
      console.error(
        "Meeting request: team email failed",
        teamResult.status === "rejected" ? teamResult.reason : teamResult.value.error
      );
    }
    if (!bookingSent) {
      console.error(
        "Meeting request: booking email failed",
        bookingResult.status === "rejected" ? bookingResult.reason : bookingResult.value.error
      );
    }

    // The request is recorded either way — the team can follow up by hand.
    return NextResponse.json(
      { success: true, bookingSent, sentTo: row.email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Meeting request error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
