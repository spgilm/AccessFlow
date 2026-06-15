# AccessFlow Staff Side Guide

This guide explains how the staff side of AccessFlow is intended to work.

Staff Mode is for setup, schedule preparation, student profile settings, visual supports, documentation, reports, cloud sync, and prototype safety checks.

> **Prototype safety note:** AccessFlow is not HIPAA certified and not FERPA certified. Use fake/demo data only.

## Staff Mode purpose

Staff Mode should help staff answer these questions:

```txt
Who is the student/client?
What should they see?
What choices can they add?
What communication supports do they need?
What happened today?
What patterns are emerging?
Is the prototype being used safely?
```

## Staff tabs

Staff Mode uses these tabs:

```txt
Dashboard | Setup | Students | Choices
Schedule  | Notes | Reports  | Settings
```

Each tab is organized into expandable sections. Open the section you need and leave the others collapsed.

## Dashboard

Use **Dashboard** as the starting point.

Dashboard groups:

### Daily overview

Use this for the current student, current schedule status, support events, sync status, and quick actions.

### Readiness and clutter review

Use this to check whether the prototype is still safe and readable.

This includes:

- Release/readiness review.
- Student interface clutter review.
- Prototype status reminders.

### Feature guide

Use this when you are not sure where a tool lives.

## Setup

Use **Setup** when first preparing AccessFlow for a student/client.

### Guided setup wizard

Use this for the fastest start:

1. Pick or create a student profile.
2. Add schedule choices.
3. Add choices to today’s schedule.
4. Open Student Mode and test.

## Students

Use **Students** to configure the student/client and control what Student Mode looks like.

This is one of the most important staff tabs.

### Profile, presets, and Student Mode layout

Use this first.

This section includes:

- Feature presets.
- Student Mode presets.
- Profile Manager.
- Student independence settings.
- Student display/access settings.
- Play tab helper.

Important controls:

```txt
Student navigation preset
Student can build schedule
Student can reorder schedule
Student can remove activities
Student can add custom activity
Enable Play tab
```

Recommended default:

```txt
Core: Schedule, Add, Talk, Help, Calm, Play
```

Use **Simple** only when the student needs fewer choices.
Use **Full** only when the student can handle more navigation.

### About Me, access needs, and templates

Use this for:

- About Me/self-advocacy profile.
- Alternative access guidance.
- Schedule templates.
- Transition settings.

### Motivation, regulation, and recommendations

Use this for:

- Reinforcement settings.
- Regulation plan.
- Staff recommendations.

### Communication, AAC, self-advocacy, and life skills

Use this for deeper communication settings:

- Visual coverage review.
- Communication supports.
- Self-advocacy supports.
- AAC expansion.
- Community and vocational/life-skills tools.

## Choices

Use **Choices** to create what the student can pick from.

This tab separates schedule choices from communication buttons.

### Student schedule choices

Use this to create approved activities the student can add to their schedule.

Student-facing path:

```txt
Student Mode -> Schedule -> Add to schedule
Student Mode -> Add
```

Staff path:

```txt
Staff Mode -> Choices -> Student schedule choices
```

Recommended setup:

1. Add an activity name.
2. Pick or edit the visual.
3. Add small steps.
4. Add category/timer/staff note if useful.
5. Test from Student Mode.

### Talk board and First / Then

Use this for:

- Talk/choice board buttons.
- First / Then board setup.

Talk buttons are for communication. Schedule choices are for building the schedule.

### Visual library and icons

Use this for:

- Saved visuals.
- Uploaded images.
- Emoji visuals.
- Font Awesome icons.

## Schedule

Use **Schedule** to build or edit the selected student’s current schedule.

### Date, print, and routine shortcuts

Use this to:

- Pick the schedule date.
- Print the visual schedule.
- Apply routine templates.
- Copy schedules to tomorrow or the week.

### Review and add activities

Use this to:

- Review student-created/custom activities.
- Add one-time staff-created activities.

### Edit schedule and steps

Use this to:

