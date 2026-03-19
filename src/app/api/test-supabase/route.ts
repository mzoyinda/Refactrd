import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // Test query
    const { data, error } = await supabaseAdmin
      .from('pricing_calculator_leads')
      .select('count')
      .limit(1);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Supabase connected!' });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}