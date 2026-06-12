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