- Select activities.
- Reorder activities.
- Delete activities.
- Edit activity labels/visuals.
- Add, edit, delete, or reorder steps.
- Save an activity to the student’s choice bank.

## Notes

Use **Notes** for daily documentation and observations.

### Daily note

Use this to write, copy, and download daily documentation.

### Goals and accessibility review

Use this to:

- Add/update goals.
- Review accessibility supports.

### Session notes, observations, and event log

Use this to:

- Add session notes.
- Add staff observations.
- Review support events from Student Mode.

## Reports

Use **Reports** for summaries and patterns.

### Progress and handoff reports

Use this for:

- Weekly progress.
- Handoff reports.
- Caregiver handoff.
- About Me export.

### Communication and support patterns

Use this for:

- Communication history.
- Activity support patterns.
- Activity readiness review.
- Try-again-later queue.
- Goal support recommendations.

## Settings

Use **Settings** for account, cloud, data, security, exports, and prototype safety.

### Prototype safety and data health

Use this to review:

- Prototype warning.
- Data health.
- Backend architecture notes.
- Normalization/back-end readiness.
- Compliance readiness.

### Account and cloud sync

Use this for:

- Staff email/password sign-in.
- Staff sign-out.
- Cloud snapshot save/load.
- Sync status.

### Security, permissions, and exports

Use this for:

- Staff security/PIN settings.
- Role permissions.
- CSV exports.
- Backup export/import.

### Danger zone

Use this carefully.

Danger-zone actions include:

```txt
Reset demo data
Clear selected profile schedule
```

## How to enable Play

Go to:

```txt
Staff Mode -> Students -> Student display and access settings -> Enable Play tab
```

This applies the Core student layout:

```txt
Schedule | Add | Talk | Help | Calm | Play
```

## How to create choices the student can add

Go to:

```txt
Staff Mode -> Choices -> Student schedule choices
```

Then:

1. Create a schedule choice.
2. Add steps if needed.
3. Open Student Mode.
4. Go to Schedule or Add.
5. Confirm the student can add the choice.

## How to reduce Student Mode clutter

Go to:

```txt
Staff Mode -> Students -> Profile, presets, and Student Mode layout
```

Recommended options:

### Core

```txt
Schedule | Add | Talk | Help | Calm | Play
```

Best default.

### Simple

```txt
Schedule | Help | Calm
```

Best for very low-clutter access.

### Communication

```txt
Talk | Help | Calm | Schedule
```

Best when communication is the main priority.

### Builder

```txt
Schedule | Add | Make | Help
```

Best for student-led planning.

### Full

```txt
Me | Schedule | Add | Make | Talk | Help | Calm | Play
```

Best only for students who can handle all tools.

## Recommended staff workflow

For a typical setup:

1. Open **Staff Mode**.
2. Go to **Students**.
3. Pick the student profile.
4. Choose the **Core** Student Mode preset.
5. Confirm **Student can build schedule** is enabled if appropriate.
6. Go to **Choices**.
7. Create schedule choices.
8. Go to **Schedule**.
9. Build today’s schedule.
10. Open **Student Mode** and test.
11. Return to **Notes** after the session.
12. Use **Reports** to review patterns over time.
13. Use **Settings** for backup/cloud/security.

## Design principle

Staff Mode can contain many tools, but it should not force staff to look at every tool at once.

The v56 staff structure uses expandable groups so each tab has a readable path:

```txt
Open the tab -> open the group -> use the tool -> close what is not needed
```

## Shared student list across staff accounts

AccessFlow treats students as a shared workspace list in the prototype cloud workflow.

Use this workflow:

```txt
1. Staff A signs in.
2. Staff A creates or edits student profiles.
3. Staff A opens Settings → Shared staff workspace.
4. Staff A selects Save shared student list.
5. Staff B signs in on another browser/device/account.
6. Staff B opens Settings → Shared staff workspace.
7. Staff B selects Load shared student list.
8. Staff B can now switch between the same student profiles.
```

Important: this still uses prototype snapshots. It is not approved for real student/client private data.
