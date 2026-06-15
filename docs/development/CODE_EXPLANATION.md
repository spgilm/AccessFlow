# AccessFlow Code Explanation Cheat Sheet

This document explains where the major AccessFlow features live in the codebase. It is written as a developer-facing map so you can quickly find the file or function responsible for a feature.

## High-level architecture

AccessFlow is a Vite + React single-page app. Most state is stored in `src/App.jsx` and persisted with `useLocalStorage`. Supabase is optional and used for authentication and cloud snapshots when configured.

```txt
src/App.jsx
  global state
  selected profile
  selected schedule date
  selected activity
  auth/session state
  cloud sync handlers
  all major data mutation handlers

src/components/
  student-facing UI
  staff-facing UI
  panels, editors, cards, buttons

src/data/
  starter data and default settings

src/services/
  Supabase and task-generation services

src/utils/
  cloning, imports, exports, documentation summaries, date-schedule helpers
```

## Core application state

### `src/App.jsx`

`App` is the main coordinator. It owns the state that most components read or change.

Important state:

| State | Purpose |
|---|---|
| `profiles` | All student/client profiles. |
| `selectedProfileId` | Which profile is active. |
| `templates` | Saved reusable schedule templates. |
| `mode` | `student` or `staff`. |
| `theme` | `light` or `dark`. |
| `textToSpeechEnabled` | Whether tapping text reads it aloud. |
| `documentationDate` | Date used for daily documentation. |
| `scheduleDate` | Date used for the active visual schedule. |
| `selectedActivityId` | Which activity is open/selected. |
| `session` | Supabase signed-in user session. |
| `syncMetadata` | Last cloud save/load information. |

Important handlers:

| Function | Feature |
|---|---|
| `updateSelectedProfile` | Updates the current profile. Many other handlers use this. |
| `updateSelectedProfileActivities` | Updates the selected date's schedule using `updateProfileScheduleForDate`. |
| `handleStudentAddActivity` | Adds a bank/custom activity from Student Mode. Custom activities are marked `pendingReview`. |
| `handleStudentClearSchedule` | Lets the student clear the selected date if staff enabled that permission. |
| `handleScheduleDateChange` | Changes the active schedule date and aligns documentation date to it. |
| `handleApplyDailyTemplate` | Generates a full selected-date schedule from a routine template. |
| `recordSupportEvent` | Logs student support/choice-board events into `profile.supportEvents`. |
| `handleUpdateStepPrompt` | Saves step-level support/prompt data. |
| `handleSaveActivityToBank` | Saves a scheduled activity into the reusable Student Choices bank. |
| `handleDismissReview` | Removes a student-created task from the staff review queue. |
| `handleUpdateFirstThenBoard` | Stores staff's selected first/then choices. |
| `handleAddFirstThenToSchedule` | Adds first/then choices to the selected date's schedule. |
| `handleGoogleSignIn` | Starts Supabase Google OAuth if enabled by env var. |
| `handleSaveCloudSnapshot` | Saves local workspace data to Supabase. |
| `handleLoadCloudSnapshot` | Loads latest Supabase workspace snapshot. |

## Student Mode

### `src/components/StudentView.jsx`

Student Mode is split into focused tabs:

| Tab | Component/Feature |
|---|---|
| Today | Current schedule, Now/Next, support buttons, break plan, task cards. |
| Choose | `StudentChoiceBank` approved activity choices. |
| Make | `StudentMakeActivity` student-created task builder. |
| Board | `StudentChoiceBoard` quick communication board. |

The goal is “one screen = one job.”

### `src/components/StudentSupportPanel.jsx`

Implements student support request buttons:

```txt
Help
Break
Confused
Too hard
Too loud
Upset
```

When tapped, each calls `onSupportRequest`, which is `recordSupportEvent` in `App.jsx`.

### `src/components/StudentBreakPlan.jsx`

Implements the structured break workflow:

```txt
Choose break type
Choose duration
Start break
Timer
Return to schedule
```

It stays collapsed by default to keep Student Mode visually clean.

### `src/components/StudentChoiceBoard.jsx`

Implements quick communication choices:

```txt
Help
Break
Drink
Snack
Bathroom
Quiet
Music
Walk
```

Also displays up to eight approved activity-bank items.

### `src/components/StudentChoiceBank.jsx`

Shows approved staff-created choices from the selected profile's `activityBank`.

Includes category filtering:

```txt
All
Morning
Hygiene
Food
School
Work
Leisure
Breaks
Chores
Community
```

### `src/components/StudentMakeActivity.jsx`

Lets the student create a custom activity and custom smaller steps.

Features:

- activity name input
- step builder
- microphone dictation buttons
- sends custom steps to `generateActivityFromTask`
- marks the resulting activity for staff review in `handleStudentAddActivity`

### `src/components/ActivityCard.jsx`

Displays one activity on the student schedule.

Features:

- tappable emoji/icon picker
- done/undo button
- completed activities temporarily show ✅
- optional activity timer via `TimerButton`

### `src/components/StudentInlineSteps.jsx`

Displays smaller task-analysis steps under an activity.

Features:

- step completion
- completed steps temporarily show ✅
- step-level support/prompt tracking
- optional step timers
- optional step numbers
- display controlled by profile display settings

### `src/components/TimerButton.jsx`

Reusable countdown timer. It is local-only; it does not persist timer progress to storage.

Used by:

- activity cards
- steps
- break plan

## Staff Mode

### `src/components/StaffView.jsx`

Staff Mode is split into focused tabs:

| Tab | Purpose |
|---|---|
| Setup | Guided first-run setup. |
| Students | Profile, independence settings, display settings, templates. |
| Choices | Student Choices bank and First/Then builder. |
| Schedule | Selected-date schedule, daily templates, review queue, activity editor. |
| Notes | Daily note, support event log, generated documentation. |
| Save | Staff sign-in, cloud sync, import/export, reset tools. |

### `src/components/StaffSetupWizard.jsx`

Guided setup for new staff:

```txt
1. Profile
2. Display complexity
3. Add first choices
4. Build selected-date schedule
5. Test Student Mode
```

Complexity presets:

- Simple
- Standard
- Advanced

### `src/components/ProfileManager.jsx`

