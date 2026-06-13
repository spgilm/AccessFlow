# AccessFlow Developer Onboarding

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Important folders

```txt
src/components    React UI components
src/data          Default settings, starter profiles, presets, static data
src/utils         Pure helper functions and export/report logic
src/services      Supabase/task-generation/service integration logic
src/hooks         Shared React hooks
database          Supabase SQL scaffolds
public            PWA/service worker files
```

## Current deployment

Render Static Site.

```txt
Build Command: npm install --registry=https://registry.npmjs.org/ && npm run build
Publish Directory: dist
```

## Rules for new features

1. Do not add student-facing panels without adding a visibility setting or preset behavior.
2. Do not enter real student/client data in demo/test environments.
3. Preserve Student Choices bank vs Today's Schedule distinction.
4. Preserve Student Mode autonomy.
5. Keep Staff Mode configuration grouped by workflow.
6. Update CODEBASE_INDEX.md and FUNCTION_REFERENCE.md after major changes.
7. Add QA checklist items for new student-facing features.
