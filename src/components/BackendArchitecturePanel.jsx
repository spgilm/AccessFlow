/**
 * Staff/developer-facing backend architecture status panel.
 */
export default function BackendArchitecturePanel() {
  return (
    <section className="panel backend-architecture-panel" aria-labelledby="backend-architecture-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Architecture</p>
          <h2 id="backend-architecture-heading">Backend migration status</h2>
          <p className="field-help">
            Snapshot sync is still active. Normalized tables are scaffolded for the next backend phase.
          </p>
        </div>
      </div>

      <div className="architecture-status-list">
        <article>
          <strong>Current active sync</strong>
          <span>Snapshot table: accessflow_workspace_snapshots</span>
        </article>
        <article>
          <strong>Normalized schema scaffold</strong>
          <span>database/v20-normalized-schema.sql</span>
        </article>
        <article>
          <strong>RLS policy scaffold</strong>
          <span>database/v23-normalized-rls-policies.sql</span>
        </article>
        <article>
          <strong>Migration readiness</strong>
          <span>Use Export normalized JSON to inspect table-like data.</span>
        </article>
      </div>

      <div className="data-warning-box">
        <h3>Before production backend use</h3>
        <ul>
          <li>Implement normalized table writes.</li>
          <li>Add RLS policies for every normalized table.</li>
          <li>Add workspace/team membership tables.</li>
          <li>Add audit trails for edits and exports.</li>
          <li>Move uploaded images to remote storage.</li>
          <li>Build conflict handling for offline/sync collisions.</li>
        </ul>
      </div>
    </section>
  );
}