Handles profile selection and profile editing.

Includes:

- profile name
- support notes
- student independence settings
- student display settings

Student independence settings control what the student can do.

Student display settings control how much the student sees.

### `src/components/StaffChoiceBankPanel.jsx`

Handles the reusable Student Choices bank.

Features:

- create choice card
- edit choice name
- edit category
- edit timer
- edit smaller steps
- add choice to today's/selected-date schedule
- remove choice

### `src/components/FirstThenBoardManager.jsx`

Staff chooses one “First” choice and one “Then” choice from the activity bank, then adds both to the selected date's schedule.

### `src/components/DailyTemplateButtons.jsx`

Provides quick schedule starters:

- Morning Routine
- School Day
- Vocational Day
- Community Trip
- Evening Routine

The handler in `App.jsx` is `handleApplyDailyTemplate`.

### `src/components/ReviewQueuePanel.jsx`

Shows student-created custom activities where `activity.pendingReview === true`.

Staff options:

- Edit
- Save to Choices
- Dismiss

### `src/components/StaffActivityEditor.jsx`

Staff edits selected scheduled activity.

Features:

- activity label
- activity timer
- activity visual/photo
- summary
- step label
- step timer
- step visual/photo
- add/delete/reorder steps
- save scheduled activity to Student Choices

### `src/components/DocumentationPanel.jsx`

Generates staff documentation.

Inputs:

- prompt level
- engagement
- observation
- support strategies
- next steps

Outputs:

- completion stats
- activity breakdown
- support event list
- generated copy-ready note
- `.txt` download
- `.csv` download

### `src/components/EventLogPanel.jsx`

Displays support/choice events recorded from Student Mode.

## Auth and cloud sync

### `src/services/supabaseWorkspace.js`

Handles:

- Supabase client creation
- email/password sign-up
- email/password sign-in
- optional Google OAuth sign-in
- sign-out
- save workspace snapshot
- load latest workspace snapshot

### Google OAuth flag

Google OAuth is hidden unless this environment variable is set:

```txt
VITE_ENABLE_GOOGLE_AUTH=true
```

Default in `.env.example` is:

```txt
VITE_ENABLE_GOOGLE_AUTH=false
```

This prevents testers from seeing a Google button before the Google Cloud OAuth setup is complete.

## Date-based schedules

### `src/utils/scheduleDateHelpers.js`

v15 adds date-based schedule storage.

Important functions:

| Function | Purpose |
|---|---|
| `getScheduleForDate(profile, dateKey)` | Returns schedule for selected date, falling back to legacy `profile.activities`. |
| `updateProfileScheduleForDate(profile, dateKey, updater)` | Updates the selected date's schedule and keeps `profile.activities` synced for backward compatibility. |
| `normalizeSchedulesByDate(profile)` | Ensures imported profiles have a valid `schedulesByDate` object. |

## Documentation helpers

### `src/utils/documentationHelpers.js`

Important functions:

| Function | Purpose |
|---|---|
| `getTodayDateKey` | Returns today's date as `YYYY-MM-DD`. |
| `createBlankDailyNote` | Creates an empty documentation object. |
| `getDailyNote` | Gets existing note or a blank note for a date. |
| `getCompletionStats` | Counts activity and step completion. |
| `buildActivityBreakdown` | Builds activity-level documentation summary. |
| `buildDailyProgressNote` | Builds the full copy-ready daily note. |

## Export/import

### `src/utils/exportHelpers.js`

Handles:

- backup payload creation
- JSON validation
- safe filenames
- downloading text/CSV/JSON files
- activity CSV generation

### `src/utils/importHelpers.js`

Normalizes imported profiles and templates.

Important because older backups may not include newer fields like:

```txt
supportEvents
schedulesByDate
firstThenBoard
displaySettings
```

## Visual supports

### `src/components/EmojiPickerButton.jsx`

Tappable emoji picker used for activity and step visuals.

### `src/components/VisualEditor.jsx`

Staff-side visual editor.

Supports:

- emoji visual
- uploaded image
- phone camera capture on compatible mobile browsers

### `src/components/VisualSupport.jsx`

Renders either emoji or image visuals in a consistent box.

## Design principles used in v15

```txt
Student side:
one screen = one job
large touch targets
visual-first cards
staff tools hidden from student workflow
break/support tools visible but not overwhelming

Staff side:
guided setup first
advanced tools separated by tabs
schedule/date/template tools grouped together
documentation and data separated from student schedule use
```

## Current prototype limitations

- Timers are local UI timers and do not persist when the page reloads.
- Google OAuth requires external Google Cloud setup and is hidden by default.
- Date-based schedules are implemented at the profile data level, but recurring schedules are not fully automated yet.
- Reports are still basic text/CSV outputs, not charts.
- The app is not yet a full PWA/offline installable app.


## v15.1 read-aloud clarification

The global read-aloud feature lives in `src/App.jsx`.

The `getReadableText` helper now:

```txt
1. Finds the nearest useful interactive/text element.
2. Clones that element.
3. Removes visual-only nodes such as emoji/icon containers.
4. Strips remaining emoji characters.
5. Speaks the resulting label text.
```

This prevents visual icons from being read aloud when the user taps an emoji card. The intended spoken output is the meaningful label, not the decorative visual.


## v15.2 Break Plan timer clarification

`StudentBreakPlan.jsx` now owns a `timerStartSignal` counter.

When the student taps **Start break**:

```txt
1. the break event is logged for staff documentation
2. timerStartSignal increments
3. TimerButton receives the new startSignal
4. TimerButton resets to the selected duration and starts running
```

`TimerButton.jsx` still works as a normal tappable timer for pause/resume, but it can now also be started from a parent component.


## v15.3 Student tab layout clarification

The student workflow tabs are styled in `src/styles.css`.

The v15.3 patch forces `.student-flow .workflow-tabs` to use:

```css
grid-template-columns: repeat(2, minmax(0, 1fr));
```

on mobile so the four student tabs appear as a balanced 2×2 grid.

## v15.4 Board clarification

The Student Mode `Board` tab is a communication board, not a schedule builder.

Files:

