
> **Prototype safety warning:** Do not enter real student/client data. AccessFlow is not currently HIPAA, FERPA, agency-compliance, audit-trail, or records-retention ready. Use mock data only.

# AccessFlow v10

AccessFlow is a mobile-first adaptive visual schedule web app for students/clients who benefit from visual structure, task analysis, and simplified daily routines.

## Version 10 focus

Version 10 corrects the product direction back toward student/client independence. Staff still create the guardrails, but Student Mode now includes a self-directed schedule planning flow.

New in v10:

- Student Mode now has **Plan My Day**
- Students can add approved visual activities to their own schedule
- Students can reorder their schedule with simple Up/Down controls when enabled
- Students can remove activities from their plan when enabled
- Students can optionally add custom activities for staff to refine later
- Staff Mode has profile-level independence settings
- Staff can enable/disable student schedule building per profile
- Staff can enable/disable student reordering, activity removal, custom activities, and schedule clearing
- v9 Supabase sync safety improvements are preserved
- v8.1 Render npm timeout fix is preserved

Product rule for this version:

```txt
Student independence first. Staff documentation second.
```

## Default behavior

Without Supabase environment variables, AccessFlow still works as a local static app using browser localStorage.

## Optional Supabase setup

### 1. Create a Supabase project

Create a project in Supabase.

### 2. Run the v10 SQL schema

Open Supabase SQL Editor and run:

```txt
database/supabase-schema.sql
```

This creates or updates:

```txt
accessflow_workspace_snapshots
```

It also grants signed-in users access to the table while RLS restricts each user to their own snapshots.

### 3. Enable email/password auth

In Supabase Auth settings, enable email/password signups. Set the Auth Site URL and Redirect URLs to your live Render URL.

### 4. Add environment variables to Render

In Render, add:

```txt
VITE_SUPABASE_URL=your Supabase project URL
VITE_SUPABASE_ANON_KEY=your Supabase publishable/anon key
VITE_ACCESSFLOW_WORKSPACE_LABEL=prototype
```

Then redeploy.

### 5. Use Staff Mode

After signing in, staff can manually save and load cloud snapshots. Loading a snapshot now asks for confirmation because it replaces the current browser workspace.

## Security warning

v10 is a prototype. Use fake names and test records only.

Before using with real student/client data, add:

- organization accounts
- staff roles
- student/client profile permissions
- audit logging
- explicit data retention rules
- image storage with access policies
- normalized database tables instead of full JSON snapshots
- legal/privacy review appropriate to the deployment context

## Included features

- React + Vite frontend
- Mobile-first layout
- Student / Staff mode toggle
- Student Use Schedule / Plan My Day / First-Then view toggle
- Student schedule builder for self-directed planning
- Student activity library with large visual cards
- Student-controlled schedule reordering when enabled
- Student-controlled activity removal when enabled
- Optional student custom activity entry
- Staff-controlled independence settings per profile
- Student/client profile selector
- Add student/client profiles
- Edit profile name and support notes
- Delete profiles
- Profile-specific schedules
- Reusable schedule templates
- Save current profile schedule as template
- Apply template to current profile
- Delete templates
- Emoji or uploaded-image visual supports
- Local task generation for common activities
- Speech-to-text task entry when available
- Step-by-step task breakdowns
- Completion tracking
- Now / Next display
- Progress bar
- Add activity from a general task prompt
- Edit activity label
- Edit activity emoji fallback
- Upload activity image
- Edit activity summary
- Edit step labels
- Edit step emoji fallbacks
- Upload step images
- Add steps
- Delete steps
- Move steps up/down
- Delete activities
- Daily documentation note
- Copy-ready staff progress note
- Download daily progress note as `.txt`
- Download activity completion breakdown as `.csv`
- Export all AccessFlow data as JSON
- Import AccessFlow JSON backup
- Optional Supabase auth
- Optional authenticated Supabase manual snapshot sync
- Sync timestamps and save reminders
- Confirm-before-load cloud restore
- Reset demo data
- Clear selected profile schedule
- localStorage persistence
- Render-ready static site config

## Install locally

```bash
npm install
npm run dev
```

## Build locally

```bash
npm run build
npm run preview
```

## Deploy to Render

Use an existing or new Render Static Site connected to GitHub.

Use:

```txt
Build Command: npm install --registry=https://registry.npmjs.org/ && npm run build
Publish Directory: dist
```

This repo also includes `render.yaml`.

## Render npm timeout fix preserved

This package intentionally excludes `package-lock.json` and includes:

```txt
.npmrc
.node-version
```

Reason: a lockfile generated in some hosted environments can contain internal registry tarball URLs. Render cannot fetch those URLs and may fail with `ETIMEDOUT`.

If your GitHub repo already has `package-lock.json`, delete it from the repo before deploying this version.

## Recommended v11

The next version should probably add a staff-reviewed activity request queue and then start normalizing the Supabase schema beyond full JSON snapshots, beginning with organization/profile/activity tables and role-based access boundaries.


## AccessFlow v10.1 student schedule correction

v10.1 corrects the Student Mode flow after v10:

- The default student view is now **My Schedule**.
- Schedule use and schedule planning are combined on the same page.
- Students can see the schedule first, then add or adjust activities below it when staff independence settings allow.
- Emoji visuals are rendered more defensively, including older/legacy activity data that may store an `emoji` field instead of a full `visual` object.
- The separate "Use Schedule" and "Plan My Day" tabs are replaced with **My Schedule** and **First / Then**.


## v10.2 patch

Student Mode’s Now/Next progress cards now use the same visual support rendering as the main schedule cards. This restores emoji/image visuals in the top Now/Next section and keeps the student view schedule-first.


## v10.3 patch

Student Mode's **My Schedule** page now uses an accordion-style interaction:

- the schedule remains visible as the default page
- tapping an activity opens its smaller steps inline
- tapping the same activity closes the steps
- completing all individual steps automatically folds the activity back into the schedule
- the separate side-by-side task breakdown is removed from the main My Schedule page

