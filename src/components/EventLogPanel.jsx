function formatEventTime(isoString) {
  if (!isoString) {
    return "";
  }

  try {
    return new Date(isoString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export default function EventLogPanel({ events = [], title = "Support events" }) {
  const latestEvents = [...events].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));

  return (
    <section className="panel event-log-panel" aria-labelledby="event-log-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Event log</p>
          <h2 id="event-log-heading">{title}</h2>
        </div>
      </div>

      {latestEvents.length === 0 ? (
        <p className="field-help">No support or choice events recorded yet.</p>
      ) : (
        <ol className="event-list">
          {latestEvents.slice(0, 12).map((event) => (
            <li key={event.id} className="event-row">
              <span className="event-time">{formatEventTime(event.createdAt)}</span>
              <span>
                <strong>{event.label}</strong>
                {event.activityLabel ? <small>During: {event.activityLabel}</small> : null}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
