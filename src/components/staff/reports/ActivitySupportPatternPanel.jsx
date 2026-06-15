/**
 * ActivitySupportPatternPanel
 *
 * Shows activity-level support patterns and "what worked last time" summaries.
 */
import { buildActivitySupportPatterns } from "../../../utils/supportPatterns.js";

export default function ActivitySupportPatternPanel({ activities, supportEvents, supportObservations }) {
  const patterns = buildActivitySupportPatterns({ activities, supportEvents, supportObservations });

  return (
    <section className="panel activity-support-pattern-panel" aria-labelledby="activity-support-pattern-heading">
      <div>
        <p className="eyebrow">Support patterns</p>
        <h2 id="activity-support-pattern-heading">What worked last time?</h2>
        <p className="field-help">Activity-level support patterns from staff observations and student communication events.</p>
      </div>

      {patterns.length === 0 ? (
        <p className="field-help">No activity-linked support patterns yet.</p>
      ) : (
        <div className="support-pattern-list">
          {patterns.slice(0, 8).map((pattern) => (
            <article key={pattern.activityId} className="support-pattern-card">
              <h3>{pattern.activityLabel}</h3>
              <p>
                {pattern.eventCount} communication event{pattern.eventCount === 1 ? "" : "s"} · {pattern.observationCount} staff observation{pattern.observationCount === 1 ? "" : "s"}
              </p>

              {pattern.worked.length > 0 ? (
                <div>
                  <strong>What worked:</strong>
                  <ul>
                    {pattern.worked.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : null}

              {pattern.hard.length > 0 ? (
                <div>
                  <strong>Hard moments:</strong>
                  <ul>
                    {pattern.hard.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : null}

              {pattern.recent.length > 0 ? (
                <div>
                  <strong>Recent:</strong>
                  <ul>
                    {pattern.recent.map((item) => <li key={`${item.type}-${item.createdAt}-${item.label}`}>{item.label}</li>)}
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