Queued for the next planning pass: a reusable staff-controlled task breakdown library so staff can save a task such as "Eat an Orange" once and assign the same step breakdown to multiple students.


## v10.4 patch

Student Mode now includes a compact staff access panel near the top of the page:

- staff can open sign-in/create-account without first switching away from Student Mode
- successful staff sign-in automatically opens Staff Mode
- users can still manually switch between Student Mode and Staff Mode afterward

The app also now includes a persistent light/dark display toggle in the header:

- ☀️ light mode
- 🌙 dark mode
- selected theme is saved in local browser storage


## v10.5 patch

Completion state is now synchronized between full activities and their smaller steps:

- tapping an activity's **Done** button marks all smaller steps done
- tapping **Undo** on a completed activity marks all smaller steps not done
- completing every individual step still marks the full activity complete
- undoing any individual step still marks the full activity not complete


## v10.6 patch

The light/dark theme toggle is now inside the same rounded control bar as the Student Mode / Staff Mode switch:

- Student Mode
- Staff Mode
- ☀️ Light / 🌙 Dark

This makes the theme control visible in the primary header controls instead of appearing as a separate secondary widget.


## v10.7 patch

Student activity choices now come from a staff-managed **choice bank** instead of a built-in default list.

Key behavior:

- each student/profile has an `activityBank`
- the student-facing activity choices start blank
- Staff Mode can add new activities to the selected student's bank
- Staff Mode can save existing scheduled activities into the bank
- Staff Mode can add a bank choice directly to the schedule
- Student Mode shows only that selected student's bank choices
- choosing a bank item clones its saved step breakdown into the student's schedule
- staff-created scheduled tasks are also saved to the choice bank automatically


## v10.8 patch

Dark mode now uses a higher-contrast palette:

- darker page and panel backgrounds
- brighter primary accents
- stronger borders
- brighter body and helper text
- explicit `--on-primary` text color for selected/primary buttons
- improved input, card, chip, status-pill, and step contrast in dark mode


## v11 redesign

This version reassesses the choice-bank workflow and simplifies the student-facing visual design.

### Student-facing simplification

- larger Now / Next cards
- fewer explanatory paragraphs
- simpler schedule cards
- activity cards open smaller steps inline
- choice cards show a large visual, a label, and a clear Add action
- extra summaries and helper chips are hidden from the student-facing cards

### Choice-bank redesign

The bank now has one clear meaning: **student choices**.

- Staff Mode has a dedicated Student Choices panel.
- Staff creates reusable choice cards there.
- Staff can edit the saved smaller steps directly inside the choice bank.
- Student Mode shows only the saved choices for the selected profile.
- Adding a one-time schedule item no longer silently saves it to the bank.
- Bank choices can be added to today's schedule by staff or selected by the student.

### Dark mode redesign

Dark mode now uses a stark high-contrast palette:

- black page background
- white text
- white borders
- yellow selected/primary actions
- no subtle blue-on-blue panels


## v12 visual workflow redesign

This version focuses on reducing visual clutter and making the workflow easier to understand.

### Student Mode

- removes the large staff login panel from the main student flow
- keeps staff login as a small collapsed control
- removes the extra guidance panel
- keeps the student page focused on: profile, Now/Next, My Schedule, and Choices
- shortens schedule movement labels to Up / Down
- keeps large activity cards and inline step expansion

### Staff Mode

Staff Mode now uses progressive disclosure with grouped sections:

1. Student
2. Student choices
3. Today’s schedule
4. Notes and reports
5. Save and account

This makes the staff side less like one giant dashboard and more like a guided setup/support flow.


## v12.1 patch

This version adds two workflow fixes:

- Student Mode custom activities can include student-created smaller steps before adding the activity to the schedule.
- Staff Mode activity editor now has a clear **Save to Student Choices** button so a reviewed schedule activity can become a reusable bank choice.

This keeps the model explicit:

- Student Choices = reusable approved choices.
- Today’s Schedule = what is on the current schedule.
- A student-created schedule item can be reviewed by staff and intentionally saved to Student Choices.


## v12.2 patch

Dark mode now uses a blue background instead of black, with forced high-contrast text rules:

- deep blue page background
- darker blue panels
- white body/headline text
- yellow labels, active controls, and key status text
- no inherited deep-blue text in dark mode
- root text color now uses `var(--text)` instead of a hardcoded light-mode color


## v12.3 patch

Dark mode now forces the visual scheme more directly:

- full page background uses the deep blue
- major page titles use yellow, including AccessFlow and My Schedule
- body text stays white
- active controls/buttons stay yellow with dark text


## v12.4 patch

Dictation controls are now available in the student-created activity flow:

- microphone button for the student-made activity name
- microphone button for each student-created smaller step
- compact microphone button on the staff add-activity form
- accessible labels are preserved with `aria-label` and `title`

The visible button uses 🎙️ instead of the full word “Dictate” to reduce visual clutter.


## v12.5 patch

This version improves activity/step visuals:

- activity icons can be tapped to open an emoji picker
- smaller-step icons can be tapped to open an emoji picker
- staff activity editor visual previews can be tapped to change emoji
- staff Student Choices bank icons can be tapped to change emoji
- completed activities temporarily show ✅ instead of the chosen emoji
- completed steps temporarily show ✅ instead of the chosen emoji
- undoing completion restores the chosen emoji
- emoji boxes use stronger centering rules to prevent vertical/horizontal drift


## v13 workflow redesign

This version restructures the app to reduce visual clutter.

### Student Mode

Student Mode is split into three focused tabs:

- **Today**: Now/Next, schedule, and task steps.
- **Choose**: approved student choice bank only.
- **Make**: student-created activity and step builder only.

The default Student screen no longer shows schedule use, choice bank, and task creation all on one long page.

Schedule editing controls are hidden by default. Students see a **Change** button first; Up/Down/Remove only appear after entering edit mode.

### Staff Mode

Staff Mode is split into five focused tabs:

- **Students**
- **Choices**
- **Schedule**
- **Notes**
- **Save**

