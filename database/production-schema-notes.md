# AccessFlow production schema direction

The v10 SQL file uses an authenticated snapshot table:

```txt
accessflow_workspace_snapshots
```

This is a safer prototype than v7 because rows are scoped to the signed-in user through Supabase Auth and RLS. The v10 schema also includes explicit grants for the authenticated role so browser saves work through the Supabase Data API.

It is still not the final production schema.

## Production tables

A production AccessFlow backend should likely use:

```txt
organizations
users
organization_members
roles
profiles
profile_support_notes
schedules
activities
activity_steps
templates
template_activities
template_steps
daily_notes
completion_events
visual_assets
audit_log
```

## Key production requirements

- Organization-scoped row-level security.
- Authenticated staff accounts.
- Role separation for admin/staff/student-facing access.
- Object storage for uploaded images.
- Audit trail for documentation changes.
- Separate completion events from editable schedule templates.
- Explicit backup/export policies.
- Data retention controls.
- No public anon write policies for real student/client data.

## Suggested migration path

1. Use v10 user-scoped snapshots for development.
2. Add organization accounts.
3. Add staff roles.
4. Move profiles and templates from JSON snapshots into normalized tables.
5. Move uploaded images from localStorage data URLs into Supabase Storage.
6. Replace manual sync with automatic load/save through a data provider.
7. Add audit logging for documentation changes.
