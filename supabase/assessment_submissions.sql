-- AI Opportunity Assessment submissions (src/app/api/assess/*)
-- Run once in the Supabase SQL editor.

create table if not exists public.assessment_submissions (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  name         text not null,
  email        text not null,
  industry     text not null,
  company_size text not null,

  step1_goal           text[] not null,
  step1_other          text,
  step2_workflow       text not null,
  step2_other          text,
  step3_friction       text[] not null,
  step3_other          text,
  step4_frequency      text not null,
  step4_other          text,
  step5_human_role     text[] not null,
  step5_other          text,
  step6_existing_ai_use text not null,
  step6_other          text,
  step7_timeline       text not null,
  step7_other          text,

  outcome              text not null,
  report_what_we_heard text,
  report_opportunity   text,
  report_method        text not null,

  pdf_downloaded        boolean default false,
  email_sent            boolean default false,
  booked                boolean default false,
  booked_at             timestamptz,
  sequence_stage        int default 0,
  last_sequence_sent_at timestamptz
);

create index if not exists assessment_submissions_created_at_idx
  on public.assessment_submissions (created_at desc);

-- The booking webhook matches on email, newest run first.
create index if not exists assessment_submissions_email_created_idx
  on public.assessment_submissions (email, created_at desc);

create index if not exists assessment_submissions_outcome_idx
  on public.assessment_submissions (outcome);

-- Deliberately NO check constraint on `outcome`.
-- A CHECK on diagnostic_submissions.type is what silently broke the contact
-- form: a value the app sends but the constraint rejects fails the whole
-- insert. Outcomes are graded in application code (src/lib/assessment/grading.ts)
-- and the row is written before grading runs, using the sentinel 'PENDING'.

-- Routes use the service key, which bypasses RLS. Enabling RLS with no
-- permissive policy keeps the anon key locked out.
alter table public.assessment_submissions enable row level security;
