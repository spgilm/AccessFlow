/**
 * CommunicationHistoryPanel
 *
 * Staff-facing summary of student communication/self-advocacy events.
 */
import {
  buildCommunicationHistorySummary,
  getCommunicationTypeLabel,
} from "../../../utils/communicationHistory.js";

export default function CommunicationHistoryPanel({ supportEvents }) {
  const summary = buildCommunicationHistorySummary(supportEvents);

  return (
    <section className="panel communication-history-panel" aria-labelledby="communication-history-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Communication history</p>
          <h2 id="communication-history-heading">Student communication patterns</h2>
          <p className="field-help">
            Review pain/body, sensory, help, choice, stuck, regulation, waiting, and schedule-change messages.
          </p>
        </div>
      </div>

      <div className="history-stat-grid">
        <article>
          <span>Total communication events</span>
          <strong>{summary.total}</strong>
        </article>
        <article>
          <span>Today</span>
          <strong>{summary.todayCount}</strong>
        </article>
        <article>
          <span>Tracked categories</span>
          <strong>{summary.counts.length}</strong>
        </article>
      </div>

      {summary.counts.length > 0 ? (
        <div className="history-chip-grid" aria-label="Communication counts by category">
          {summary.counts.map((item) => (
            <span key={item.label} className="history-chip">
              {item.label}: {item.count}
            </span>
          ))}
        </div>
      ) : (
        <p className="field-help">No communication/self-advocacy events recorded yet.</p>
      )}

      {summary.topMessages.length > 0 ? (
        <section className="history-subsection" aria-labelledby="top-messages-heading">
          <h3 id="top-messages-heading">Most repeated messages</h3>
          <div className="history-list">
            {summary.topMessages.map((item) => (
              <article key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.count} time{item.count === 1 ? "" : "s"}</span>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {summary.recent.length > 0 ? (
        <section className="history-subsection" aria-labelledby="recent-communication-heading">
          <h3 id="recent-communication-heading">Recent communication events</h3>
          <div className="history-list">
            {summary.recent.map((event) => (
              <article key={event.id ?? `${event.type}-${event.createdAt}`}>
                <strong>{event.label}</strong>
                <span>
                  {getCommunicationTypeLabel(event.type)}
                  {event.createdAt ? ` · ${new Date(event.createdAt).toLocaleString()}` : ""}
                </span>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