| File | Purpose |
|---|---|
| `src/data/choiceBoardItems.js` | Default communication board buttons and helper functions. |
| `src/components/StudentChoiceBoard.jsx` | Student-facing Board tab. Tapping a board button logs an event. |
| `src/components/StaffChoiceBoardManager.jsx` | Staff-facing editor for Board buttons. |
| `src/App.jsx` | Owns `choiceBoardItems` and handlers for add/update/delete/reset. |
| `src/components/StudentView.jsx` | Renders the Board tab panel when `activeStudentTab === "board"`. |

Conceptual difference:

```txt
Board button -> "I want/need this" event
Choose activity -> adds activity to schedule
Make activity -> creates new schedule activity for staff review
```


## v16 Student accessibility refinement

v16 makes Student Mode profile-driven rather than one-size-fits-all.

### Main files

| File | Purpose |
|---|---|
| `src/data/displaySettings.js` | Defines student accessibility/display defaults and helper functions. |
| `src/components/ProfileManager.jsx` | Staff UI for selecting Simple/Standard/Advanced, Board-only, First/Then-only, touch size, text/visual display, reduce motion, confirmations, and audio feedback. |
| `src/components/StudentView.jsx` | Applies the profile settings to the Student Mode workflow and root CSS classes. |
| `src/components/ActivityCard.jsx` | Uses display settings to show/hide visuals and text on activity cards. |
| `src/components/StudentChoiceBoard.jsx` | Uses display settings for icons/words behavior on the communication board. |
| `src/components/StudentChoiceBank.jsx` | Uses display settings for icons/words behavior on approved choices. |
| `src/App.jsx` | Implements confirmation and audio-feedback helpers for major student actions. |
| `src/styles.css` | Defines touch-size, board-only, first/then-only, simple mode, words-only, icons-only, and reduce-motion styling. |

### Important display settings

```txt
interfaceLevel:
simple | standard | advanced

studentModeLayout:
tabs | boardOnly | firstThenOnly

touchSize:
standard | large | extraLarge

textDisplay:
iconsAndWords | iconsOnly | wordsOnly
```

### Helper functions in `displaySettings.js`

| Function | Purpose |
|---|---|
| `getDisplaySettings(profile)` | Merges profile settings with defaults. |
| `resolveStudentTabs(displaySettings)` | Decides which Student Mode tabs should exist. |
| `resolveInitialStudentTab(displaySettings)` | Chooses the starting tab for Student Mode. |
| `shouldShowText(displaySettings)` | Returns whether student-facing text labels should be visible. |
| `shouldShowVisuals(displaySettings)` | Returns whether student-facing visuals/icons should be visible. |

### Confirmation and audio feedback

`App.jsx` now includes:

```txt
confirmMajorStudentAction(message)
playStudentAudioFeedback(message)
```

These are used by student-facing completion/removal/clear actions when the selected profile enables them.


## v17 AAC / Communication Board expansion

v17 changes the Student Mode Board from simple request buttons into a lightweight AAC-style communication board.

### Main files

| File | Purpose |
|---|---|
| `src/data/choiceBoardItems.js` | Defines Board categories, expanded default vocabulary, spoken phrase text, and Board item helpers. |
| `src/components/StudentChoiceBoard.jsx` | Renders category pages, sentence strip, Say message, Backspace, and Clear controls. |
| `src/components/StaffChoiceBoardManager.jsx` | Lets staff edit the visible label and spoken phrase separately. |
| `src/App.jsx` | Preserves `phraseText` when staff add custom Board buttons. |
| `src/styles.css` | Styles the AAC sentence strip, category tabs, and expanded Board manager. |

### Board vs Choose

```txt
Board:
Builds and speaks communication messages.

Choose:
Adds approved activities to the schedule.
```

### Board item fields

```txt
label:
Visible text on the button.

phraseText:
Text added to the sentence strip and spoken aloud.

category:
Which Board page the button appears on.

visual:
Emoji or image visual.
```

### Student message flow

```txt
1. Student opens Board.
2. Student selects a category page.
3. Student taps one or more buttons.
4. Each button adds phraseText to the sentence strip.
5. Student taps Say message.
6. AccessFlow speaks the full message and logs it for staff.
```


## v18 Visual / Photo Library

v18 adds a profile-level reusable visual library.

### Main files

| File | Purpose |
|---|---|
| `src/data/visualLibrary.js` | Defines visual categories, default visual library items, and helper functions. |
| `src/components/StaffVisualLibraryPanel.jsx` | Staff-facing visual library manager in Staff Mode → Choices. |
| `src/components/VisualEditor.jsx` | Reuses saved visuals and saves current visuals to the library. |
| `src/components/StaffActivityEditor.jsx` | Passes the profile visual library into activity and step visual editors. |
| `src/App.jsx` | Owns visual library handlers: add, update, delete, reset. |
| `src/data/starterProfiles.js` | Adds default visual library to new profiles. |
| `src/utils/importHelpers.js` | Adds visual library defaults to imported/older backups. |

### Data shape

```txt
profile.visualLibrary = [
  {
    id,
    label,
    category,
    visual,
    createdAt
  }
]
```

### Visual library workflow

```txt
1. Staff saves a reusable visual in StaffVisualLibraryPanel.
2. The visual is stored on the selected profile.
3. VisualEditor receives visualLibrary from StaffActivityEditor.
4. Staff can apply a saved visual to an activity or step.
5. Staff can save the current activity/step visual into the library.
```

### Current limitation

The visual library is profile-specific and local/cloud-snapshot based. There is not yet a global cross-profile visual library or remote image storage service.


## v19 Goal Tracking + Progress Dashboard

v19 adds profile-level goals and weekly progress reporting.

### Main files

| File | Purpose |
|---|---|
| `src/data/progressGoals.js` | Creates and normalizes progress goal data. |
| `src/utils/progressDashboard.js` | Builds weekly summary data and copy-ready reports. |
| `src/components/StaffGoalPanel.jsx` | Staff-facing goal manager. |
| `src/components/WeeklyProgressPanel.jsx` | Staff-facing weekly progress dashboard. |
| `src/App.jsx` | Owns goal handlers and weekly report download. |
| `src/components/StaffView.jsx` | Renders goal and weekly dashboard panels in Staff Mode → Notes. |
| `src/data/starterProfiles.js` | Adds `progressGoals` to new profiles. |
| `src/utils/importHelpers.js` | Adds `progressGoals` defaults to older/imported backups. |

