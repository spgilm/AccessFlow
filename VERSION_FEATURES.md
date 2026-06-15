# AccessFlow Version Features

This file replaces the scattered per-version report markdown files. It keeps the feature history in one place so the project root stays less cluttered.

## v53.2 — Student Choice-to-Schedule Clarity Fix

Restores the independence path after the v53 declutter pass.

Changes:

```txt
Default Core navigation is now Schedule, Add, Talk, Help, Calm
Choose tab is renamed Add for student-facing clarity
Schedule screen now includes an Add to schedule launcher
Students can add approved choices directly from Schedule
Staff choice-bank language now says schedule choices / activities the student can add
Empty states explain that staff must add activity choices first
```

Product decision:

```txt
Independence tools should be visible in the student workflow.
Decluttering should not hide the path to self-directed scheduling.
```

## v53.1 — Choice Wheel Upgrade

Upgraded the Games tab Choice Wheel.

Changes:

```txt
Wheel visually spins before selecting
Each color segment can be labeled with a custom choice
Result shows the selected custom label
Reset labels button added
Color names are defaults, not fixed choices
```

## Current release: v53.0 — GUI Declutter Trial

**Purpose:** pause feature expansion and test a lower-clutter Student Mode.

**Student Mode default navigation:**

```txt
Schedule | Talk | Help | Calm
```

**Student navigation presets:**

```txt
Core: Schedule, Talk, Help, Calm
Simple: Schedule, Help, Calm
Communication: Talk, Help, Calm, Schedule
Builder: Schedule, Choose, Make, Help
Full: Me, Schedule, Choose, Make, Talk, Help, Calm, Games
Custom toggles
```

**Student-facing language changes:**

```txt
Profile -> Me
Board -> Talk
Relax -> Calm
```

**Staff Mode changes:**

```txt
Save -> Settings
```

Added `StaffGuiReviewPanel` to the Staff Dashboard to help catch when Student Mode is drifting back into a full/custom layout that may need review.

## v52.0 — Simple Games Pack

Added the Student Mode Games panel with:

```txt
Rock Paper Scissors
Choice / Color Wheel
Word Rescue
Tic Tac Toe
Snake
Dino Jump
Memory Match
Float Bird
```

Word Rescue is the kid-friendly Hangman-style game. It uses “rescue the word” language and avoids hangman wording or imagery.

## v51.4 — Duplicate Tabs Fix

Removed the old `student-mobile-quick-nav` block so Student Mode shows one tab bar instead of two.

## v51.3 — Navigation Symmetry Pack

Added an 8-tab structure for both Student Mode and Staff Mode.

**Student tabs:**

```txt
Profile | Schedule | Choose | Make
Board   | Help     | Relax  | Games
```

**Staff tabs:**

```txt
Dashboard | Setup | Students | Choices
Schedule  | Notes | Reports  | Save
```

## v51.2 — Staff Auth Gate Fix

Added a signed-out Staff Mode gate. If Staff Mode is opened without a staff session, AccessFlow shows a login/create-account screen instead of rendering the full StaffView.

## v51.1 — Staff Mode Fix

Added the missing `StaffReleaseReadinessPanel` import in `StaffView.jsx`.

## v51.0 — Student Navigation Cleanup Pack

Split the old overloaded Today screen into clearer Student Mode sections:

```txt
Profile
Schedule
Choose
Make
Board
Relax
Games
```

## v50.1 — Render JSX Fix

Fixed invalid JSX in four student panels:

```txt
src/components/StudentYesNoPanel.jsx
src/components/StudentSensoryPanel.jsx
src/components/StudentCommunityAccessPanel.jsx
src/components/StudentVocationalTaskPanel.jsx
```

## v50.0 — Solid Release Candidate + Visual Preference Pack

Added Student visual preference modes:

```txt
Balanced visuals + labels
Large visuals
Label-first
Labels only
```

Added Staff release readiness dashboard.

## v49.0 — Visual Coverage Audit + Suggested Icons

Added communication visual audit and suggested Font Awesome icon application for weak visual items.

## v48.0 — Visual Library Assignment Pack

Staff can assign saved Visual Library items to AAC and communication buttons, including emoji, Font Awesome, and uploaded image visuals.

## v47.0 — Communication Visual Customization Pack

Added reusable `StaffVisualChoiceEditor` and staff visual editing for sensory, self-advocacy, community, and vocational communication tools.

## v46.0 — Universal Symbol Labels + AAC Visual Editing

Staff can edit AAC labels, emoji fallbacks, and Font Awesome icons. More student panels use `IconSymbol`.

## v45.0 — Icon Library + Visual Symbol Flexibility

Added Font Awesome support, curated icon library, `IconSymbol`, and Staff Icon Library panel.

## v44.0 — AAC Expansion + Social Communication Pack

Added core words, quick phrases, feelings/intensity, social scripts, and staff AAC expansion settings.

## v43.1 — Prototype Warning Patch

Added persistent prototype safety footer warning:

```txt
Prototype only. Not HIPAA certified. Not FERPA certified. Do not use real student/client data.
```

## v43.0 — Alternative Access + Calm Mode Pack

Added calm screen, communication repair, large-button help mode, switch scanning prototype, eye-gaze friendly preset, calm-first preset, and staff alternative access guide.

## v42.0 — Activity Readiness + Reflection Pack

Added activity prep, reflection, try-again-later request, readiness review, and try-again-later queue.

## v41.0 — Self-Advocacy Passport + Support Pattern Log

Added About Me/self-advocacy passport, staff About Me editor, export, observation log, and activity support pattern indicators.

## v40.0 — Stabilization + Feature Presets + Release Candidate

Added feature presets, feature guide, feature map, and release-candidate checklist.

## v39.0 — Life Skills + Recommendations + Backend Readiness Start

Added community access, vocational supports, support recommendations, caregiver handoff, and normalized backend-readiness scaffold.

## v31–v33 — Communication and Student Autonomy Expansion

Added pain/body communication, sensory requests, regulation pathways, waiting supports, yes/no board, help request builder, decision support, stuck pathway, schedule change requests, communication history, guided schedule builder, and mobile quick navigation work.

## v30 and earlier — Refactor, Schedule, AAC, Support, and Cloud Foundation

Earlier versions established the visual schedule, staff/student modes, activity bank, choice board, reusable templates, Supabase Auth/cloud snapshot foundation, PWA scaffold, display settings, support-event logging, documentation panels, and major App.jsx refactors.

## Safety status

AccessFlow remains a prototype. It is not HIPAA certified, not FERPA certified, and should not be used with real student/client data.
