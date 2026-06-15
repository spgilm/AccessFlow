/**
 * StaffFeatureGuidePanel
 *
 * v40 staff quick-jump / feature map. Helps staff find features after the app
 * grew from visual schedule prototype into a larger accessibility platform.
 */
import { staffFeatureMap, studentFeatureMap } from "../../../data/featureMap.js";

export default function StaffFeatureGuidePanel({ onGoToTab }) {
  return (
    <section className="panel feature-guide-panel" aria-labelledby="feature-guide-heading">
      <div>
        <p className="eyebrow">Feature map</p>
        <h2 id="feature-guide-heading">Where everything lives</h2>
        <p className="field-help">
          Use this as a release-candidate navigation guide for staff setup, documentation, and data tools.
        </p>
      </div>

      <div className="feature-guide-grid">
        {staffFeatureMap.map((group) => (
          <article key={group.group} className="feature-guide-card">
            <div className="section-heading-row compact-heading-row">
              <div>
                <h3>{group.group}</h3>
                <p className="field-help">Staff tab: {group.tab}</p>
              </div>
              <button type="button" className="secondary-button" onClick={() => onGoToTab(group.tab.toLowerCase())}>
                Open
              </button>
            </div>
            <ul>
              {group.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <details className="feature-guide-student-map">
        <summary>
          <span>
            <strong>Student Mode feature map</strong>
            <small>Quick reference for what the student sees</small>
          </span>
        </summary>
        <div className="feature-guide-grid compact-feature-guide-grid">
          {studentFeatureMap.map((group) => (
            <article key={group.group} className="feature-guide-card">
              <h3>{group.group}</h3>
              <ul>
                {group.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </details>
    </section>
  );
}
