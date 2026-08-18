import {
  brand,
  button,
  detailRow,
  escapeHtml,
  FONT_STACK,
  formatEmailDate,
  quoteBlock,
  renderEmail,
  stepList,
} from "./shell";

export interface ContactSubmission {
  name: string;
  company: string;
  email: string;
  role: string;
  /** Services the enquirer selected — the question is multi-select. */
  services?: string[];
  challenge: string;
  successOutcome: string;
  /** When they want to get started, if given. */
  timeline?: string;
  /** Supabase row id, shown as a reference on both emails. */
  referenceId?: string;
  submittedAt?: Date;
  /** Set on the internal email when the submission could not be persisted. */
  storageFailed?: boolean;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

const NOT_SPECIFIED = "Not specified";

const nextSteps = [
  {
    num: "01",
    title: "We'll review your inquiry.",
    body: "A member of the team reads every submission personally — no automated triage.",
  },
  {
    num: "02",
    title: "We'll schedule an introductory conversation.",
    body: "If there's a good fit, we'll arrange a short call to explore your objectives in more detail.",
  },
  {
    num: "03",
    title: "We'll recommend the best path forward.",
    body: "You'll get a clear recommendation — including if the honest answer is that you don't need us yet.",
  },
];

function paragraph(html: string, marginBottom = 16): string {
  return `<p class="dm-muted" style="margin:0 0 ${marginBottom}px; font-family:${FONT_STACK}; font-size:15px; line-height:1.75; color:${brand.body};">${html}</p>`;
}

/** One service renders inline; several render as a stacked list. */
function servicesHtml(services: string[] | undefined): string {
  if (!services || services.length === 0) return escapeHtml("Not sure yet");
  if (services.length === 1) return escapeHtml(services[0]);
  return services
    .map(
      (s) =>
        `<span style="display:block; margin:0 0 3px;">&bull;&nbsp; ${escapeHtml(s)}</span>`
    )
    .join("");
}

function servicesText(services: string[] | undefined): string {
  return services && services.length > 0 ? services.join(", ") : "Not sure yet";
}

function sectionLabel(text: string): string {
  return `<p class="dm-muted" style="margin:0 0 14px; font-family:${FONT_STACK}; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:${brand.muted};">${escapeHtml(text)}</p>`;
}

/* ── Customer confirmation ──────────────────────────────────────────── */

export function renderContactCustomerEmail(data: ContactSubmission): RenderedEmail {
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;
  const serviceLabel = servicesText(data.services);
  const timeline = data.timeline || NOT_SPECIFIED;

  const body = [
    `<p class="dm-text" style="margin:0 0 18px; font-family:${FONT_STACK}; font-size:17px; font-weight:600; color:${brand.heading};">Hi ${escapeHtml(firstName)},</p>`,
    paragraph(
      `Thank you for reaching out to Refactrd. We've received your inquiry on behalf of <strong class="dm-text" style="color:${brand.heading};">${escapeHtml(data.company)}</strong> and it's already with our team.`
    ),
    paragraph(
      "We'll review what you've shared and be in touch within <strong>one business day</strong>. No automated proposals and no generic replies — just a real conversation about whether and how we can help.",
      24
    ),
    sectionLabel("What happens next"),
    stepList(nextSteps),
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr><td style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>
      <tr><td align="left" class="sm-center">${button("https://refactrd.com/approach", "See how we work")}</td></tr>
    </table>`,
  ].join("\n");

  const panel = [
    sectionLabel("A copy of what you sent us"),
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      ${detailRow("Service interest", servicesHtml(data.services))}
      ${detailRow("Timeline", escapeHtml(timeline))}
      ${quoteBlock("Your challenge", data.challenge)}
      ${quoteBlock("What success looks like", data.successOutcome)}
    </table>`,
    `<p class="dm-muted" style="margin:0; font-family:${FONT_STACK}; font-size:13px; line-height:1.6; color:${brand.muted};">Need to add something? Just reply to this email — it reaches us directly.</p>`,
  ].join("\n");

  const html = renderEmail({
    title: "We've received your inquiry — Refactrd",
    preheader: `Thanks ${firstName} — we'll review your inquiry and reply within one business day.`,
    eyebrow: "Refactrd · AI Engineering Studio",
    heading: "We've received your inquiry.",
    subheading: "We'll be in touch within one business day.",
    body,
    panel,
    footerNote: data.referenceId ? `Reference: ${data.referenceId}` : undefined,
  });

  const text = [
    `Hi ${firstName},`,
    "",
    `Thank you for reaching out to Refactrd. We've received your inquiry on behalf of ${data.company} and it's already with our team.`,
    "",
    "We'll review what you've shared and be in touch within one business day. No automated proposals and no generic replies.",
    "",
    "WHAT HAPPENS NEXT",
    ...nextSteps.map((s) => `${s.num}. ${s.title} ${s.body}`),
    "",
    "A COPY OF WHAT YOU SENT US",
    `Service interest: ${serviceLabel}`,
    `Timeline: ${timeline}`,
    `Your challenge: ${data.challenge}`,
    `What success looks like: ${data.successOutcome}`,
    "",
    "Need to add something? Just reply to this email.",
    "",
    data.referenceId ? `Reference: ${data.referenceId}` : "",
    "Refactrd · refactrd.com · info@refactrd.com",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: "We've received your inquiry — Refactrd",
    html,
    text,
  };
}

/* ── Internal notification ──────────────────────────────────────────── */

export function renderContactTeamEmail(data: ContactSubmission): RenderedEmail {
  const submittedAt = data.submittedAt ?? new Date();
  const serviceLabel = servicesText(data.services);
  const timeline = data.timeline || NOT_SPECIFIED;

  const storageWarning = data.storageFailed
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 22px;">
        <tr>
          <td style="padding:14px 16px; background-color:#FEF2F2; border-left:3px solid #DC2626; border-radius:0 8px 8px 0;">
            <p style="margin:0; font-family:${FONT_STACK}; font-size:13px; line-height:1.6; color:#991B1B;"><strong>Not saved to the database.</strong> This inquiry failed to write to Supabase — this email is the only record. Please copy the details somewhere safe.</p>
          </td>
        </tr>
      </table>`
    : "";

  const body = [
    storageWarning,
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      ${detailRow("Name", escapeHtml(data.name))}
      ${detailRow("Organization", escapeHtml(data.company))}
      ${detailRow(
        "Work email",
        `<a class="dm-link" href="mailto:${escapeHtml(data.email)}" style="color:${brand.link}; text-decoration:none; font-weight:600;">${escapeHtml(data.email)}</a>`
      )}
      ${detailRow("Role", escapeHtml(data.role))}
      ${detailRow("Service interest", servicesHtml(data.services))}
      ${detailRow("Timeline", escapeHtml(timeline))}
      ${quoteBlock("Their challenge", data.challenge)}
      ${quoteBlock("What success looks like", data.successOutcome)}
    </table>`,
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr><td style="height:8px; line-height:8px; font-size:0;">&nbsp;</td></tr>
      <tr><td align="left" class="sm-center">${button(
        `mailto:${data.email}?subject=${encodeURIComponent(`Re: your inquiry to Refactrd`)}`,
        `Reply to ${data.name.trim().split(/\s+/)[0] || data.name}`
      )}</td></tr>
    </table>`,
  ].join("\n");

  const html = renderEmail({
    title: `New inquiry — ${data.name} (${data.company})`,
    preheader: `${data.name} at ${data.company} · ${serviceLabel} · ${timeline}`,
    eyebrow: "New Inquiry · Contact Form",
    heading: `${data.name} — ${data.company}`,
    subheading: `${serviceLabel} · Timeline: ${timeline}`,
    body,
    footerNote: `${data.referenceId ? `Submission ID: ${data.referenceId} · ` : ""}Received ${formatEmailDate(submittedAt)}`,
  });

  const text = [
    `New contact inquiry — ${data.name} (${data.company})`,
    "",
    `Name: ${data.name}`,
    `Organization: ${data.company}`,
    `Work email: ${data.email}`,
    `Role: ${data.role}`,
    `Service interest: ${serviceLabel}`,
    `Timeline: ${timeline}`,
    "",
    `Their challenge:`,
    data.challenge,
    "",
    `What success looks like:`,
    data.successOutcome,
    "",
    data.referenceId ? `Submission ID: ${data.referenceId}` : "",
    `Received ${formatEmailDate(submittedAt)}`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `New inquiry — ${data.name} (${data.company})`,
    html,
    text,
  };
}
