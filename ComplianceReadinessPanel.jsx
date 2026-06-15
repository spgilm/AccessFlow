/**
 * Reusable prototype/privacy warning.
 */
export default function PrototypeWarningPanel({ compact = false }) {
  return (
    <section className={compact ? "prototype-warning-panel compact-warning" : "panel prototype-warning-panel"}>
      <strong>Prototype warning</strong>
      <p>
        Do not enter real student/client data yet. AccessFlow is not currently configured
        for HIPAA, FERPA, agency compliance, production audit trails, or formal records retention.
        Use mock data only while testing.
      </p>
    </section>
  );
}
