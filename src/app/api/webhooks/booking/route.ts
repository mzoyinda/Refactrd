import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { createClient } from "@supabase/supabase-js";

// Node crypto, and the signature is over the raw body — never a cached response.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

/** Set this to the same value as the "Secret" field on the Cal.com webhook. */
const CAL_WEBHOOK_SECRET = process.env.CAL_WEBHOOK_SECRET;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Events that mean a call is on the calendar. */
const BOOKED_EVENTS = new Set([
  "BOOKING_CREATED",
  "BOOKING_RESCHEDULED",
  "BOOKING_PAID",
]);

/** Events that mean it no longer is. */
const UNBOOKED_EVENTS = new Set(["BOOKING_CANCELLED", "BOOKING_REJECTED"]);

interface CalAttendee {
  email?: string;
  name?: string;
}

interface CalBookingPayload {
  attendees?: CalAttendee[];
  organizer?: { email?: string };
  responses?: { email?: { value?: string } };
  uid?: string;
  title?: string;
  startTime?: string;
}

interface CalWebhookBody {
  triggerEvent?: string;
  createdAt?: string;
  payload?: CalBookingPayload;
  // MEETING_STARTED / MEETING_ENDED are flat — booking fields sit at the top level.
  attendees?: CalAttendee[];
  organizer?: { email?: string };
}

/**
 * HMAC-SHA256 over the exact bytes Cal.com sent, compared in constant time.
 * Re-serialising the parsed JSON would change key order and whitespace and
 * never match, so the raw string is what gets signed.
 */
function signatureValid(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;

  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const received = header.trim().toLowerCase();

  const expectedBuf = Buffer.from(expected, "utf8");
  const receivedBuf = Buffer.from(received, "utf8");
  if (expectedBuf.length !== receivedBuf.length) return false;

  return timingSafeEqual(expectedBuf, receivedBuf);
}

/**
 * The booker's address, not Refactrd's. Cal.com puts it in `attendees`, and
 * mirrors it in `responses.email.value` for the standard booking form.
 */
function extractAttendeeEmail(body: CalWebhookBody): string | null {
  const booking = body.payload ?? body;
  const organizerEmail = (booking.organizer?.email ?? "").trim().toLowerCase();

  const candidates: (string | undefined)[] = [
    ...(booking.attendees ?? []).map((a) => a.email),
    (body.payload as CalBookingPayload | undefined)?.responses?.email?.value,
  ];

  for (const candidate of candidates) {
    const email = (candidate ?? "").trim().toLowerCase();
    if (email && email !== organizerEmail && EMAIL_PATTERN.test(email)) {
      return email;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    // Read the raw body first — the signature covers these exact bytes.
    const rawBody = await req.text();

    if (!CAL_WEBHOOK_SECRET) {
      console.error("Cal webhook: CAL_WEBHOOK_SECRET is not set, rejecting call");
      return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
    }

    if (!signatureValid(rawBody, req.headers.get("x-cal-signature-256"), CAL_WEBHOOK_SECRET)) {
      console.error("Cal webhook: signature mismatch");
      return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
    }

    let body: CalWebhookBody;
    try {
      body = JSON.parse(rawBody) as CalWebhookBody;
    } catch {
      return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
    }

    const triggerEvent = body.triggerEvent ?? "";
    const isBooked = BOOKED_EVENTS.has(triggerEvent);
    const isUnbooked = UNBOOKED_EVENTS.has(triggerEvent);

    // Acknowledge anything else with 200 so Cal.com doesn't retry it.
    if (!isBooked && !isUnbooked) {
      return NextResponse.json(
        { success: true, ignored: triggerEvent || "unknown" },
        { status: 200 }
      );
    }

    const email = extractAttendeeEmail(body);
    if (!email) {
      console.error(`Cal webhook: no attendee email on ${triggerEvent}`);
      return NextResponse.json(
        { success: true, matched: false, reason: "no attendee email" },
        { status: 200 }
      );
    }

    // Someone who retakes the assessment should have the booking attributed to
    // their most recent run.
    const { data: match, error: lookupError } = await supabase
      .from("assessment_submissions")
      .select("id")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lookupError) {
      console.error("Cal webhook: lookup failed", lookupError);
      return NextResponse.json({ error: "Lookup failed." }, { status: 500 });
    }

    // Plenty of bookings come from people who never took the assessment.
    if (!match) {
      return NextResponse.json({ success: true, matched: false }, { status: 200 });
    }

    const { error: updateError } = await supabase
      .from("assessment_submissions")
      .update(
        isBooked
          ? { booked: true, booked_at: new Date().toISOString() }
          : { booked: false, booked_at: null }
      )
      .eq("id", match.id);

    if (updateError) {
      console.error("Cal webhook: update failed", updateError);
      return NextResponse.json({ error: "Update failed." }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, matched: true, id: match.id, booked: isBooked },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cal webhook error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
