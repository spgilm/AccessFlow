# AccessFlow v2

AccessFlow is a mobile-first adaptive visual schedule web app for students/clients who benefit from visual structure, task analysis, and simplified daily routines.

## Version 2 focus

This version separates the app into two modes:

- **Student Mode**: clean, low-clutter visual schedule interaction.
- **Staff Mode**: setup and editing tools for caregivers, teachers, specialists, or support staff.

## Included features

- React + Vite frontend
- Mobile-first layout
- Student / Staff mode toggle
- Emoji-based visual schedule cards
- Local task generation for common activities
- Step-by-step task breakdowns
- Completion tracking
- Now / Next display
- Progress bar
- Add activity from a general task prompt
- Edit activity label
- Edit activity emoji
- Edit activity summary
- Edit step labels and emojis
- Add steps
- Delete steps
- Move activities up/down
- Move steps up/down
- Delete activities
- Reset demo schedule
- Clear schedule
- localStorage persistence
- Render-ready static site config

## Why no real AI image API yet?

Version 2 still uses local task generation and emoji visuals. This keeps the app safe, free, and deployable without API keys.

A real AI image service should be added later through a backend route, not directly in the browser. Browser-exposed API keys can be copied by users.

The placeholder is in:

```txt
src/services/imageProvider.js
```

Later, that file can call a backend endpoint such as:

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

Create a new Static Site on Render and connect the GitHub repository.

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

Unknown prompts will still create a simple schedule card with a best-guess emoji and generic steps.

## Project structure

```txt
accessflow-v2/
  public/
  src/
    components/
      ActivityCard.jsx
      AddActivityForm.jsx
      EmptyState.jsx
      ModeToggle.jsx
      ProgressSummary.jsx
      StaffActivityEditor.jsx
      StaffActivityList.jsx
      StaffView.jsx
      StudentActivityDetail.jsx
      StudentView.jsx
    data/
      activityTemplates.js
      starterActivities.js
    hooks/
      useLocalStorage.js
    services/
      imageProvider.js
      taskGenerator.js
    utils/
      activityHelpers.js
      formatters.js
    App.jsx
    main.jsx
    styles.css
  index.html
  package.json
  render.yaml
  vite.config.js
```

## Recommended v3

The next version should add one of these:

1. **Speech-to-text task entry** using the Web Speech API where supported.
2. **Custom image upload** so staff can use real photos instead of emojis.
3. **First / Then focused student view** for users who need a lower-cognitive-load interface.
