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
