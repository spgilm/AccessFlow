-- AccessFlow v56.1 shared staff workspace snapshot policies
--
-- Prototype purpose:
-- Allow all signed-in staff using the same AccessFlow Supabase project and
-- workspace_label to load the latest shared workspace snapshot.
--
-- IMPORTANT:
-- This is still not a production HIPAA/FERPA data model. Production should use
-- organizations, workspace_members, explicit roles, audit logging, and normalized tables.

alter table public.accessflow_workspace_snapshots enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete
on table public.accessflow_workspace_snapshots
to authenticated;

-- Remove older user-only snapshot policies so staff can read shared snapshots.
drop policy if exists "users_read_own_accessflow_snapshots"
  on public.accessflow_workspace_snapshots;

drop policy if exists "users_insert_own_accessflow_snapshots"
  on public.accessflow_workspace_snapshots;

drop policy if exists "users_update_own_accessflow_snapshots"
  on public.accessflow_workspace_snapshots;

drop policy if exists "users_delete_own_accessflow_snapshots"
  on public.accessflow_workspace_snapshots;

drop policy if exists "staff_read_shared_accessflow_workspace_snapshots"
  on public.accessflow_workspace_snapshots;

drop policy if exists "staff_insert_shared_accessflow_workspace_snapshots"
  on public.accessflow_workspace_snapshots;

drop policy if exists "staff_update_own_accessflow_workspace_snapshots"
  on public.accessflow_workspace_snapshots;

drop policy if exists "staff_delete_own_accessflow_workspace_snapshots"
  on public.accessflow_workspace_snapshots;

-- Any authenticated staff account in this prototype can read shared workspace snapshots.
-- The app still filters by workspace_label.
create policy "staff_read_shared_accessflow_workspace_snapshots"
on public.accessflow_workspace_snapshots
for select
to authenticated
using (workspace_label is not null);

-- Staff can save snapshots under their own auth.uid().
create policy "staff_insert_shared_accessflow_workspace_snapshots"
on public.accessflow_workspace_snapshots
for insert
to authenticated
with check (auth.uid() = user_id and workspace_label is not null);

-- Keep update/delete owner-scoped. The app normally inserts new snapshots instead.
create policy "staff_update_own_accessflow_workspace_snapshots"
on public.accessflow_workspace_snapshots
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id and workspace_label is not null);

create policy "staff_delete_own_accessflow_workspace_snapshots"
on public.accessflow_workspace_snapshots
for delete
to authenticated
using (auth.uid() = user_id);
