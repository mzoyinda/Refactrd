-- Assessment v2: adds the "what could be" section and the meeting-request flow.
-- Additive only, safe to run on the existing table with data in it.
-- Run once in the Supabase SQL editor.

alter table public.assessment_submissions
  -- Third Claude-generated section: a concrete picture of the future state.
  add column if not exists report_future_state text,
  -- Services recommended for this submission, e.g. {workflow,knowledge}.
  add column if not exists recommended_services text[],

  -- Meeting request (replaces the old "email me a copy" action).
  add column if not exists meeting_requested boolean default false,
  add column if not exists meeting_requested_at timestamptz,
  add column if not exists meeting_note text;

create index if not exists assessment_submissions_meeting_idx
  on public.assessment_submissions (meeting_requested, meeting_requested_at desc);
