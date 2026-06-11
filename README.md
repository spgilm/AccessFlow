# AccessFlow v9

AccessFlow is a mobile-first adaptive visual schedule web app for students/clients who benefit from visual structure, task analysis, and simplified daily routines.

## Version 9 focus

Version 9 builds on the working v8.1 Supabase prototype and improves sync safety/clarity:

- Clearer Supabase connection status
- Staff account shown in the sync panel
- Last saved timestamp
- Last loaded timestamp
- Unsaved cloud changes indicator
- Save reminder after local workspace changes
- Confirmation prompt before loading a cloud snapshot
- Better Supabase error messages for grants, RLS, sessions, and network issues
- Stronger prototype/privacy warning in Staff Mode
- v9 SQL schema includes explicit `authenticated` table grants
- Render-safe npm settings preserved

## Default behavior

Without Supabase environment variables, AccessFlow still works as a local static app using browser localStorage.

## Optional Supabase setup

### 1. Create a Supabase project

Create a project in Supabase.

### 2. Run the v9 SQL schema

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

v9 is a prototype. Use fake names and test records only.

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
- Student Full Schedule / First-Then view toggle
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

## Recommended v10

The next version should probably start normalizing the Supabase schema beyond full JSON snapshots, beginning with organization/profile/activity tables and role-based access boundaries.
