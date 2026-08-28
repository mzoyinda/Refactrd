import type { AssessmentReport } from "@/lib/assessment/report";
import {
  brand,
  button,
  detailRow,
  escapeHtml,
  escapeMultiline,
  FONT_STACK,
  quoteBlock,
  renderEmail,
} from "./shell";

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

function sectionLabel(text: string): string {
  return `<p class="dm-muted" style="margin:0 0 8px; font-family:${FONT_STACK}; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:${brand.muted};">${escapeHtml(text)}</p>`;
}

function prose(text: string, marginBottom = 22): string {
  return `<p class="dm-muted" style="margin:0 0 ${marginBottom}px; font-family:${FONT_STACK}; font-size:15px; line-height:1.75; color:${brand.body};">${escapeMultiline(text)}</p>`;
}

/* ── To the founder: the booking link ───────────────────────────────── */

export function renderBookingLinkEmail(
  report: AssessmentReport,
  bookingUrl: string
): RenderedEmail {
  const firstName = report.name.trim().split(/\s+/)[0] || report.name;

  const body = [
    `<p class="dm-text" style="margin:0 0 18px; font-family:${FONT_STACK}; font-size:17px; font-weight:600; color:${brand.heading};">Hi ${escapeHtml(firstName)},</p>`,
    prose(
      `Thanks for asking to talk. Here's the link to book a time that works for you. We've read your assessment on <strong class="dm-text" style="color:${brand.heading};">${escapeHtml(report.workflow)}</strong>, so you won't need to explain it again from the start.`
    ),
    prose(
      "The call is a conversation, not a pitch. We'll walk through what we saw, and if the honest answer is that you don't need us yet, we'll tell you that.",
      26
    ),
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr><td align="left" class="sm-center">${button(bookingUrl, "Book your call")}</td></tr>
    </table>`,
  ].join("\n");

  const panel = [
    sectionLabel("What we'll pick up from"),
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      ${detailRow("Your opportunity", escapeHtml(report.outcomeLabel))}
      ${detailRow("The workflow", escapeHtml(report.workflow))}
      ${detailRow("Your first step", escapeHtml(report.firstStep))}
    </table>`,
  ].join("\n");

  const html = renderEmail({
    title: "Book your call with Refactrd",
    preheader: `Pick a time that works for you. We've already read your ${report.outcomeLabel} assessment.`,
    eyebrow: "Refactrd · Your Call",
    heading: "Let's find a time.",
    subheading: "Book whenever suits you, and we'll take it from there.",
    body,
    panel,
    footerNote: `Reference: ${report.id}`,
  });

  const text = [
    `Hi ${firstName},`,
    "",
    `Thanks for asking to talk. Here's the link to book a time that works for you. We've read your assessment on ${report.workflow}, so you won't need to explain it again from the start.`,
    "",
    "The call is a conversation, not a pitch. We'll walk through what we saw, and if the honest answer is that you don't need us yet, we'll tell you that.",
    "",
    `Book your call: ${bookingUrl}`,
    "",
    "WHAT WE'LL PICK UP FROM",
    `Your opportunity: ${report.outcomeLabel}`,
    `The workflow: ${report.workflow}`,
    `Your first step: ${report.firstStep}`,
    "",
    `Reference: ${report.id}`,
    "Refactrd · refactrd.com · info@refactrd.com",
  ].join("\n");

  return { subject: "Book your call with Refactrd", html, text };
}

/* ── To Refactrd: the lead, with their whole report ─────────────────── */

export function renderMeetingRequestTeamEmail(
  report: AssessmentReport,
  note: string
): RenderedEmail {
  const body = [
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      ${detailRow("Name", escapeHtml(report.name))}
      ${detailRow(
        "Email",
        `<a class="dm-link" href="mailto:${escapeHtml(report.email)}" style="color:${brand.link}; text-decoration:none; font-weight:600;">${escapeHtml(report.email)}</a>`
      )}
      ${detailRow("Graded outcome", escapeHtml(report.outcomeLabel))}
      ${detailRow("The workflow", escapeHtml(report.workflow))}
      ${detailRow("Their goal", escapeHtml(report.goals.join(", ")))}
      ${detailRow(
        "Recommended",
        escapeHtml(report.services.map((s) => s.formalName).join(", "))
      )}
      ${note ? quoteBlock("What else they told us", note) : ""}
      ${quoteBlock("What we heard", report.whatWeHeard)}
      ${quoteBlock("Where the opportunity is", report.opportunity)}
      ${quoteBlock("What this could look like", report.futureState)}
    </table>`,
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr><td style="height:8px; line-height:8px; font-size:0;">&nbsp;</td></tr>
      <tr><td align="left" class="sm-center">${button(
        `mailto:${report.email}?subject=${encodeURIComponent("Your Refactrd assessment")}`,
        "Reply directly"
      )}</td></tr>
    </table>`,
  ].join("\n");

  const html = renderEmail({
    title: `Meeting requested — ${report.name}`,
    preheader: `${report.name} · ${report.outcomeLabel} · ${report.workflow}`,
    eyebrow: "Meeting Requested · Assessment",
    heading: `${report.name} wants to talk.`,
    subheading: `${report.outcomeLabel} · ${report.workflow}`,
    body,
    footerNote: `Submission ID: ${report.id}`,
  });

  const text = [
    `${report.name} requested a meeting.`,
    "",
    `Email: ${report.email}`,
    `Graded outcome: ${report.outcomeLabel}`,
    `The workflow: ${report.workflow}`,
    `Their goal: ${report.goals.join(", ")}`,
    `Recommended: ${report.services.map((s) => s.formalName).join(", ")}`,
    "",
    note ? `WHAT ELSE THEY TOLD US\n${note}\n` : "",
    `WHAT WE HEARD\n${report.whatWeHeard}`,
    "",
    `WHERE THE OPPORTUNITY IS\n${report.opportunity}`,
    "",
    `WHAT THIS COULD LOOK LIKE\n${report.futureState}`,
    "",
    `Submission ID: ${report.id}`,
  ]
    .filter((line) => line !== "")
    .join("\n");

  return { subject: `Meeting requested — ${report.name} (${report.outcomeLabel})`, html, text };
}
