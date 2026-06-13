/**
 * Communication history helpers.
 *
 * Summarizes student communication/support events into staff-readable patterns.
 */
const communicationTypeLabels = {
  "pain-body-message": "Pain/body",
  "sensory-request": "Sensory",
  "regulation-pathway": "Regulation",
  "waiting-support": "Waiting",
  "yes-no-response": "Yes/No",
  "help-request-builder": "Help",
  "decision-choice": "Choice",
  "stuck-pathway": "Stuck",
  "schedule-change-request": "Schedule change",
  "student-check-in": "Check-in",
  "reward-request": "Reward",
  "break-request": "Break",
  "support-request": "Support",
  "transition-support": "Transition",
  "board-select": "Board select",
  "board-message": "Board message",
};

const priorityTypes = new Set([
  "pain-body-message",
  "sensory-request",
  "regulation-pathway",
  "waiting-support",
  "yes-no-response",
  "help-request-builder",
  "decision-choice",
  "stuck-pathway",
  "schedule-change-request",
]);

export function getCommunicationTypeLabel(type) {
  return communicationTypeLabels[type] ?? type ?? "Other";
}

export function buildCommunicationHistorySummary(supportEvents = []) {
  const relevantEvents = supportEvents
    .filter((event) => priorityTypes.has(event.type))
    .slice()
    .sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")));

  const countsByType = relevantEvents.reduce((accumulator, event) => {
    const label = getCommunicationTypeLabel(event.type);
    accumulator[label] = (accumulator[label] ?? 0) + 1;
    return accumulator;
  }, {});

  const counts = Object.entries(countsByType)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  const recent = relevantEvents.slice(0, 12);

  const topMessages = Object.entries(
    relevantEvents.reduce((accumulator, event) => {
      const label = event.label ?? "Unlabeled event";
      accumulator[label] = (accumulator[label] ?? 0) + 1;
      return accumulator;
    }, {})
  )
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, 8);

  const todayKey = new Date().toISOString().slice(0, 10);
  const todayCount = relevantEvents.filter((event) => event.date === todayKey).length;

  return {
    total: relevantEvents.length,
    todayCount,
    counts,
    recent,
    topMessages,
  };
}
