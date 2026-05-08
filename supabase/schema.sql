create extension if not exists "pgcrypto";

create table if not exists public.briefings (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  sections jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.briefings enable row level security;

create policy "Server role can manage briefings"
on public.briefings
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create index if not exists briefings_created_at_idx
on public.briefings (created_at desc);
