# AccessFlow v8

AccessFlow is a mobile-first adaptive visual schedule web app for students/clients who benefit from visual structure, task analysis, and simplified daily routines.

## Version 8 focus

Version 8 adds the first real authentication and user-scoped backend boundary:

- Optional Supabase email/password auth
- Auth status panel
- Sign up
- Sign in
- Sign out
- Authenticated user-scoped cloud snapshots
- Authenticated row-level-security schema
- LocalStorage fallback when Supabase is not configured
- Manual JSON backup/import preserved

This version is still a prototype, but it is a more serious backend foundation than the v7 anon snapshot sync.

## Default behavior

Without Supabase environment variables, AccessFlow still works as a local static app:

```txt
browser localStorage only
```

## Optional Supabase setup

### 1. Create a Supabase project

Create a project in Supabase.

### 2. Run the v8 SQL schema

Open Supabase SQL Editor and run:

```txt
database/supabase-schema.sql
```

This creates or updates:

```txt
accessflow_workspace_snapshots
```

The table uses:

```txt
user_id = auth.uid()
```

and row-level security so each authenticated user can only access their own snapshots.

### 3. Enable email/password auth

In Supabase Auth settings, enable email/password signups. Depending on your Supabase project settings, users may need to confirm email before signing in.

### 4. Add environment variables to Render

In Render, add:

```txt
VITE_SUPABASE_URL=your Supabase project URL
VITE_SUPABASE_ANON_KEY=your Supabase anon key
VITE_ACCESSFLOW_WORKSPACE_LABEL=prototype
```

Then redeploy.

### 5. Use Staff Mode

Staff Mode will show:

- Account panel
- Supabase sync panel

After signing in, staff can:

- Save cloud snapshot
- Load latest snapshot

## Security warning

v8 is safer than v7 because snapshots are scoped to authenticated users by RLS.

It is still not production-complete for real student/client data.

Before using with real PII/PHI, add:

- organization accounts
- staff roles
- student/client profile permissions
- audit logging
- explicit data retention rules
- image storage with access policies
- normalized database tables instead of full JSON snapshots

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
Build Command: npm install && npm run build
Publish Directory: dist
```

This repo also includes `render.yaml`.

## Recommended v9

The next version should either:

1. Normalize the Supabase schema beyond JSON snapshots, or
2. Add AI-generated task analysis through a backend API.

For real-world deployment, normalized database tables should come before serious multi-user use.
