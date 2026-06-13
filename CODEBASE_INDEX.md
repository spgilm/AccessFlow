# AccessFlow Codebase Index

Generated/refreshed in v30 after final cleanup refactor.

## Source files

| File | Type | Lines | Functions | Purpose |
|---|---:|---:|---:|---|
| `src/App.jsx` | Application coordinator | 750 | 8 | Application shell/coordinator. v30 removes all named handle* functions and delegates action domains to hooks. |
| `src/components/AccessibilityReviewPanel.jsx` | React component | 58 | 2 | Renders the AccessibilityReviewPanel user-interface section or control. |
| `src/components/ActivityCard.jsx` | React component | 77 | 1 | Renders the ActivityCard user-interface section or control. |
| `src/components/ActivitySearchPanel.jsx` | React component | 59 | 1 | Renders the ActivitySearchPanel user-interface section or control. |
| `src/components/AddActivityForm.jsx` | React component | 158 | 5 | Renders the AddActivityForm user-interface section or control. |
| `src/components/AuthPanel.jsx` | React component | 138 | 2 | Renders the AuthPanel user-interface section or control. |
| `src/components/BackendArchitecturePanel.jsx` | React component | 49 | 1 | Renders the BackendArchitecturePanel user-interface section or control. |
| `src/components/ComplianceReadinessPanel.jsx` | React component | 53 | 1 | Renders the ComplianceReadinessPanel user-interface section or control. |
| `src/components/DailyTemplateButtons.jsx` | React component | 60 | 1 | Renders the DailyTemplateButtons user-interface section or control. |
| `src/components/DataHealthPanel.jsx` | React component | 91 | 2 | Renders the DataHealthPanel user-interface section or control. |
| `src/components/DataManagementPanel.jsx` | React component | 77 | 2 | Renders the DataManagementPanel user-interface section or control. |
| `src/components/DocumentationPanel.jsx` | React component | 199 | 2 | Renders the DocumentationPanel user-interface section or control. |
| `src/components/EmojiPickerButton.jsx` | React component | 119 | 3 | Renders the EmojiPickerButton user-interface section or control. |
| `src/components/EmptyState.jsx` | React component | 20 | 1 | Renders the EmptyState user-interface section or control. |
| `src/components/EventLogPanel.jsx` | React component | 50 | 2 | Renders the EventLogPanel user-interface section or control. |
| `src/components/ExportUpgradePanel.jsx` | React component | 38 | 1 | Renders the ExportUpgradePanel user-interface section or control. |
| `src/components/FirstThenBoardManager.jsx` | React component | 73 | 1 | Renders the FirstThenBoardManager user-interface section or control. |
| `src/components/FirstThenView.jsx` | React component | 93 | 2 | Renders the FirstThenView user-interface section or control. |
| `src/components/HandoffReportPanel.jsx` | React component | 26 | 1 | Renders the HandoffReportPanel user-interface section or control. |
| `src/components/ModeToggle.jsx` | React component | 62 | 1 | Renders the ModeToggle user-interface section or control. |
| `src/components/PrintSchedulePanel.jsx` | React component | 33 | 1 | Renders the PrintSchedulePanel user-interface section or control. |
| `src/components/ProfileManager.jsx` | React component | 441 | 5 | Renders the ProfileManager user-interface section or control. |
| `src/components/ProfileRecommendationsPanel.jsx` | React component | 48 | 1 | Renders the ProfileRecommendationsPanel user-interface section or control. |
| `src/components/ProgressSummary.jsx` | React component | 122 | 4 | Renders the ProgressSummary user-interface section or control. |
| `src/components/PrototypeWarningPanel.jsx` | React component | 15 | 1 | Renders the PrototypeWarningPanel user-interface section or control. |
| `src/components/RegulationPlanPanel.jsx` | React component | 47 | 2 | Renders the RegulationPlanPanel user-interface section or control. |
| `src/components/ReviewQueuePanel.jsx` | React component | 50 | 1 | Renders the ReviewQueuePanel user-interface section or control. |
| `src/components/RolePermissionsPanel.jsx` | React component | 80 | 2 | Renders the RolePermissionsPanel user-interface section or control. |
| `src/components/RoutineTemplatePanel.jsx` | React component | 73 | 1 | Renders the RoutineTemplatePanel user-interface section or control. |
| `src/components/ScheduleDatePicker.jsx` | React component | 21 | 1 | Renders the ScheduleDatePicker user-interface section or control. |
| `src/components/SessionNoteWizardPanel.jsx` | React component | 67 | 2 | Renders the SessionNoteWizardPanel user-interface section or control. |
| `src/components/StaffAccessPanel.jsx` | React component | 82 | 1 | Renders the StaffAccessPanel user-interface section or control. |
| `src/components/StaffActivityEditor.jsx` | React component | 223 | 3 | Renders the StaffActivityEditor user-interface section or control. |
| `src/components/StaffActivityList.jsx` | React component | 86 | 1 | Renders the StaffActivityList user-interface section or control. |
| `src/components/StaffChoiceBankPanel.jsx` | React component | 349 | 6 | Renders the StaffChoiceBankPanel user-interface section or control. |
| `src/components/StaffChoiceBoardManager.jsx` | React component | 178 | 2 | Renders the StaffChoiceBoardManager user-interface section or control. |
| `src/components/StaffDashboardPanel.jsx` | React component | 74 | 1 | Renders the StaffDashboardPanel user-interface section or control. |
| `src/components/StaffGoalPanel.jsx` | React component | 213 | 2 | Renders the StaffGoalPanel user-interface section or control. |
| `src/components/StaffReinforcementPanel.jsx` | React component | 118 | 3 | Renders the StaffReinforcementPanel user-interface section or control. |
| `src/components/StaffSecurityPanel.jsx` | React component | 59 | 2 | Renders the StaffSecurityPanel user-interface section or control. |
| `src/components/StaffSetupWizard.jsx` | React component | 230 | 3 | Renders the StaffSetupWizard user-interface section or control. |
| `src/components/StaffTransitionSettingsPanel.jsx` | React component | 94 | 2 | Renders the StaffTransitionSettingsPanel user-interface section or control. |
| `src/components/StaffView.jsx` | React component | 532 | 2 | Renders the StaffView user-interface section or control. |
| `src/components/StaffVisualLibraryPanel.jsx` | React component | 185 | 2 | Renders the StaffVisualLibraryPanel user-interface section or control. |
| `src/components/StudentActivityDetail.jsx` | React component | 94 | 1 | Renders the StudentActivityDetail user-interface section or control. |
| `src/components/StudentBreakPlan.jsx` | React component | 112 | 2 | Renders the StudentBreakPlan user-interface section or control. |
| `src/components/StudentCheckInPanel.jsx` | React component | 52 | 2 | Renders the StudentCheckInPanel user-interface section or control. |
| `src/components/StudentChoiceBank.jsx` | React component | 99 | 1 | Renders the StudentChoiceBank user-interface section or control. |
| `src/components/StudentChoiceBoard.jsx` | React component | 245 | 6 | Renders the StudentChoiceBoard user-interface section or control. |
| `src/components/StudentInlineSteps.jsx` | React component | 106 | 1 | Renders the StudentInlineSteps user-interface section or control. |
| `src/components/StudentMakeActivity.jsx` | React component | 226 | 8 | Renders the StudentMakeActivity user-interface section or control. |
| `src/components/StudentModePresetPanel.jsx` | React component | 266 | 3 | Renders the StudentModePresetPanel user-interface section or control. |
| `src/components/StudentRewardPanel.jsx` | React component | 45 | 1 | Renders the StudentRewardPanel user-interface section or control. |
| `src/components/StudentScheduleBuilder.jsx` | React component | 267 | 8 | Renders the StudentScheduleBuilder user-interface section or control. |
| `src/components/StudentSupportPanel.jsx` | React component | 45 | 1 | Renders the StudentSupportPanel user-interface section or control. |
| `src/components/StudentTransitionPanel.jsx` | React component | 92 | 2 | Renders the StudentTransitionPanel user-interface section or control. |
| `src/components/StudentView.jsx` | React component | 496 | 5 | Renders the StudentView user-interface section or control. |
| `src/components/StudentViewToggle.jsx` | React component | 29 | 1 | Renders the StudentViewToggle user-interface section or control. |
| `src/components/SupabaseSyncPanel.jsx` | React component | 147 | 2 | Renders the SupabaseSyncPanel user-interface section or control. |
| `src/components/TemplateManager.jsx` | React component | 102 | 2 | Renders the TemplateManager user-interface section or control. |
| `src/components/ThemeToggle.jsx` | React component | 29 | 1 | Renders the ThemeToggle user-interface section or control. |
| `src/components/TimerButton.jsx` | React component | 87 | 2 | Renders the TimerButton user-interface section or control. |
| `src/components/VisualEditor.jsx` | React component | 174 | 4 | Renders the VisualEditor user-interface section or control. |
| `src/components/VisualSupport.jsx` | React component | 54 | 2 | Renders the VisualSupport user-interface section or control. |
| `src/components/WeeklyProgressPanel.jsx` | React component | 121 | 1 | Renders the WeeklyProgressPanel user-interface section or control. |
| `src/data/accessibilityReview.js` | Data/defaults module | 41 | 1 | Defines default data, presets, settings, or static starter content for accessibilityReview. |
| `src/data/activityTemplates.js` | Data/defaults module | 147 | 0 | Defines default data, presets, settings, or static starter content for activityTemplates. |
| `src/data/choiceBoardItems.js` | Data/defaults module | 111 | 3 | Defines default data, presets, settings, or static starter content for choiceBoardItems. |
| `src/data/displaySettings.js` | Data/defaults module | 105 | 5 | Defines default data, presets, settings, or static starter content for displaySettings. |
| `src/data/independenceSettings.js` | Data/defaults module | 19 | 1 | Defines default data, presets, settings, or static starter content for independenceSettings. |
| `src/data/progressGoals.js` | Data/defaults module | 32 | 2 | Defines default data, presets, settings, or static starter content for progressGoals. |
| `src/data/regulationPlan.js` | Data/defaults module | 18 | 1 | Defines default data, presets, settings, or static starter content for regulationPlan. |
| `src/data/reinforcementSettings.js` | Data/defaults module | 22 | 1 | Defines default data, presets, settings, or static starter content for reinforcementSettings. |
| `src/data/rolePermissions.js` | Data/defaults module | 54 | 1 | Defines default data, presets, settings, or static starter content for rolePermissions. |
| `src/data/securitySettings.js` | Data/defaults module | 18 | 1 | Defines default data, presets, settings, or static starter content for securitySettings. |
| `src/data/starterActivities.js` | Data/defaults module | 56 | 1 | Defines default data, presets, settings, or static starter content for starterActivities. |
| `src/data/starterProfiles.js` | Data/defaults module | 66 | 1 | Defines default data, presets, settings, or static starter content for starterProfiles. |
| `src/data/starterTemplates.js` | Data/defaults module | 29 | 1 | Defines default data, presets, settings, or static starter content for starterTemplates. |
| `src/data/studentActivityLibrary.js` | Data/defaults module | 16 | 0 | Defines default data, presets, settings, or static starter content for studentActivityLibrary. |
| `src/data/transitionSettings.js` | Data/defaults module | 22 | 1 | Defines default data, presets, settings, or static starter content for transitionSettings. |
| `src/data/visualLibrary.js` | Data/defaults module | 72 | 2 | Defines default data, presets, settings, or static starter content for visualLibrary. |
| `src/hooks/useActivityBankActions.js` | React hook | 131 | 8 | Owns Student Choices / activity-bank handlers. |
| `src/hooks/useAuthActions.js` | React hook | 101 | 5 | Owns staff account sign-up/sign-in/sign-out/Google auth handlers. |
| `src/hooks/useBoardActions.js` | React hook | 72 | 6 | Owns communication-board add/update/delete/reset handlers. |
| `src/hooks/useCloudSnapshotActions.js` | React hook | 185 | 7 | Owns backup import/export and Supabase snapshot save/load handlers. |
| `src/hooks/useDailyDocumentationActions.js` | React hook | 84 | 5 | Owns daily note update/copy/download and activity CSV handlers. |
| `src/hooks/useFirstThenActions.js` | React hook | 54 | 3 | Owns First/Then board handlers. |
| `src/hooks/useLegacyStudentViewMigration.js` | React hook | 14 | 1 | Defines reusable React hook behavior for useLegacyStudentViewMigration. |
| `src/hooks/useLocalStorage.js` | React hook | 28 | 1 | Defines reusable React hook behavior for useLocalStorage. |
| `src/hooks/useModeDateActions.js` | React hook | 73 | 6 | Owns mode, theme, student-view, schedule-date, and documentation-date handlers. |
| `src/hooks/useProfileActions.js` | React hook | 84 | 6 | Owns profile select/add/update/delete/reset handlers. |
| `src/hooks/useProgressGoalActions.js` | React hook | 59 | 5 | Defines reusable React hook behavior for useProgressGoalActions. |
| `src/hooks/useReadAloudEffect.js` | React hook | 27 | 2 | Defines reusable React hook behavior for useReadAloudEffect. |
| `src/hooks/useScheduleActivityActions.js` | React hook | 384 | 21 | Owns schedule, activity, step, review, and student schedule-autonomy handlers. |
| `src/hooks/useScheduleCopyActions.js` | React hook | 64 | 3 | Defines reusable React hook behavior for useScheduleCopyActions. |
| `src/hooks/useStaffExportActions.js` | React hook | 102 | 8 | Defines reusable React hook behavior for useStaffExportActions. |
| `src/hooks/useStaffSettingsActions.js` | React hook | 60 | 6 | Owns transition settings, accessibility review, staff security, and role-prototype handlers. |
| `src/hooks/useSupabaseSessionEffect.js` | React hook | 66 | 1 | Defines reusable React hook behavior for useSupabaseSessionEffect. |
| `src/hooks/useSupportPlanActions.js` | React hook | 97 | 6 | Defines reusable React hook behavior for useSupportPlanActions. |
| `src/hooks/useTemplateActions.js` | React hook | 70 | 4 | Owns schedule-template save/apply/delete handlers. |
| `src/hooks/useThemeEffect.js` | React hook | 15 | 1 | Defines reusable React hook behavior for useThemeEffect. |
| `src/hooks/useVisualLibraryActions.js` | React hook | 75 | 6 | Defines reusable React hook behavior for useVisualLibraryActions. |
| `src/hooks/useWorkspaceDirtyState.js` | React hook | 65 | 4 | Defines reusable React hook behavior for useWorkspaceDirtyState. |
| `src/main.jsx` | Application entry point | 18 | 0 | Bootstraps the React application and registers service-worker support. |
| `src/services/imageProvider.js` | Service/integration module | 38 | 3 | Contains integration/service logic for imageProvider. |
| `src/services/supabaseWorkspace.js` | Service/integration module | 179 | 12 | Contains integration/service logic for supabaseWorkspace. |
| `src/services/taskGenerator.js` | Service/integration module | 96 | 4 | Contains integration/service logic for taskGenerator. |
| `src/utils/activityHelpers.js` | Utility/helper module | 52 | 4 | Provides reusable helper logic for activityHelpers. |
| `src/utils/cloudErrorHelpers.js` | Utility/helper module | 27 | 1 | Provides reusable helper logic for cloudErrorHelpers. |
| `src/utils/dataHealth.js` | Utility/helper module | 119 | 4 | Provides reusable helper logic for dataHealth. |
| `src/utils/dateCopyHelpers.js` | Utility/helper module | 31 | 4 | Provides reusable helper logic for dateCopyHelpers. |
| `src/utils/documentationHelpers.js` | Utility/helper module | 114 | 6 | Provides reusable helper logic for documentationHelpers. |
| `src/utils/exportHelpers.js` | Utility/helper module | 142 | 7 | Provides reusable helper logic for exportHelpers. |
| `src/utils/fileHelpers.js` | Utility/helper module | 45 | 2 | Provides reusable helper logic for fileHelpers. |
| `src/utils/formatters.js` | Utility/helper module | 26 | 3 | Provides reusable helper logic for formatters. |
| `src/utils/handoffReport.js` | Utility/helper module | 55 | 1 | Provides reusable helper logic for handoffReport. |
| `src/utils/importHelpers.js` | Utility/helper module | 70 | 3 | Provides reusable helper logic for importHelpers. |
| `src/utils/normalizedExport.js` | Utility/helper module | 129 | 2 | Provides reusable helper logic for normalizedExport. |
| `src/utils/progressDashboard.js` | Utility/helper module | 200 | 8 | Provides reusable helper logic for progressDashboard. |
| `src/utils/readAloudHelpers.js` | Utility/helper module | 56 | 4 | Provides reusable helper logic for readAloudHelpers. |
| `src/utils/registerServiceWorker.js` | Utility/helper module | 12 | 1 | Provides reusable helper logic for registerServiceWorker. |
| `src/utils/scheduleDateHelpers.js` | Utility/helper module | 47 | 3 | Provides reusable helper logic for scheduleDateHelpers. |
| `src/utils/staffExportHelpers.js` | Utility/helper module | 69 | 7 | Provides reusable helper logic for staffExportHelpers. |
| `src/utils/studentActionHelpers.js` | Utility/helper module | 23 | 2 | Provides reusable helper logic for studentActionHelpers. |
| `src/utils/templateHelpers.js` | Utility/helper module | 61 | 4 | Provides reusable helper logic for templateHelpers. |
| `src/utils/workspacePayloadHelpers.js` | Utility/helper module | 8 | 1 | Provides reusable helper logic for workspacePayloadHelpers. |
