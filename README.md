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