### Goal data shape

```txt
profile.progressGoals = [
  {
    id,
    title,
    linkedActivityName,
    targetDays,
    targetPercent,
    notes,
    isActive,
    createdAt
  }
]
```

### Weekly summary logic

`buildWeeklyProgressSummary(profile, anchorDateKey, goals)`:

```txt
1. Finds the Monday-Sunday week containing anchorDateKey.
2. Loads date-based schedules for each date.
3. Counts activity and step completion.
4. Counts support/choice events.
5. Counts step-level prompt/support entries.
6. Compares active goals to matching activity labels.
```

### Current limitation

Goal matching is string-based. A later production version should link goals to stable activity IDs or skill-domain IDs.


## v20 Leap Pack

v20 prototypes the next ten product directions in one release.

### Main files added

| File | Purpose |
|---|---|
| `src/data/transitionSettings.js` | Default transition/wait support settings. |
| `src/components/StudentTransitionPanel.jsx` | Student-facing wait/transition support panel. |
| `src/components/StaffTransitionSettingsPanel.jsx` | Staff-facing transition settings. |
| `src/components/StaffDashboardPanel.jsx` | Staff dashboard landing screen. |
| `src/data/securitySettings.js` | Staff PIN prototype defaults. |
| `src/components/StaffSecurityPanel.jsx` | Staff PIN lock settings. |
| `src/data/rolePermissions.js` | Prototype role/permission model. |
| `src/components/RolePermissionsPanel.jsx` | Role permission planning UI. |
| `src/data/accessibilityReview.js` | Accessibility review checklist and recommendations. |
| `src/components/AccessibilityReviewPanel.jsx` | Staff-facing accessibility audit panel. |
| `src/components/RoutineTemplatePanel.jsx` | Routine template and schedule-copy shortcuts. |
| `src/components/ExportUpgradePanel.jsx` | Advanced export buttons. |
| `src/utils/registerServiceWorker.js` | PWA service-worker registration. |
| `database/v20-normalized-schema.sql` | Normalized database schema scaffold. |
| `NORMALIZED_SUPABASE_PLAN.md` | Backend migration plan. |

### Key App handlers added

```txt
handleUpdateTransitionSettings
handleUpdateAccessibilityReview
handleUpdateStaffSecurity
handleLockStaff
handleUpdateRolePermissions
handleApplyCurrentScheduleToTomorrow
handleApplyCurrentScheduleToWeek
handleDownloadGoalCsv
handleDownloadSupportEventCsv
handleDownloadPromptCsv
handleExportSingleProfile
```

### Production caveats

```txt
Staff PIN is local prototype protection.
Role permissions are planning-level only.
PWA support is app-shell/offline scaffold only.
Normalized Supabase schema is not yet the active data layer.
Snapshot sync remains active.
```


## v21 Function Expansion Pack

v21 adds student check-in, reinforcement, regulation planning, session notes, handoff reporting, print schedule support, profile recommendations, and staff search.

### Main files added

| File | Purpose |
|---|---|
| `src/data/reinforcementSettings.js` | Token/reward board defaults and profile helper. |
| `src/data/regulationPlan.js` | Regulation/support plan defaults and profile helper. |
| `src/utils/handoffReport.js` | Builds concise handoff report text. |
| `src/components/StudentCheckInPanel.jsx` | Student-facing feeling/energy/need check-in. |
| `src/components/StudentRewardPanel.jsx` | Student-facing token/reward board. |
| `src/components/StaffReinforcementPanel.jsx` | Staff token/reward settings and controls. |
| `src/components/RegulationPlanPanel.jsx` | Staff support-plan editor. |
| `src/components/SessionNoteWizardPanel.jsx` | Guided session note form. |
| `src/components/HandoffReportPanel.jsx` | Copy/download-ready handoff report. |
| `src/components/PrintSchedulePanel.jsx` | Print-friendly schedule helper. |
| `src/components/ProfileRecommendationsPanel.jsx` | Profile recommendations from settings/review. |
| `src/components/ActivitySearchPanel.jsx` | Staff search for schedule and choice-bank activities. |

### New profile fields

```txt
reinforcementSettings
regulationPlan
checkIns
sessionNotes
```

### Key App handlers added

```txt
handleRecordCheckIn
handleUpdateReinforcementSettings
handleRequestReward
handleUpdateRegulationPlan
handleAddSessionNote
handleDownloadHandoffReport
```

### Current limitations

```txt
Check-ins and session notes are snapshot-based.
Reward/token logic is intentionally simple.
Recommendation logic is rule-based, not diagnostic.
```


## v22 Stabilization + Student Mode Visibility Controls

v22 adds profile-level visibility controls and product-quality documentation.

### Main files changed/added

| File | Purpose |
|---|---|
| `src/data/displaySettings.js` | Adds optional Student Mode section visibility settings. |
| `src/components/ProfileManager.jsx` | Adds staff toggles for the new visibility settings. |
| `src/components/StudentView.jsx` | Applies visibility settings to student panels. |
| `src/components/PrototypeWarningPanel.jsx` | Reusable prototype/privacy warning. |
| `src/components/StaffView.jsx` | Shows warning in Save tab. |
| `QA_CHECKLIST.md` | Manual QA checklist for core workflows. |
| `KNOWN_LIMITATIONS.md` | Clear limitations and safety notes. |
| `ROADMAP.md` | Next architecture and product priorities. |

### New display settings

```txt
showScheduleDate
showCheckIn
showRewardBoard
showSupportButtons
showBreakPlan
showTransitionSupports
showBoardActivitySection
```

### Purpose

v22 is a stabilization release. It reduces clutter, improves staff control over Student Mode, and makes prototype safety boundaries clearer.


## v23 Backend Architecture + Data Safety Pack

v23 adds data-health analysis and normalized export scaffolding.

### Main files

