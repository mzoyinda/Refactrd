import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Keep-alive only works if the function actually runs on every request —
// a cached response would never reach Supabase.
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Website Supabase
const websiteDb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// CMS Supabase
const cmsDb = createClient(
  process.env.NEXT_PUBLIC_CMS_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_CMS_SUPABASE_ANON_KEY!
);

export async function GET() {
  const results = { website: false, cms: false, timestamp: new Date().toISOString() };

  try {
    const { error } = await websiteDb.from("brief_submissions").select("id").limit(1);
    results.website = !error;
  } catch {
    results.website = false;
  }

  try {
    const { error } = await cmsDb.from("blogs").select("id").limit(1);
    results.cms = !error;
  } catch {
    results.cms = false;
  }

  const allOk = results.website && results.cms;

  return NextResponse.json(results, { status: allOk ? 200 : 500 });
}