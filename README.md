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
