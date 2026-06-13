/**
 * Staff-facing upgraded export panel.
 */
export default function ExportUpgradePanel({
  onDownloadGoalCsv,
  onDownloadSupportEventCsv,
  onDownloadPromptCsv,
  onExportSingleProfile,
}) {
  return (
    <section className="panel export-upgrade-panel" aria-labelledby="export-upgrade-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Exports</p>
          <h2 id="export-upgrade-heading">Advanced exports</h2>
          <p className="field-help">
            Download structured data for goals, support events, prompt levels, or one profile.
          </p>
        </div>
      </div>

      <div className="export-upgrade-grid">
        <button type="button" className="secondary-button" onClick={onDownloadGoalCsv}>
          Goal CSV
        </button>
        <button type="button" className="secondary-button" onClick={onDownloadSupportEventCsv}>
          Support event CSV
        </button>
        <button type="button" className="secondary-button" onClick={onDownloadPromptCsv}>
          Prompt-level CSV
        </button>
        <button type="button" className="secondary-button" onClick={onExportSingleProfile}>
          Single-profile backup
        </button>
      </div>
    </section>
  );
}
