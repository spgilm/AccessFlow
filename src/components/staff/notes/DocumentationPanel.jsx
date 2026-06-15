/**
 * Staff-facing documentation form and generated progress-note display.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import {
  buildActivityBreakdown,
  buildDailyProgressNote,
  getCompletionStats,
} from "../../../utils/documentationHelpers.js";

const promptLevels = [
  "Not recorded",
  "Independent",
  "Gesture prompt",
  "Visual prompt",
  "Verbal prompt",
  "Model prompt",
  "Partial physical prompt",
  "Full physical prompt",
  "Hand-over-hand",
];

const engagementOptions = [
  "Not recorded",
  "High engagement",
  "Moderate engagement",
  "Low engagement",
  "Refused activity",
  "Distressed / dysregulated",
  "Completed with breaks",
];

export default function DocumentationPanel({
  profile,
  activities,
  documentationDate,
  dailyNote,
  supportEvents = [],
  copyStatus,
  onDocumentationDateChange,
  onUpdateDailyNote,
  onCopyDailyNote,
  onDownloadDailyNote,
  onDownloadActivityCsv,
}) {
  const stats = getCompletionStats(activities);
  const progressNote = buildDailyProgressNote(profile, activities, dailyNote, supportEvents);

  function updateField(field, value) {
    onUpdateDailyNote({
      ...dailyNote,
      [field]: value,
      updatedAt: new Date().toISOString(),
    });
  }

  return (
    <section className="panel documentation-panel" aria-labelledby="documentation-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Documentation</p>
          <h2 id="documentation-heading">Daily progress note</h2>
        </div>
      </div>

      <div className="documentation-summary-grid">
        <label>
          Documentation date
          <input
            type="date"
            value={documentationDate}
            onChange={(event) => onDocumentationDateChange(event.target.value)}
          />
        </label>

        <div className="documentation-stat-card">
          <span>Activities</span>
          <strong>
            {stats.completedActivities}/{stats.totalActivities}
          </strong>
          <small>{stats.activityPercent}% complete</small>
        </div>

        <div className="documentation-stat-card">
          <span>Steps</span>
          <strong>
            {stats.completedSteps}/{stats.totalSteps}
          </strong>
          <small>{stats.stepPercent}% complete</small>
        </div>
      </div>

      <details className="activity-breakdown-details">
        <summary>Activity completion breakdown</summary>
        <pre>{buildActivityBreakdown(activities)}</pre>
      </details>

      <details className="activity-breakdown-details">
        <summary>Support events today</summary>
        <pre>
          {supportEvents.length === 0
            ? "No support or choice events recorded."
            : supportEvents
                .map((event) => `- ${new Date(event.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}: ${event.label}${event.activityLabel ? ` during ${event.activityLabel}` : ""}`)
                .join("\n")}
        </pre>
      </details>

      <div className="documentation-form-grid">
        <label>
          Prompt level used
          <select
            value={dailyNote.promptLevel}
            onChange={(event) => updateField("promptLevel", event.target.value)}
          >
            {promptLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label>
          Engagement / participation
          <select
            value={dailyNote.engagement}
            onChange={(event) => updateField("engagement", event.target.value)}
          >
            {engagementOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="full-width">
          Staff observation
          <textarea
            rows="3"
            value={dailyNote.observation}
            placeholder="What did staff observe during the schedule?"
            onChange={(event) => updateField("observation", event.target.value)}
          />
        </label>

        <label className="full-width">
          Support strategies used
          <textarea
            rows="3"
            value={dailyNote.supportStrategies}
            placeholder="Examples: visual cue, wait time, first/then language, sensory break, AAC support..."
            onChange={(event) => updateField("supportStrategies", event.target.value)}
          />
        </label>

        <label className="full-width">
          Next steps / follow-up
          <textarea
            rows="3"
            value={dailyNote.nextSteps}
            placeholder="What should staff try next time?"
            onChange={(event) => updateField("nextSteps", event.target.value)}
          />
        </label>
      </div>

      <div className="generated-note-block">
        <div className="editor-subheader">
          <div>
            <p className="eyebrow">Generated note</p>
            <h3>Copy-ready summary</h3>
          </div>
          <div className="row-actions">
            <button type="button" className="secondary-button" onClick={onCopyDailyNote}>
              Copy note
            </button>
            <button type="button" className="secondary-button" onClick={onDownloadDailyNote}>
              Download .txt
            </button>
            <button type="button" className="secondary-button" onClick={onDownloadActivityCsv}>
              Download .csv
            </button>
          </div>
        </div>

        {copyStatus ? (
          <p className="copy-status" role="status">
            {copyStatus}
          </p>
        ) : null}

        <textarea readOnly rows="14" value={progressNote} aria-label="Generated daily progress note" />
      </div>
    </section>
  );
}
