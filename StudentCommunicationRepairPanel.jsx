/**
 * StudentTryAgainLaterPanel
 *
 * Lets the student request to try the current activity later without deleting it.
 */
export default function StudentTryAgainLaterPanel({ currentActivity, supportEvents, onSupportRequest }) {
  if (!currentActivity) {
    return null;
  }

  const recentTryLater = (supportEvents ?? [])
    .filter((event) => event.type === "try-again-later")
    .slice()
    .sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")))
    .slice(0, 3);

  function requestTryLater() {
    onSupportRequest?.({
      type: "try-again-later",
      label: `Try again later: ${currentActivity.label}`,
      activityId: currentActivity.id,
      activityLabel: currentActivity.label,
    });
  }

  return (
    <section className="student-communication-panel activity-readiness-panel" aria-labelledby="try-again-later-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Try later</p>
          <h3 id="try-again-later-heading">Need to try this later?</h3>
          <p className="field-help">This asks staff to review the activity later. It does not erase the schedule.</p>
        </div>
        <button type="button" className="secondary-button" onClick={requestTryLater}>
          Try later
        </button>
      </div>

      {recentTryLater.length > 0 ? (
        <div className="readiness-mini-list">
          <strong>Recent try-later requests</strong>
          <ul>
            {recentTryLater.map((event) => (
              <li key={event.id ?? `${event.label}-${event.createdAt}`}>{event.label}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
