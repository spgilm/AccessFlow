/**
 * StaffReleaseReadinessPanel
 *
 * v50 release-candidate review panel. This is a QA/readiness guide, not a
 * HIPAA, FERPA, security, legal, or clinical certification.
 */
import { buildReleaseReadinessSummary } from "../utils/releaseReadiness.js";

export default function StaffReleaseReadinessPanel({
  profiles,
  displaySettings,
  aacExpansionSettings,
  communicationSupportSettings,
  selfAdvocacySupportSettings,
  lifeSkillsSettings,
  visualLibrary,
  supportEvents,
}) {
  const summary = buildReleaseReadinessSummary({
    profiles,
    displaySettings,
    aacExpansionSettings,
    communicationSupportSettings,
    selfAdvocacySupportSettings,
    lifeSkillsSettings,
    visualLibrary,
    supportEvents,
  });

  return (
    <section className="panel release-readiness-panel" aria-labelledby="release-readiness-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">v50 readiness</p>
          <h2 id="release-readiness-heading">Solid release candidate review</h2>
          <p className="field-help">
            Prototype QA snapshot only. This does not certify HIPAA, FERPA, security, legal, clinical, or production readiness.
          </p>
        </div>
      </div>

      <div className="release-readiness-summary-grid">
        <article>
          <strong>{summary.readyCount}</strong>
          <span>Ready checks</span>
        </article>
        <article>
          <strong>{summary.reviewCount}</strong>
          <span>Review checks</span>
        </article>
        <article>
          <strong>{summary.totalButtons}</strong>
          <span>Audited buttons</span>
        </article>
        <article>
          <strong>{summary.visualLibraryCount}</strong>
          <span>Saved visuals</span>
        </article>
      </div>

      <div className="release-readiness-check-list">
        {summary.checks.map((check) => (
          <article key={check.id} className={`release-readiness-check is-${check.status}`}>
            <strong>{check.label}</strong>
            <span>{check.status === "ready" ? "Ready" : "Review"}</span>
            <p>{check.detail}</p>
          </article>
        ))}
      </div>

      <details className="student-tool-group compact-details">
        <summary>
          <span>
            <strong>Manual v50 QA steps</strong>
            <small>Recommended before trusting a new deployment</small>
          </span>
        </summary>
        <ol className="release-qa-list">
          <li>Run npm install, npm run build, and npm run dev locally.</li>
          <li>Open Student Mode on a phone-sized screen.</li>
          <li>Confirm labels remain visible under visuals in every communication panel.</li>
          <li>Try balanced, large visuals, label-first, and labels-only visual preferences.</li>
          <li>Assign a saved photo visual to a communication button and confirm it displays.</li>
          <li>Confirm the HIPAA/FERPA prototype warning appears at the bottom of Student and Staff modes.</li>
          <li>Use fake/demo data only.</li>
        </ol>
      </details>
    </section>
  );
}
