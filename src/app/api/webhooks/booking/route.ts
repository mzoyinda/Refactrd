import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

/**
 * Shared secret for the booking provider. The brief doesn't name the provider,
 * so the payload is read leniently: the first email-looking value found in the
 * common locations wins.
 */
const WEBHOOK_SECRET = process.env.BOOKING_WEBHOOK_SECRET;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function extractEmail(payload: Record<string, unknown>): string | null {
  const candidates: unknown[] = [
    payload.email,
    (payload.invitee as Record<string, unknown> | undefined)?.email,
    (payload.attendee as Record<string, unknown> | undefined)?.email,
    (payload.payload as Record<string, unknown> | undefined)?.email,
    ((payload.payload as Record<string, unknown> | undefined)?.invitee as
      | Record<string, unknown>
      | undefined)?.email,
    Array.isArray(payload.attendees)
      ? (payload.attendees[0] as Record<string, unknown> | undefined)?.email
      : undefined,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && EMAIL_PATTERN.test(candidate.trim())) {
      return candidate.trim().toLowerCase();
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    if (WEBHOOK_SECRET) {
      const provided =
        req.headers.get("x-webhook-secret") ||
        req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
        "";
      if (provided !== WEBHOOK_SECRET) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
      }
    } else {
      console.warn("Booking webhook: BOOKING_WEBHOOK_SECRET is unset, accepting unverified call");
    }

    const payload = (await req.json()) as Record<string, unknown>;
    const email = extractEmail(payload);

    if (!email) {
      console.error("Booking webhook: no email found in payload", Object.keys(payload));
      return NextResponse.json({ error: "No email in payload." }, { status: 400 });
    }

    // Match the most recent assessment for this address — someone who retakes
    // it should have the booking attributed to their latest run.
    const { data: match, error: lookupError } = await supabase
      .from("assessment_submissions")
      .select("id")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lookupError) {
      console.error("Booking webhook: lookup failed", lookupError);
      return NextResponse.json({ error: "Lookup failed." }, { status: 500 });
    }

    if (!match) {
      // Not an error — plenty of bookings come from people who never took it.
      return NextResponse.json({ success: true, matched: false }, { status: 200 });
    }

    const { error: updateError } = await supabase
      .from("assessment_submissions")
      .update({ booked: true, booked_at: new Date().toISOString() })
      .eq("id", match.id);

    if (updateError) {
      console.error("Booking webhook: update failed", updateError);
      return NextResponse.json({ error: "Update failed." }, { status: 500 });
    }

    return NextResponse.json({ success: true, matched: true, id: match.id }, { status: 200 });
  } catch (error) {
    console.error("Booking webhook error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
