# AccessFlow v20 Normalized Supabase Plan

v20 keeps snapshot sync as the active implementation but adds a normalized schema scaffold.

## Why not migrate fully in one patch?

Snapshot sync is safer for the prototype. A full migration requires:
- conflict handling
- row-level security policies for every table
- import/export migration
- multi-user permissions
- audit history
- partial sync and retry behavior

## Scaffold file

See:

```txt
database/v20-normalized-schema.sql
```

## Intended production entities

```txt
profiles
schedules
activities
steps
support_events
progress_goals
daily_notes
choice_board_items
visual_library_items
```

## Recommended next backend milestone

Build a migration layer that reads the current snapshot payload and writes normalized rows.


## v23 additions

v23 adds:

```txt
src/utils/normalizedExport.js
src/utils/dataHealth.js
src/components/DataHealthPanel.jsx
src/components/BackendArchitecturePanel.jsx
database/v23-normalized-rls-policies.sql
BACKEND_MIGRATION_NOTES.md
```

These help inspect prototype data and prepare for normalized backend migration.
