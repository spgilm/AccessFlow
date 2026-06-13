/**
 * Communication and regulation support defaults.
 *
 * These are intentionally generic prototype supports. Staff should customize
 * language and options for each student/client before real-world use.
 */
export const defaultPainBodyParts = [
  { id: "head", label: "Head", emoji: "🙂" },
  { id: "ear", label: "Ear", emoji: "👂" },
  { id: "mouth", label: "Mouth / teeth", emoji: "🦷" },
  { id: "throat", label: "Throat", emoji: "🗣️" },
  { id: "stomach", label: "Stomach", emoji: "🤢" },
  { id: "chest", label: "Chest", emoji: "🫁" },
  { id: "back", label: "Back", emoji: "🔙" },
  { id: "arm", label: "Arm / hand", emoji: "✋" },
  { id: "leg", label: "Leg / foot", emoji: "🦶" },
  { id: "skin", label: "Skin", emoji: "🖐️" },
];

export const defaultPainDescriptors = [
  { id: "hurts", label: "Hurts", emoji: "⚠️" },
  { id: "sharp", label: "Sharp", emoji: "📌" },
  { id: "sore", label: "Sore", emoji: "😣" },
  { id: "burns", label: "Burns", emoji: "🔥" },
  { id: "itchy", label: "Itchy", emoji: "🤏" },
  { id: "too-hot", label: "Too hot", emoji: "🥵" },
  { id: "too-cold", label: "Too cold", emoji: "🥶" },
  { id: "numb", label: "Numb", emoji: "〰️" },
];

export const defaultPainLevels = [
  { id: "small", label: "A little", emoji: "1" },
  { id: "medium", label: "Medium", emoji: "2" },
  { id: "big", label: "A lot", emoji: "3" },
  { id: "emergency", label: "Emergency", emoji: "!" },
];

export const defaultSensoryRequests = [
  { id: "quiet", label: "I need quiet", emoji: "🤫", icon: "quiet" },
  { id: "headphones", label: "Headphones", emoji: "🎧", icon: "headphones" },
  { id: "lights", label: "Lights are too bright", emoji: "💡", icon: "idea" },
  { id: "space", label: "I need space", emoji: "🫧", icon: "pause" },
  { id: "movement", label: "I need movement", emoji: "🏃", icon: "walk" },
  { id: "deep-pressure", label: "Deep pressure", emoji: "🤗", icon: "care" },
  { id: "fidget", label: "Fidget", emoji: "🌀", icon: "repeat" },
  { id: "different-seat", label: "Different seat", emoji: "🪑", icon: "arrow-right" },
];

export const defaultRegulationPathway = {
  feelings: [
    { id: "mad", label: "Mad", emoji: "😡", icon: "angry" },
    { id: "worried", label: "Worried", emoji: "😟", icon: "question" },
    { id: "sad", label: "Sad", emoji: "😢", icon: "sad" },
    { id: "overwhelmed", label: "Too much", emoji: "🌪️", icon: "circle-exclamation" },
    { id: "tired", label: "Tired", emoji: "😴", icon: "tired" },
    { id: "okay", label: "Okay", emoji: "🙂", icon: "okay" },
  ],
  needs: [
    { id: "break", label: "Break", emoji: "🧘", icon: "pause" },
    { id: "help", label: "Help", emoji: "🙋", icon: "help" },
    { id: "quiet", label: "Quiet", emoji: "🤫", icon: "quiet" },
    { id: "walk", label: "Walk", emoji: "🚶", icon: "walk" },
    { id: "water", label: "Water", emoji: "💧", icon: "drink" },
    { id: "try-again", label: "Try again", emoji: "🔁", icon: "repeat" },
  ],
  readyOptions: [
    { id: "ready", label: "Ready", emoji: "✅", icon: "check" },
    { id: "not-ready", label: "Not ready", emoji: "⏳", icon: "clock" },
  ],
};

export const defaultWaitingSupport = {
  reasons: [
    { id: "turn", label: "Wait for my turn", emoji: "🔄", icon: "repeat" },
    { id: "staff", label: "Wait for staff", emoji: "🙋", icon: "help" },
    { id: "bathroom", label: "Wait for bathroom", emoji: "🚻", icon: "toilet" },
    { id: "food", label: "Wait for food", emoji: "🍽️", icon: "food" },
    { id: "ride", label: "Wait for ride", emoji: "🚌", icon: "bus" },
  ],
  whileWaiting: [
    { id: "breathe", label: "Breathe", emoji: "🌬️", icon: "pause" },
    { id: "count", label: "Count", emoji: "🔢", icon: "info" },
    { id: "look-book", label: "Look at book", emoji: "📖", icon: "book" },
    { id: "fidget", label: "Fidget", emoji: "🌀", icon: "repeat" },
    { id: "music", label: "Music", emoji: "🎵", icon: "comment" },
  ],
  timerMinutes: 2,
};

export function getCommunicationSupportSettings(profile) {
  return {
    painBodyParts: defaultPainBodyParts,
    painDescriptors: defaultPainDescriptors,
    painLevels: defaultPainLevels,
    sensoryRequests: defaultSensoryRequests,
    regulationPathway: defaultRegulationPathway,
    waitingSupport: defaultWaitingSupport,
    ...(profile?.communicationSupportSettings ?? {}),
  };
}
