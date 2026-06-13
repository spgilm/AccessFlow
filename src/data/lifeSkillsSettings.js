/**
 * Life skills settings.
 *
 * Community access, vocational task, and caregiver/family handoff defaults.
 * These are prototype supports and must be customized for each person/team.
 */
export const defaultCommunityCards = [
  { id: "need-help", label: "I need help", emoji: "🙋", icon: "help" },
  { id: "bathroom", label: "Bathroom", emoji: "🚻", icon: "toilet" },
  { id: "too-loud", label: "Too loud", emoji: "🔊", icon: "loud" },
  { id: "lost", label: "I feel lost", emoji: "🧭", icon: "location" },
  { id: "safe-person", label: "Find safe staff", emoji: "🛟", icon: "safety" },
  { id: "call-support", label: "Call support person", emoji: "📞", icon: "phone" },
  { id: "stop", label: "Please stop", emoji: "✋", icon: "stop" },
  { id: "space", label: "I need space", emoji: "🫧", icon: "pause" },
];

export const defaultCommunitySafetySteps = [
  "Stay with staff or group.",
  "Stop and look before crossing.",
  "Ask safe staff for help.",
  "Use communication card if overwhelmed.",
  "Wait in the planned safe spot.",
];

export const defaultVocationalActions = [
  { id: "clock-in", label: "Clock in", emoji: "🕘", icon: "clock" },
  { id: "get-materials", label: "Get materials", emoji: "🧰", icon: "briefcase" },
  { id: "ask-supervisor", label: "Ask supervisor", emoji: "🙋", icon: "help" },
  { id: "start-task", label: "Start task", emoji: "▶️", icon: "play" },
  { id: "task-done", label: "Task done", emoji: "✅", icon: "check" },
  { id: "need-break", label: "Need break", emoji: "🧘", icon: "pause" },
  { id: "clean-up", label: "Clean up", emoji: "🧹", icon: "trash" },
  { id: "clock-out", label: "Clock out", emoji: "🕔", icon: "clock" },
];

export const defaultHandoffPrompts = [
  "What went well?",
  "What was hard?",
  "Communication used",
  "Health/safety note",
  "Food/bathroom note",
  "Regulation/support note",
  "Tomorrow suggestion",
];

export function getLifeSkillsSettings(profile) {
  return {
    communityCards: defaultCommunityCards,
    communitySafetySteps: defaultCommunitySafetySteps,
    vocationalActions: defaultVocationalActions,
    handoffPrompts: defaultHandoffPrompts,
    safePersonLabel: "safe staff",
    communityCardMessage: "I use this app to communicate. Please help me find safe staff.",
    ...(profile?.lifeSkillsSettings ?? {}),
  };
}
