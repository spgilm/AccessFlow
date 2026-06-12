import AddActivityForm from "./AddActivityForm.jsx";
import AuthPanel from "./AuthPanel.jsx";
import DataManagementPanel from "./DataManagementPanel.jsx";
import DocumentationPanel from "./DocumentationPanel.jsx";
import ProfileManager from "./ProfileManager.jsx";
import StaffActivityEditor from "./StaffActivityEditor.jsx";
import StaffActivityList from "./StaffActivityList.jsx";
import StaffChoiceBankPanel from "./StaffChoiceBankPanel.jsx";
import SupabaseSyncPanel from "./SupabaseSyncPanel.jsx";
import TemplateManager from "./TemplateManager.jsx";

function WorkSection({ number, title, subtitle, children, open = false }) {
  return (
    <details className="staff-work-section" open={open}>
      <summary>
        <span className="section-number">{number}</span>
        <span>
          <strong>{title}</strong>
          {subtitle ? <small>{subtitle}</small> : null}
        </span>
      </summary>
      <div className="staff-work-section-body">
        {children}
      </div>
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
  selectedActivity,
  selectedActivityId,
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
  onSaveCurrentScheduleAsTemplate,
  onApplyTemplateToProfile,
  onDeleteTemplate,
  onAddActivity,
  onAddChoiceToBank,
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
  return (
    <div className="staff-view simplified-staff-view">
      <WorkSection
        number="1"
        title="Student"
        subtitle="Choose profile and basic setup"
        open
      >
        <div className="staff-management-grid">
          <ProfileManager
            profiles={profiles}
            selectedProfile={selectedProfile}
            selectedProfileId={selectedProfileId}
            onSelectProfile={onSelectProfile}
            onAddProfile={onAddProfile}
            onUpdateProfile={onUpdateProfile}
            onDeleteProfile={onDeleteProfile}
          />

          <TemplateManager
            templates={templates}
            selectedProfile={selectedProfile}
            onSaveCurrentScheduleAsTemplate={onSaveCurrentScheduleAsTemplate}
            onApplyTemplateToProfile={onApplyTemplateToProfile}
            onDeleteTemplate={onDeleteTemplate}
          />
        </div>
      </WorkSection>

      <WorkSection
        number="2"
        title="Student choices"
        subtitle="Make the activities the student can choose"
        open
      >
        <StaffChoiceBankPanel
          selectedProfile={selectedProfile}
          activityBank={activityBank}
          onAddChoiceToBank={onAddChoiceToBank}
          onUpdateBankChoice={onUpdateBankChoice}
          onAddBankChoiceToSchedule={onAddBankChoiceToSchedule}
          onDeleteBankChoice={onDeleteBankChoice}
        />
      </WorkSection>

      <WorkSection
        number="3"
        title="Today’s schedule"
        subtitle="Assign, edit, and order today’s activities"
        open
      >
        <AddActivityForm onAddActivity={onAddActivity} />

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
            onUpdateActivity={onUpdateActivity}
            onUpdateStep={onUpdateStep}
            onAddStep={onAddStep}
            onDeleteStep={onDeleteStep}
            onMoveStep={onMoveStep}
            onSaveActivityToBank={onSaveActivityToBank}
            onDeleteActivity={onDeleteActivity}
          />
        </div>
      </WorkSection>

      <WorkSection
        number="4"
        title="Notes and reports"
        subtitle="Document progress after support"
      >
        <DocumentationPanel
          profile={selectedProfile}
          activities={activities}
          documentationDate={documentationDate}
          dailyNote={dailyNote}
          copyStatus={copyStatus}
          onDocumentationDateChange={onDocumentationDateChange}
          onUpdateDailyNote={onUpdateDailyNote}
          onCopyDailyNote={onCopyDailyNote}
          onDownloadDailyNote={onDownloadDailyNote}
          onDownloadActivityCsv={onDownloadActivityCsv}
        />
      </WorkSection>

      <WorkSection
        number="5"
        title="Save and account"
        subtitle="Sign in, sync, export, and reset"
      >
        <div className="staff-management-grid">
          <AuthPanel
            session={session}
            authStatus={authStatus}
            isAuthWorking={isAuthWorking}
            onSignIn={onSignIn}
            onSignUp={onSignUp}
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
        </div>

        <DataManagementPanel
          exportStatus={exportStatus}
          importStatus={importStatus}
          onExportBackup={onExportBackup}
          onImportBackup={onImportBackup}
        />

        <section className="panel controls-panel" aria-label="Schedule controls">
          <button type="button" className="secondary-button" onClick={onResetDemo}>
            Reset demo data
          </button>
          <button type="button" className="danger-button" onClick={onClearSchedule}>
            Clear selected profile schedule
          </button>
        </section>
      </WorkSection>
    </div>
  );
}
