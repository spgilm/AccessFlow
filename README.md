# AccessFlow Starter

AccessFlow is a mobile-first adaptive visual schedule web app for students/clients who benefit from visual structure, task analysis, and simplified daily routines.

This first iteration is intentionally frontend-only:

- React + Vite
- Mobile-first layout
- Emoji-based visual schedule cards
- Local task generation for common activities
- Step-by-step task breakdowns
- localStorage persistence
- Render-ready static site config

## Why no real AI image API yet?

Version 1 uses a local task generator and emoji visuals. This keeps the app safe, fast, free, and deployable without API keys.

A real AI image service should be added later through a backend route, not directly in the browser. Browser-exposed API keys can be copied by users.

The placeholder is in:

```txt
src/services/imageProvider.js
```

Later, that file can call a backend endpoint such as:

```txt
POST /api/generate-image
```

The backend would hold the API key in environment variables.

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

Create a new Static Site on Render and connect the GitHub repository.

Use:

```txt
Build Command: npm install && npm run build
Publish Directory: dist
```

This repo also includes `render.yaml`.

## Current MVP behavior

Type a task such as:

```txt
brush teeth
```

The app generates:

```txt
🪥 TOOTH BRUSHING
```

Tapping the activity opens a step breakdown:

1. Get toothbrush
2. Add toothpaste
3. Brush top teeth
4. Brush bottom teeth
5. Rinse

Each step has an emoji visual and can be marked complete.

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

Unknown prompts will still create a simple schedule card with a best-guess emoji and generic steps.

## Project structure

```txt
accessflow-starter-v1/
  public/
  src/
    components/
      ActivityCard.jsx
      ActivityDetail.jsx
      AddActivityForm.jsx
      EmptyState.jsx
      ProgressSummary.jsx
      ScheduleList.jsx
    data/
      activityTemplates.js
      starterActivities.js
    hooks/
      useLocalStorage.js
    services/
      imageProvider.js
      taskGenerator.js
    utils/
      formatters.js
    App.jsx
    main.jsx
    styles.css
  index.html
  package.json
  render.yaml
  vite.config.js
```

## Next recommended milestones

1. Add staff/editor mode with reorder controls.
2. Add image upload for staff-created images.
3. Add speech-to-text task entry using the Web Speech API where supported.
4. Add a backend for accounts and persistent schedules.
5. Add safe AI generation through a backend-only API proxy.
6. Add educator documentation/export features.
