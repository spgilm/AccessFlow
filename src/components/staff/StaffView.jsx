/**
 * Staff-facing workflow screen. Groups staff tools into Dashboard, Setup, Students, Choices, Schedule, Notes, Reports, and Settings tabs.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useState } from "react";
import AddActivityForm from "./schedule/AddActivityForm.jsx";
import AuthPanel from "./settings/AuthPanel.jsx";
import DataManagementPanel from "./settings/DataManagementPanel.jsx";
import StaffSetupWizard from "./setup/StaffSetupWizard.jsx";
import ScheduleDatePicker from "../shared/ScheduleDatePicker.jsx";
import DailyTemplateButtons from "./schedule/DailyTemplateButtons.jsx";
import DocumentationPanel from "./notes/DocumentationPanel.jsx";
import EventLogPanel from "./notes/EventLogPanel.jsx";
import FirstThenBoardManager from "./choices/FirstThenBoardManager.jsx";
import ReviewQueuePanel from "./schedule/ReviewQueuePanel.jsx";
import ProfileManager from "./setup/ProfileManager.jsx";
import StudentModePresetPanel from "./setup/StudentModePresetPanel.jsx";
import FeaturePresetPanel from "./setup/FeaturePresetPanel.jsx";
import StaffActivityEditor from "./schedule/StaffActivityEditor.jsx";
import StaffActivityList from "./schedule/StaffActivityList.jsx";
import StaffChoiceBankPanel from "./choices/StaffChoiceBankPanel.jsx";
import StaffChoiceBoardManager from "./choices/StaffChoiceBoardManager.jsx";
import StaffVisualLibraryPanel from "./choices/StaffVisualLibraryPanel.jsx";
import StaffIconLibraryPanel from "./choices/StaffIconLibraryPanel.jsx";
import StaffGoalPanel from "./notes/StaffGoalPanel.jsx";
import WeeklyProgressPanel from "./reports/WeeklyProgressPanel.jsx";
import ExportUpgradePanel from "./settings/ExportUpgradePanel.jsx";
import RoutineTemplatePanel from "./schedule/RoutineTemplatePanel.jsx";
import AccessibilityReviewPanel from "./notes/AccessibilityReviewPanel.jsx";
import RolePermissionsPanel from "./settings/RolePermissionsPanel.jsx";
import StaffSecurityPanel from "./settings/StaffSecurityPanel.jsx";
import StaffTransitionSettingsPanel from "./students/StaffTransitionSettingsPanel.jsx";
import StaffDashboardPanel from "./dashboard/StaffDashboardPanel.jsx";
import StaffFeatureGuidePanel from "./dashboard/StaffFeatureGuidePanel.jsx";
import ActivitySearchPanel from "./choices/ActivitySearchPanel.jsx";
import ProfileRecommendationsPanel from "./setup/ProfileRecommendationsPanel.jsx";
import PrintSchedulePanel from "./schedule/PrintSchedulePanel.jsx";
import HandoffReportPanel from "./reports/HandoffReportPanel.jsx";
import CaregiverHandoffPanel from "./reports/CaregiverHandoffPanel.jsx";
import AboutMeExportPanel from "./reports/AboutMeExportPanel.jsx";
import CommunicationHistoryPanel from "./reports/CommunicationHistoryPanel.jsx";
import GoalSupportRecommendationsPanel from "./reports/GoalSupportRecommendationsPanel.jsx";
import ActivitySupportPatternPanel from "./reports/ActivitySupportPatternPanel.jsx";
import ActivityReadinessReviewPanel from "./reports/ActivityReadinessReviewPanel.jsx";
import TryAgainLaterQueuePanel from "./reports/TryAgainLaterQueuePanel.jsx";
import SessionNoteWizardPanel from "./notes/SessionNoteWizardPanel.jsx";
import StaffObservationLogPanel from "./notes/StaffObservationLogPanel.jsx";
import RegulationPlanPanel from "./students/RegulationPlanPanel.jsx";
import StaffReinforcementPanel from "./students/StaffReinforcementPanel.jsx";
import StaffCommunicationSupportPanel from "./students/StaffCommunicationSupportPanel.jsx";
import StaffSelfAdvocacySupportPanel from "./students/StaffSelfAdvocacySupportPanel.jsx";
import StaffLifeSkillsSettingsPanel from "./students/StaffLifeSkillsSettingsPanel.jsx";
import StaffAboutMePanel from "./students/StaffAboutMePanel.jsx";
import StaffAlternativeAccessGuidePanel from "./students/StaffAlternativeAccessGuidePanel.jsx";
import StaffAacExpansionPanel from "./students/StaffAacExpansionPanel.jsx";
import StaffVisualCoveragePanel from "./students/StaffVisualCoveragePanel.jsx";
import StaffReleaseReadinessPanel from "./dashboard/StaffReleaseReadinessPanel.jsx";
import StaffGuiReviewPanel from "./dashboard/StaffGuiReviewPanel.jsx";
import SupabaseSyncPanel from "./settings/SupabaseSyncPanel.jsx";
import TemplateManager from "./setup/TemplateManager.jsx";
import PrototypeWarningPanel from "../app/PrototypeWarningPanel.jsx";
import DataHealthPanel from "./settings/DataHealthPanel.jsx";
import BackendArchitecturePanel from "./settings/BackendArchitecturePanel.jsx";
import BackendNormalizationStartPanel from "./settings/BackendNormalizationStartPanel.jsx";
import ComplianceReadinessPanel from "./settings/ComplianceReadinessPanel.jsx";
import PrototypeSafetyFooter from "../app/PrototypeSafetyFooter.jsx";

const staffTabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "setup", label: "Setup" },
  { id: "students", label: "Students" },
  { id: "choices", label: "Choices" },
  { id: "schedule", label: "Schedule" },
  { id: "notes", label: "Notes" },
  { id: "reports", label: "Reports" },
  { id: "save", label: "Settings" },
];

function WorkflowTabs({ tabs, activeTab, onChange, label }) {
  return (
    <nav className="workflow-tabs staff-workflow-tabs" aria-label={label}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={activeTab === tab.id ? "is-active" : ""}
          onClick={() => onChange(tab.id)}
          aria-pressed={activeTab === tab.id}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

function StaffToolGroup({ title, description, defaultOpen = false, children }) {
  return (
    <details className="staff-tool-group" open={defaultOpen}>
      <summary>
        <span>
          <strong>{title}</strong>
          {description ? <small>{description}</small> : null}
        </span>
      </summary>
      <div className="staff-tool-group-body">{children}</div>
    </details>
  );
}

export default function StaffView({
  profiles,
  selectedProfile,
  selectedProfileId,
  templates,
  activities,
  activityBank,
  choiceBoardItems,
  visualLibrary,
  progressGoals,
  weeklyProgressSummary,
  weeklyProgressReport,
  transitionSettings,
  accessibilityReview,
  staffSecurity,
  rolePermissions,
  reinforcementSettings,
  regulationPlan,
  communicationSupportSettings,
  selfAdvocacySupportSettings,
  lifeSkillsSettings,
  aboutMeProfile,
  aacExpansionSettings,
  supportObservations,
  handoffReport,
  dataHealth,
  sessionNotes,
  supportEvents,
  firstThenBoard,
  displaySettings,
  selectedActivity,
  selectedActivityId,
  scheduleDate,
  onScheduleDateChange,
  documentationDate,
  dailyNote,
  copyStatus,
  exportStatus,
  importStatus,
  syncStatus,
  isSyncing,
  syncMetadata,
  hasUnsavedCloudChanges,
  syncReminder,
  session,
  authStatus,
  isAuthWorking,
  onSignIn,
  onSignUp,
  onGoogleSignIn,
  onSignOut,
  onDocumentationDateChange,
  onUpdateDailyNote,
  onCopyDailyNote,
  onDownloadDailyNote,
  onDownloadActivityCsv,
  onExportBackup,
  onImportBackup,
  onSaveCloudSnapshot,
  onLoadCloudSnapshot,
  onSelectProfile,
  onAddProfile,
  onUpdateProfile,
  onDeleteProfile,
  onDismissReview,
  onUpdateFirstThenBoard,
  onAddFirstThenToSchedule,
  onApplyDailyTemplate,
  onOpenStudentMode,
  onSaveCurrentScheduleAsTemplate,
  onApplyTemplateToProfile,
  onDeleteTemplate,
  onAddActivity,
  onAddChoiceToBank,
  onAddBoardItem,
  onAddVisualLibraryItem,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  onDownloadWeeklyReport,
  onUpdateTransitionSettings,
  onUpdateReinforcementSettings,
  onUpdateRegulationPlan,
  onUpdateCommunicationSupportSettings,
  onUpdateSelfAdvocacySupportSettings,
  onUpdateLifeSkillsSettings,
  onUpdateAacExpansionSettings,
  onUpdateAboutMeProfile,
  onAddSupportObservation,
  onAddSessionNote,
  onDownloadHandoffReport,
  onDownloadNormalizedExport,
  onUpdateAccessibilityReview,
  onUpdateStaffSecurity,
  onLockStaff,
  onUpdateRolePermissions,
  onApplyCurrentScheduleToTomorrow,
  onApplyCurrentScheduleToWeek,
  onDownloadGoalCsv,
  onDownloadSupportEventCsv,
  onDownloadPromptCsv,
  onExportSingleProfile,
  onUpdateVisualLibraryItem,
  onDeleteVisualLibraryItem,
  onResetVisualLibrary,
  onUpdateBoardItem,
  onDeleteBoardItem,
  onResetBoardItems,
  onUpdateBankChoice,
  onSaveActivityToBank,
  onAddBankChoiceToSchedule,
  onDeleteBankChoice,
  onSelectActivity,
  onMoveActivity,
  onUpdateActivity,
  onUpdateStep,
  onAddStep,
  onDeleteStep,
  onMoveStep,
  onDeleteActivity,
  onResetDemo,
  onClearSchedule,
}) {
  const [activeStaffTab, setActiveStaffTab] = useState("dashboard");

  return (
    <div className="staff-view v13-staff-flow">
      <section className="student-profile-strip staff-profile-strip" aria-label="Selected profile">
        <span>Working with</span>
        <strong>{selectedProfile?.name ?? "No profile selected"}</strong>
      </section>

      <WorkflowTabs
        tabs={staffTabs}
        activeTab={activeStaffTab}
        onChange={setActiveStaffTab}
        label="Staff tools"
      />

{activeStaffTab === "dashboard" ? (
  <section className="staff-tab-screen" aria-labelledby="staff-dashboard-heading">
    <div className="focus-header compact-focus-header">
      <p className="eyebrow">Dashboard</p>
      <h2 id="staff-dashboard-heading">Start here</h2>
      <p>Use this page for the fastest overview before opening deeper staff tools.</p>
    </div>

    <StaffToolGroup
      title="Daily overview"
      description="Current student, schedule status, sync status, and quick actions"
      defaultOpen
    >
      <StaffDashboardPanel
        selectedProfile={selectedProfile}
        activities={activities}
        dailyNote={dailyNote}
        supportEvents={supportEvents}
        weeklyProgressSummary={weeklyProgressSummary}
        hasUnsavedCloudChanges={hasUnsavedCloudChanges}
        syncMetadata={syncMetadata}
        onOpenStudentMode={onOpenStudentMode}
        onGoToTab={setActiveStaffTab}
      />
    </StaffToolGroup>

    <StaffToolGroup
      title="Readiness and clutter review"
      description="Prototype readiness, interface clarity, and release checks"
    >
      <StaffReleaseReadinessPanel
        profiles={profiles}
        displaySettings={displaySettings}
        aacExpansionSettings={aacExpansionSettings}
        communicationSupportSettings={communicationSupportSettings}
        selfAdvocacySupportSettings={selfAdvocacySupportSettings}
        lifeSkillsSettings={lifeSkillsSettings}
        visualLibrary={visualLibrary}
        supportEvents={supportEvents}
      />

      <StaffGuiReviewPanel displaySettings={displaySettings} />
    </StaffToolGroup>

    <StaffToolGroup
      title="Feature guide"
      description="Where each major tool lives in Staff Mode"
    >
      <StaffFeatureGuidePanel onGoToTab={setActiveStaffTab} />
    </StaffToolGroup>
  </section>
) : null}

{activeStaffTab === "setup" ? (
  <section className="staff-tab-screen" aria-labelledby="staff-setup-heading">
    <div className="focus-header compact-focus-header">
      <p className="eyebrow">Setup</p>
      <h2 id="staff-setup-heading">Guided setup</h2>
      <p>Use this path when setting up AccessFlow for a new student/client.</p>
    </div>

    <StaffToolGroup
      title="Guided setup wizard"
      description="Fast path for creating choices and testing Student Mode"
      defaultOpen
    >
      <StaffSetupWizard
        selectedProfile={selectedProfile}
        activityBank={activityBank}
        activities={activities}
        onUpdateProfile={onUpdateProfile}
        onAddChoiceToBank={onAddChoiceToBank}
        onAddBankChoiceToSchedule={onAddBankChoiceToSchedule}
        onOpenStudentMode={onOpenStudentMode}
      />
    </StaffToolGroup>
  </section>
) : null}

{activeStaffTab === "students" ? (
  <section className="staff-tab-screen" aria-labelledby="staff-students-heading">
    <div className="focus-header compact-focus-header">
      <p className="eyebrow">Students</p>
      <h2 id="staff-students-heading">Profile and settings</h2>
      <p>Start with presets and profile settings, then open deeper support settings only when needed.</p>
    </div>

    <StaffToolGroup
      title="Profile, presets, and Student Mode layout"
      description="Main place to choose a student, reduce clutter, enable Play, and control independence"
      defaultOpen
    >
      <FeaturePresetPanel
        selectedProfile={selectedProfile}
        onUpdateProfile={onUpdateProfile}
        onOpenStudentMode={onOpenStudentMode}
      />

      <StudentModePresetPanel
        selectedProfile={selectedProfile}
        displaySettings={displaySettings}
        onUpdateProfile={onUpdateProfile}
        onOpenStudentMode={onOpenStudentMode}
      />

      <ProfileManager
        profiles={profiles}
        selectedProfile={selectedProfile}
        selectedProfileId={selectedProfileId}
        onSelectProfile={onSelectProfile}
        onAddProfile={onAddProfile}
        onUpdateProfile={onUpdateProfile}
        onDeleteProfile={onDeleteProfile}
        displaySettings={displaySettings}
      />
    </StaffToolGroup>

    <StaffToolGroup
      title="About Me, access needs, and templates"
      description="Student identity, access guidance, saved schedule templates, and transition settings"
    >
      <StaffAboutMePanel
        aboutMeProfile={aboutMeProfile}
        onUpdateAboutMeProfile={onUpdateAboutMeProfile}
      />

      <StaffAlternativeAccessGuidePanel displaySettings={displaySettings} />

      <TemplateManager
        templates={templates}
        selectedProfile={selectedProfile}
        onSaveCurrentScheduleAsTemplate={onSaveCurrentScheduleAsTemplate}
        onApplyTemplateToProfile={onApplyTemplateToProfile}
        onDeleteTemplate={onDeleteTemplate}
      />

      <StaffTransitionSettingsPanel
        transitionSettings={transitionSettings}
        onUpdateTransitionSettings={onUpdateTransitionSettings}
      />
    </StaffToolGroup>

    <StaffToolGroup
      title="Motivation, regulation, and recommendations"
      description="Rewards, regulation plan, and staff recommendations"
    >
      <ProfileRecommendationsPanel
        displaySettings={displaySettings}
        accessibilityReview={accessibilityReview}
        transitionSettings={transitionSettings}
        reinforcementSettings={reinforcementSettings}
      />

      <StaffReinforcementPanel
        reinforcementSettings={reinforcementSettings}
        onUpdateReinforcementSettings={onUpdateReinforcementSettings}
      />

      <RegulationPlanPanel
        regulationPlan={regulationPlan}
        onUpdateRegulationPlan={onUpdateRegulationPlan}
      />
    </StaffToolGroup>

    <StaffToolGroup
      title="Communication, AAC, self-advocacy, and life skills"
      description="Deeper Talk, Help, AAC, community, and vocational settings"
    >
      <StaffVisualCoveragePanel
        aacExpansionSettings={aacExpansionSettings}
        communicationSupportSettings={communicationSupportSettings}
        selfAdvocacySupportSettings={selfAdvocacySupportSettings}
        lifeSkillsSettings={lifeSkillsSettings}
        onUpdateAacExpansionSettings={onUpdateAacExpansionSettings}
        onUpdateCommunicationSupportSettings={onUpdateCommunicationSupportSettings}
        onUpdateSelfAdvocacySupportSettings={onUpdateSelfAdvocacySupportSettings}
        onUpdateLifeSkillsSettings={onUpdateLifeSkillsSettings}
      />

      <StaffCommunicationSupportPanel
        communicationSupportSettings={communicationSupportSettings}
        visualLibrary={visualLibrary}
        onUpdateCommunicationSupportSettings={onUpdateCommunicationSupportSettings}
      />

      <StaffSelfAdvocacySupportPanel
        selfAdvocacySupportSettings={selfAdvocacySupportSettings}
        visualLibrary={visualLibrary}
        onUpdateSelfAdvocacySupportSettings={onUpdateSelfAdvocacySupportSettings}
      />

      <StaffAacExpansionPanel
        aacExpansionSettings={aacExpansionSettings}
        visualLibrary={visualLibrary}
        onUpdateAacExpansionSettings={onUpdateAacExpansionSettings}
      />

      <StaffLifeSkillsSettingsPanel
        lifeSkillsSettings={lifeSkillsSettings}
        visualLibrary={visualLibrary}
        onUpdateLifeSkillsSettings={onUpdateLifeSkillsSettings}
      />
    </StaffToolGroup>
  </section>
) : null}

{activeStaffTab === "choices" ? (
  <section className="staff-tab-screen" aria-labelledby="staff-choices-heading">
    <div className="focus-header compact-focus-header">
      <p className="eyebrow">Choices</p>
      <h2 id="staff-choices-heading">Schedule choices and Talk buttons</h2>
      <p>Create approved activities students can add, communication buttons, and visual supports.</p>
    </div>

    <StaffToolGroup
      title="Student schedule choices"
      description="Approved activity cards the student can add from Schedule or Add"
      defaultOpen
    >
      <StaffChoiceBankPanel
        selectedProfile={selectedProfile}
        activityBank={activityBank}
        onAddChoiceToBank={onAddChoiceToBank}
        onUpdateBankChoice={onUpdateBankChoice}
        onAddBankChoiceToSchedule={onAddBankChoiceToSchedule}
        onDeleteBankChoice={onDeleteBankChoice}
      />

      <ActivitySearchPanel
        activities={activities}
        activityBank={activityBank}
        onSelectActivity={onSelectActivity}
        onAddBankChoiceToSchedule={onAddBankChoiceToSchedule}
      />
    </StaffToolGroup>

    <StaffToolGroup
      title="Talk board and First / Then"
      description="Communication board buttons and quick First / Then setup"
    >
      <StaffChoiceBoardManager
        boardItems={choiceBoardItems}
        onAddBoardItem={onAddBoardItem}
        onUpdateBoardItem={onUpdateBoardItem}
        onDeleteBoardItem={onDeleteBoardItem}
        onResetBoardItems={onResetBoardItems}
      />

      <FirstThenBoardManager
        activityBank={activityBank}
        firstThenBoard={firstThenBoard}
        onUpdateFirstThenBoard={onUpdateFirstThenBoard}
        onAddFirstThenToSchedule={onAddFirstThenToSchedule}
      />
    </StaffToolGroup>

    <StaffToolGroup
      title="Visual library and icons"
      description="Saved visuals, uploaded images, emojis, and Font Awesome icons"
    >
      <StaffIconLibraryPanel onAddVisualLibraryItem={onAddVisualLibraryItem} />

      <StaffVisualLibraryPanel
        selectedProfile={selectedProfile}
        visualLibrary={visualLibrary}
        onAddVisualLibraryItem={onAddVisualLibraryItem}
        onUpdateVisualLibraryItem={onUpdateVisualLibraryItem}
        onDeleteVisualLibraryItem={onDeleteVisualLibraryItem}
        onResetVisualLibrary={onResetVisualLibrary}
      />
    </StaffToolGroup>
  </section>
) : null}

{activeStaffTab === "schedule" ? (
  <section className="staff-tab-screen" aria-labelledby="staff-schedule-heading">
    <div className="focus-header compact-focus-header">
      <p className="eyebrow">Schedule</p>
      <h2 id="staff-schedule-heading">Today’s schedule</h2>
      <p>Add one-time activities or edit today’s assigned activities.</p>
    </div>

    <StaffToolGroup
      title="Date, print, and routine shortcuts"
      description="Pick the day, print the visual schedule, and apply routine templates"
      defaultOpen
    >
      <ScheduleDatePicker
        scheduleDate={scheduleDate}
        onScheduleDateChange={onScheduleDateChange}
      />

      <PrintSchedulePanel activities={activities} />

      <RoutineTemplatePanel
        onApplyDailyTemplate={onApplyDailyTemplate}
        onApplyCurrentScheduleToTomorrow={onApplyCurrentScheduleToTomorrow}
        onApplyCurrentScheduleToWeek={onApplyCurrentScheduleToWeek}
      />

      <DailyTemplateButtons onApplyDailyTemplate={onApplyDailyTemplate} />
    </StaffToolGroup>

    <StaffToolGroup
      title="Review and add activities"
      description="Review student-created items and add staff-created activities"
    >
      <ReviewQueuePanel
        activities={activities}
        onSelectActivity={onSelectActivity}
        onSaveActivityToBank={onSaveActivityToBank}
        onDismissReview={onDismissReview}
      />

      <AddActivityForm onAddActivity={onAddActivity} />
    </StaffToolGroup>

    <StaffToolGroup
      title="Edit schedule and steps"
      description="Select an activity, reorder items, edit steps, and save reusable choices"
    >
      <div className="workspace-grid staff-grid">
        <StaffActivityList
          activities={activities}
          selectedActivityId={selectedActivityId}
          onSelectActivity={onSelectActivity}
          onMoveActivity={onMoveActivity}
          onDeleteActivity={onDeleteActivity}
        />

        <StaffActivityEditor
          activity={selectedActivity}
          visualLibrary={visualLibrary}
          onSaveVisualToLibrary={onAddVisualLibraryItem}
          onUpdateActivity={onUpdateActivity}
          onUpdateStep={onUpdateStep}
          onAddStep={onAddStep}
          onDeleteStep={onDeleteStep}
          onMoveStep={onMoveStep}
          onSaveActivityToBank={onSaveActivityToBank}
          onDeleteActivity={onDeleteActivity}
        />
      </div>
    </StaffToolGroup>
  </section>
) : null}

{activeStaffTab === "notes" ? (
  <section className="staff-tab-screen" aria-labelledby="staff-notes-heading">
    <div className="focus-header compact-focus-header">
      <p className="eyebrow">Notes</p>
      <h2 id="staff-notes-heading">Daily documentation</h2>
      <p>Write notes, log observations, update goals, and review accessibility supports.</p>
    </div>

    <StaffToolGroup
      title="Daily note"
      description="Write, copy, and download the daily documentation note"
      defaultOpen
    >
      <DocumentationPanel
        profile={selectedProfile}
        activities={activities}
        documentationDate={documentationDate}
        dailyNote={dailyNote}
        supportEvents={supportEvents}
        copyStatus={copyStatus}
        onDocumentationDateChange={onDocumentationDateChange}
        onUpdateDailyNote={onUpdateDailyNote}
        onCopyDailyNote={onCopyDailyNote}
        onDownloadDailyNote={onDownloadDailyNote}
        onDownloadActivityCsv={onDownloadActivityCsv}
      />
    </StaffToolGroup>

    <StaffToolGroup
      title="Goals and accessibility review"
      description="Track goals and review access supports"
    >
      <StaffGoalPanel
        goals={progressGoals}
        activities={activities}
        activityBank={activityBank}
        onAddGoal={onAddGoal}
        onUpdateGoal={onUpdateGoal}
        onDeleteGoal={onDeleteGoal}
      />

      <AccessibilityReviewPanel
        accessibilityReview={accessibilityReview}
        onUpdateAccessibilityReview={onUpdateAccessibilityReview}
      />
    </StaffToolGroup>

    <StaffToolGroup
      title="Session notes, observations, and event log"
      description="Capture staff observations and review support events"
    >
      <SessionNoteWizardPanel onAddSessionNote={onAddSessionNote} />

      <StaffObservationLogPanel
        activities={activities}
        onAddSupportObservation={onAddSupportObservation}
      />

      <EventLogPanel events={supportEvents} />
    </StaffToolGroup>
  </section>
) : null}

{activeStaffTab === "reports" ? (
  <section className="staff-tab-screen" aria-labelledby="staff-reports-heading">
    <div className="focus-header compact-focus-header">
      <p className="eyebrow">Reports</p>
      <h2 id="staff-reports-heading">Patterns and handoffs</h2>
      <p>Review weekly progress, support patterns, readiness, communication history, and handoff summaries.</p>
    </div>

    <StaffToolGroup
      title="Progress and handoff reports"
      description="Weekly summaries, handoff reports, caregiver summaries, and About Me export"
      defaultOpen
    >
      <WeeklyProgressPanel
        summary={weeklyProgressSummary}
        report={weeklyProgressReport}
        onDownloadWeeklyReport={onDownloadWeeklyReport}
      />

      <HandoffReportPanel
        handoffReport={handoffReport}
        onDownloadHandoffReport={onDownloadHandoffReport}
      />

      <CaregiverHandoffPanel
        selectedProfile={selectedProfile}
        lifeSkillsSettings={lifeSkillsSettings}
      />

      <AboutMeExportPanel
        selectedProfile={selectedProfile}
        aboutMeProfile={aboutMeProfile}
      />
    </StaffToolGroup>

    <StaffToolGroup
      title="Communication and support patterns"
      description="Communication history, activity support patterns, readiness, and recommendations"
    >
      <CommunicationHistoryPanel supportEvents={supportEvents} />

      <ActivitySupportPatternPanel
        activities={activities}
        supportEvents={supportEvents}
        supportObservations={supportObservations}
      />

      <ActivityReadinessReviewPanel
        activities={activities}
        supportEvents={supportEvents}
        supportObservations={supportObservations}
      />

      <TryAgainLaterQueuePanel supportEvents={supportEvents} />

      <GoalSupportRecommendationsPanel
        supportEvents={supportEvents}
        progressGoals={progressGoals}
      />
    </StaffToolGroup>
  </section>
) : null}

{activeStaffTab === "save" ? (
  <section className="staff-tab-screen" aria-labelledby="staff-save-heading">
    <div className="focus-header compact-focus-header">
      <p className="eyebrow">Settings</p>
      <h2 id="staff-save-heading">Account, cloud, export, and security</h2>
      <p>Use these tools for account access, backup/export, security review, and prototype safety.</p>
    </div>

    <StaffToolGroup
      title="Prototype safety and data health"
      description="Review prototype warnings, data quality, and backend-readiness status"
      defaultOpen
    >
      <PrototypeWarningPanel />

      <DataHealthPanel
        dataHealth={dataHealth}
        onDownloadNormalizedExport={onDownloadNormalizedExport}
      />

      <BackendArchitecturePanel />

      <BackendNormalizationStartPanel dataHealth={dataHealth} />

      <ComplianceReadinessPanel />
    </StaffToolGroup>

    <StaffToolGroup
      title="Account and cloud sync"
      description="Staff sign-in, cloud snapshot save/load, and sync status"
    >
      <AuthPanel
        session={session}
        authStatus={authStatus}
        isAuthWorking={isAuthWorking}
        onSignIn={onSignIn}
        onSignUp={onSignUp}
        onGoogleSignIn={onGoogleSignIn}
        onSignOut={onSignOut}
      />

      <SupabaseSyncPanel
        session={session}
        syncStatus={syncStatus}
        isSyncing={isSyncing}
        syncMetadata={syncMetadata}
        hasUnsavedCloudChanges={hasUnsavedCloudChanges}
        syncReminder={syncReminder}
        onSaveCloudSnapshot={onSaveCloudSnapshot}
        onLoadCloudSnapshot={onLoadCloudSnapshot}
      />
    </StaffToolGroup>

    <StaffToolGroup
      title="Security, permissions, and exports"
      description="PIN/security settings, role permissions, CSV exports, backup, and import"
    >
      <StaffSecurityPanel
        staffSecurity={staffSecurity}
        onUpdateStaffSecurity={onUpdateStaffSecurity}
        onLockStaff={onLockStaff}
      />

      <RolePermissionsPanel
        rolePermissions={rolePermissions}
        onUpdateRolePermissions={onUpdateRolePermissions}
      />

      <ExportUpgradePanel
        onDownloadGoalCsv={onDownloadGoalCsv}
        onDownloadSupportEventCsv={onDownloadSupportEventCsv}
        onDownloadPromptCsv={onDownloadPromptCsv}
        onExportSingleProfile={onExportSingleProfile}
      />

      <DataManagementPanel
        exportStatus={exportStatus}
        importStatus={importStatus}
        onExportBackup={onExportBackup}
        onImportBackup={onImportBackup}
      />
    </StaffToolGroup>

    <StaffToolGroup
      title="Danger zone"
      description="Reset demo data or clear the selected profile schedule"
    >
      <section className="panel controls-panel" aria-label="Schedule controls">
        <button type="button" className="secondary-button" onClick={onResetDemo}>
          Reset demo data
        </button>
        <button type="button" className="danger-button" onClick={onClearSchedule}>
          Clear selected profile schedule
        </button>
      </section>
    </StaffToolGroup>
  </section>
) : null}

      <PrototypeSafetyFooter mode="staff" />
    </div>
  );
}