| File | Purpose |
|---|---|
| `src/utils/dataHealth.js` | Analyzes snapshot size, counts, large visuals, legacy data, and prototype warnings. |
| `src/utils/normalizedExport.js` | Converts snapshot-shaped workspace data into table-like normalized arrays. |
| `src/components/DataHealthPanel.jsx` | Staff Save-tab data-health panel. |
| `src/components/BackendArchitecturePanel.jsx` | Staff/developer backend status panel. |
| `database/v23-normalized-rls-policies.sql` | RLS policy scaffold for normalized tables. |
| `BACKEND_MIGRATION_NOTES.md` | Backend migration notes and next steps. |
| `NORMALIZED_SUPABASE_PLAN.md` | Updated with v23 migration helpers. |

### New App behavior

`App.jsx` now derives:

```txt
dataHealth = analyzeWorkspaceData({ profiles, templates })
```

and adds:

```txt
handleDownloadNormalizedExport()
```

This downloads a normalized JSON payload without changing the active storage model.

### Active backend status

```txt
Current active backend:
snapshot sync through accessflow_workspace_snapshots

Prepared but not active:
normalized table schema and RLS scaffold
```


## v24 Clean Accessibility GUI Pass

v24 adds a calmer Student Mode layout system and keyboard/accessibility refinements.

### Main files changed

| File | Purpose |
|---|---|
| `src/data/displaySettings.js` | Adds `studentPanelLayout` and `showStudentToolSummary`. |
| `src/components/ProfileManager.jsx` | Adds Staff UI for panel layout and settings summary toggle. |
| `src/components/StudentView.jsx` | Adds grouped/minimal optional student panels and settings summary strip. |
| `src/App.jsx` | Adds skip-to-main-content link and content target. |
| `src/styles.css` | Adds grouped-panel styling, stronger focus states, skip-link styling, and mobile spacing. |

### New display settings

```txt
studentPanelLayout:
open | grouped | minimal

showStudentToolSummary:
true | false
```

### StudentView helper components

```txt
StudentToolGroup
StudentAccessibilitySummary
```

### Purpose

v24 does not add a new domain feature. It improves usability by making existing Student Mode supports easier to scan and less visually overwhelming.


## v25 Accessibility Presets + Guided Configuration

v25 adds a guided Student Mode preset system.

### Main files changed/added

| File | Purpose |
|---|---|
| `src/components/StudentModePresetPanel.jsx` | One-click accessibility presets for Student Mode. |
| `src/components/StaffView.jsx` | Renders the preset panel in Staff Mode → Students. |
| `src/styles.css` | Styles preset cards and current setup summary. |
| `README.md` | Documents v25 behavior. |
| `CODE_EXPLANATION.md` | Explains v25 implementation. |

### Preset implementation

Each preset contains:

```txt
displaySettings
independenceSettings
recommendedFor text
```

When applied, the preset merges into the selected profile:

```txt
selectedProfile.displaySettings
selectedProfile.independenceSettings
```

### Purpose

The preset system reduces staff setup burden and helps keep Student Mode clean for users with IDD, autism, low literacy, motor differences, or AAC needs.


## v26 Codebase Documentation + Compliance Readiness Pack

v26 adds generated codebase documentation and compliance readiness documentation.

### Main files added

| File | Purpose |
|---|---|
| `CODEBASE_INDEX.md` | File-by-file source index with purpose, type, line count, and function count. |
| `FUNCTION_REFERENCE.md` | Function/component index generated from source files. |
| `ARCHITECTURE_OVERVIEW.md` | Current architecture and risk overview. |
| `DEVELOPER_ONBOARDING.md` | Developer setup and project rules. |
| `HIPAA_FERPA_READINESS.md` | Compliance readiness overview. |
| `COMPLIANCE_GAP_ANALYSIS.md` | Gap table and production requirements. |
| `SECURITY_CONTROLS_CHECKLIST.md` | Security/privacy/accessibility checklist. |
| `PRIVACY_SECURITY_READINESS.md` | Privacy posture and data minimization notes. |
| `src/components/ComplianceReadinessPanel.jsx` | Staff-facing compliance readiness panel. |

### Documentation stats

```txt
Source files documented: 98
Functions/components indexed: 316
```

### Compliance position

The codebase is still prototype-only. v26 prepares the work needed for compliance; it does not certify or complete compliance.


## v27 Architecture Refactor Pack

v27 extracts pure helper logic from `App.jsx` into utility modules.

### New modules

| File | Purpose |
|---|---|
| `src/utils/readAloudHelpers.js` | Text cleanup and browser speech helper. |
| `src/utils/cloudErrorHelpers.js` | Staff-readable Supabase/cloud error messages. |
| `src/utils/studentActionHelpers.js` | Student confirmation/audio-feedback helpers. |
| `src/utils/dateCopyHelpers.js` | Tomorrow/weekday schedule-copy date helpers. |
| `src/utils/staffExportHelpers.js` | Goal/support/prompt/single-profile export payload builders. |
| `src/utils/workspacePayloadHelpers.js` | Workspace backup payload wrapper. |
| `REFACTOR_NOTES.md` | Summary of the refactor and next extraction targets. |

### App.jsx responsibility after v27

`App.jsx` still owns state coordination and handler wiring, but no longer owns as much pure helper logic.


## v28 Hook Refactor Pack

v28 extracts React side-effect logic from `App.jsx` into focused hooks.

### Main files added

| File | Purpose |
|---|---|
| `src/hooks/useThemeEffect.js` | Applies selected theme to the document root. |
| `src/hooks/useReadAloudEffect.js` | Owns click-to-read listener when read-aloud is enabled. |
| `src/hooks/useLegacyStudentViewMigration.js` | Migrates old `studentViewMode` values. |
| `src/hooks/useSupabaseSessionEffect.js` | Reads current Supabase session and subscribes to auth changes. |
| `src/hooks/useWorkspaceDirtyState.js` | Tracks local unsaved changes relative to cloud-clean baseline. |
| `HOOK_REFACTOR_NOTES.md` | Explains the hook extraction. |

### App.jsx after v28

`App.jsx` no longer imports `useEffect` or `useRef` directly. It still coordinates state and handlers, but side effects now live in hooks.


## v29 Action Hook Refactor Pack

v29 extracts action-heavy handlers from `App.jsx` into domain hooks.

### Main files added

