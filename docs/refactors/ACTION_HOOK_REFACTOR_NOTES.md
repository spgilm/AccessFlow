# AccessFlow v29 Action Hook Refactor Notes

## Goal

v29 moves action-heavy handler groups out of `App.jsx` into focused hooks.

## New action hooks

```txt
src/hooks/useScheduleCopyActions.js
src/hooks/useStaffExportActions.js
src/hooks/useProgressGoalActions.js
src/hooks/useVisualLibraryActions.js
src/hooks/useSupportPlanActions.js
```

## Handler groups extracted

```txt
Schedule copy:
handleApplyCurrentScheduleToTomorrow
handleApplyCurrentScheduleToWeek

Staff exports:
handleDownloadWeeklyReport
handleDownloadHandoffReport
handleDownloadNormalizedExport
handleDownloadGoalCsv
handleDownloadSupportEventCsv
handleDownloadPromptCsv
handleExportSingleProfile

Goals:
handleAddGoal
handleUpdateGoal
handleDeleteGoal

Visual library:
handleAddVisualLibraryItem
handleUpdateVisualLibraryItem
handleDeleteVisualLibraryItem
handleResetVisualLibrary

Support/reinforcement/regulation:
handleRecordCheckIn
handleUpdateReinforcementSettings
handleRequestReward
handleUpdateRegulationPlan
handleAddSessionNote
```

## Important fix

v29 also resolves undefined handler references by providing those handlers through the new hooks.

## Result

```txt
App.jsx v26: 1742 lines
App.jsx v27: 1608 lines
App.jsx v28: 1521 lines
App.jsx v29: 1513 lines
```

The line reduction is small because v29 restores missing handler coverage while modularizing behavior. The structural improvement is more important than the line count.

## v30 action hook completion

v30 extends the v29 action-hook approach to auth, profiles, board actions, daily documentation, cloud snapshots, schedule/activity editing, activity bank, templates, staff settings, and First/Then actions.
