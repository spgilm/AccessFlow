# AccessFlow v23 Backend Migration Notes

v23 does not replace snapshot sync. It prepares for the next backend phase.

## Active implementation

```txt
public.accessflow_workspace_snapshots
```

## New migration helpers

```txt
src/utils/dataHealth.js
src/utils/normalizedExport.js
src/components/DataHealthPanel.jsx
src/components/BackendArchitecturePanel.jsx
database/v23-normalized-rls-policies.sql
```

## Recommended v24 backend work

1. Create workspace/team tables.
2. Create real role memberships.
3. Write migration from snapshot payload to normalized rows.
4. Add RLS policies for every normalized table.
5. Add audit event table.
6. Add remote storage for uploaded images.
7. Add conflict handling for offline/PWA sync.
8. Add integration tests for save/load/migration.