| File | Purpose |
|---|---|
| `src/hooks/useScheduleCopyActions.js` | Schedule-copy handlers for tomorrow/weekdays. |
| `src/hooks/useStaffExportActions.js` | Weekly/handoff/normalized/CSV/profile export handlers. |
| `src/hooks/useProgressGoalActions.js` | Progress goal add/update/delete handlers. |
| `src/hooks/useVisualLibraryActions.js` | Visual library add/update/delete/reset handlers. |
| `src/hooks/useSupportPlanActions.js` | Check-in, reward, reinforcement, regulation, and session-note handlers. |
| `ACTION_HOOK_REFACTOR_NOTES.md` | Documents the handler extraction. |

### Important behavior

v29 keeps the same app behavior but moves more responsibilities out of the main app coordinator.


## v30 Final Refactor + Cleanup Pass

v30 completes the current architecture-cleanup phase.

### New hooks

| File | Purpose |
|---|---|
| `src/hooks/useAuthActions.js` | Staff sign-up/sign-in/sign-out/Google auth handlers. |
| `src/hooks/useProfileActions.js` | Profile select/add/update/delete/reset handlers. |
| `src/hooks/useModeDateActions.js` | Mode, theme, student-view, schedule-date, and documentation-date handlers. |
| `src/hooks/useBoardActions.js` | Communication-board management handlers. |
| `src/hooks/useDailyDocumentationActions.js` | Daily note and activity CSV handlers. |
| `src/hooks/useCloudSnapshotActions.js` | Backup import/export and Supabase snapshot save/load handlers. |
| `src/hooks/useScheduleActivityActions.js` | Schedule/activity/step/student-autonomy handlers. |
| `src/hooks/useActivityBankActions.js` | Student Choices / activity-bank handlers. |
| `src/hooks/useTemplateActions.js` | Template save/apply/delete handlers. |
| `src/hooks/useStaffSettingsActions.js` | Transition, accessibility review, staff security, and role-prototype handlers. |
| `src/hooks/useFirstThenActions.js` | First/Then board handlers. |

### App.jsx after v30

`App.jsx` is now primarily an app shell and state coordinator. It no longer declares named `handle*` functions.


## v31 Communication + Regulation Support Pack

### Files added

| File | Purpose |
|---|---|
| `src/data/communicationSupport.js` | Default pain/body, sensory, regulation, and waiting-support data. |
| `src/components/StudentPainBodyPanel.jsx` | Student-facing pain/body communication board. |
| `src/components/StudentSensoryPanel.jsx` | Student-facing sensory request board. |
| `src/components/StudentRegulationPathway.jsx` | Guided feeling → need → ready check pathway. |
| `src/components/StudentWaitingSupport.jsx` | Waiting support card with wait timer and alternatives. |
| `src/components/StaffCommunicationSupportPanel.jsx` | Staff-facing communication support configuration panel. |

### Main integration points

```txt
StudentView
StaffView
App.jsx
displaySettings
starterProfiles
importHelpers
useSupportPlanActions
```

### Data model

Each profile may now include:

```txt
communicationSupportSettings
```

Imported profiles are normalized through `getCommunicationSupportSettings(profile)`.


## v32 Choice + Self-Advocacy Pack

### Files added

| File | Purpose |
|---|---|
| `src/data/selfAdvocacySupport.js` | Default yes/no, help, decision, stuck, and schedule-change options. |
| `src/components/StudentYesNoPanel.jsx` | Student-facing yes/no/maybe response board. |
| `src/components/StudentHelpRequestBuilder.jsx` | Guided help request builder. |
| `src/components/StudentDecisionSupport.jsx` | Two-choice/three-choice decision support. |
| `src/components/StudentStuckPathway.jsx` | Guided “I’m stuck” support pathway. |
| `src/components/StudentScheduleChangeRequest.jsx` | Student schedule-change request tool. |
| `src/components/StaffSelfAdvocacySupportPanel.jsx` | Staff-facing self-advocacy settings panel. |

### Main integration points

```txt
StudentView
StaffView
App.jsx
displaySettings
starterProfiles
importHelpers
useSupportPlanActions
```

### Data model

Each profile may now include:

```txt
selfAdvocacySupportSettings
```

Imported profiles are normalized through `getSelfAdvocacySupportSettings(profile)`.


## v33 Communication History + Mobile Polish + Guided Schedule Builder

### Files added

| File | Purpose |
|---|---|
| `src/utils/communicationHistory.js` | Builds communication/self-advocacy summaries from support events. |
| `src/components/CommunicationHistoryPanel.jsx` | Staff-facing communication pattern dashboard. |
| `src/components/StudentGuidedScheduleBuilder.jsx` | Student-facing guided schedule builder. |

### Main integration points

```txt
StaffView
StudentView
displaySettings
ProfileManager
styles.css
```

### New display setting

```txt
showGuidedScheduleBuilder
```

This allows staff to hide the guided builder for students who are not ready for that level of schedule planning.

### Mobile addition

`StudentView` now includes a `student-mobile-quick-nav` element that appears on small screens and mirrors the available Student Mode tabs.


## v39 Leap Forward Pack

### Files added

| File | Purpose |
|---|---|
| `src/data/lifeSkillsSettings.js` | Community, vocational, and handoff defaults. |
| `src/components/StudentCommunityAccessPanel.jsx` | Student-facing community access / safety cards. |
| `src/components/StudentVocationalTaskPanel.jsx` | Student-facing vocational task mode. |
| `src/components/StaffLifeSkillsSettingsPanel.jsx` | Staff-facing life skills settings editor. |
| `src/components/GoalSupportRecommendationsPanel.jsx` | Staff-facing goal-aware support suggestions. |
| `src/utils/supportRecommendations.js` | Recommendation logic based on support events and goals. |
| `src/components/CaregiverHandoffPanel.jsx` | Staff-facing caregiver/family handoff generator. |
| `src/components/BackendNormalizationStartPanel.jsx` | Staff-facing normalized backend readiness panel. |
| `src/utils/normalizationReadiness.js` | Normalized backend migration readiness helpers. |
| `database/v39-normalized-backend-start.sql` | Early normalized table scaffold. |

### Integration points

