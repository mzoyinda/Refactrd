import { createClient } from '@supabase/supabase-js';

const cmsUrl = process.env.NEXT_PUBLIC_CMS_SUPABASE_URL;
const cmsKey = process.env.NEXT_PUBLIC_CMS_SUPABASE_ANON_KEY;

if (!cmsUrl || !cmsKey) {
  throw new Error('Missing CMS Supabase environment variables. Add NEXT_PUBLIC_CMS_SUPABASE_URL and NEXT_PUBLIC_CMS_SUPABASE_ANON_KEY to your .env.local');
}

export const cmsSupabase = createClient(cmsUrl, cmsKey);