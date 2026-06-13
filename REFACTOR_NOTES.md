# AccessFlow v27 Refactor Notes

## Goal

v27 reduces `App.jsx` responsibility by moving pure helper logic into domain-specific utility modules.

## New utility modules

```txt
src/utils/readAloudHelpers.js
src/utils/cloudErrorHelpers.js
src/utils/studentActionHelpers.js
src/utils/dateCopyHelpers.js
src/utils/staffExportHelpers.js
src/utils/workspacePayloadHelpers.js
```

## What moved out of App.jsx

```txt
read-aloud emoji/visual cleanup
readable text extraction
browser speech helper
Supabase/cloud error formatting
student major-action confirmation helper
student audio feedback helper
tomorrow/weekday schedule date helpers
staff CSV export builders
single-profile export payload builder
workspace backup payload wrapper
```

## What stayed in App.jsx

`App.jsx` still owns application state and event handlers. It remains large, but v27 creates a safer foundation for future hook-based extraction.

## Recommended next refactor

Split `App.jsx` into domain hooks:

```txt
useProfiles
useScheduleActions
useStudentActions
useStaffExports
useCloudSync
useAuthSession
useWorkspaceDirtyState
```


## v28 hook extraction

v28 moves React side-effect logic from `App.jsx` into focused hooks.

New hook modules:

```txt
useThemeEffect
useReadAloudEffect
useLegacyStudentViewMigration
useSupabaseSessionEffect
useWorkspaceDirtyState
```

This makes `App.jsx` smaller and reduces the number of unrelated responsibilities in the main application coordinator.


## v29 action hook extraction

v29 moves action-heavy handler groups from `App.jsx` into focused hooks:
schedule copy actions, staff exports, progress goals, visual library actions,
and support/reinforcement/regulation/session-note actions.

## v30 final cleanup pass

v30 completes the current code cleanup phase by extracting the remaining action-heavy handlers into domain hooks. `App.jsx` no longer declares named `handle*` functions.
