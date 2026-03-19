import { CalculationResult } from './pricingCalculation';
import { Currency } from './currencyUtils';

interface EmailTemplateData {
  contactInfo: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
  };
  result: CalculationResult;
  currency: Currency;
}

// Helper to format currency
function formatCurrency(amount: number, currency: Currency): string {
  const symbols = { USD: '$', NGN: '₦', EUR: '€', GBP: '£' };
  const symbol = symbols[currency];
  return `${symbol}${amount.toLocaleString()}`;
}

function formatCurrencyRange(min: number, max: number, currency: Currency): string {
  return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`;
}

// Convert USD to selected currency
function convertCurrency(amountUSD: number, currency: Currency): number {
  const rates = { USD: 1, NGN: 1650, EUR: 0.92, GBP: 0.79 };
  return Math.round(amountUSD * rates[currency]);
}

export function generateUserEmail(data: EmailTemplateData): { subject: string; html: string } {
  const { contactInfo, result, currency } = data;
  
  // Convert prices to selected currency
  const estimatedMin = convertCurrency(result.estimatedRange.min, currency);
  const estimatedMax = convertCurrency(result.estimatedRange.max, currency);
  
  const supportCost = result.ongoingSupport
    ? convertCurrency(result.ongoingSupport.monthlyCost, currency)
    : 0;

  const subject = `Your Custom Estimate from Refactrd`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your Refactrd Estimate</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #fbfbfb;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fbfbfb;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #1f2a44; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #fbfbfb; letter-spacing: -0.5px;">Your Custom Estimate</h1>
              <p style="margin: 0; font-size: 16px; color: #e6eaf0;">Hi ${contactInfo.name}, here's what we calculated for you</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Estimate Box -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #1f2a44; border-radius: 16px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 32px; text-align: center;">
                    <h2 style="margin: 0 0 8px 0; font-size: 36px; font-weight: 700; color: #fbfbfb; letter-spacing: -1px;">${formatCurrencyRange(estimatedMin, estimatedMax, currency)}</h2>
                    <p style="margin: 0; font-size: 16px; color: #e6eaf0; font-weight: 600;">${result.projectTypeName}</p>
                    ${result.ongoingSupport ? `
                      <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
                        <p style="margin: 0; font-size: 14px; color: #e6eaf0;">+ ${formatCurrency(supportCost, currency)}/month ongoing support</p>
                      </div>
                    ` : ''}
                  </td>
                </tr>
              </table>

              <!-- Project Details -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fbfbfb; border-radius: 12px; border: 1px solid #e6eaf0; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 700; color: #1f2a44;">Project Details</h3>
                    
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e6eaf0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="font-weight: 600; color: #1f2a44; font-size: 14px;">Project Type</td>
                              <td align="right" style="color: #0e5d7d; font-weight: 600; font-size: 14px;">${result.projectTypeName}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      ${result.projectDetailsName ? `
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e6eaf0;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                              <tr>
                                <td style="font-weight: 600; color: #1f2a44; font-size: 14px;">Specific Solution</td>
                                <td align="right" style="color: #0e5d7d; font-weight: 600; font-size: 14px;">${result.projectDetailsName}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      ` : ''}

                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e6eaf0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="font-weight: 600; color: #1f2a44; font-size: 14px;">Timeline</td>
                              <td align="right" style="color: #0e5d7d; font-weight: 600; font-size: 14px;">${result.timeline}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      ${result.ongoingSupport ? `
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e6eaf0;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                              <tr>
                                <td style="font-weight: 600; color: #1f2a44; font-size: 14px;">Support Plan</td>
                                <td align="right" style="color: #0e5d7d; font-weight: 600; font-size: 14px;">${result.ongoingSupport.name}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      ` : ''}

                      <tr>
                        <td style="padding: 12px 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="font-weight: 600; color: #1f2a44; font-size: 14px;">Currency</td>
                              <td align="right" style="color: #0e5d7d; font-weight: 600; font-size: 14px;">${currency}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What's Included -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 700; color: #1f2a44;">What's Included</h3>
                    
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 6px 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 24px; height: 24px; background-color: #0e5d7d; color: #fbfbfb; border-radius: 50%; text-align: center; font-weight: 700; font-size: 14px; vertical-align: middle;">✓</td>
                              <td style="padding-left: 12px; color: #1f2a44; font-size: 15px; line-height: 1.5;">System architecture planning</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 24px; height: 24px; background-color: #0e5d7d; color: #fbfbfb; border-radius: 50%; text-align: center; font-weight: 700; font-size: 14px; vertical-align: middle;">✓</td>
                              <td style="padding-left: 12px; color: #1f2a44; font-size: 15px; line-height: 1.5;">Custom development</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 24px; height: 24px; background-color: #0e5d7d; color: #fbfbfb; border-radius: 50%; text-align: center; font-weight: 700; font-size: 14px; vertical-align: middle;">✓</td>
                              <td style="padding-left: 12px; color: #1f2a44; font-size: 15px; line-height: 1.5;">Testing and deployment</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 24px; height: 24px; background-color: #0e5d7d; color: #fbfbfb; border-radius: 50%; text-align: center; font-weight: 700; font-size: 14px; vertical-align: middle;">✓</td>
                              <td style="padding-left: 12px; color: #1f2a44; font-size: 15px; line-height: 1.5;">Documentation</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 24px; height: 24px; background-color: #0e5d7d; color: #fbfbfb; border-radius: 50%; text-align: center; font-weight: 700; font-size: 14px; vertical-align: middle;">✓</td>
                              <td style="padding-left: 12px; color: #1f2a44; font-size: 15px; line-height: 1.5;">Training and handoff</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 24px; height: 24px; background-color: #0e5d7d; color: #fbfbfb; border-radius: 50%; text-align: center; font-weight: 700; font-size: 14px; vertical-align: middle;">✓</td>
                              <td style="padding-left: 12px; color: #1f2a44; font-size: 15px; line-height: 1.5;">Post-launch support</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fbfbfb; border-radius: 12px; border: 1px solid #e6eaf0; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 700; color: #1f2a44;">Next Steps</h3>
                    
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 16px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style=" text-align: center; font-weight: 700; font-size: 14px; vertical-align: top; line-height: 32px;">1</td>
                              <td style="padding-left: 16px; vertical-align: top;">
                                <p style="margin: 0 0 4px 0; font-weight: 700; color: #1f2a44; font-size: 15px;">Book a Discovery Call</p>
                                <p style="margin: 0; color: #0e5d7d; font-size: 14px; line-height: 1.5;">We'll discuss your specific needs and refine the scope</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 16px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="text-align: center; font-weight: 700; font-size: 14px; vertical-align: top; line-height: 32px;">2</td>
                              <td style="padding-left: 16px; vertical-align: top;">
                                <p style="margin: 0 0 4px 0; font-weight: 700; color: #1f2a44; font-size: 15px;">Receive Detailed Proposal</p>
                                <p style="margin: 0; color: #0e5d7d; font-size: 14px; line-height: 1.5;">Get a comprehensive proposal with timeline and deliverables</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="text-align: center; font-weight: 700; font-size: 14px; vertical-align: top; line-height: 32px;">3</td>
                              <td style="padding-left: 16px; vertical-align: top;">
                                <p style="margin: 0 0 4px 0; font-weight: 700; color: #1f2a44; font-size: 15px;">Project Kickoff</p>
                                <p style="margin: 0; color: #0e5d7d; font-size: 14px; line-height: 1.5;">Start building with our engineering team</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="https://cal.com/refactrd/technical-discovery-call" style="display: inline-block; background-color: #1f2a44; color: #fbfbfb; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">Book a Discovery Call →</a>
                  </td>
                </tr>
              </table>

              <!-- Note -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding: 24px 0;">
                    <p style="margin: 0; text-align: center; color: #0e5d7d; font-size: 14px; line-height: 1.6;">
                      Questions? Reply to this email or contact us at
                      <a href="mailto:info@refactrd.com" style="color: #0e5d7d; text-decoration: none; font-weight: 600;">info@refactrd.com</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1f2a44; padding: 32px 30px; text-align: center; border-top: 1px solid #0e5d7d;">
              <p style="margin: 0 0 8px 0; font-weight: 700; font-size: 16px; color: #fbfbfb;">Refactrd</p>
              <p style="margin: 0 0 16px 0; color: #e6eaf0; font-size: 14px;">Your Favourite Engineering Studio</p>
              <p style="margin: 0 0 24px 0; color: #e6eaf0; font-size: 14px;">Building reliable software, systems & automation</p>
              
              <!-- Quick Links -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 24px auto;">
                <tr>
                  <td style="padding: 0 12px;">
                    <a href="https://refactrd.com" style="color: #e6eaf0; text-decoration: none; font-weight: 600; font-size: 14px;">Home</a>
                  </td>
                  <td style="color: #0e5d7d;">|</td>
                  <td style="padding: 0 12px;">
                    <a href="https://refactrd.com/services" style="color: #e6eaf0; text-decoration: none; font-weight: 600; font-size: 14px;">Services</a>
                  </td>
                  <td style="color: #0e5d7d;">|</td>
                  <td style="padding: 0 12px;">
                    <a href="https://refactrd.com/about" style="color: #e6eaf0; text-decoration: none; font-weight: 600; font-size: 14px;">About</a>
                  </td>
                  <td style="color: #0e5d7d;">|</td>
                  <td style="padding: 0 12px;">
                    <a href="https://refactrd.com/projects" style="color: #e6eaf0; text-decoration: none; font-weight: 600; font-size: 14px;">Projects</a>
                  </td>
                </tr>
              </table>

              <!-- Social Links -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 24px auto;">
                <tr>
                  <td style="padding: 0 8px;">
                    <a href="https://twitter.com/refactrd" style="display: inline-block; width: 36px; height: 36px; background-color: #0e5d7d; border-radius: 50%; text-align: center; line-height: 36px; color: #fbfbfb; text-decoration: none; font-weight: 700; font-size: 16px;">📷</a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://linkedin.com/company/refactrd" style="display: inline-block; width: 36px; height: 36px; background-color: #0e5d7d; border-radius: 50%; text-align: center; line-height: 36px; color: #fbfbfb; text-decoration: none; font-weight: 700; font-size: 16px;">in</a>
                  </td>
                  
                  <td style="padding: 0 8px;">
                    <a href="mailto:info@refactrd.com" style="display: inline-block; width: 36px; height: 36px; background-color: #0e5d7d; border-radius: 50%; text-align: center; line-height: 36px; color: #fbfbfb; text-decoration: none; font-weight: 700; font-size: 16px;">@</a>
                  </td>
                </tr>
              </table>

              <!-- Contact Info -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 24px auto;">
                <tr>
                  <td style="padding: 4px 0; color: #e6eaf0; font-size: 13px;">📧 info@refactrd.com</td>
                </tr>
                
                <tr>
                  <td style="padding: 4px 0; color: #e6eaf0; font-size: 13px;">🌐 <a href="https://refactrd.com" style="color: #e6eaf0; text-decoration: none;">refactrd.com</a></td>
                </tr>
              </table>

              <!-- Legal -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #0e5d7d;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #e6eaf0; opacity: 0.7;">© 2026 Refactrd Engineering Studio. All rights reserved.</p>
                    <p style="margin: 0; font-size: 11px; color: #e6eaf0; opacity: 0.6;">You're receiving this email because you requested a custom estimate on our website.</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return { subject, html };
}

export function generateTeamEmail(data: EmailTemplateData): { subject: string; html: string } {
  const { contactInfo, result, currency } = data;
  
  const subject = `🎯 New Pricing Calculator Lead: ${contactInfo.name}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #fbfbfb;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fbfbfb;">
    <tr>
      <td align="center" style="padding: 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(31, 42, 68, 0.1);">
          
          <tr>
            <td style="background-color: #1f2a44; padding: 24px 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #fbfbfb;">🎯 New Pricing Calculator Lead</h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fbfbfb; border-radius: 8px; border: 1px solid #e6eaf0; padding: 20px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #1f2a44;">Contact Information</h2>
                    <p style="margin: 10px 0;"><strong style="color: #1f2a44;">Name:</strong> <span style="color: #0e5d7d; font-weight: 600;">${contactInfo.name}</span></p>
                    <p style="margin: 10px 0;"><strong style="color: #1f2a44;">Email:</strong> <a href="mailto:${contactInfo.email}" style="color: #0e5d7d; text-decoration: none; font-weight: 600;">${contactInfo.email}</a></p>
                    ${contactInfo.company ? `<p style="margin: 10px 0;"><strong style="color: #1f2a44;">Company:</strong> <span style="color: #0e5d7d; font-weight: 600;">${contactInfo.company}</span></p>` : ''}
                    ${contactInfo.phone ? `<p style="margin: 10px 0;"><strong style="color: #1f2a44;">Phone:</strong> <span style="color: #0e5d7d; font-weight: 600;">${contactInfo.phone}</span></p>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 20px 20px 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #0e5d7d; border-radius: 12px; text-align: center; padding: 24px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 8px 0; font-size: 32px; font-weight: 700; color: #fbfbfb;">${formatCurrencyRange(result.estimatedRange.min, result.estimatedRange.max, currency)}</h2>
                    <p style="margin: 4px 0; color: #e6eaf0; font-weight: 600;">${result.projectTypeName}</p>
                    ${result.ongoingSupport ? `<p style="margin: 8px 0 0 0; font-size: 14px; color: #e6eaf0;">+ ${formatCurrency(result.ongoingSupport.monthlyCost, currency)}/month support</p>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 20px 20px 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fbfbfb; border-radius: 8px; border: 1px solid #e6eaf0; padding: 20px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #1f2a44;">Project Details</h2>
                    <p style="margin: 10px 0;"><strong style="color: #1f2a44;">Project Type:</strong> <span style="color: #0e5d7d; font-weight: 600;">${result.projectTypeName}</span></p>
                    ${result.projectDetailsName ? `<p style="margin: 10px 0;"><strong style="color: #1f2a44;">Solution:</strong> <span style="color: #0e5d7d; font-weight: 600;">${result.projectDetailsName}</span></p>` : ''}
                    <p style="margin: 10px 0;"><strong style="color: #1f2a44;">Timeline:</strong> <span style="color: #0e5d7d; font-weight: 600;">${result.timeline}</span></p>
                    ${result.ongoingSupport ? `<p style="margin: 10px 0;"><strong style="color: #1f2a44;">Support:</strong> <span style="color: #0e5d7d; font-weight: 600;">${result.ongoingSupport.name}</span></p>` : ''}
                    <p style="margin: 10px 0;"><strong style="color: #1f2a44;">Currency:</strong> <span style="color: #0e5d7d; font-weight: 600;">${currency}</span></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${result.painPoints && result.painPoints.length > 0 ? `
            <tr>
              <td style="padding: 0 20px 20px 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fbfbfb; border-radius: 8px; border: 1px solid #e6eaf0; padding: 20px;">
                  <tr>
                    <td>
                      <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #1f2a44;">Pain Points</h2>
                      ${result.painPoints.map(point => `<p style="margin: 8px 0; color: #0e5d7d;">• ${point}</p>`).join('')}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          ` : ''}

          <tr>
            <td style="padding: 0 20px 20px 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fbfbfb; border-radius: 8px; border: 1px solid #e6eaf0; padding: 20px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #1f2a44;">⏰ Next Steps</h2>
                    <p style="margin: 8px 0; color: #0e5d7d; line-height: 1.6;"><strong>Follow up with ${contactInfo.name} within 24 hours.</strong></p>
                    <p style="margin: 8px 0 8px 20px; color: #0e5d7d;">✓ Send personalized email</p>
                    <p style="margin: 8px 0 8px 20px; color: #0e5d7d;">✓ Schedule discovery call</p>
                    <p style="margin: 8px 0 8px 20px; color: #0e5d7d;">✓ Prepare detailed proposal</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return { subject, html };
}