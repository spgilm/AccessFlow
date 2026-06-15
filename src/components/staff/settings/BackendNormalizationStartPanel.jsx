/**
 * BackendNormalizationStartPanel
 *
 * v39 backend normalization readiness start.
 */
import { buildNormalizationReadinessSnapshot } from "../../../utils/normalizationReadiness.js";

export default function BackendNormalizationStartPanel({ dataHealth }) {
  const readiness = buildNormalizationReadinessSnapshot({ dataHealth });

  return (
    <section className="panel backend-normalization-panel" aria-labelledby="backend-normalization-heading">
      <div>
        <p className="eyebrow">v39 backend start</p>
        <h2 id="backend-normalization-heading">Normalized backend readiness</h2>
        <p className="field-help">
          Current active storage is still snapshot sync. This panel starts the migration map toward normalized tables.
        </p>
      </div>

      <div className="backend-readiness-card">
        <strong>Current:</strong>
        <span>{readiness.currentStorage}</span>
        <strong>Target:</strong>
        <span>{readiness.targetStorage}</span>
        <strong>Status:</strong>
        <span>{readiness.readinessStatus}</span>
      </div>

      <div className="normalization-domain-grid">
        {readiness.domains.map((domain) => (
          <article key={domain.domain}>
            <h3>{domain.domain}</h3>
            <p>{domain.status}</p>
            <ul>
              {domain.tables.map((table) => (
                <li key={table}>{table}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="prototype-warning-panel small-warning">
        <strong>Still not production-compliant.</strong>
        <p>Before real data: server-enforced roles, RLS, audit logs, retention/deletion policy, and legal/vendor review are still required.</p>
      </div>
    </section>
  );
}
