/**
 * AAC expansion defaults.
 *
 * These supports complement the existing choice board. They are not a
 * complete AAC system, but provide practical core words, quick phrases,
 * feelings, and social scripts.
 */
export const defaultCoreWords = [
  { id: "want", label: "Want", emoji: "🤲", icon: "hand" },
  { id: "need", label: "Need", emoji: "🙋", icon: "hand" },
  { id: "more", label: "More", emoji: "➕", icon: "arrow-right" },
  { id: "done", label: "Done", emoji: "✅", icon: "check" },
  { id: "go", label: "Go", emoji: "▶️", icon: "play" },
  { id: "stop", label: "Stop", emoji: "✋", icon: "stop" },
  { id: "help", label: "Help", emoji: "🆘", icon: "help" },
  { id: "different", label: "Different", emoji: "🔄", icon: "repeat" },
  { id: "like", label: "Like", emoji: "👍", icon: "check" },
  { id: "dont-like", label: "Don’t like", emoji: "👎", icon: "xmark" },
  { id: "look", label: "Look", emoji: "👀", icon: "eye" },
  { id: "wait", label: "Wait", emoji: "⏳", icon: "clock" },
];

export const defaultQuickPhrases = [
  { id: "i-want", label: "I want that", emoji: "🤲", icon: "hand" },
  { id: "i-need-help", label: "I need help", emoji: "🙋", icon: "help" },
  { id: "i-need-break", label: "I need a break", emoji: "🧘", icon: "pause" },
  { id: "i-dont-understand", label: "I don’t understand", emoji: "❓", icon: "question" },
  { id: "say-again", label: "Say it again", emoji: "🔁", icon: "repeat" },
  { id: "show-me", label: "Show me", emoji: "👀", icon: "eye" },
  { id: "too-much", label: "This is too much", emoji: "🧱", icon: "circle-exclamation" },
  { id: "im-finished", label: "I’m finished", emoji: "✅", icon: "check" },
];

export const defaultFeelings = [
  { id: "happy", label: "Happy", emoji: "🙂", icon: "happy" },
  { id: "sad", label: "Sad", emoji: "😢", icon: "sad" },
  { id: "mad", label: "Mad", emoji: "😠", icon: "angry" },
  { id: "worried", label: "Worried", emoji: "😟", icon: "question" },
  { id: "confused", label: "Confused", emoji: "😕", icon: "okay" },
  { id: "tired", label: "Tired", emoji: "😴", icon: "tired" },
  { id: "sick", label: "Sick", emoji: "🤒", icon: "dizzy" },
  { id: "excited", label: "Excited", emoji: "🤩", icon: "excited" },
];

export const defaultIntensityLevels = [
  { id: "little", label: "A little", emoji: "1️⃣", icon: "info" },
  { id: "medium", label: "Medium", emoji: "2️⃣", icon: "info" },
  { id: "a-lot", label: "A lot", emoji: "3️⃣", icon: "circle-exclamation" },
  { id: "too-much", label: "Too much", emoji: "🚨", icon: "circle-exclamation" },
];

export const defaultSocialScripts = [
  { id: "hello", label: "Hello", emoji: "👋", icon: "hand" },
  { id: "no-thank-you", label: "No thank you", emoji: "🙅", icon: "xmark" },
  { id: "my-turn", label: "Can I have a turn?", emoji: "🔁", icon: "repeat" },
  { id: "join", label: "Can I join?", emoji: "➕", icon: "arrow-right" },
  { id: "space", label: "I need space", emoji: "🫧", icon: "pause" },
  { id: "stop-please", label: "Please stop", emoji: "✋", icon: "stop" },
  { id: "dont-understand", label: "I don’t understand", emoji: "❓", icon: "question" },
  { id: "goodbye", label: "Goodbye", emoji: "👋", icon: "hand" },
];

export function getAacExpansionSettings(profile) {
  return {
    coreWords: defaultCoreWords,
    quickPhrases: defaultQuickPhrases,
    feelings: defaultFeelings,
    intensityLevels: defaultIntensityLevels,
    socialScripts: defaultSocialScripts,
    ...(profile?.aacExpansionSettings ?? {}),
  };
}
