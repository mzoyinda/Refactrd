'use server';

import { CalculationResult } from '@/lib/pricingCalculation';
import { Currency } from '@/lib/currencyUtils';
import { storeLead, PricingLead } from '@/lib/supabase';
import { generateUserEmail, generateTeamEmail } from '@/lib/emailTemplates';
import { sendUserEstimateEmail, sendTeamNotificationEmail } from '@/lib/resend';

interface LeadSubmission {
  contactInfo: {
    name: string;
    email: string;
    company: string;
    phone: string;
  };
  result: CalculationResult;
  currency: Currency;
  completionTimeSeconds?: number;
}



export async function submitPricingCalculatorLead(data: LeadSubmission) {
  try {
    console.log('📝 Processing lead submission...');

    // 1. Prepare lead data for Supabase
    const leadData: PricingLead = {
      name: data.contactInfo.name,
      email: data.contactInfo.email,
      company: data.contactInfo.company,
      phone: data.contactInfo.phone,
      project_type: data.result.projectType,
      project_type_name: data.result.projectTypeName,
      project_details: data.result.projectDetails,
      project_details_name: data.result.projectDetailsName,
      estimated_min: data.result.estimatedRange.min,
      estimated_max: data.result.estimatedRange.max,
      selected_currency: data.currency,
      timeline: data.result.timeline,
      support_type: data.result.ongoingSupport?.type,
      support_monthly_cost: data.result.ongoingSupport?.monthlyCost,
      budget_range: data.result.budget,
      pain_points: data.result.painPoints,
      is_custom_quote: data.result.isCustomQuote,
      completion_time_seconds: data.completionTimeSeconds,
      status: 'new',
    };

    // 2. Store in Supabase
    console.log('💾 Storing lead in database...');
    const storeResult = await storeLead(leadData);

    if (!storeResult.success) {
      console.error('Failed to store lead:', storeResult.error);
      throw new Error('Failed to store lead in database');
    }

    console.log('✅ Lead stored successfully');

    // 3. Generate email content
    const emailData = {
      contactInfo: data.contactInfo,
      result: data.result,
      currency: data.currency,
    };

    const userEmail = generateUserEmail(emailData);
    const teamEmail = generateTeamEmail(emailData);

    // 4. Send user confirmation email
    console.log('📧 Sending user confirmation email...');
    const userEmailResult = await sendUserEstimateEmail(
      data.contactInfo.email,
      userEmail.subject,
      userEmail.html
    );

    if (!userEmailResult.success) {
      console.error('Failed to send user email:', userEmailResult.error);
      // Don't throw - we still want to send team notification
    } else {
      console.log('✅ User email sent successfully');
    }

    // 5. Send team notification email
    console.log('📧 Sending team notification email...');
    const teamEmailResult = await sendTeamNotificationEmail(
      teamEmail.subject,
      teamEmail.html
    );

    if (!teamEmailResult.success) {
      console.error('Failed to send team email:', teamEmailResult.error);
      // Don't throw - user email already sent
    } else {
      console.log('✅ Team notification sent successfully');
    }

    return {
      success: true,
      message: 'Lead submitted successfully',
      leadId: storeResult.data?.id,
    };
  } catch (error) {
    console.error('❌ Error in submitPricingCalculatorLead:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}