This replaces the long stacked staff dashboard with one job per screen.

### Alignment and visual cleanup

- smaller mobile header
- app description hidden on small screens
- theme toggle stays in the same row on mobile
- safer emoji picker positioning on small screens
- fixed activity card alignment after moving icons outside the main button
- fixed step-row grid alignment to reduce overlapping controls
- added mobile wrapping rules for step-builder remove buttons


## v14 feature expansion prototype

This version adds first-pass implementations of the larger AccessFlow roadmap.

### Student-facing additions

- **Support buttons** on Today: Help, Break, Confused, Too hard, Too loud, Upset.
- **Choice Board** tab for quick communication choices.
- Student-created tasks are marked for staff review.
- Optional read-aloud mode in the top control bar:
  - 🔇 means read aloud is off
  - 🔊 means read aloud is on
  - when enabled, tapping readable text attempts to speak it aloud using the browser Speech Synthesis API

### Staff-facing additions

- **Review Queue** for student-created activities.
- **Student display settings**:
  - show/hide Choose tab
  - show/hide Make tab
  - show/hide Choice Board tab
  - show/hide words with visuals
  - show/hide progress
  - show/hide step numbers
  - show/hide support-level controls
  - show/hide timers
  - default student screen
- **First / Then builder** from the student choice bank.
- **Support event log** in Notes.
- Documentation summaries now include support/choice events and step-level prompt data.

### Activity/step additions

- Activity categories for choice-bank filtering.
- Optional activity timers.
- Optional step timers.
- Step-level support/prompt tracking.
- Visual upload inputs now support taking a photo on compatible mobile browsers.


## v14.1 patch

Fixes the mobile read-aloud toggle icon.

The issue was caused by mobile CSS hiding the last `<span>` in top toggle buttons to remove the Light/Dark text label. After the read-aloud button became icon-only, its only `<span>` was also the last span, so the mobile CSS hid the 🔇 / 🔊 icon.

The read-aloud icon now has its own `.tts-icon` class and a mobile override to keep it visible.


## v14.2 patch

Adds Google OAuth staff sign-in through Supabase Auth.

### App changes

- Staff sign-in panels now show **Continue with Google**.
- Google OAuth uses Supabase `signInWithOAuth({ provider: "google" })`.
- The redirect target is the current AccessFlow URL.
- Existing Supabase session handling opens Staff Mode after sign-in.

### Supabase setup required

In Supabase:

1. Authentication → Providers → Google → enable Google.
2. Add the Google OAuth client ID and client secret.
3. Authentication → URL Configuration:
   - Site URL: your AccessFlow Render URL.
   - Redirect URLs: your AccessFlow Render URL and optional wildcard form.
4. In Google Cloud OAuth settings, include the callback URL Supabase shows for the Google provider.


## v15 guided daily-use release

This version focuses on real-world daily use while keeping the student-facing flow clean.

### Major additions

- Google OAuth button is hidden unless `VITE_ENABLE_GOOGLE_AUTH=true`.
- Staff Setup Wizard.
- Schedule-by-date support.
- Daily schedule templates.
- Structured Break Plan.
- Code comments added across `src`.
- `CODE_EXPLANATION.md` added as a developer cheat sheet.

### Google OAuth flag

By default:

```txt
VITE_ENABLE_GOOGLE_AUTH=false
```

Set this only after Google OAuth is configured in Supabase:

```txt
VITE_ENABLE_GOOGLE_AUTH=true
```

### Date-based schedules

Staff can now select a schedule date in Staff Mode → Schedule. Student Mode → Today also shows the selected date.

The app keeps `profile.activities` synced for backward compatibility, but v15 stores selected-date schedules under:

```txt
profile.schedulesByDate[date].activities
```

### Staff Setup Wizard

Staff Mode now opens to Setup by default. The guided setup flow is:

```txt
1. Profile
2. Display
3. Choices
4. Schedule
5. Test
```

### Daily templates

Staff Mode → Schedule includes routine starters:

```txt
Morning Routine
School Day
Vocational Day
Community Trip
Evening Routine
```

### Structured Break Plan

Student Mode → Today includes a collapsed Break Plan with:

```txt
Quiet
Walk
Music
Breathing
Water
Sensory item
2 / 5 / 10 minute timer
```

### Developer documentation

See:

```txt
CODE_EXPLANATION.md
```

for a feature/function map of the codebase.


## v15.1 patch

Improves read-aloud behavior.

When the 🔊 read-aloud toggle is enabled, AccessFlow now tries to read the meaningful label text instead of reading emoji visuals aloud.

Changes:

- removes `[aria-hidden="true"]` visual nodes before speaking
- ignores visual-support/emoji containers
- strips emoji characters from spoken text
- still allows buttons and controls to work normally


## v15.2 patch

Fixes Break Plan timer behavior.

Previously, **Start break** logged the break event but did not start the countdown. The user had to tap the timer separately.

Now:

```txt
Start break = log break event + start/restart timer
```

The timer can still be tapped afterward to pause/resume.


## v15.3 patch

Fixes Student Mode workflow tab alignment.

On mobile, the Student tabs now display as a clean 2×2 grid:

```txt
Today   Choose
Make    Board
```

On wider screens, they can still display in one row.

## v15.4 patch

Clarifies and fixes the Student Mode **Board** section.

### What Board means

```txt
Board = communication / quick requests
Choose = approved activities to add to the schedule
Make = student-created activities
Today = current schedule
```

### Changes

- Student Mode → Board now actually renders a Board panel.
- Board uses staff-managed communication buttons.
- Board has default buttons such as Help, Break, Drink, Snack, Bathroom, Quiet, Music, and Walk.
- Staff Mode → Choices now includes a **Communication Board** manager.
- Staff can add, edit, remove, and reset Board buttons.
- Tapping a Board button logs a support/choice event for documentation.


## v16 Student Accessibility Refinement

This version focuses on making Student Mode more adaptable for students/clients with IDD, autism, AAC needs, low literacy, attention differences, and motor-access needs.

