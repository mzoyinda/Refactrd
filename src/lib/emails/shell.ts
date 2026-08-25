/**
 * Shared building blocks for Refactrd transactional emails.
 *
 * Everything here renders to table-based HTML with inline styles so it survives
 * Outlook, Gmail, Apple Mail and the mobile clients. The `<style>` block adds
 * progressive enhancement only: single-column stacking under 620px and a dark
 * mode palette for clients that report `prefers-color-scheme`.
 */

export const brand = {
  navy: "#1F2A44",
  navyDeep: "#161F33",
  /** Light accent — for use on the navy masthead only. */
  accent: "#A2D2FF",
  /** Darkened accent, for accent-coloured text on white/light surfaces. */
  accentInk: "#5B8FC7",
  heading: "#1F2A44",
  body: "#475569",
  muted: "#94A3B8",
  border: "#E2E8F0",
  hairline: "#F1F5F9",
  canvas: "#F4F6F9",
  surface: "#FFFFFF",
  surfaceAlt: "#F8FAFC",
  link: "#0E5D7D",
} as const;

export const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif";

/** Escapes user-supplied text before it is interpolated into email HTML. */
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Same as `escapeHtml`, but keeps the author's line breaks. */
export function escapeMultiline(value: unknown): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

export function formatEmailDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ── Content primitives ─────────────────────────────────────────────── */

/**
 * A label/value pair. Label sits above the value so the row never has to
 * squeeze two columns onto a narrow screen.
 */
export function detailRow(label: string, valueHtml: string): string {
  return `
    <tr>
      <td class="dm-hairline" style="padding:0 0 14px; border-bottom:1px solid ${brand.hairline};">
        <p class="dm-muted" style="margin:0 0 4px; font-family:${FONT_STACK}; font-size:11px; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; color:${brand.muted};">${escapeHtml(label)}</p>
        <p class="dm-text" style="margin:0; font-family:${FONT_STACK}; font-size:15px; line-height:1.6; color:${brand.heading};">${valueHtml}</p>
      </td>
    </tr>
    <tr><td style="height:14px; line-height:14px; font-size:0;">&nbsp;</td></tr>`;
}

/** A longer free-text answer, set off with an accent rule. */
export function quoteBlock(label: string, text: string): string {
  return `
    <tr>
      <td style="padding:0 0 20px;">
        <p class="dm-muted" style="margin:0 0 8px; font-family:${FONT_STACK}; font-size:11px; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; color:${brand.muted};">${escapeHtml(label)}</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td class="dm-surface-alt" style="padding:16px 18px; background-color:${brand.surfaceAlt}; border-left:3px solid ${brand.accent}; border-radius:0 8px 8px 0;">
              <p class="dm-text" style="margin:0; font-family:${FONT_STACK}; font-size:15px; line-height:1.7; color:${brand.body};">${escapeMultiline(text)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

/** Numbered "what happens next" style list. */
export function stepList(steps: { num: string; title: string; body: string }[]): string {
  const rows = steps
    .map(
      (step, i) => `
      <tr>
        <td width="34" valign="top" style="padding:0 12px ${i === steps.length - 1 ? "0" : "18px"} 0;">
          <p style="margin:0; font-family:${FONT_STACK}; font-size:13px; font-weight:700; color:${brand.accentInk};">${escapeHtml(step.num)}</p>
        </td>
        <td valign="top" style="padding:0 0 ${i === steps.length - 1 ? "0" : "18px"};">
          <p class="dm-text" style="margin:0 0 4px; font-family:${FONT_STACK}; font-size:15px; font-weight:600; line-height:1.45; color:${brand.heading};">${escapeHtml(step.title)}</p>
          <p class="dm-muted" style="margin:0; font-family:${FONT_STACK}; font-size:14px; line-height:1.65; color:${brand.body};">${escapeHtml(step.body)}</p>
        </td>
      </tr>`
    )
    .join("");

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${rows}</table>`;
}

