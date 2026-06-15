/**
 * Staff handoff report panel.
 */
export default function HandoffReportPanel({ handoffReport, onDownloadHandoffReport }) {
  return (
    <section className="panel handoff-report-panel" aria-labelledby="handoff-report-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Handoff</p>
          <h2 id="handoff-report-heading">Team handoff report</h2>
          <p className="field-help">
            Copy or download a concise summary for home/school/program handoff.
          </p>
        </div>
        <button type="button" className="secondary-button" onClick={onDownloadHandoffReport}>
          Download handoff
        </button>
      </div>

      <details className="weekly-report-details" open>
        <summary>Handoff report</summary>
        <pre>{handoffReport}</pre>
      </details>
    </section>
  );
}
