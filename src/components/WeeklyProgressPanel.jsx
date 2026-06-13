/**
 * Staff-facing weekly progress dashboard.
 *
 * Shows weekly completion, goal progress, prompt/support trends, and a copy-ready
 * report based on the selected documentation date's week.
 */
export default function WeeklyProgressPanel({
  summary,
  report,
  onDownloadWeeklyReport,
}) {
  const supportEntries = Object.entries(summary.supportCounts);
  const promptEntries = Object.entries(summary.promptCounts);

  return (
    <section className="panel weekly-progress-panel" aria-labelledby="weekly-progress-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Weekly data</p>
          <h2 id="weekly-progress-heading">Progress dashboard</h2>
          <p className="field-help">
            Week of {summary.weekDateKeys[0]} to {summary.weekDateKeys[6]}.
          </p>
        </div>

        <button type="button" className="secondary-button" onClick={onDownloadWeeklyReport}>
          Download weekly report
        </button>
      </div>

      <div className="weekly-stat-grid">
        <article className="weekly-stat-card">
          <span>Activities</span>
          <strong>{summary.totals.completedActivities}/{summary.totals.activities}</strong>
          <small>{summary.activityPercent}% complete</small>
        </article>

        <article className="weekly-stat-card">
          <span>Steps</span>
          <strong>{summary.totals.completedSteps}/{summary.totals.steps}</strong>
          <small>{summary.stepPercent}% complete</small>
        </article>

        <article className="weekly-stat-card">
          <span>Support events</span>
          <strong>{summary.supportEvents.length}</strong>
          <small>logged this week</small>
        </article>
      </div>

      <div className="weekly-dashboard-grid">
        <section className="weekly-subpanel">
          <h3>Goal progress</h3>
          {summary.goalSummaries.length === 0 ? (
            <p className="field-help">No active goals configured.</p>
          ) : (
            <div className="weekly-goal-list">
              {summary.goalSummaries.map((goal) => (
                <article key={goal.id} className={`weekly-goal-card ${goal.isMet ? "is-met" : ""}`}>
                  <strong>{goal.title}</strong>
                  <span>{goal.daysCompleted.length}/{goal.daysWithActivity.length} scheduled days complete</span>
                  <span>{goal.percent}%</span>
                  <small>{goal.isMet ? "Target met" : "Target not met yet"}</small>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="weekly-subpanel">
          <h3>Prompt / support levels</h3>
          {promptEntries.length === 0 ? (
            <p className="field-help">No step-level support data recorded this week.</p>
          ) : (
            <ul className="compact-data-list">
              {promptEntries.map(([level, count]) => (
                <li key={level}>
                  <span>{level}</span>
                  <strong>{count}</strong>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="weekly-subpanel">
          <h3>Support / choice events</h3>
          {supportEntries.length === 0 ? (
            <p className="field-help">No support or choice events recorded this week.</p>
          ) : (
            <ul className="compact-data-list">
              {supportEntries.map(([label, count]) => (
                <li key={label}>
                  <span>{label}</span>
                  <strong>{count}</strong>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="weekly-subpanel">
          <h3>Daily breakdown</h3>
          <ul className="compact-data-list">
            {summary.dailyStats.map(({ dateKey, stats }) => (
              <li key={dateKey}>
                <span>{dateKey}</span>
                <strong>{stats.completedActivities}/{stats.totalActivities}</strong>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <details className="weekly-report-details">
        <summary>Copy-ready weekly report</summary>
        <pre>{report}</pre>
      </details>
    </section>
  );
}