/** Bulletproof button — VML fallback keeps the shape in desktop Outlook. */
export function button(href: string, label: string): string {
  const safeHref = escapeHtml(href);
  const safeLabel = escapeHtml(label);
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center" bgcolor="${brand.navy}" style="border-radius:999px;">
          <!--[if mso]>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${safeHref}" style="height:46px;v-text-anchor:middle;width:220px;" arcsize="50%" stroke="f" fillcolor="${brand.navy}">
            <w:anchorlock/>
            <center style="color:#ffffff;font-family:${FONT_STACK};font-size:15px;font-weight:bold;">${safeLabel}</center>
          </v:roundrect>
          <![endif]-->
          <!--[if !mso]><!-- -->
          <a href="${safeHref}" style="display:inline-block; padding:14px 30px; font-family:${FONT_STACK}; font-size:15px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:999px; background-color:${brand.navy};">${safeLabel}</a>
          <!--<![endif]-->
        </td>
      </tr>
    </table>`;
}

/* ── Document shell ─────────────────────────────────────────────────── */

export interface EmailShellOptions {
  /** Browser/client title. */
  title: string;
  /** Hidden inbox preview line. */
  preheader: string;
  /** Small uppercase kicker above the headline. */
  eyebrow: string;
  /** Main headline in the navy masthead. */
  heading: string;
  /** Optional supporting line under the headline. */
  subheading?: string;
  /** Body HTML — rendered inside the white card. */
  body: string;
  /** Optional secondary panel below the card (tinted). */
  panel?: string;
  /** Small print in the footer bar. */
  footerNote?: string;
}

export function renderEmail({
  title,
  preheader,
  eyebrow,
  heading,
  subheading,
  body,
  panel,
  footerNote,
}: EmailShellOptions): string {
  const year = new Date().getFullYear();

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>${escapeHtml(title)}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style type="text/css">
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { -ms-interpolation-mode:bicubic; border:0; outline:none; text-decoration:none; }
    a { color:${brand.link}; }

    @media only screen and (max-width:620px) {
      .sm-full { width:100% !important; max-width:100% !important; }
      .sm-px { padding-left:22px !important; padding-right:22px !important; }
      .sm-py { padding-top:26px !important; padding-bottom:26px !important; }
      .sm-gutter { padding-left:12px !important; padding-right:12px !important; }
      .sm-h1 { font-size:22px !important; line-height:1.3 !important; }
      .sm-center { text-align:center !important; }
      /* Two-column cells stack into one column; the spacer cell disappears. */
      .sm-stack { display:block !important; width:100% !important; margin-bottom:10px !important; }
      .sm-hide { display:none !important; width:0 !important; }
    }

    @media (prefers-color-scheme: dark) {
      .dm-canvas { background-color:#0E131D !important; }
      .dm-surface { background-color:#1A2233 !important; }
      .dm-surface-alt { background-color:#151D2C !important; }
      .dm-border { border-color:#2C3A55 !important; }
      .dm-hairline { border-color:#2C3A55 !important; }
      .dm-text { color:#E7EDF7 !important; }
      .dm-muted { color:#9AABC6 !important; }
      .dm-link { color:${brand.accent} !important; }
    }

    /* Outlook.com dark mode */
    [data-ogsc] .dm-canvas { background-color:#0E131D !important; }
    [data-ogsc] .dm-surface { background-color:#1A2233 !important; }
    [data-ogsc] .dm-surface-alt { background-color:#151D2C !important; }
    [data-ogsc] .dm-border { border-color:#2C3A55 !important; }
    [data-ogsc] .dm-hairline { border-color:#2C3A55 !important; }
    [data-ogsc] .dm-text { color:#E7EDF7 !important; }
    [data-ogsc] .dm-muted { color:#9AABC6 !important; }
    [data-ogsc] .dm-link { color:${brand.accent} !important; }
  </style>
</head>
<body class="dm-canvas" style="margin:0; padding:0; width:100%; background-color:${brand.canvas};">
  <div style="display:none; font-size:1px; color:${brand.canvas}; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden; mso-hide:all;">${escapeHtml(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="dm-canvas" style="background-color:${brand.canvas};">
    <tr>
      <td align="center" class="sm-gutter" style="padding:32px 20px;">

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="sm-full" style="width:600px; max-width:600px;">

          <!-- Masthead -->
          <tr>
            <td class="sm-px sm-py" style="padding:34px 36px 30px; background-color:${brand.navy}; border-radius:16px 16px 0 0;">
              <p style="margin:0 0 10px; font-family:${FONT_STACK}; font-size:11px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:${brand.accent};">${escapeHtml(eyebrow)}</p>
              <h1 class="sm-h1" style="margin:0; font-family:${FONT_STACK}; font-size:25px; font-weight:700; line-height:1.32; color:#ffffff;">${escapeHtml(heading)}</h1>
              ${
                subheading
                  ? `<p style="margin:10px 0 0; font-family:${FONT_STACK}; font-size:14px; line-height:1.6; color:rgba(255,255,255,0.62);">${escapeHtml(subheading)}</p>`
                  : ""
              }
            </td>
          </tr>

          <!-- Body card -->
          <tr>
            <td class="dm-surface dm-border sm-px sm-py" style="padding:32px 36px; background-color:${brand.surface}; border-left:1px solid ${brand.border}; border-right:1px solid ${brand.border};">
              ${body}
            </td>
          </tr>

          ${
            panel
              ? `<tr>
            <td class="dm-surface-alt dm-border sm-px" style="padding:26px 36px; background-color:${brand.surfaceAlt}; border-left:1px solid ${brand.border}; border-right:1px solid ${brand.border}; border-top:1px solid ${brand.border};">
              ${panel}
            </td>
          </tr>`
              : ""
          }

          <!-- Footer -->
          <tr>
            <td class="dm-canvas dm-border sm-px" align="center" style="padding:22px 36px 24px; background-color:${brand.canvas}; border:1px solid ${brand.border}; border-top:none; border-radius:0 0 16px 16px;">
              ${
                footerNote
                  ? `<p class="dm-muted" style="margin:0 0 8px; font-family:${FONT_STACK}; font-size:12px; line-height:1.6; color:${brand.muted};">${escapeHtml(footerNote)}</p>`
                  : ""
              }
              <p class="dm-muted" style="margin:0; font-family:${FONT_STACK}; font-size:13px; color:${brand.muted};">
                <strong style="color:${brand.heading};" class="dm-text">Refactrd</strong> &middot;
                <a class="dm-link" href="https://refactrd.com" style="color:${brand.link}; text-decoration:none; font-weight:600;">refactrd.com</a> &middot;
                <a class="dm-link" href="mailto:info@refactrd.com" style="color:${brand.link}; text-decoration:none; font-weight:600;">info@refactrd.com</a>
              </p>
              <p class="dm-muted" style="margin:8px 0 0; font-family:${FONT_STACK}; font-size:11px; color:${brand.muted};">&copy; ${year} Refactrd. All rights reserved.</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
