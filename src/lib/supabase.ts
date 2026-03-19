import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with service key for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Type for the lead data
export interface PricingLead {
  name: string;
  email: string;
  company: string;
  phone: string;
  project_type: string;
  project_type_name: string;
  project_details?: string;
  project_details_name?: string;
  estimated_min: number;
  estimated_max: number;
  selected_currency: string;
  timeline?: string;
  support_type?: string;
  support_monthly_cost?: number;
  budget_range?: string;
  pain_points?: string[];
  is_custom_quote: boolean;
  completion_time_seconds?: number;
  status?: string;
}

export async function storeLead(leadData: PricingLead) {
  try {
    const { data, error } = await supabaseAdmin
      .from('pricing_calculator_leads')
      .insert([leadData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error storing lead:', error);
    return { success: false, error };
  }
}

export async function updateLeadStatus(
  leadId: string,
  status: string,
  notes?: string
) {
  try {
    const updateData: any = { status };
    if (notes) updateData.notes = notes;

    const { data, error } = await supabaseAdmin
      .from('pricing_calculator_leads')
      .update(updateData)
      .eq('id', leadId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error updating lead status:', error);
    return { success: false, error };
  }
}