### New staff-controlled student settings

Staff Mode → Students now includes clearer student display/access settings:

```txt
Student experience level:
- Simple
- Standard
- Advanced

Student mode layout:
- Tabs
- Board only
- First / Then only

Touch size:
- Standard
- Large
- Extra large

Text and visual display:
- Icons and words
- Icons only
- Words only

Other support settings:
- Reduce motion
- Confirm before major actions
- Play audio feedback
```

### Student Mode behavior

```txt
Simple:
Today + Board, less detail, larger controls

Standard:
Today + Choose + Make + Board with moderate detail

Advanced:
Full workflow and advanced step/support controls

Board only:
Student sees only the communication board

First / Then only:
Student sees only the First / Then view
```

### Safety and feedback

When enabled per profile:

```txt
Confirm before major actions:
- completing an entire activity
- removing an activity
- clearing the schedule

Play audio feedback:
- speaks completion feedback such as “Brush teeth done.”
```

### Accessibility-focused visual changes

- larger touch targets
- extra-large card mode
- reduced motion mode
- words-only mode
- icons-only mode
- simplified mode hides some secondary detail
- staff preview note summarizes what Student Mode will look like


## v17 AAC / Communication Board Expansion

This version turns the Student Mode Board into a stronger AAC-style communication support.

### Student Board additions

- Board category pages.
- Expanded default vocabulary.
- Sentence/message strip.
- Say message button.
- Backspace button.
- Clear button.
- Board selections are logged for staff review.
- Full spoken messages are logged as board-message events.

### Default Board categories

```txt
Core
Help
Needs
Feelings
Body
People
Places
Breaks
Fun
Custom
```

### Examples

The student can build and say messages such as:

```txt
I want a drink
I feel mad
I need the bathroom
my stomach hurts
I need a break
go outside
```

### Staff Board manager changes

Staff Mode → Choices → Communication board now supports:

```txt
Button label
Spoken phrase
Emoji
Category
```

The label is what appears on the button. The spoken phrase is what gets added to the student's message strip.


## v18 Visual / Photo Library

This version adds a reusable visual library for staff.

### Why this matters

Staff should not have to rebuild or re-upload the same visuals repeatedly. A profile-level visual library makes it easier to reuse common symbols and photos across activities and steps.

### New features

- Profile-level visual library.
- Default reusable visuals.
- Staff Mode → Choices → Visual library manager.
- Add/edit/remove/reset reusable visuals.
- Visual library categories.
- Activity and step visual editors can reuse saved visuals.
- Activity and step visual editors can save the current visual into the library.
- Uploaded photos can be saved into the visual library after upload.

### Default visual categories

```txt
General
People
Places
Food
Hygiene
School
Work
Breaks
Feelings
Body
Transportation
Leisure
Recently used
Custom
```

### Staff workflow

```txt
1. Staff Mode → Choices → Visual library
2. Add or edit common visuals
3. Staff Mode → Schedule → select an activity
4. Open Activity visual or Step visual
5. Use saved visual or save current visual
```


## v19 Goal Tracking + Progress Dashboard

This version adds a staff-facing progress layer for IEP/ISP-style tracking.

### New features

- Profile-level progress goals.
- Goal manager in Staff Mode → Notes.
- Link a goal to an activity name.
- Target days per week.
- Target percent.
- Active/inactive goal toggle.
- Weekly progress dashboard.
- Weekly completion summary.
- Goal progress summary.
- Prompt/support-level summary.
- Support/choice event summary.
- Copy-ready weekly report.
- Download weekly report.

### Staff workflow

```txt
1. Staff Mode → Notes
2. Add a progress goal
3. Link it to an activity name
4. Use the app across the week
5. Review weekly progress dashboard
6. Download weekly report
```

### Example goal

```txt
Goal title:
Complete tooth brushing with fewer prompts

Linked activity:
Brush teeth

Target:
4 days per week or 80%
```

### Current limitation

Goal matching is based on activity-name text. For example, a goal linked to `Brush teeth` matches schedule activities whose label includes `Brush teeth`.


## v20 Leap Pack

This release prototypes the next ten major product directions in one broad pass.

### 1. Transition + waiting supports

Student Mode → Today now includes transition supports:

```txt
Almost done
Wait
Try again
Return from break
Transition countdown
Now / Next preview
```

Staff Mode → Students includes transition phrase/settings controls.

### 2. PWA / offline scaffold

Added:

```txt
public/manifest.webmanifest
public/service-worker.js
src/utils/registerServiceWorker.js
```

This provides install/offline app-shell scaffolding. It is a prototype, not a full production offline sync engine.

### 3. Staff PIN lock prototype

Staff Mode → Save includes Staff PIN settings.

Prototype features:

```txt
Require PIN to open Staff Mode
Hide Staff Mode switch visually in Student Mode
Lock Staff Mode
```

This is local prototype protection. Production should use proper auth roles.

### 4. Role/permission prototype

Staff Mode → Save includes a role planning panel for:

```txt
Student/client
Caregiver
Direct support staff
Teacher/specialist
Admin
```

This is a planning layer before normalized multi-user auth.

### 5. Normalized Supabase scaffold

Added:

```txt
database/v20-normalized-schema.sql
NORMALIZED_SUPABASE_PLAN.md
```

Snapshot sync remains the active implementation in v20.

### 6. Staff dashboard

Staff Mode now opens to Dashboard.

Dashboard shows:

```txt
Schedule completion
Weekly goal status
Support event count
Cloud save status
Daily note warning
Quick actions
```

### 7. AAC Board upgrades

Student Board now includes:

```txt
Phrase starters
Recently used choices
Favorite Board buttons
```

Staff can mark Board buttons as favorites.

### 8. Routine template improvements

Staff Mode → Schedule includes:

```txt
Routine templates
Copy current schedule to tomorrow
Copy current schedule to weekdays
```

### 9. Export/report upgrades

Staff Mode → Save includes:

```txt
Goal CSV
Support event CSV
Prompt-level CSV
Single-profile backup
```

