/**
 * ComplianceReadinessPanel
 *
 * Staff/developer-facing summary of the current HIPAA/FERPA readiness state.
 * This panel is intentionally conservative: it avoids claiming compliance and
 * lists the technical/operational controls still required before real data.
 */
const readinessItems = [
  ["Real backend roles", "Needed", "Role settings exist in prototype, but permissions are not fully server-enforced."],
  ["Normalized data model", "Partial", "SQL and export scaffolds exist; snapshot sync is still active."],
  ["Audit logs", "Needed", "Official create/read/update/delete/export audit logs are not active yet."],
  ["Remote image storage", "Needed", "Uploaded images can still live inside snapshots."],
  ["Retention/deletion controls", "Needed", "No production retention or deletion workflow yet."],
  ["Legal/vendor review", "Needed", "BAA/DPA/compliance review must happen outside the codebase."],
];

export default function ComplianceReadinessPanel() {
  return (
    <section className="panel compliance-readiness-panel" aria-labelledby="compliance-readiness-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Compliance readiness</p>
          <h2 id="compliance-readiness-heading">HIPAA / FERPA status</h2>
          <p className="field-help">
            AccessFlow is not ready for real student/client data. This panel tracks what must change before production use.
          </p>
        </div>
      </div>

      <div className="compliance-status-banner" role="note">
        <strong>Current status: prototype only</strong>
        <span>Use mock data. Do not enter real PHI, PII, education records, IEP/ISP data, or client-identifying information.</span>
      </div>

      <div className="compliance-readiness-list">
        {readinessItems.map(([label, status, detail]) => (
          <article key={label}>
            <div>
              <strong>{label}</strong>
              <span>{detail}</span>
            </div>
            <em>{status}</em>
          </article>
        ))}
      </div>

      <p className="field-help">
        See HIPAA_FERPA_READINESS.md, COMPLIANCE_GAP_ANALYSIS.md, SECURITY_CONTROLS_CHECKLIST.md,
        and PRIVACY_SECURITY_READINESS.md for the full readiness plan.
      </p>
    </section>
  );
}
