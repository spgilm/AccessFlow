import AddActivityForm from "./AddActivityForm.jsx";
import AuthPanel from "./AuthPanel.jsx";
import DataManagementPanel from "./DataManagementPanel.jsx";
import DocumentationPanel from "./DocumentationPanel.jsx";
import ProfileManager from "./ProfileManager.jsx";
import StaffActivityEditor from "./StaffActivityEditor.jsx";
import StaffActivityList from "./StaffActivityList.jsx";
import SupabaseSyncPanel from "./SupabaseSyncPanel.jsx";
import TemplateManager from "./TemplateManager.jsx";

export default function StaffView({
  profiles,
  selectedProfile,
  selectedProfileId,
  templates,
  activities,
  selectedActivity,
  selectedActivityId,
  documentationDate,
  dailyNote,
  copyStatus,
  exportStatus,
  importStatus,
  syncStatus,
  isSyncing,
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
    <div className="staff-view">
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

      <DataManagementPanel
        exportStatus={exportStatus}
        importStatus={importStatus}
        onExportBackup={onExportBackup}
        onImportBackup={onImportBackup}
      />

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
          onSaveCloudSnapshot={onSaveCloudSnapshot}
          onLoadCloudSnapshot={onLoadCloudSnapshot}
        />
      </div>

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
          onDeleteActivity={onDeleteActivity}
        />
      </div>

      <section className="panel controls-panel" aria-label="Schedule controls">
        <button type="button" className="secondary-button" onClick={onResetDemo}>
          Reset demo data
        </button>
        <button type="button" className="danger-button" onClick={onClearSchedule}>
          Clear selected profile schedule
        </button>
      </section>
    </div>
  );
}