```txt
StudentView
StaffView
App.jsx
displaySettings
ProfileManager
starterProfiles
importHelpers
useSupportPlanActions
styles.css
```

### Data model

Profiles may now include:

```txt
lifeSkillsSettings
```

Imported profiles are normalized through `getLifeSkillsSettings(profile)`.


## v40 Stabilization + Feature Presets + Release Candidate

### Files added

| File | Purpose |
|---|---|
| `src/data/featurePresets.js` | Full Student Mode feature preset definitions. |
| `src/components/FeaturePresetPanel.jsx` | Staff-facing preset launcher. |
| `src/data/featureMap.js` | Staff/student feature map data. |
| `src/components/StaffFeatureGuidePanel.jsx` | Staff dashboard feature map and quick-jump guide. |
| `RELEASE_CANDIDATE_CHECKLIST.md` | Manual build/browser QA checklist. |
| `FEATURE_MAP.md` | Static feature map documentation. |
| `MOBILE_STABILIZATION_NOTES.md` | Mobile/stabilization notes. |
| `V40_RELEASE_CANDIDATE_REPORT.md` | v40 release report. |


## v41 Self-Advocacy Passport + Support Pattern Log

### Files added

| File | Purpose |
|---|---|
| `src/data/aboutMeProfile.js` | Default About Me / self-advocacy passport data. |
| `src/components/StudentAboutMePanel.jsx` | Student-facing About Me profile. |
| `src/components/StaffAboutMePanel.jsx` | Staff-facing About Me editor. |
| `src/components/AboutMeExportPanel.jsx` | Copyable About Me export. |
| `src/components/StaffObservationLogPanel.jsx` | Quick staff observation/support pattern log. |
| `src/components/ActivitySupportPatternPanel.jsx` | Activity-level support pattern indicators. |
| `src/utils/supportPatterns.js` | Support pattern summary logic. |

### Data model

Profiles may now include:

```txt
aboutMeProfile
supportObservations
```


## v42 Activity Readiness + Reflection Pack

### Files added

| File | Purpose |
|---|---|
| `src/utils/activityReadiness.js` | Summarizes prep/reflection/try-later patterns. |
| `src/components/StudentActivityPrepPanel.jsx` | Student-facing prepare-for-activity support. |
| `src/components/StudentActivityReflectionPanel.jsx` | Student-facing activity reflection. |
| `src/components/StudentTryAgainLaterPanel.jsx` | Student-facing try-again-later request. |
| `src/components/ActivityReadinessReviewPanel.jsx` | Staff-facing readiness/reflection review. |
| `src/components/TryAgainLaterQueuePanel.jsx` | Staff-facing queue of try-again-later requests. |

### Support event types

```txt
activity-prep
activity-reflection
try-again-later
```


## v43 Alternative Access + Calm Mode Pack

### Files added

| File | Purpose |
|---|---|
| `src/components/StudentCalmScreenPanel.jsx` | Student-facing reduced-choice calm screen. |
| `src/components/StudentCommunicationRepairPanel.jsx` | Student-facing communication repair board. |
| `src/components/StudentSwitchScannerPanel.jsx` | Student-facing switch-scanning prototype. |
| `src/components/StaffAlternativeAccessGuidePanel.jsx` | Staff-facing alternative access guide. |

### New display settings

```txt
showCalmScreenPanel
showCommunicationRepairPanel
showSwitchScannerPanel
reducedChoiceMode
eyeGazeFriendly
```

### New support event types

```txt
calm-screen
communication-repair
switch-scan-select
```


## v44 AAC Expansion + Social Communication Pack

### Files added

| File | Purpose |
|---|---|
| `src/data/aacExpansion.js` | Core words, quick phrases, feelings, intensity, and social script defaults. |
| `src/components/StudentAacCoreWordsPanel.jsx` | Student-facing core words board. |
| `src/components/StudentQuickPhrasesPanel.jsx` | Student-facing quick phrases board. |
| `src/components/StudentFeelingsIntensityPanel.jsx` | Student-facing feelings/intensity board. |
| `src/components/StudentSocialScriptsPanel.jsx` | Student-facing social scripts board. |
| `src/components/StaffAacExpansionPanel.jsx` | Staff-facing AAC expansion editor. |

### New profile field

```txt
aacExpansionSettings
```

### New support event types

```txt
aac-core-word
aac-quick-phrase
aac-feeling
aac-social-script
```


## v45 Icon Library + Visual Symbol Flexibility Pack

### Files added

| File | Purpose |
|---|---|
| `src/data/iconLibrary.js` | Curated Font Awesome icon registry. |
| `src/components/IconSymbol.jsx` | Reusable icon/emoji/image visual renderer. |
| `src/components/StaffIconLibraryPanel.jsx` | Staff icon picker that adds icons to Visual Library. |
| `FONT_AWESOME_LICENSE_NOTE.md` | Font Awesome license/prototype note. |
| `V45_ICON_LIBRARY_REPORT.md` | v45 release report. |

### Visual type added

```txt
fontawesome
```

Example:

```js
{
  type: "fontawesome",
  value: "hand",
  altText: "Help icon"
}
```

### Important accessibility rule

The visual is decorative. The text label remains visible and remains the semantic communication message.


## v46 Universal Symbol Labels + AAC Visual Editing Pack

v46 changes `StaffAacExpansionPanel.jsx` from add/remove-only behavior to full visual editing for existing AAC items.

Staff can edit:

```txt
label
emoji fallback
Font Awesome icon
```

Student-facing static support panels now use `IconSymbol`:

```txt
StudentCalmScreenPanel
StudentCommunicationRepairPanel
StudentSwitchScannerPanel
StudentActivityPrepPanel
StudentActivityReflectionPanel
```

The text label remains the semantic communication value.


## v47 Communication Visual Customization Pack

### Files added

| File | Purpose |
|---|---|
| `src/components/StaffVisualChoiceEditor.jsx` | Reusable editor for label + emoji fallback + Font Awesome icon on communication buttons. |
| `V47_COMMUNICATION_VISUAL_CUSTOMIZATION_REPORT.md` | v47 release report. |

### Updated panels

