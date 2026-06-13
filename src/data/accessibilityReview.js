/**
 * Staff accessibility review checklist.
 */
export const accessibilityReviewItems = [
  { id: "identify-current-task", label: "Student can identify the current task." },
  { id: "complete-step", label: "Student can complete at least one smaller step." },
  { id: "request-help", label: "Student can request help." },
  { id: "request-break", label: "Student can request a break." },
  { id: "use-board", label: "Student can use the Board to communicate." },
  { id: "touch-targets", label: "Buttons are large enough for reliable touch." },
  { id: "text-level", label: "Text level is helpful, not distracting." },
  { id: "default-screen", label: "Default Student Mode screen is appropriate." },
  { id: "read-aloud", label: "Read-aloud is helpful if enabled." },
  { id: "transition-support", label: "Transition/waiting supports are needed and configured." },
];

export function buildAccessibilityRecommendations(reviewState = {}) {
  const recs = [];

  if (!reviewState["use-board"]) {
    recs.push("Consider Board-only mode or a simpler communication board.");
  }

  if (!reviewState["touch-targets"]) {
    recs.push("Consider Extra large touch size.");
  }

  if (!reviewState["default-screen"]) {
    recs.push("Review default Student Mode screen: Today, Board, or First / Then.");
  }

  if (!reviewState["transition-support"]) {
    recs.push("Configure transition/wait supports for changes, waiting, and return from break.");
  }

  if (!reviewState["text-level"]) {
    recs.push("Try Icons only, Words only, or Icons and words based on the student's access needs.");
  }

  return recs;
}
