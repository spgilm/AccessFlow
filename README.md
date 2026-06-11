# AccessFlow v4

AccessFlow is a mobile-first adaptive visual schedule web app for students/clients who benefit from visual structure, task analysis, and simplified daily routines.

## Version 4 focus

Version 4 adds the first real staff-side organization layer:

- Student/client profiles
- Profile-specific schedules
- Reusable schedule templates
- Apply templates to selected profiles
- Save a selected profile's current schedule as a reusable template

This keeps the app frontend-only while making it feel more like a real support tool.

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
- Move activities up/down
- Delete activities
- Reset demo data
- Clear selected profile schedule
- localStorage persistence
- Render-ready static site config

## Important prototype limitations

This version stores everything in browser localStorage:

- Profiles
- Schedules
- Templates
- Uploaded images as data URLs

That is acceptable for a prototype, but not production.

For production, these should move to a backend database and object storage:

- PostgreSQL/Supabase for profiles, schedules, templates, and completion logs
- Supabase Storage, Cloudinary, S3-compatible storage, or Firebase Storage for images

## Why no real AI image API yet?

Version 4 still avoids direct AI image generation from the browser.

Reason:

- Frontend-only apps cannot safely store API keys.
- Browser-exposed API keys can be copied.
- Generated images should be moderated, cached, and stored through a backend.

The placeholder remains in:

```txt
src/services/imageProvider.js
```

Later, this can call a backend endpoint:

```txt
POST /api/generate-image
```

The backend would hold API keys in environment variables.

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

## Useful demo prompts

Try:

- brush teeth
- wash hands
- get dressed
- eat breakfast
- pack backpack
- take medication
- clean table
- go outside
- reading group
- speech therapy

Unknown prompts still create a simple schedule card with a best-guess emoji and generic steps.

## Recommended v5

The next version should probably add one of these:

1. Completion history / documentation notes
2. Export daily progress as a staff note
3. Backend persistence
4. Real authentication and staff/student permissions
5. AI-generated task analysis through a backend
