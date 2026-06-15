/**
 * ActivityReadinessReviewPanel
 *
 * Staff-facing activity readiness and reflection summary.
 */
import { buildActivityReadinessSummary } from "../../../utils/activityReadiness.js";

export default function ActivityReadinessReviewPanel({ activities, supportEvents, supportObservations }) {
  const rows = buildActivityReadinessSummary({ activities, supportEvents, supportObservations });

  return (
    <section className="panel activity-readiness-review-panel" aria-labelledby="activity-readiness-review-heading">
      <div>
        <p className="eyebrow">Activity readiness</p>
        <h2 id="activity-readiness-review-heading">Prep, reflection, and support patterns</h2>
        <p className="field-help">
          Review activity prep requests, reflections, try-again-later events, and staff observations.
        </p>
      </div>

      {rows.length === 0 ? (
        <p className="field-help">No activity readiness patterns recorded yet.</p>
      ) : (
        <div className="readiness-review-list">
          {rows.slice(0, 10).map((row) => (
            <article key={row.activityId} className="readiness-review-card">
              <h3>{row.activityLabel}</h3>
              <p>
                Prep: {row.prepCount} · Reflections: {row.reflectionCount} · Try later: {row.tryLaterCount} · Observations: {row.observationCount}
              </p>

              {row.whatHelped.length > 0 ? (
                <div>
                  <strong>What may help:</strong>
                  <ul>
                    {row.whatHelped.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {row.recent.length > 0 ? (
                <div>
                  <strong>Recent:</strong>
                  <ul>
                    {row.recent.map((event) => (
                      <li key={`${event.type}-${event.createdAt}-${event.label}`}>{event.label}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