### 10. Accessibility review mode

Staff Mode → Notes includes an Accessibility Review checklist with recommendations.

Checklist asks whether the student/client can:

```txt
identify current task
complete a step
request help
request break
use Board
access touch targets
benefit from current text level
use the default screen
benefit from read-aloud
need transition supports
```


## v21 Function Expansion Pack

v21 adds another layer of practical support functions for real-world IDD/special-needs use.

### Student-facing additions

```txt
Daily check-in
Token / reward board
Reward requests
```

The check-in supports quick communication around:

```txt
Feeling
Energy
Need
```

### Staff-facing additions

```txt
Reinforcement settings
Regulation/support plan
Session note wizard
Handoff report
Print visual schedule
Profile recommendations
Activity search
```

### New support areas

```txt
Token board:
Staff can set token goal, award/reset tokens, and configure reward options.

Regulation plan:
Triggers, early signs, proactive supports, calming strategies, staff response, recovery steps.

Session note wizard:
Setting, skill focus, what worked, barriers, next time.

Handoff report:
Concise home/school/program/team handoff summary.

Print schedule:
Browser print support for simplified visual schedule cards.

Recommendations:
Profile-level suggestions based on settings and accessibility review.
```

### Current limitations

```txt
Token board is a prototype behavior support tool, not a billing or clinical compliance system.
Session notes are stored inside the profile snapshot.
Print output depends on browser print behavior.
```


## v22 Stabilization + Student Mode Visibility Controls

This release stops the feature flood and focuses on product quality, data safety, and reducing Student Mode clutter.

### New per-profile visibility toggles

Staff Mode → Students now includes toggles for:

```txt
Show schedule date
Show student check-in
Show reward board
Show support buttons
Show break plan
Show transition supports
Show activities section on Board
```

These are in addition to existing toggles such as:

```txt
Show Choose tab
Show Make tab
Show Choice Board tab
Show progress bar
Show timers
Show support-level controls
```

### Cleaner Simple / Standard / Advanced behavior

The presets now set more opinionated defaults:

```txt
Simple:
Today + Board, fewer panels, no schedule date, no transition panel, no activity section on Board.

Standard:
Today + Choose + Make + Board, moderate detail, no check-in by default, no Board activity section.

Advanced:
Full workflow and all optional student panels.
```

### Stronger prototype/privacy warning

Staff Mode → Save now shows a stronger warning:

```txt
Do not enter real student/client data yet.
AccessFlow is not HIPAA/FERPA/agency-compliance ready.
Use mock data only.
```

### Staff access hiding tightened

When staff access is hidden in Student Mode, v22 hides both:

```txt
Top Staff Mode switch
Student-side staff access panel
```

### New project quality documents

Added:

```txt
QA_CHECKLIST.md
KNOWN_LIMITATIONS.md
ROADMAP.md
```


## v23 Backend Architecture + Data Safety Pack

v23 prepares AccessFlow for the next backend phase while keeping snapshot sync active.

### New Staff Save-tab panels

Staff Mode → Save now includes:

```txt
Data health
Backend migration status
```

### Data health checks

The data health panel summarizes:

```txt
Profiles
Activities
Steps
Support events
Goals
Estimated snapshot size
Large uploaded image warnings
Legacy schedule warnings
Mock-data safety checklist
```

### Normalized export scaffold

Staff Mode → Save now includes:

```txt
Export normalized JSON
```

This exports table-like data for:

```txt
profiles
schedules
activities
steps
supportEvents
progressGoals
dailyNotes
choiceBoardItems
visualLibraryItems
templates
```

### Backend architecture scaffold

Added:

```txt
src/utils/dataHealth.js
src/utils/normalizedExport.js
src/components/DataHealthPanel.jsx
src/components/BackendArchitecturePanel.jsx
database/v23-normalized-rls-policies.sql
BACKEND_MIGRATION_NOTES.md
```

### Important note

Snapshot sync remains the active data system in v23. The normalized schema and RLS policies are scaffolds for the future backend migration.


## v24 Clean Accessibility GUI Pass

v24 focuses on visual clarity, keyboard access, and reducing Student Mode clutter.

### New Student panel layout setting

Staff Mode → Students now includes:

```txt
Student panel layout:
- Open panels
- Grouped panels
- Minimal collapsed panels
```

### What this changes

```txt
Open panels:
Shows optional Student Mode panels directly.

Grouped panels:
Puts optional panels into labeled groups such as Start tools and Help tools.

Minimal collapsed panels:
Keeps optional tools collapsed by default for a calmer interface.
```

### Student Mode improvements

- Added Student display summary strip.
- Added grouped optional tool panels.
- Added cleaner panel spacing.
- Added stronger focus-visible styling.
- Added skip-to-content link.
- Fixed inherited missing StudentView props for check-in/reward handlers.
- Improved mobile spacing.
- Staff Save/Data panels are more consistently full-width.

### Accessibility intent

The goal is to support lower cognitive load:

```txt
One clear student task area.
Optional tools are discoverable but not always visually loud.
Keyboard users can skip directly to content.
Focus states are easier to see.
```


## v25 Accessibility Presets + Guided Configuration

v25 adds a staff-facing guided configuration panel so staff do not need to understand every Student Mode toggle before creating a usable setup.

### New Staff Mode panel

Staff Mode → Students now includes:

```txt
Student Mode presets
```

### Presets

```txt
Simple visual schedule
AAC / communication board
First / Then support
Transition and regulation support
Advanced learning and self-management
```

Each preset applies both:

```txt
displaySettings
independenceSettings
```

### Why this matters

AccessFlow now has many accessibility settings. Presets make setup safer and cleaner by starting from an intentional configuration instead of exposing every student to every tool.

### Example

AAC / communication board applies:

```txt
Board-only layout
Extra-large touch targets
Icons and words
Minimal collapsed panels
Schedule-building tools hidden
Board activity section hidden
Reduced motion
```


## v26 Codebase Documentation + Compliance Readiness Pack

v26 focuses on maintainability and privacy/security readiness.

