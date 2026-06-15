/**
 * Support recommendation helpers.
 *
 * Produces non-diagnostic, staff-review suggestions from communication and
 * goal data. Suggestions are not clinical decisions.
 */
import { buildCommunicationHistorySummary } from "./communicationHistory.js";

function countType(events, type) {
  return events.filter((event) => event.type === type).length;
}

function messageIncludes(events, pattern) {
  const lowerPattern = pattern.toLowerCase();
  return events.filter((event) => String(event.label ?? "").toLowerCase().includes(lowerPattern)).length;
}

export function buildSupportRecommendations({ supportEvents = [], progressGoals = [] } = {}) {
  const summary = buildCommunicationHistorySummary(supportEvents);
  const recommendations = [];

  const sensoryCount = countType(supportEvents, "sensory-request");
  const stuckCount = countType(supportEvents, "stuck-pathway");
  const helpCount = countType(supportEvents, "help-request-builder");
  const scheduleChangeCount = countType(supportEvents, "schedule-change-request");
  const painCount = countType(supportEvents, "pain-body-message");
  const moreTimeCount = messageIncludes(supportEvents, "more time");
  const quietCount = messageIncludes(supportEvents, "quiet");

  if (sensoryCount >= 3 || quietCount >= 3) {
    recommendations.push({
      id: "sensory-pattern",
      title: "Frequent sensory/quiet requests",
      reason: `${sensoryCount} sensory request(s), ${quietCount} quiet-related message(s).`,
      suggestions: [
        "Preview noisy or crowded settings before transitions.",
        "Offer headphones, quiet seating, or a sensory break before demand increases.",
        "Consider adding a scheduled regulation break before known difficult routines.",
      ],
    });
  }

  if (stuckCount >= 2 || helpCount >= 3) {
    recommendations.push({
      id: "task-initiation-pattern",
      title: "Frequent help or stuck messages",
      reason: `${helpCount} help request(s), ${stuckCount} stuck pathway event(s).`,
      suggestions: [
        "Break the task into smaller first steps.",
        "Add a first-step visual or model prompt.",
        "Offer two choices instead of an open-ended direction.",
      ],
    });
  }

  if (scheduleChangeCount >= 2 || moreTimeCount >= 2) {
    recommendations.push({
      id: "schedule-flexibility-pattern",
      title: "Frequent change or more-time requests",
      reason: `${scheduleChangeCount} schedule-change request(s), ${moreTimeCount} more-time message(s).`,
      suggestions: [
        "Build in transition warnings before harder activities.",
        "Offer a wait card or short timer before the next demand.",
        "Add a staff-approved 'move later' option for appropriate activities.",
      ],
    });
  }

  if (painCount >= 1) {
    recommendations.push({
      id: "pain-body-follow-up",
      title: "Pain/body message recorded",
      reason: `${painCount} pain/body message(s) recorded.`,
      suggestions: [
        "Follow agency health/safety procedures.",
        "Document what the student communicated and what staff did next.",
        "Watch for repeated messages about the same body area.",
      ],
    });
  }

  const activeGoals = progressGoals.filter((goal) => goal.isActive !== false);
  activeGoals.slice(0, 3).forEach((goal) => {
    recommendations.push({
      id: `goal-${goal.id}`,
      title: `Goal support: ${goal.title}`,
      reason: goal.linkedActivityName
        ? `Linked activity: ${goal.linkedActivityName}`
        : "Active goal without a linked activity.",
      suggestions: [
        "Check whether the schedule includes the linked activity often enough.",
        "Use prompt-level data to decide whether support can be faded.",
        "Pair the goal with a student-facing choice or reinforcement when appropriate.",
      ],
    });
  });

  return {
    summary,
    recommendations,
  };
}
