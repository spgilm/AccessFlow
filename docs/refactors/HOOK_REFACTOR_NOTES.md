# AccessFlow v28 Hook Refactor Notes

## Goal

v28 moves React side-effect logic out of `App.jsx` and into focused hooks.

## New hooks

```txt
src/hooks/useThemeEffect.js
src/hooks/useReadAloudEffect.js
src/hooks/useLegacyStudentViewMigration.js
src/hooks/useSupabaseSessionEffect.js
src/hooks/useWorkspaceDirtyState.js
```

## What moved out of App.jsx

```txt
document theme synchronization
read-aloud click listener
old studentViewMode migration
Supabase current-session loading
Supabase auth-change subscription
workspace dirty-state refs/effect
unsaved-cloud-change reminder state
```

## Result

```txt
App.jsx v26: 1742 lines
App.jsx v27: 1608 lines
App.jsx v28: 1521 lines
```

## Why this matters

App.jsx now focuses more on state coordination and handler wiring. Side effects are isolated and testable by domain.

## Next recommended refactor

Extract handler-heavy logic into domain hooks:

```txt
useProfileActions
useScheduleActions
useStudentActions
useStaffExports
useCloudSnapshotActions
```

## v30 hook completion update

v30 adds the final set of action-domain hooks and completes the current hook refactor phase.
