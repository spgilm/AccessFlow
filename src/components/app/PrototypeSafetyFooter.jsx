/**
 * PrototypeSafetyFooter
 *
 * Persistent bottom-of-page warning for Student and Staff Mode.
 */
export default function PrototypeSafetyFooter({ mode = "app" }) {
  const modeLabel = mode === "student" ? "Student Mode" : mode === "staff" ? "Staff Mode" : "AccessFlow";

  return (
    <footer className="prototype-safety-footer" aria-label={`${modeLabel} prototype data warning`}>
      <strong>Prototype only — do not use real student/client data.</strong>
      <p>
        AccessFlow is not HIPAA certified, not FERPA certified, and has not completed production privacy,
        security, compliance, legal, or vendor review. Use fake/demo data only. Do not enter real names,
        health information, education records, disability information, behavior data, family information,
        or other personally identifying information.
      </p>
    </footer>
  );
}
