-- AccessFlow v20 normalized schema scaffold
-- This is a planning scaffold. The app still uses snapshot sync in this release.

create table if not exists public.accessflow_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.accessflow_schedules (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.accessflow_profiles(id) on delete cascade,
  schedule_date date not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.accessflow_activities (
  id uuid primary key default gen_random_uuid(),
  schedule_id uuid references public.accessflow_schedules(id) on delete cascade,
  label text not null,
  visual jsonb,
  completed boolean default false,
  sort_order integer default 0
);

create table if not exists public.accessflow_steps (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid references public.accessflow_activities(id) on delete cascade,
  label text not null,
  visual jsonb,
  completed boolean default false,
  prompt_level text,
  sort_order integer default 0
);

create table if not exists public.accessflow_support_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.accessflow_profiles(id) on delete cascade,
  event_date date not null,
  type text,
  label text,
  activity_label text,
  created_at timestamptz default now()
);

create table if not exists public.accessflow_progress_goals (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.accessflow_profiles(id) on delete cascade,
  title text not null,
  linked_activity_name text,
  target_days integer default 0,
  target_percent integer default 0,
  notes text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.accessflow_daily_notes (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.accessflow_profiles(id) on delete cascade,
  note_date date not null,
  prompt_level text,
  engagement text,
  observation text,
  support_strategies text,
  next_steps text,
  updated_at timestamptz default now()
);

create table if not exists public.accessflow_choice_board_items (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.accessflow_profiles(id) on delete cascade,
  label text not null,
  phrase_text text,
  category text,
  visual jsonb,
  sort_order integer default 0
);

create table if not exists public.accessflow_visual_library_items (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.accessflow_profiles(id) on delete cascade,
  label text not null,
  category text,
  visual jsonb,
  created_at timestamptz default now()
);
