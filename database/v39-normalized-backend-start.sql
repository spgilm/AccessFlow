-- AccessFlow v39 normalized backend start scaffold
-- This is not the active data layer yet. Snapshot sync remains active.
-- Use this as a planning bridge for a future normalized Supabase migration.

create table if not exists public.accessflow_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.accessflow_support_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid references public.accessflow_profiles(id) on delete cascade,
  event_type text not null,
  event_label text not null,
  activity_label text,
  event_date date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.accessflow_goal_observations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid references public.accessflow_profiles(id) on delete cascade,
  goal_title text not null,
  observation text not null,
  prompt_level text,
  created_at timestamptz not null default now()
);

-- RLS must be completed before using these tables with real data.
alter table public.accessflow_profiles enable row level security;
alter table public.accessflow_support_events enable row level security;
alter table public.accessflow_goal_observations enable row level security;
