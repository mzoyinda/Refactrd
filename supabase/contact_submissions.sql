-- Contact form submissions (src/app/api/contact/route.ts)
-- Run once in the Supabase SQL editor.

create table if not exists public.contact_submissions (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  name            text not null,
  company         text not null,
  email           text not null,
  role            text not null,
  service         text,
  challenge       text not null,
  success_outcome text not null,
  timeline        text,
  source          text default 'contact_page',
  status          text not null default 'new'
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_email_idx
  on public.contact_submissions (email);

-- The API route writes with the service key, which bypasses RLS.
-- Enabling RLS with no permissive policy keeps the anon key locked out.
alter table public.contact_submissions enable row level security;