### Codebase documentation added

```txt
CODEBASE_INDEX.md
FUNCTION_REFERENCE.md
ARCHITECTURE_OVERVIEW.md
DEVELOPER_ONBOARDING.md
```

The generated function reference found 316 functions/components across 98 source files.

### Compliance readiness documentation added

```txt
HIPAA_FERPA_READINESS.md
COMPLIANCE_GAP_ANALYSIS.md
SECURITY_CONTROLS_CHECKLIST.md
PRIVACY_SECURITY_READINESS.md
```

### Staff-facing compliance panel

Staff Mode → Save now includes:

```txt
HIPAA / FERPA status
```

This panel clearly states that AccessFlow is prototype-only and lists production gaps.

### Important compliance note

v26 does not make AccessFlow HIPAA-compliant or FERPA-compliant. It documents the current state, adds readiness scaffolding, and defines the technical/operational gaps that must be closed before real data use.


## v27 Architecture Refactor Pack

v27 starts cleaning and modularizing the codebase without changing the product behavior.

### Refactor focus

`App.jsx` was carrying too much pure helper logic. v27 moves several helper areas into dedicated utility modules.

### New utility modules

```txt
src/utils/readAloudHelpers.js
src/utils/cloudErrorHelpers.js
src/utils/studentActionHelpers.js
src/utils/dateCopyHelpers.js
src/utils/staffExportHelpers.js
src/utils/workspacePayloadHelpers.js
```

### What moved out of App.jsx

```txt
Read-aloud text cleanup
Emoji/visual-noise removal
Speech synthesis helper
Cloud/Supabase error formatting
Student confirmation helper
Student audio feedback helper
Tomorrow/weekday date helpers
Staff CSV export builders
Single-profile export payload helper
Workspace backup payload helper
```

### Refactor result

```txt
App.jsx before: 1742 lines
App.jsx after: 1608 lines
Source files after v27: 105
Detected functions/components after v27: 328
```

### New documentation

```txt
REFACTOR_NOTES.md
CODEBASE_INDEX.md refreshed
FUNCTION_REFERENCE.md refreshed
ARCHITECTURE_OVERVIEW.md updated
```

### Next recommended refactor

The next deeper refactor should split `App.jsx` into hooks:

```txt
useProfiles
useScheduleActions
useStudentActions
useStaffExports
useCloudSync
useAuthSession
useWorkspaceDirtyState
```


## v28 Hook Refactor Pack

v28 continues the architecture cleanup by moving React side-effect logic out of `App.jsx`.

### New hook modules

```txt
src/hooks/useThemeEffect.js
src/hooks/useReadAloudEffect.js
src/hooks/useLegacyStudentViewMigration.js
src/hooks/useSupabaseSessionEffect.js
src/hooks/useWorkspaceDirtyState.js
```

### What moved out of App.jsx

```txt
Document theme synchronization
Read-aloud click listener
Legacy studentViewMode migration
Supabase current-session loading
Supabase auth-change subscription
Workspace dirty-state refs/effect
Unsaved cloud change reminder state
```

### Refactor result

```txt
App.jsx v26: 1742 lines
App.jsx v27: 1608 lines
App.jsx v28: 1521 lines
```

### Updated documentation

```txt
HOOK_REFACTOR_NOTES.md
REFACTOR_NOTES.md
CODEBASE_INDEX.md
FUNCTION_REFERENCE.md
ARCHITECTURE_OVERVIEW.md
```

### Next recommended refactor

```txt
useProfileActions
useScheduleActions
useStudentActions
useStaffExports
useCloudSnapshotActions
```


## v29 Action Hook Refactor Pack

v29 continues the architecture cleanup by moving action-heavy handler groups out of `App.jsx`.

### New action hooks

```txt
src/hooks/useScheduleCopyActions.js
src/hooks/useStaffExportActions.js
src/hooks/useProgressGoalActions.js
src/hooks/useVisualLibraryActions.js
src/hooks/useSupportPlanActions.js
```

### Handler groups moved

```txt
Schedule copy actions
Staff report/export actions
Progress goal actions
Visual library actions
Check-in/reward/reinforcement/regulation/session-note actions
```

### Important fix

v29 resolves undefined handler references for newer features by supplying those handlers through dedicated hooks.

### Refactor result

```txt
App.jsx v26: 1742 lines
App.jsx v27: 1608 lines
App.jsx v28: 1521 lines
App.jsx v29: 1513 lines
```

The v29 line reduction is small because this release restores missing handler coverage while modularizing behavior. The structural improvement is the important part.

### Updated documentation

```txt
ACTION_HOOK_REFACTOR_NOTES.md
REFACTOR_NOTES.md
CODEBASE_INDEX.md
FUNCTION_REFERENCE.md
ARCHITECTURE_OVERVIEW.md
```


## v30 Final Refactor + Cleanup Pass

v30 completes the current code cleanup phase before returning to new feature development.

### Main result

```txt
App.jsx v26: 1742 lines
App.jsx v27: 1608 lines
App.jsx v28: 1521 lines
App.jsx v29: 1513 lines
App.jsx v30: 750 lines
```

### Structural result

`App.jsx` no longer declares named `handle*` functions. Action-heavy logic now lives in focused domain hooks.

### New v30 hooks

```txt
src/hooks/useAuthActions.js
src/hooks/useProfileActions.js
src/hooks/useModeDateActions.js
src/hooks/useBoardActions.js
src/hooks/useDailyDocumentationActions.js
src/hooks/useCloudSnapshotActions.js
src/hooks/useScheduleActivityActions.js
src/hooks/useActivityBankActions.js
src/hooks/useTemplateActions.js
src/hooks/useStaffSettingsActions.js
src/hooks/useFirstThenActions.js
```

### What remains in App.jsx

```txt
global state declarations
selected profile/activity derivation
workspace data derivation
small app-level helper wrappers
StudentView / StaffView prop wiring
top-level shell rendering
```

### New documentation

