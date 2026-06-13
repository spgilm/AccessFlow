/**
 * TryAgainLaterQueuePanel
 *
 * Staff-facing queue of student try-again-later requests.
 */
import { buildTryAgainQueue } from "../utils/activityReadiness.js";

export default function TryAgainLaterQueuePanel({ supportEvents }) {
  const queue = buildTryAgainQueue(supportEvents);

  return (
    <section className="panel try-again-queue-panel" aria-labelledby="try-again-queue-heading">
      <div>
        <p className="eyebrow">Try later queue</p>
        <h2 id="try-again-queue-heading">Activities to review later</h2>
        <p className="field-help">Student requests to try an activity later without deleting it from the schedule.</p>
      </div>

      {queue.length === 0 ? (
        <p className="field-help">No try-again-later requests yet.</p>
      ) : (
        <div className="try-again-list">
          {queue.map((event) => (
            <article key={event.id ?? `${event.label}-${event.createdAt}`} className="try-again-card">
              <h3>{event.activityLabel || "Activity request"}</h3>
              <p>{event.label}</p>
              {event.createdAt ? <span>{new Date(event.createdAt).toLocaleString()}</span> : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
