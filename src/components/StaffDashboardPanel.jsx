/**
 * Staff dashboard landing panel.
 */
export default function StaffDashboardPanel({
  selectedProfile,
  activities,
  dailyNote,
  supportEvents,
  weeklyProgressSummary,
  hasUnsavedCloudChanges,
  syncMetadata,
  onOpenStudentMode,
  onGoToTab,
}) {
  const incompleteDailyNote =
    !dailyNote?.observation?.trim() &&
    !dailyNote?.supportStrategies?.trim() &&
    !dailyNote?.nextSteps?.trim();

  return (
    <section className="staff-tab-screen dashboard-screen" aria-labelledby="staff-dashboard-heading">
      <div className="focus-header compact-focus-header">
        <p className="eyebrow">Dashboard</p>
        <h2 id="staff-dashboard-heading">Today at a glance</h2>
        <p>{selectedProfile?.name ?? "No profile selected"}</p>
      </div>

      <div className="dashboard-card-grid">
        <article className="dashboard-card">
          <span>Schedule</span>
          <strong>{activities.filter((activity) => activity.completed).length}/{activities.length}</strong>
          <small>activities complete</small>
        </article>

        <article className="dashboard-card">
          <span>Weekly goals</span>
          <strong>{weeklyProgressSummary.goalSummaries.filter((goal) => goal.isMet).length}/{weeklyProgressSummary.goalSummaries.length}</strong>
          <small>targets met</small>
        </article>

        <article className="dashboard-card">
          <span>Support events</span>
          <strong>{supportEvents.length}</strong>
          <small>total logged</small>
        </article>

        <article className={`dashboard-card ${hasUnsavedCloudChanges ? "needs-attention" : ""}`}>
          <span>Cloud save</span>
          <strong>{hasUnsavedCloudChanges ? "Unsaved" : "Saved"}</strong>
          <small>{syncMetadata?.lastSavedAt ? `Last save ${new Date(syncMetadata.lastSavedAt).toLocaleString()}` : "No cloud save yet"}</small>
        </article>
      </div>

      <div className="dashboard-action-grid">
        <button type="button" className="primary-wide-button" onClick={onOpenStudentMode}>
          Open Student Mode
        </button>
        <button type="button" className="secondary-button" onClick={() => onGoToTab("schedule")}>
          Edit schedule
        </button>
        <button type="button" className="secondary-button" onClick={() => onGoToTab("notes")}>
          Review notes
        </button>
        <button type="button" className="secondary-button" onClick={() => onGoToTab("save")}>
          Save / sync
        </button>
      </div>

      {incompleteDailyNote ? (
        <p className="form-error">Daily note appears incomplete.</p>
      ) : null}
    </section>
  );
}
