import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error('RESEND_API_KEY is not set in environment variables');
}

const resend = new Resend(resendApiKey);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'hello@refactrd.com';
const TEAM_EMAIL = process.env.RESEND_TEAM_EMAIL || 'hello@refactrd.com';

export async function sendEmail({
  to,
  subject,
  html,
  from = FROM_EMAIL,
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Email exception:', error);
    return { success: false, error };
  }
}

export async function sendUserEstimateEmail(
  to: string,
  subject: string,
  html: string
) {
  return sendEmail({
    to,
    subject,
    html,
    from: `Refactrd <${FROM_EMAIL}>`,
  });
}

export async function sendTeamNotificationEmail(
  subject: string,
  html: string
) {
  return sendEmail({
    to: TEAM_EMAIL,
    subject,
    html,
    from: `Refactrd Calculator <${FROM_EMAIL}>`,
  });
}