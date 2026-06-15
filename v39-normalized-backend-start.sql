-- AccessFlow v23 normalized RLS policy scaffold
-- Planning scaffold only. Snapshot sync remains active in v23.

-- Assumption:
-- Every normalized row is ultimately scoped to a profile owned by auth.uid().
-- In production, add workspace/team membership tables before shared staff access.

alter table public.accessflow_profiles enable row level security;
alter table public.accessflow_schedules enable row level security;
alter table public.accessflow_activities enable row level security;
alter table public.accessflow_steps enable row level security;
alter table public.accessflow_support_events enable row level security;
alter table public.accessflow_progress_goals enable row level security;
alter table public.accessflow_daily_notes enable row level security;
alter table public.accessflow_choice_board_items enable row level security;
alter table public.accessflow_visual_library_items enable row level security;

-- Direct profile ownership policy.
drop policy if exists accessflow_profiles_owner_all on public.accessflow_profiles;
create policy accessflow_profiles_owner_all
on public.accessflow_profiles
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Child table examples.
-- These depend on profile ownership through joins.
-- Repeat/update after final foreign-key model is chosen.

drop policy if exists accessflow_schedules_owner_all on public.accessflow_schedules;
create policy accessflow_schedules_owner_all
on public.accessflow_schedules
for all
to authenticated
using (
  exists (
    select 1
    from public.accessflow_profiles p
    where p.id = accessflow_schedules.profile_id
      and p.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.accessflow_profiles p
    where p.id = accessflow_schedules.profile_id
      and p.user_id = auth.uid()
  )
);

drop policy if exists accessflow_support_events_owner_all on public.accessflow_support_events;
create policy accessflow_support_events_owner_all
on public.accessflow_support_events
for all
to authenticated
using (
  exists (
    select 1
    from public.accessflow_profiles p
    where p.id = accessflow_support_events.profile_id
      and p.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.accessflow_profiles p
    where p.id = accessflow_support_events.profile_id
      and p.user_id = auth.uid()
  )
);

drop policy if exists accessflow_progress_goals_owner_all on public.accessflow_progress_goals;
create policy accessflow_progress_goals_owner_all
on public.accessflow_progress_goals
for all
to authenticated
using (
  exists (
    select 1
    from public.accessflow_profiles p
    where p.id = accessflow_progress_goals.profile_id
      and p.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.accessflow_profiles p
    where p.id = accessflow_progress_goals.profile_id
      and p.user_id = auth.uid()
  )
);

-- TODO before production:
-- 1. Add workspaces table.
-- 2. Add workspace_members table.
-- 3. Replace owner-only policies with role-aware workspace policies.
-- 4. Add audit log policies.
-- 5. Add storage bucket policies for uploaded visuals/photos.
