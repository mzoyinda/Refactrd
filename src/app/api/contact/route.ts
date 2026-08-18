import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import {
  renderContactCustomerEmail,
  renderContactTeamEmail,
  type ContactSubmission,
} from "@/lib/emails/contactEmails";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

const TEAM_INBOX = process.env.CONTACT_NOTIFICATION_EMAIL || "info@refactrd.com";
const FROM_NOTIFICATION = "Refactrd Website <noreply@refactrd.com>";
const FROM_CUSTOMER = "Refactrd <hello@refactrd.com>";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_FIELD_LENGTH = 5000;

/** Very small in-memory throttle. Per-instance only, enough to blunt form spam. */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const recentRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentRequests.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  recentRequests.set(ip, hits);

  // Opportunistic cleanup so the map doesn't grow without bound.
  if (recentRequests.size > 500) {
    for (const [key, times] of recentRequests) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) recentRequests.delete(key);
    }
  }

  return hits.length > RATE_LIMIT_MAX;
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

/**
 * The service question is multi-select. Accepts an array from the current
 * form, or a plain string from any older client still posting one value.
 */
function cleanServices(value: unknown): string[] {
  const list = Array.isArray(value) ? value : [value];
  return [...new Set(list.map(clean).filter(Boolean))].slice(0, 20);
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const raw = await req.json();

    // Honeypot — real users never fill this in.
    if (clean(raw.website)) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const submission = {
      name: clean(raw.name),
      company: clean(raw.company),
      email: clean(raw.email).toLowerCase(),
      role: clean(raw.role),
      services: cleanServices(raw.services ?? raw.service),
      challenge: clean(raw.challenge),
      successOutcome: clean(raw.successOutcome),
      timeline: clean(raw.timeline),
    };

    const missing = (
      ["name", "company", "email", "role", "challenge", "successOutcome"] as const
    ).filter((field) => !submission[field]);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Please fill in all required fields: ${missing.join(", ")}.` },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(submission.email)) {
      return NextResponse.json(
        { error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    // ── Persist ────────────────────────────────────────────────────────
    let referenceId: string | undefined;
    let storageFailed = false;

    const { data, error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name: submission.name,
        company: submission.company,
        email: submission.email,
        role: submission.role,
        service: submission.services.join(", ") || null,
        challenge: submission.challenge,
        success_outcome: submission.successOutcome,
        timeline: submission.timeline || null,
        source: "contact_page",
        status: "new",
      })
      .select("id")
      .single();

    if (dbError) {
      // The inquiry still gets through by email; the team email flags the gap.
      console.error("Contact submission: Supabase insert failed", dbError);
      storageFailed = true;
    } else {
      referenceId = String(data.id);
    }

    // ── Notify ─────────────────────────────────────────────────────────
    const submittedAt = new Date();
    const emailData: ContactSubmission = { ...submission, referenceId, submittedAt };

    const teamEmail = renderContactTeamEmail({ ...emailData, storageFailed });
    const customerEmail = renderContactCustomerEmail(emailData);

    const [teamResult, customerResult] = await Promise.allSettled([
      resend.emails.send({
        from: FROM_NOTIFICATION,
        to: TEAM_INBOX,
        replyTo: submission.email,
        subject: teamEmail.subject,
        html: teamEmail.html,
        text: teamEmail.text,
      }),
      resend.emails.send({
        from: FROM_CUSTOMER,
        to: submission.email,
        replyTo: TEAM_INBOX,
        subject: customerEmail.subject,
        html: customerEmail.html,
        text: customerEmail.text,
      }),
    ]);

    const teamDelivered = teamResult.status === "fulfilled" && !teamResult.value.error;
    const customerDelivered =
      customerResult.status === "fulfilled" && !customerResult.value.error;

    if (!teamDelivered) {
      console.error(
        "Contact submission: team notification failed",
        teamResult.status === "rejected" ? teamResult.reason : teamResult.value.error
      );
    }
    if (!customerDelivered) {
      console.error(
        "Contact submission: customer confirmation failed",
        customerResult.status === "rejected"
          ? customerResult.reason
          : customerResult.value.error
      );
    }

    // Only a total failure — nothing stored and nobody notified — is worth
    // asking the visitor to retry.
    if (storageFailed && !teamDelivered) {
      return NextResponse.json(
        { error: "We couldn't submit your inquiry. Please try again or email info@refactrd.com." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, id: referenceId, confirmationSent: customerDelivered },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