```txt
StaffCommunicationSupportPanel
StaffSelfAdvocacySupportPanel
StaffLifeSkillsSettingsPanel
StudentSensoryPanel
StudentYesNoPanel
StudentHelpRequestBuilder
StudentCommunityAccessPanel
StudentVocationalTaskPanel
```

The student panels use `IconSymbol` while preserving visible labels.


## v48 Visual Library Assignment Pack

### Updated files

| File | Purpose |
|---|---|
| `src/components/IconSymbol.jsx` | Now reads `item.visual` and supports assigned image/icon/emoji visuals. |
| `src/components/StaffVisualChoiceEditor.jsx` | Adds saved Visual Library assignment to reusable communication-button editor. |
| `src/components/StaffAacExpansionPanel.jsx` | Adds saved Visual Library assignment to AAC editor. |
| `src/components/StaffView.jsx` | Passes `visualLibrary` into communication/AAC/life-skills editors. |

### Item fields added/used

```txt
visualLibraryItemId
visual
imageUrl
icon
emoji
label
```

The label remains the semantic communication value.


## v49 Visual Coverage Audit + Suggested Icons Pack

### Files added

| File | Purpose |
|---|---|
| `src/utils/visualCoverage.js` | Builds visual coverage rows and applies suggested icons. |
| `src/components/StaffVisualCoveragePanel.jsx` | Staff-facing visual audit and bulk suggested-icon action. |
| `V49_VISUAL_COVERAGE_AUDIT_REPORT.md` | v49 release report. |

### Domains audited

```txt
AAC expansion
Communication sensory requests
Self-advocacy responses/help/choices/stuck/change requests
Life skills community/vocational buttons
```

Suggested icons are derived from text labels. The text label remains the semantic communication value.


## v50 Solid Release Candidate + Visual Preference Pack

### New files

| File | Purpose |
|---|---|
| `src/utils/visualPreferences.js` | Resolves student visual preference labels and CSS class names. |
| `src/utils/releaseReadiness.js` | Builds release-readiness summary data for Staff Mode. |
| `src/components/StaffReleaseReadinessPanel.jsx` | Staff-facing v50 release-candidate dashboard. |
| `V50_SOLID_RELEASE_CANDIDATE_REPORT.md` | v50 release summary. |
| `V50_CLEANUP_AND_REFACTOR_NOTES.md` | cleanup/refactor notes. |

### Display setting added

```txt
visualPreference
```

Supported values:

```txt
balanced
largeVisuals
labelFirst
labelsOnly
```

StudentView receives the visual preference as a CSS class, so buttons do not need duplicate logic.


## v50.1 Render Fix

v50.1 fixes invalid JSX syntax in four Student Mode panels that caused Render/Vite deployment failure. No feature behavior changed.


## v51 Student Navigation Cleanup Pack

`resolveStudentTabs` now returns separate Student Mode sections. `StudentView.jsx` no longer places every support panel inside the old Today screen. The old Today concept is now Schedule, while Profile, Board, Relax, and Games handle separate jobs.


## v51.1 Staff Mode Fix

StaffView now imports `StaffReleaseReadinessPanel` before rendering the v50 release-readiness dashboard.


## v51.2 Staff Auth Gate Fix

`App.jsx` now renders `StaffAuthGate` when `mode === "staff"` and `session` is missing. `StaffView` only renders after sign-in.


## v51.3 Navigation Symmetry Pack

Student tab resolution now includes Help. StaffView now includes Reports. CSS overrides make workflow navigation use a matching 4-column, 2-row grid for both student and staff tab bars.


## v51.4 Duplicate Tabs Fix

`StudentView.jsx` now renders one tab navigation system: `WorkflowTabs`. The old second mobile quick nav block was removed.


## v52 Simple Games Pack

`StudentGamesPanel.jsx` contains the v52 games. `StudentView.jsx` imports and renders `StudentGamesPanel` inside the existing Games tab. `styles.css` adds the shared game-card, board, grid, wheel, snake, dino, memory, and float-game styles.


## v53 GUI Declutter Trial

`displaySettings.js` now exports `studentNavigationPresets`. `resolveStudentTabs` uses the selected preset before falling back to custom visibility toggles. `ProfileManager` exposes the preset selector. `StaffGuiReviewPanel` gives staff a dashboard-level declutter check.


## Version feature history

`VERSION_FEATURES.md` is now the single version-feature log. Individual `V##_...md` report files are no longer kept in the root build package.


## v53.1 Choice Wheel Upgrade

`ChoiceWheelGame` in `StudentGamesPanel.jsx` now stores editable wheel choices, applies animated rotation during spin, and reports the selected custom label.


## v53.2 Student Choice-to-Schedule Clarity Fix

`StudentScheduleChoiceLauncher.jsx` is a new Schedule-screen component that shows staff-approved activity-bank choices and calls `onStudentAddActivity({ type: 'bank', choiceId })`. `displaySettings.js` now labels the choice tab as Add and includes it in the Core navigation preset.


## v53.3 Play Tab Access Fix

`displaySettings.js` now includes `games` in the Core student navigation preset and labels that tab as Play. The existing `StudentGamesPanel` remains unchanged.


## v54 File Structure Organization

Components are now grouped by product surface and workflow. The refactor moves component files and rewrites relative imports without changing intended app behavior. See `FILE_STRUCTURE.md`.

## v55 Documentation Structure

Markdown documentation is now grouped under `docs/` instead of living flat in the root directory. The root keeps `README.md` only. The docs index is `docs/README.md`.


## v55.1 Student Visual + Play Access Fix

v55.1 adds CSS overrides that restore larger `VisualSupport` emoji and FontAwesome sizing in student-facing visual containers. `ProfileManager` now includes a Play access helper and an Enable Play tab button that applies the Core navigation preset.

## v56 Staff Declutter

`StaffView.jsx` now uses a local `StaffToolGroup` component to organize each staff tab into expandable sections. This preserves the same tools while reducing the amount of visible content on each tab. User-facing guide documentation now lives in `docs/user/`.


## v56.1 Shared Staff Workspace

`loadLatestWorkspaceSnapshot` now queries by `workspace_label` without filtering to the signed-in user. `saveWorkspaceSnapshot` still records the signed-in user as `user_id`. The UI now describes this as a shared staff workspace rather than a private per-account snapshot.