```txt
FINAL_REFACTOR_REPORT.md
CODEBASE_INDEX.md refreshed
FUNCTION_REFERENCE.md refreshed
REFACTOR_NOTES.md updated
ARCHITECTURE_OVERVIEW.md updated
HOOK_REFACTOR_NOTES.md updated
ACTION_HOOK_REFACTOR_NOTES.md updated
```

### Current cleanup status

The codebase is now clean enough to resume feature planning and disability-support product design. Future cleanup can still happen, but it is no longer the blocker.


## v31 Communication + Regulation Support Pack

v31 resumes product development after the v30 cleanup phase.

### Student-facing supports added

```txt
Pain/body communication board
Sensory request board
Guided regulation pathway
Waiting support card
```

### Where these appear

Student Mode → Today → Communication tools

The tools respect the v24/v25 grouped/minimal Student Mode layout system so they are discoverable without overwhelming the main schedule.

### Staff-facing setup added

Staff Mode → Students now includes:

```txt
Communication supports
```

Staff can review the pain/body board, regulation pathway, waiting support, and sensory requests. Staff can add/remove sensory requests and adjust the waiting timer.

### New display toggles

```txt
showPainBodyPanel
showSensoryPanel
showRegulationPathway
showWaitingSupport
```

These are available in Staff Mode → Students → Student display and access settings.

### Prototype safety

Pain/body communication is not diagnosis, triage, or medical advice. It is a communication support. Staff must still follow agency health/safety procedures.


## v32 Choice + Self-Advocacy Pack

v32 adds student-facing self-advocacy tools that support choice-making, help requests, refusal/uncertainty, and schedule negotiation.

### Student-facing supports added

```txt
Yes / No / Maybe board
Help request builder
Two-choice / three-choice decision support
I'm stuck pathway
Schedule change request tool
```

### Where these appear

Student Mode → Today → Self-advocacy tools

These tools follow the existing grouped/minimal Student Mode layout so they can be available without cluttering the main schedule.

### Staff-facing setup added

Staff Mode → Students now includes:

```txt
Self-advocacy
```

Staff can review defaults, add/remove help topics, and add/remove decision choices.

### New display toggles

```txt
showYesNoPanel
showHelpRequestBuilder
showDecisionSupport
showStuckPathway
showScheduleChangeRequest
```

### Purpose

v32 gives students more ways to communicate:

```txt
yes
no
maybe
I don't know
I need help with...
help me by...
I choose...
I'm stuck because...
I want a change
```


## v33 Communication History + Mobile Polish + Guided Schedule Builder

v33 combines three requested directions after v32:

```txt
Communication history dashboard
Mobile comfort polish
Guided schedule builder
```

### Communication history

Staff Mode → Notes now includes:

```txt
Communication history
```

This summarizes student communication/self-advocacy events such as:

```txt
pain/body messages
sensory requests
regulation pathway events
waiting supports
yes/no responses
help requests
decision choices
stuck pathway messages
schedule change requests
```

### Guided schedule builder

Student Mode → Choose now includes:

```txt
Build my day
```

The student can pick activities across sections:

```txt
Start
Work / school
Break
Reward / fun
```

The builder respects staff guardrails and only appears when the student can build their schedule.

### Mobile comfort polish

v33 adds a sticky mobile quick navigation bar for Student Mode on small screens. It mirrors the available Student Mode tabs and keeps navigation easier on phones.


## v39 Leap Forward Pack

v39 includes the feature lines that would have been v35 through v39 and packages them as one larger release.

### Included feature lines

```txt
v35 Goal-aware support planning
v36 Community access / safety cards
v37 Vocational task mode
v38 Caregiver / family handoff mode
v39 Normalized backend readiness start
```

### Student Mode additions

Student Mode → Today now includes a grouped Life skills tools section when enabled:

```txt
Community access / safety cards
Vocational task mode
```

### Staff Mode additions

Staff Mode → Students:

```txt
Life skills settings
```

Staff Mode → Notes:

```txt
Goal-aware support recommendations
Caregiver / family handoff generator
```

Staff Mode → Save:

```txt
Normalized backend readiness
```

### Backend note

Snapshot sync remains the active data layer. v39 adds a migration scaffold and a staff-facing readiness map, but it does not switch the app to normalized production tables.


## v40 Stabilization + Feature Presets + Release Candidate

v40 is a release-candidate stabilization pass after the v31-v39 feature expansion.

### Added

```txt
Feature preset engine
Staff feature map / quick jump
Release candidate checklist
Mobile stabilization notes
Feature map documentation
```

### Presets added

```txt
Simple visual schedule
AAC / communication support
Regulation and transition support
High autonomy schedule builder
Community access
Vocational / job coach
Residential / caregiver handoff
Advanced full support
```


## v41 Self-Advocacy Passport + Support Pattern Log

v41 adds a student-facing About Me passport, staff About Me editor, copyable About Me export,
quick support observation log, and activity-level support pattern summaries.

### Added

```txt
Student About Me profile
Staff About Me editor
About Me copy/export panel
Staff observation/support pattern log
Activity support pattern indicators
What worked last time summaries
```


## v42 Activity Readiness + Reflection Pack

v42 adds activity-prep, reflection, and try-again-later supports.

### Student Mode additions

```txt
Prepare for activity
Activity reflection
Try again later request
```

### Staff Mode additions

```txt
Activity readiness review
Try-again-later queue
```


## v43 Alternative Access + Calm Mode Pack

v43 adds alternative access and calm-mode supports.

### Student Mode additions

```txt
Calm screen
Communication repair board
Switch scanning prototype
Large-button help / emergency support mode
```

### Staff Mode additions

```txt
Alternative access guide
Alternative access / eye gaze preset
Calm-first reduced choice preset
```

### Prototype note

Switch scanning is a front-end prototype, not hardware-switch integration yet.


## v43.1 Prototype Warning Patch

v43.1 adds a persistent bottom-of-page prototype/privacy warning footer to both Student Mode and Staff Mode.

The footer states that AccessFlow is not HIPAA certified, not FERPA certified, not production-reviewed, and must not be used with real student/client data.


