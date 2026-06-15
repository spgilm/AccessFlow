import IconSymbol from "../../shared/IconSymbol.jsx";

/**
 * StudentScheduleChangeRequest
 *
 * Lets a student request a schedule change while preserving staff guardrails.
 */
export default function StudentScheduleChangeRequest({
  currentActivity,
  selfAdvocacySupportSettings,
  onSupportRequest,
}) {
  const requests = selfAdvocacySupportSettings?.scheduleChangeRequests ?? [];

  function recordRequest(item) {
    onSupportRequest?.({
      type: "schedule-change-request",
      label: `Schedule change request: ${item.label}${currentActivity?.label ? ` for ${currentActivity.label}` : ""}`,
      activityId: currentActivity?.id ?? null,
      activityLabel: currentActivity?.label ?? null,
    });
  }

  return (
    <section className="student-communication-panel self-advocacy-panel schedule-change-request-panel" aria-labelledby="schedule-change-request-heading">
      <div>
        <p className="eyebrow">Change</p>
        <h3 id="schedule-change-request-heading">I want a change</h3>
        {currentActivity ? <p className="field-help">Current activity: {currentActivity.label}</p> : null}
      </div>

      <div className="support-choice-grid">
        {requests.map((item) => (
          <button
            key={item.id}
            type="button"
            className="support-choice-button"
            onClick={() => recordRequest(item)}
          >
            <IconSymbol item={item} />
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
