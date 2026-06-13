# AccessFlow Architecture Overview

## Current architecture

AccessFlow is currently a React/Vite frontend prototype with optional Supabase snapshot sync.

```txt
React UI
  ↓
App.jsx state coordinator
  ↓
Profile/schedule/documentation data in localStorage
  ↓
Optional Supabase snapshot save/load
```

## Primary runtime modules

```txt
src/App.jsx
src/components/
src/data/
src/utils/
src/services/
src/hooks/
```

## Key state areas

```txt
profiles
selectedProfileId
templates
scheduleDate
documentationDate
mode
studentViewMode
session
syncMetadata
displaySettings
independenceSettings
supportEvents
progressGoals
visualLibrary
choiceBoardItems
```

## Current data persistence

- Browser localStorage is the primary client-side persistence layer.
- Supabase snapshot sync stores a full workspace payload.
- Normalized Supabase tables are scaffolded but are not yet active.

## Student-facing design principle

Student/client autonomy remains primary. Staff tooling should configure and support the student experience without making Student Mode visually overwhelming.

## Current architecture risks

- `App.jsx` is large and should be split into domain hooks.
- Snapshot sync is not sufficient for production audit trails.
- Uploaded images inside snapshots can become large.
- Role permissions are not enforced by a production backend.
- Offline/PWA behavior is app-shell level, not full offline-first sync.


## v27 refactor update

v27 extracts pure helper logic from `App.jsx` into utility modules. This does not complete the full architectural split, but it reduces coupling and makes the next hook-based refactor safer.

Extracted modules:

```txt
readAloudHelpers
cloudErrorHelpers
studentActionHelpers
dateCopyHelpers
staffExportHelpers
workspacePayloadHelpers
```


## v28 hook extraction update

v28 moves side effects into React hooks. The main app coordinator no longer directly owns theme sync, read-aloud event listeners, auth session subscription, legacy StudentView migration, or cloud dirty-state tracking.


## v29 action hook extraction update

v29 continues modularization by moving action-heavy handler groups into hooks.
`App.jsx` still coordinates app state, but more behavior now lives in domain modules.

## v30 architecture update

v30 changes `App.jsx` into a smaller application shell/coordinator. Most user-action logic now lives in hooks under `src/hooks/`.
