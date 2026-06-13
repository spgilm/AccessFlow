/**
 * Staff-facing data health and prototype safety panel.
 */
import { getPrototypeSafetyChecklist } from "../utils/dataHealth.js";

function formatBytesFromCharacters(characterCount) {
  const bytes = characterCount * 2;

  if (bytes > 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  }

  if (bytes > 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${bytes} bytes`;
}

export default function DataHealthPanel({
  dataHealth,
  onDownloadNormalizedExport,
}) {
  const safetyChecklist = getPrototypeSafetyChecklist();

  return (
    <section className="panel data-health-panel" aria-labelledby="data-health-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Data health</p>
          <h2 id="data-health-heading">Prototype data safety</h2>
          <p className="field-help">
            These checks help identify prototype risks. They do not prove HIPAA/FERPA/compliance readiness.
          </p>
        </div>
        <button type="button" className="secondary-button" onClick={onDownloadNormalizedExport}>
          Export normalized JSON
        </button>
      </div>

      <div className="data-health-grid">
        <article>
          <span>Profiles</span>
          <strong>{dataHealth.profileCount}</strong>
        </article>
        <article>
          <span>Activities</span>
          <strong>{dataHealth.activityCount}</strong>
        </article>
        <article>
          <span>Steps</span>
          <strong>{dataHealth.stepCount}</strong>
        </article>
        <article>
          <span>Support events</span>
          <strong>{dataHealth.supportEventCount}</strong>
        </article>
        <article>
          <span>Goals</span>
          <strong>{dataHealth.goalCount}</strong>
        </article>
        <article>
          <span>Snapshot estimate</span>
          <strong>{formatBytesFromCharacters(dataHealth.estimatedSnapshotCharacters)}</strong>
        </article>
      </div>

      {dataHealth.warnings.length > 0 ? (
        <div className="data-warning-box">
          <h3>Warnings</h3>
          <ul>
            {dataHealth.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="copy-status">No prototype data-health warnings found.</p>
      )}

      <details className="data-health-details">
        <summary>Mock-data safety checklist</summary>
        <ul>
          {safetyChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>
    </section>
  );
}
