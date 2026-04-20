import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient() {
  // Return existing instance if already created (singleton pattern)
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
  }

  // Create and store the instance
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  
  return supabaseInstance;
}

// Export a singleton instance for direct use
// This will be created on first import
export const supabase = getSupabaseClient();