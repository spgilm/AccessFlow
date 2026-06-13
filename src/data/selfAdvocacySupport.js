/**
 * Self-advocacy support defaults.
 *
 * These defaults support communication, consent, choice-making, and schedule
 * negotiation without taking autonomy away from the student/client.
 */
export const defaultYesNoResponses = [
  { id: "yes", label: "Yes", emoji: "✅", icon: "check" },
  { id: "no", label: "No", emoji: "❌", icon: "xmark" },
  { id: "maybe", label: "Maybe", emoji: "❔", icon: "question" },
  { id: "dont-know", label: "I don't know", emoji: "🤷", icon: "question" },
  { id: "ask-later", label: "Ask me later", emoji: "⏳", icon: "clock" },
  { id: "more-time", label: "I need more time", emoji: "🕒", icon: "clock" },
  { id: "say-again", label: "Say it again", emoji: "🔁", icon: "repeat" },
  { id: "show-me", label: "Show me", emoji: "👀", icon: "eye" },
];

export const defaultHelpTopics = [
  { id: "understand", label: "Understanding", emoji: "❓", icon: "question" },
  { id: "reading", label: "Reading", emoji: "📖", icon: "book" },
  { id: "finding", label: "Finding something", emoji: "🔎", icon: "eye" },
  { id: "opening", label: "Opening something", emoji: "📦", icon: "hand" },
  { id: "device", label: "Device", emoji: "📱", icon: "comment" },
  { id: "person", label: "A person", emoji: "👥", icon: "help" },
  { id: "bathroom", label: "Bathroom", emoji: "🚻", icon: "toilet" },
  { id: "food-drink", label: "Food / drink", emoji: "🥤", icon: "drink" },
];

export const defaultHelpActions = [
  { id: "show", label: "Show me", emoji: "👀", icon: "eye" },
  { id: "tell", label: "Tell me", emoji: "🗣️", icon: "comment" },
  { id: "with-me", label: "Do it with me", emoji: "🤝", icon: "help" },
  { id: "more-time", label: "Give me more time", emoji: "🕒", icon: "clock" },
  { id: "choice", label: "Give me a choice", emoji: "🧩", icon: "comment" },
  { id: "break", label: "Give me a break", emoji: "🧘", icon: "pause" },
];

export const defaultDecisionChoices = [
  { id: "break", label: "Break", emoji: "🧘", icon: "pause" },
  { id: "help", label: "Help", emoji: "🙋", icon: "help" },
  { id: "try-again", label: "Try again", emoji: "🔁", icon: "repeat" },
  { id: "quiet", label: "Quiet", emoji: "🤫", icon: "quiet" },
  { id: "walk", label: "Walk", emoji: "🚶", icon: "walk" },
  { id: "music", label: "Music", emoji: "🎵", icon: "comment" },
];

export const defaultStuckReasons = [
  { id: "dont-know", label: "I don't know what to do", emoji: "❓", icon: "question" },
  { id: "start", label: "I don't know where to start", emoji: "▶️", icon: "play" },
  { id: "hard", label: "It feels too hard", emoji: "🧱", icon: "circle-exclamation" },
  { id: "materials", label: "I need materials", emoji: "✏️", icon: "book" },
  { id: "help", label: "I need help", emoji: "🙋", icon: "help" },
  { id: "break", label: "I need a break", emoji: "🧘", icon: "pause" },
];

export const defaultStuckStrategies = [
  { id: "first-step", label: "Show first step", emoji: "1️⃣", icon: "eye" },
  { id: "smaller", label: "Make it smaller", emoji: "🔹", icon: "info" },
  { id: "model", label: "Show me how", emoji: "👀", icon: "eye" },
  { id: "timer", label: "Start timer", emoji: "⏱️", icon: "clock" },
  { id: "choice", label: "Give choices", emoji: "🧩", icon: "comment" },
  { id: "try-later", label: "Try later", emoji: "⏳", icon: "clock" },
];

export const defaultScheduleChangeRequests = [
  { id: "move-later", label: "Move this later", emoji: "➡️", icon: "arrow-right" },
  { id: "break-first", label: "Break first", emoji: "🧘", icon: "pause" },
  { id: "different-choice", label: "Different choice", emoji: "🔀", icon: "repeat" },
  { id: "skip", label: "Skip this", emoji: "⏭️", icon: "arrow-right" },
  { id: "more-time", label: "More time", emoji: "🕒", icon: "clock" },
  { id: "ask-staff", label: "Ask staff", emoji: "🙋", icon: "help" },
];

export function getSelfAdvocacySupportSettings(profile) {
  return {
    yesNoResponses: defaultYesNoResponses,
    helpTopics: defaultHelpTopics,
    helpActions: defaultHelpActions,
    decisionChoices: defaultDecisionChoices,
    stuckReasons: defaultStuckReasons,
    stuckStrategies: defaultStuckStrategies,
    scheduleChangeRequests: defaultScheduleChangeRequests,
    ...(profile?.selfAdvocacySupportSettings ?? {}),
  };
}
