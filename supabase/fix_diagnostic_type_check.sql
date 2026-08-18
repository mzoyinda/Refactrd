-- Fix: diagnostic_submissions_type_check rejects type = 'contact'.
--
-- The constraint currently allows only ('mini','enterprise','build-implement').
-- Any insert with type='contact' fails with SQLSTATE 23514, which
-- /api/submit-diagnostic reports as a generic 500 "Failed to save submission".
--
-- Run once in the Supabase SQL editor.

alter table public.diagnostic_submissions
  drop constraint if exists diagnostic_submissions_type_check;

alter table public.diagnostic_submissions
  add constraint diagnostic_submissions_type_check
  check (type in ('mini', 'enterprise', 'build-implement', 'contact'));

-- Verify:
--   select conname, pg_get_constraintdef(oid)
--   from pg_constraint
--   where conrelid = 'public.diagnostic_submissions'::regclass;
