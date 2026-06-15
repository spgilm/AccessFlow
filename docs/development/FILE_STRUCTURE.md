# AccessFlow File Structure

AccessFlow uses a feature-oriented component structure.

## Top-level component folders

```txt
src/components/
  app/
  shared/
  student/
  staff/
```

## app

App-level shell, authentication gate, staff access link, global mode controls, and prototype warnings.

```txt
src/components/app/
```

## shared

Reusable UI primitives used across student and staff surfaces.

```txt
src/components/shared/
```

Examples:

```txt
VisualSupport
EmojiPickerButton
ScheduleDatePicker
ActivityCard
EmptyState
```

## student

Student-facing screens and tools.

```txt
src/components/student/
  schedule/
  communication/
  support/
  profile/
  games/
```

### student/schedule

Visual schedule, First/Then, adding approved choices, guided schedule builder, custom activity creation, and activity detail.

### student/communication

Talk/AAC tools, yes/no, help request builder, stuck pathway, sensory/body communication, community/work cards.

### student/support

Help, break, transition, calm, regulation, waiting, repair, and switch-scanning supports.

### student/profile

About Me, check-in, rewards.

### student/games

Play tab games.

## staff

Staff-facing tools grouped by product workflow.

```txt
src/components/staff/
  dashboard/
  setup/
  students/
  choices/
  schedule/
  notes/
  reports/
  settings/
```

### staff/dashboard

Dashboard, release readiness, feature guide, GUI review.

### staff/setup

Profile manager, setup wizard, presets, templates, recommendations.

### staff/students

Student-specific support settings, AAC settings, visual coverage, regulation/reinforcement settings.

### staff/choices

Activity bank, choice board, visual library, icon library, First/Then manager.

### staff/schedule

Schedule editor, activity editor, routine templates, print schedule, review queue.

### staff/notes

Daily documentation, goals, observations, accessibility review, event log.

### staff/reports

Weekly progress, handoff reports, support patterns, communication history, readiness review.

### staff/settings

Auth, cloud sync, export/import, security, backend readiness, compliance readiness.

## Version history

Feature history is consolidated in:

```txt
VERSION_FEATURES.md
```

Individual `V##_...md` report files are no longer used.
