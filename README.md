# AccessFlow v3

AccessFlow is a mobile-first adaptive visual schedule web app for students/clients who benefit from visual structure, task analysis, and simplified daily routines.

## Version 3 focus

Version 3 makes the prototype more useful for real access needs while staying frontend-only:

- Student-facing **Full Schedule** view
- Student-facing **First / Then** view
- Staff-uploaded custom images for activities
- Staff-uploaded custom images for steps
- Optional speech-to-text task entry where supported by the browser
- Existing v2 staff editing, reordering, local generation, and localStorage persistence

## Included features

- React + Vite frontend
- Mobile-first layout
- Student / Staff mode toggle
- Student Full Schedule / First-Then view toggle
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
- Reset demo
- Clear schedule
- localStorage persistence
- Render-ready static site config

## Important limitation

Uploaded images are stored in browser localStorage as data URLs. This is good for a local prototype, but not final production storage.

For production, uploaded images should move to backend/object storage such as:

- Supabase Storage
- S3-compatible storage
- Cloudinary
- Firebase Storage

## Why no real AI image API yet?

Version 3 still avoids direct AI image generation from the browser.

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

Create or use an existing Render Static Site connected to GitHub.

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

## Recommended v4

The next version should likely add one of these:

1. **Reusable schedule templates**
2. **Student/client profiles**
3. **Backend persistence**
4. **Caregiver/staff login**
5. **AI-generated step breakdowns through a backend**
