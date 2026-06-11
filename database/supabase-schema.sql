-- AccessFlow v10 Supabase auth-scoped prototype schema
--
-- This schema supports manual cloud snapshots from the static frontend.
-- Each authenticated user can only access their own snapshots via RLS.
--
-- This is still a prototype. Production should use normalized tables and
-- organization-scoped permissions.

create extension if not exists pgcrypto;

create table if not exists public.accessflow_workspace_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  workspace_label text not null default 'prototype',
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.accessflow_workspace_snapshots
  add column if not exists user_id uuid references auth.users(id) on delete cascade;

alter table public.accessflow_workspace_snapshots
  alter column user_id set default auth.uid();

update public.accessflow_workspace_snapshots
set user_id = auth.uid()
where user_id is null and auth.uid() is not null;

create index if not exists accessflow_workspace_snapshots_user_label_updated_idx
  on public.accessflow_workspace_snapshots (user_id, workspace_label, updated_at desc);

create or replace function public.set_accessflow_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_accessflow_workspace_snapshots_updated_at
  on public.accessflow_workspace_snapshots;

create trigger set_accessflow_workspace_snapshots_updated_at
before update on public.accessflow_workspace_snapshots
for each row execute function public.set_accessflow_updated_at();

alter table public.accessflow_workspace_snapshots enable row level security;

-- Remove older prototype anon policies from v7 if they exist.
drop policy if exists "prototype_read_accessflow_snapshots"
  on public.accessflow_workspace_snapshots;

drop policy if exists "prototype_insert_accessflow_snapshots"
  on public.accessflow_workspace_snapshots;

drop policy if exists "prototype_update_accessflow_snapshots"
  on public.accessflow_workspace_snapshots;

drop policy if exists "prototype_delete_accessflow_snapshots"
  on public.accessflow_workspace_snapshots;

-- Explicit API grants for signed-in users.
-- RLS policies below still restrict users to their own rows.
grant usage on schema public to authenticated;
grant select, insert, update, delete
on table public.accessflow_workspace_snapshots
to authenticated;

-- Authenticated user-scoped policies.
drop policy if exists "users_read_own_accessflow_snapshots"
  on public.accessflow_workspace_snapshots;

drop policy if exists "users_insert_own_accessflow_snapshots"
  on public.accessflow_workspace_snapshots;

drop policy if exists "users_update_own_accessflow_snapshots"
  on public.accessflow_workspace_snapshots;

drop policy if exists "users_delete_own_accessflow_snapshots"
  on public.accessflow_workspace_snapshots;

create policy "users_read_own_accessflow_snapshots"
on public.accessflow_workspace_snapshots
for select
to authenticated
using (auth.uid() = user_id);

create policy "users_insert_own_accessflow_snapshots"
on public.accessflow_workspace_snapshots
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "users_update_own_accessflow_snapshots"
on public.accessflow_workspace_snapshots
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users_delete_own_accessflow_snapshots"
on public.accessflow_workspace_snapshots
for delete
to authenticated
using (auth.uid() = user_id);

-- Optional hardening after migrating old v7 data:
-- alter table public.accessflow_workspace_snapshots
--   alter column user_id set not null;
