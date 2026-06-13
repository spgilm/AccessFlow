/**
 * Lightweight staff search helper for current schedule and choice bank.
 */
import { useMemo, useState } from "react";

export default function ActivitySearchPanel({ activities, activityBank, onSelectActivity, onAddBankChoiceToSchedule }) {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const safeQuery = query.trim().toLowerCase();

    if (!safeQuery) {
      return [];
    }

    return [
      ...activities.map((activity) => ({ ...activity, source: "schedule" })),
      ...activityBank.map((activity) => ({ ...activity, source: "choice-bank" })),
    ].filter((activity) => activity.label.toLowerCase().includes(safeQuery));
  }, [query, activities, activityBank]);

  return (
    <section className="panel activity-search-panel" aria-labelledby="activity-search-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Find</p>
          <h2 id="activity-search-heading">Activity search</h2>
        </div>
      </div>

      <label>
        Search activities
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search schedule or choices" />
      </label>

      {matches.length > 0 ? (
        <div className="activity-search-results">
          {matches.map((activity) => (
            <article key={`${activity.source}-${activity.id}`} className="activity-search-result">
              <strong>{activity.label}</strong>
              <span>{activity.source}</span>
              {activity.source === "schedule" ? (
                <button type="button" className="secondary-button" onClick={() => onSelectActivity(activity.id)}>
                  Open
                </button>
              ) : (
                <button type="button" className="secondary-button" onClick={() => onAddBankChoiceToSchedule(activity.id)}>
                  Add to schedule
                </button>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="field-help">Type to find schedule items or student choices.</p>
      )}
    </section>
  );
}