## v44 AAC Expansion + Social Communication Pack

v44 adds AAC expansion supports.

### Student Mode additions

```txt
Core words
Quick phrases
Feelings + intensity
Social scripts
```

### Staff Mode additions

```txt
AAC expansion editor
Expanded AAC communication preset
```

These supports complement the existing Board and communication repair tools.


## v45 Icon Library + Visual Symbol Flexibility Pack

v45 adds Font Awesome Free icon support as a new visual source.

### Added

```txt
Curated Font Awesome icon library
Reusable IconSymbol renderer
Staff icon picker
Font Awesome visual type in Visual Library
Icon support for AAC expansion buttons
Staff AAC icon selector
Font Awesome license note
```

### Accessibility rule

Icons are visual supports only. Labels stay visible and remain the read-aloud, screen-reader, event-log, and documentation text.


## v46 Universal Symbol Labels + AAC Visual Editing Pack

v46 extends the v45 icon system.

### Added

```txt
Staff editing for existing AAC icons
Staff editing for existing AAC emoji fallbacks
Staff editing for existing AAC labels
Live AAC visual preview
IconSymbol support for calm screen
IconSymbol support for communication repair
IconSymbol support for activity prep/reflection
IconSymbol support for switch scanning
```

Labels remain visible and remain the communication/read-aloud/event-log source.


## v47 Communication Visual Customization Pack

v47 expands visual-symbol editing beyond AAC.

### Staff-editable visual fields

```txt
Sensory requests
Yes/no responses
Help topics
Help actions
Decision choices
Stuck reasons
Schedule change requests
Community cards
Vocational actions
```

Staff can edit each item’s label, emoji fallback, and Font Awesome icon. Labels remain visible and remain the semantic communication/read-aloud/event-log value.


## v48 Visual Library Assignment Pack

v48 lets staff assign saved Visual Library items to communication buttons.

### Supported saved visual sources

```txt
Emoji visuals
Font Awesome icon visuals
Uploaded image/photo visuals
```

### Applies to

```txt
AAC expansion buttons
Sensory requests
Yes/no responses
Help topics/actions
Decision choices
Stuck reasons
Schedule change requests
Community cards
Vocational actions
```

Labels stay visible and remain the read-aloud/event-log/screen-reader text.


## v49 Visual Coverage Audit + Suggested Icons Pack

v49 adds a staff visual coverage audit.

### Staff Mode addition

```txt
Communication visual audit
```

The audit summarizes:

```txt
Saved image/photo visuals
Font Awesome icon visuals
Emoji-only visuals
Text fallback visuals
```

Staff can apply suggested Font Awesome icons to items that are currently emoji-only or text-fallback while preserving labels as the communication/read-aloud/event-log text.


## v50 Solid Release Candidate + Visual Preference Pack

v50 is a cleanup/refactor/documentation release candidate with two new features.

### New feature 1: Student visual preference modes

```txt
Balanced visuals + labels
Large visuals
Label-first
Labels only
```

Visual preference changes emphasis only. Labels remain visible and remain the read-aloud, screen-reader, event-log, and export/documentation value.

### New feature 2: Staff release readiness dashboard

Staff Mode → Dashboard includes a v50 release readiness panel that summarizes prototype warning status, visual coverage, label-preservation status, visual preference status, Visual Library status, support-event logging, and recommended manual QA steps.

### v50 cleanup/refactor files

```txt
src/utils/visualPreferences.js
src/utils/releaseReadiness.js
src/components/StaffReleaseReadinessPanel.jsx
V50_SOLID_RELEASE_CANDIDATE_REPORT.md
V50_CLEANUP_AND_REFACTOR_NOTES.md
```


## v50.1 Render Fix

v50.1 fixes invalid JSX syntax in four Student Mode panels that caused Render/Vite deployment failure. No feature behavior changed.


## v51 Student Navigation Cleanup Pack

v51 splits Student Mode into Profile, Schedule, Choose, Make, Board, Relax, and Games. This lowers clutter by moving profile/check-in tools, schedule tools, communication tools, and calm/regulation tools into separate screens.


## v51.1 Staff Mode Fix

v51.1 fixes a Staff Mode white-screen runtime crash caused by a missing `StaffReleaseReadinessPanel` import in `StaffView.jsx`.


## v51.2 Staff Auth Gate Fix

v51.2 adds a dedicated Staff Auth Gate. If Staff Mode is opened while signed out, the app now shows login/create-account UI instead of rendering StaffView and risking a white screen.


## v51.3 Navigation Symmetry Pack

v51.3 makes Student Mode and Staff Mode both use 8-tab navigation. Student Mode adds Help. Staff Mode adds Reports. Both tab bars are styled as matching 2x4 grids.


## v51.4 Duplicate Tabs Fix

v51.4 fixes Student Mode showing duplicate tab bars by removing the old `student-mobile-quick-nav` rendering block.


## v52 Simple Games Pack

v52 adds a real Student Mode Games panel with Rock Paper Scissors, Choice / Color Wheel, Word Rescue, Tic Tac Toe, Snake, Dino Jump, Memory Match, and Float Bird. Games are prototype-level, touch-friendly, low-stimulation, and do not require student/client data.


## v53 GUI Declutter Trial

v53 changes the default Student Mode from a full 8-tab layout to a lower-clutter Core preset: Schedule, Talk, Help, Calm. Advanced sections such as Me, Choose, Make, and Games remain available through staff-controlled navigation presets.


## Version feature history

Per-version report files have been consolidated into `VERSION_FEATURES.md` so the project root is less cluttered.


## v53.1 Choice Wheel Upgrade

v53.1 upgrades the Choice Wheel game so it visually spins and lets the user label each color segment with a custom choice.


## v53.2 Student Choice-to-Schedule Clarity Fix

v53.2 makes student independence more visible. The Core student navigation is now Schedule, Add, Talk, Help, Calm. The Schedule screen also includes an Add to schedule launcher so students can add approved staff-created choices without remembering where the old Choose screen is.
