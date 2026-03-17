'use server';

import { CalculationResult } from '@/lib/pricingCalculation';
import { Currency } from '@/lib/currencyUtils';

interface LeadData {
  contactInfo: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
  };
  result: CalculationResult;
  currency: Currency;
  answers: {
    projectType?: string;
    projectDetails?: string;
    timeline?: string;
    support?: string;
    budget?: string;
    painPoints?: string[];
  };
  timestamp: string;
}

export async function submitPricingCalculatorLead(data: LeadData) {
  try {
    // 1. Store in database (you can use Supabase, MongoDB, etc.)
    // For now, we'll just log it
    console.log('Lead captured:', data);

    // 2. Send to your CRM (optional)
    // await sendToCRM(data);

    // 3. Send notification to your team
    await sendTeamNotification(data);

    // 4. Send confirmation email to user
    await sendUserConfirmationEmail(data);

    return { success: true };
  } catch (error) {
    console.error('Error submitting lead:', error);
    return { success: false, error: 'Failed to submit lead' };
  }
}

async function sendTeamNotification(data: LeadData) {
  // Send email to your team about new lead
  // Using Resend (modern, clean email API)
  
  const subject = `🎯 New Pricing Calculator Lead: ${data.contactInfo.name}`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #5B6CFF; color: white; padding: 20px; border-radius: 8px; }
          .section { margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 8px; }
          .label { font-weight: bold; color: #1F2A44; }
          .value { color: #64748B; margin-bottom: 10px; }
          .estimate { background: #5B6CFF; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .estimate h2 { margin: 0 0 10px 0; font-size: 32px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Pricing Calculator Lead!</h1>
          </div>

          <div class="section">
            <h2>Contact Information</h2>
            <div class="value"><span class="label">Name:</span> ${data.contactInfo.name}</div>
            <div class="value"><span class="label">Email:</span> ${data.contactInfo.email}</div>
            ${data.contactInfo.company ? `<div class="value"><span class="label">Company:</span> ${data.contactInfo.company}</div>` : ''}
            ${data.contactInfo.phone ? `<div class="value"><span class="label">Phone:</span> ${data.contactInfo.phone}</div>` : ''}
          </div>

          <div class="estimate">
            <h2>$${data.result.estimatedRange.min.toLocaleString()} - $${data.result.estimatedRange.max.toLocaleString()}</h2>
            <p>${data.result.projectTypeName}</p>
          </div>

          <div class="section">
            <h2>Project Details</h2>
            <div class="value"><span class="label">Project Type:</span> ${data.result.projectTypeName}</div>
            ${data.result.projectDetailsName ? `<div class="value"><span class="label">Specific Solution:</span> ${data.result.projectDetailsName}</div>` : ''}
            <div class="value"><span class="label">Timeline:</span> ${data.result.timeline}</div>
            ${data.result.ongoingSupport ? `<div class="value"><span class="label">Support Plan:</span> ${data.result.ongoingSupport.name} ($${data.result.ongoingSupport.monthlyCost}/month)</div>` : ''}
            <div class="value"><span class="label">Currency:</span> ${data.currency}</div>
          </div>

          ${data.result.painPoints && data.result.painPoints.length > 0 ? `
            <div class="section">
              <h2>Pain Points</h2>
              ${data.result.painPoints.map(point => `<div class="value">• ${point}</div>`).join('')}
            </div>
          ` : ''}

          <div class="section">
            <h2>Next Steps</h2>
            <p>Follow up with ${data.contactInfo.name} to schedule a discovery call and provide a detailed proposal.</p>
            <p><strong>Recommended Response Time:</strong> Within 24 hours</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // Send via Resend (you'll need to install and configure)
  // For now, just log
  console.log('Team notification email would be sent:', { subject, to: 'hello@refactrd.com' });
  
  // TODO: Implement actual email sending
  // const { data, error } = await resend.emails.send({
  //   from: 'Refactrd Calculator <calculator@refactrd.com>',
  //   to: ['hello@refactrd.com'],
  //   subject,
  //   html: htmlContent,
  // });
}

async function sendUserConfirmationEmail(data: LeadData) {
  const { contactInfo, result, currency } = data;
  
  const subject = `Your Custom Estimate from Refactrd`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #5B6CFF 0%, #1F2A44 100%); color: white; padding: 40px 20px; text-align: center; }
          .header h1 { margin: 0 0 10px 0; font-size: 28px; }
          .content { padding: 40px 20px; background: #ffffff; }
          .estimate-box { background: linear-gradient(135deg, #5B6CFF 0%, #1F2A44 100%); color: white; padding: 30px; border-radius: 12px; margin: 20px 0; text-align: center; }
          .estimate-box h2 { margin: 0 0 5px 0; font-size: 36px; font-weight: bold; }
          .estimate-box p { margin: 0; opacity: 0.9; }
          .detail-section { margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { font-weight: bold; color: #1F2A44; }
          .detail-value { color: #64748B; }
          .included-section { margin: 30px 0; }
          .included-item { display: flex; align-items: start; margin: 12px 0; }
          .check-icon { color: #10B981; margin-right: 10px; font-size: 20px; }
          .cta-button { display: inline-block; background: #5B6CFF; color: white; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; margin: 20px 10px 10px 0; }
          .cta-button:hover { background: #1F2A44; }
          .cta-secondary { background: white; color: #5B6CFF; border: 2px solid #5B6CFF; }
          .footer { background: #f8f9fa; padding: 30px 20px; text-align: center; color: #64748B; font-size: 14px; }
          .next-steps { background: #E6EAF0; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .next-step { display: flex; align-items: start; margin: 15px 0; }
          .step-number { background: #5B6CFF; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Custom Estimate</h1>
            <p>Hi ${contactInfo.name}, here's what we calculated for you</p>
          </div>

          <div class="content">
            <div class="estimate-box">
              <h2>${formatCurrencyRange(result.estimatedRange.min, result.estimatedRange.max, currency)}</h2>
              <p>${result.projectTypeName}</p>
              ${result.ongoingSupport ? `<p style="margin-top: 15px; font-size: 14px;">+ ${formatCurrency(result.ongoingSupport.monthlyCost, currency)}/month ongoing support</p>` : ''}
            </div>

            <div class="detail-section">
              <h2 style="margin-top: 0; color: #1F2A44;">Project Details</h2>
              
              <div class="detail-row">
                <span class="detail-label">Project Type</span>
                <span class="detail-value">${result.projectTypeName}</span>
              </div>

              ${result.projectDetailsName ? `
                <div class="detail-row">
                  <span class="detail-label">Specific Solution</span>
                  <span class="detail-value">${result.projectDetailsName}</span>
                </div>
              ` : ''}

              <div class="detail-row">
                <span class="detail-label">Timeline</span>
                <span class="detail-value">${result.timeline}</span>
              </div>

              ${result.ongoingSupport ? `
                <div class="detail-row">
                  <span class="detail-label">Support Plan</span>
                  <span class="detail-value">${result.ongoingSupport.name}</span>
                </div>
              ` : ''}
            </div>

            <div class="included-section">
              <h2 style="color: #1F2A44;">What's Included</h2>
              ${['System architecture planning', 'Custom development', 'Testing and deployment', 'Documentation', 'Training and handoff', 'Post-launch support'].map(item => `
                <div class="included-item">
                  <span class="check-icon">✓</span>
                  <span>${item}</span>
                </div>
              `).join('')}
            </div>

            <div class="next-steps">
              <h2 style="margin-top: 0; color: #1F2A44;">Next Steps</h2>
              
              <div class="next-step">
                <div class="step-number">1</div>
                <div>
                  <strong>Book a Discovery Call</strong><br>
                  <span style="color: #64748B; font-size: 14px;">We'll discuss your specific needs and refine the scope</span>
                </div>
              </div>

              <div class="next-step">
                <div class="step-number">2</div>
                <div>
                  <strong>Receive Detailed Proposal</strong><br>
                  <span style="color: #64748B; font-size: 14px;">Get a comprehensive proposal with timeline and deliverables</span>
                </div>
              </div>

              <div class="next-step">
                <div class="step-number">3</div>
                <div>
                  <strong>Project Kickoff</strong><br>
                  <span style="color: #64748B; font-size: 14px;">Start building with our engineering team</span>
                </div>
              </div>
            </div>

            <div style="text-align: center; margin: 40px 0;">
              <a href="https://cal.com/refactrd/technical-discovery-call" class="cta-button">Book a Discovery Call</a>
              <a href="https://refactrd.com/pricing-calculator" class="cta-button cta-secondary">Revise My Estimate</a>
            </div>

            <p style="text-align: center; color: #64748B; font-size: 14px;">
              Questions? Reply to this email or contact us at 
              <a href="mailto:hello@refactrd.com" style="color: #5B6CFF;">hello@refactrd.com</a>
            </p>
          </div>

          <div class="footer">
            <p><strong>Refactrd</strong> - Engineering Studio</p>
            <p>Building reliable software, systems & automation</p>
            <p style="margin-top: 20px;">
              <a href="https://refactrd.com" style="color: #5B6CFF; text-decoration: none; margin: 0 10px;">Website</a> |
              <a href="https://refactrd.com/about" style="color: #5B6CFF; text-decoration: none; margin: 0 10px;">About</a> |
              <a href="https://refactrd.com/services" style="color: #5B6CFF; text-decoration: none; margin: 0 10px;">Services</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  console.log('User confirmation email would be sent to:', contactInfo.email);
  
  // TODO: Implement actual email sending
  // const { data, error } = await resend.emails.send({
  //   from: 'Refactrd <hello@refactrd.com>',
  //   to: [contactInfo.email],
  //   subject,
  //   html: htmlContent,
  // });
}

// Helper functions for email formatting
function formatCurrencyRange(min: number, max: number, currency: Currency): string {
  const symbols = { USD: '$', NGN: '₦', EUR: '€', GBP: '£' };
  const symbol = symbols[currency];
  return `${symbol}${min.toLocaleString()} - ${symbol}${max.toLocaleString()}`;
}

function formatCurrency(amount: number, currency: Currency): string {
  const symbols = { USD: '$', NGN: '₦', EUR: '€', GBP: '£' };
  const symbol = symbols[currency];
  return `${symbol}${amount.toLocaleString()}`;
}