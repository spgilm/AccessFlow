/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
export const activityTemplates = {
  "brush teeth": {
    label: "TOOTH BRUSHING",
    emoji: "🪥",
    summary: "Use a toothbrush and toothpaste to clean teeth.",
    steps: [
      { label: "Get toothbrush", emoji: "🪥" },
      { label: "Add toothpaste", emoji: "🧴" },
      { label: "Brush top teeth", emoji: "⬆️" },
      { label: "Brush bottom teeth", emoji: "⬇️" },
      { label: "Rinse", emoji: "🚰" },
    ],
  },
  "tooth brushing": {
    aliasOf: "brush teeth",
  },
  "wash hands": {
    label: "HAND WASHING",
    emoji: "🧼",
    summary: "Wash hands with soap and water.",
    steps: [
      { label: "Turn on water", emoji: "🚰" },
      { label: "Get soap", emoji: "🧼" },
      { label: "Rub hands together", emoji: "👏" },
      { label: "Rinse hands", emoji: "💧" },
      { label: "Dry hands", emoji: "🧻" },
    ],
  },
  "get dressed": {
    label: "GET DRESSED",
    emoji: "👕",
    summary: "Put on clothes for the day.",
    steps: [
      { label: "Get shirt", emoji: "👕" },
      { label: "Put on pants", emoji: "👖" },
      { label: "Put on socks", emoji: "🧦" },
      { label: "Put on shoes", emoji: "👟" },
      { label: "Check mirror", emoji: "🪞" },
    ],
  },
  "eat breakfast": {
    label: "BREAKFAST",
    emoji: "🥣",
    summary: "Eat the morning meal.",
    steps: [
      { label: "Sit at table", emoji: "🪑" },
      { label: "Get food", emoji: "🥣" },
      { label: "Use spoon or fork", emoji: "🥄" },
      { label: "Take bites", emoji: "😋" },
      { label: "Clean up", emoji: "🧽" },
    ],
  },
  "pack backpack": {
    label: "PACK BACKPACK",
    emoji: "🎒",
    summary: "Put needed items into a backpack.",
    steps: [
      { label: "Open backpack", emoji: "🎒" },
      { label: "Pack folder", emoji: "📁" },
      { label: "Pack lunch", emoji: "🍱" },
      { label: "Pack water bottle", emoji: "💧" },
      { label: "Zip backpack", emoji: "✅" },
    ],
  },
  "take medication": {
    label: "TAKE MEDICATION",
    emoji: "💊",
    summary: "Take medication with support as directed.",
    steps: [
      { label: "Check with staff", emoji: "👤" },
      { label: "Get medication", emoji: "💊" },
      { label: "Get water", emoji: "🥤" },
      { label: "Take medication", emoji: "✅" },
      { label: "Record completion", emoji: "📝" },
    ],
  },
  "clean table": {
    label: "CLEAN TABLE",
    emoji: "🧽",
    summary: "Clean the table after an activity or meal.",
    steps: [
      { label: "Throw trash away", emoji: "🗑️" },
      { label: "Get wipe", emoji: "🧻" },
      { label: "Wipe table", emoji: "🧽" },
      { label: "Put items away", emoji: "📦" },
      { label: "All clean", emoji: "✅" },
    ],
  },
  "go outside": {
    label: "GO OUTSIDE",
    emoji: "🌳",
    summary: "Prepare to transition outside.",
    steps: [
      { label: "Check with staff", emoji: "👤" },
      { label: "Put on shoes", emoji: "👟" },
      { label: "Get jacket if needed", emoji: "🧥" },
      { label: "Walk to door", emoji: "🚪" },
      { label: "Go outside", emoji: "🌳" },
    ],
  },
  "reading group": {
    label: "READING GROUP",
    emoji: "📖",
    summary: "Join reading group and participate with support.",
    steps: [
      { label: "Find reading area", emoji: "📍" },
      { label: "Get book", emoji: "📖" },
      { label: "Listen to reader", emoji: "👂" },
      { label: "Answer or point if asked", emoji: "👉" },
      { label: "Put book away", emoji: "✅" },
    ],
  },
  "speech therapy": {
    label: "SPEECH THERAPY",
    emoji: "💬",
    summary: "Work on communication goals with support.",
    steps: [
      { label: "Go to speech room", emoji: "🚪" },
      { label: "Greet therapist", emoji: "👋" },
      { label: "Use words, device, signs, or pictures", emoji: "💬" },
      { label: "Practice activity", emoji: "🎯" },
      { label: "Say goodbye", emoji: "👋" },
    ],
  },
};

export const fallbackEmojiRules = [
  { includes: ["tooth", "teeth", "brush"], emoji: "🪥" },
  { includes: ["wash", "soap", "hands"], emoji: "🧼" },
  { includes: ["eat", "breakfast", "lunch", "dinner", "snack"], emoji: "🍽️" },
  { includes: ["read", "book", "reading"], emoji: "📖" },
  { includes: ["speech", "talk", "communication"], emoji: "💬" },
  { includes: ["math", "number"], emoji: "🔢" },
  { includes: ["music", "song"], emoji: "🎵" },
  { includes: ["outside", "walk", "playground"], emoji: "🌳" },
  { includes: ["bathroom", "toilet"], emoji: "🚻" },
  { includes: ["medication", "medicine", "pill"], emoji: "💊" },
  { includes: ["clean", "wipe"], emoji: "🧽" },
  { includes: ["sleep", "rest", "break"], emoji: "😴" },
  { includes: ["dress", "clothes", "shirt"], emoji: "👕" },
  { includes: ["backpack", "bag", "pack"], emoji: "🎒" },
];
