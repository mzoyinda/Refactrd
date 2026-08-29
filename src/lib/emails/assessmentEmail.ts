import type { AssessmentReport } from "@/lib/assessment/report";
import {
  brand,
  button,
  escapeHtml,
  escapeMultiline,
  FONT_STACK,
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

/** Today / Potential future, side by side on desktop and stacked on mobile. */
function changeBlock(today: string, future: string): string {
  const cell = (label: string, body: string) => `
    <td class="sm-stack dm-surface-alt dm-border" width="50%" valign="top" style="padding:16px 18px; background-color:${brand.surfaceAlt}; border:1px solid ${brand.border}; border-radius:10px;">
      <p style="margin:0 0 6px; font-family:${FONT_STACK}; font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:${brand.accentInk};">${escapeHtml(label)}</p>
      <p class="dm-text" style="margin:0; font-family:${FONT_STACK}; font-size:14px; line-height:1.65; color:${brand.body};">${escapeHtml(body)}</p>
    </td>`;

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 22px;">
      <tr>
        ${cell("Today", today)}
        <td class="sm-hide" width="12" style="width:12px; font-size:0; line-height:0;">&nbsp;</td>
        ${cell("Potential future", future)}
      </tr>
    </table>`;
}

/** "Things you might need" — the recommended services, in their context. */
function servicesBlock(services: { name: string; why: string }[]): string {
  const cards = services
    .map(
      (service) => `
      <tr>
        <td class="dm-surface-alt dm-border" style="padding:16px 18px; background-color:${brand.surfaceAlt}; border:1px solid ${brand.border}; border-radius:10px;">
          <p class="dm-text" style="margin:0 0 6px; font-family:${FONT_STACK}; font-size:15px; font-weight:700; color:${brand.heading};">${escapeHtml(service.name)}</p>
          <p class="dm-muted" style="margin:0; font-family:${FONT_STACK}; font-size:14px; line-height:1.7; color:${brand.body};">${escapeHtml(service.why)}</p>
        </td>
      </tr>
      <tr><td style="height:10px; line-height:10px; font-size:0;">&nbsp;</td></tr>`
    )
    .join("");

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;">${cards}</table>`;
}

/**
 * The results page is client-side only, so there's no URL that reopens someone's
 * report. Sending them straight to the booking link is the one CTA that still
 * works days later, and the Cal.com webhook still attributes the booking.
 */
const BOOKING_URL =
  process.env.NEXT_PUBLIC_CAL_BOOKING_URL || "https://cal.com/refactrd";

export function renderAssessmentEmail(report: AssessmentReport): RenderedEmail {
  const firstName = report.name.trim().split(/\s+/)[0] || report.name;

  const caveat = report.caveat
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 22px;">
        <tr>
          <td class="dm-surface-alt" style="padding:14px 16px; background-color:${brand.surfaceAlt}; border-left:3px solid ${brand.accent}; border-radius:0 8px 8px 0;">
            <p class="dm-muted" style="margin:0; font-family:${FONT_STACK}; font-size:14px; line-height:1.65; color:${brand.body};">${escapeHtml(report.caveat)}</p>
          </td>
        </tr>
      </table>`
    : "";

  const body = [
    `<p class="dm-text" style="margin:0 0 18px; font-family:${FONT_STACK}; font-size:17px; font-weight:600; color:${brand.heading};">Hi ${escapeHtml(firstName)},</p>`,
    prose(
      "Here's your AI Opportunity Assessment. It's based entirely on the answers you gave about one workflow in your business."
    ),
    caveat,
    sectionLabel("The workflow"),
    prose(report.workflow, 18),
    sectionLabel("Your goal"),
    prose(report.goals.join(", "), 26),
    sectionLabel("What we heard"),
    prose(report.whatWeHeard),
    sectionLabel("Where the opportunity is"),
    prose(report.opportunity),
    sectionLabel("What this could look like"),
    prose(report.futureState),
    sectionLabel("What could change"),
    changeBlock(report.today, report.future),
    sectionLabel("Things you might need"),
    prose(
      "Based on what you told us, these are the pieces that would move this workflow. Not a quote, just the shape of the work.",
      14
    ),
    servicesBlock(report.services),
  ].join("\n");

  const panel = [
    sectionLabel("Your first step"),
    `<p class="dm-text" style="margin:0 0 20px; font-family:${FONT_STACK}; font-size:16px; font-weight:600; line-height:1.6; color:${brand.heading};">${escapeHtml(report.firstStep)}</p>`,
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr><td align="left" class="sm-center">${button(BOOKING_URL, "Book a conversation")}</td></tr>
    </table>`,
  ].join("\n");

  const html = renderEmail({
    title: `Your AI Opportunity Assessment — ${report.outcomeLabel}`,
    preheader: `${report.outcomeLabel}: ${report.outcomeSummary}`,
    eyebrow: "Refactrd · AI Opportunity Assessment",
    heading: `Your AI opportunity: ${report.outcomeLabel}`,
    subheading: report.outcomeSummary,
    body,
    panel,
    footerNote: `Reference: ${report.id}`,
  });

  const text = [
    `Hi ${firstName},`,
    "",
    "Here's your AI Opportunity Assessment.",
    "",
    `YOUR AI OPPORTUNITY: ${report.outcomeLabel.toUpperCase()}`,
    report.outcomeSummary,
    "",
    report.caveat ? `NOTE\n${report.caveat}\n` : "",
    `THE WORKFLOW\n${report.workflow}`,
    "",
    `YOUR GOAL\n${report.goals.join(", ")}`,
    "",
    `WHAT WE HEARD\n${report.whatWeHeard}`,
    "",
    `WHERE THE OPPORTUNITY IS\n${report.opportunity}`,
    "",
    `WHAT THIS COULD LOOK LIKE\n${report.futureState}`,
    "",
    `WHAT COULD CHANGE`,
    `Today: ${report.today}`,
    `Potential future: ${report.future}`,
    "",
    `THINGS YOU MIGHT NEED`,
    ...report.services.map((s) => `- ${s.name}: ${s.why}`),
    "",
    `YOUR FIRST STEP\n${report.firstStep}`,
    "",
    `Book a conversation: ${BOOKING_URL}`,
    "",
    `Reference: ${report.id}`,
    "Refactrd · refactrd.com · info@refactrd.com",
  ]
    .filter((line) => line !== "")
    .join("\n");

  return {
    subject: `Your AI Opportunity Assessment — ${report.outcomeLabel}`,
    html,
    text,
  };
}
