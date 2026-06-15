/**
 * Default communication board items.
 *
 * Board is for quick communication / requests / regulation choices.
 * Choose is for approved activities that can be added to the schedule.
 */
import { createId } from "../utils/formatters.js";
import { createEmojiVisual } from "../services/imageProvider.js";

export const choiceBoardCategories = [
  { id: "core", label: "Core" },
  { id: "support", label: "Help" },
  { id: "needs", label: "Needs" },
  { id: "feelings", label: "Feelings" },
  { id: "body", label: "Body" },
  { id: "people", label: "People" },
  { id: "places", label: "Places" },
  { id: "regulation", label: "Breaks" },
  { id: "leisure", label: "Fun" },
  { id: "custom", label: "Custom" },
];

export const defaultChoiceBoardItems = [
  createChoiceBoardItem("Yes", "✅", "core", "yes"),
  createChoiceBoardItem("No", "❌", "core", "no"),
  createChoiceBoardItem("Maybe", "🤔", "core", "maybe"),
  createChoiceBoardItem("Help", "🙋", "core", "help"),
  createChoiceBoardItem("More", "➕", "core", "more"),
  createChoiceBoardItem("All done", "🏁", "core", "all done"),

  createChoiceBoardItem("Drink", "💧", "needs", "I want a drink"),
  createChoiceBoardItem("Snack", "🍎", "needs", "I want a snack"),
  createChoiceBoardItem("Bathroom", "🚽", "needs", "I need the bathroom"),
  createChoiceBoardItem("Hungry", "🍽️", "needs", "I am hungry"),
  createChoiceBoardItem("Tired", "😴", "needs", "I am tired"),
  createChoiceBoardItem("Headphones", "🎧", "needs", "I want headphones"),

  createChoiceBoardItem("Happy", "😀", "feelings", "I feel happy"),
  createChoiceBoardItem("Sad", "😢", "feelings", "I feel sad"),
  createChoiceBoardItem("Mad", "😡", "feelings", "I feel mad"),
  createChoiceBoardItem("Worried", "😟", "feelings", "I feel worried"),
  createChoiceBoardItem("Scared", "😨", "feelings", "I feel scared"),
  createChoiceBoardItem("Calm", "😌", "feelings", "I feel calm"),

  createChoiceBoardItem("Pain", "🤕", "body", "I have pain"),
  createChoiceBoardItem("Head", "🧠", "body", "my head hurts"),
  createChoiceBoardItem("Stomach", "🫄", "body", "my stomach hurts"),
  createChoiceBoardItem("Ear", "👂", "body", "my ear hurts"),
  createChoiceBoardItem("Mouth", "👄", "body", "my mouth hurts"),
  createChoiceBoardItem("Hot", "🥵", "body", "I am hot"),
  createChoiceBoardItem("Cold", "🥶", "body", "I am cold"),

  createChoiceBoardItem("Staff", "🧑‍🏫", "people", "I need staff"),
  createChoiceBoardItem("Friend", "🧑‍🤝‍🧑", "people", "I want a friend"),
  createChoiceBoardItem("Family", "👪", "people", "I want family"),
  createChoiceBoardItem("Nurse", "🩺", "people", "I need the nurse"),

  createChoiceBoardItem("Classroom", "🏫", "places", "go to classroom"),
  createChoiceBoardItem("Home", "🏠", "places", "go home"),
  createChoiceBoardItem("Outside", "🌳", "places", "go outside"),
  createChoiceBoardItem("Quiet room", "🤫", "places", "go to quiet room"),

  createChoiceBoardItem("Break", "🧘", "regulation", "I need a break"),
  createChoiceBoardItem("Quiet", "🤫", "regulation", "I need quiet"),
  createChoiceBoardItem("Walk", "🚶", "regulation", "I need a walk"),
  createChoiceBoardItem("Breathing", "🌬️", "regulation", "I need breathing"),
  createChoiceBoardItem("Too loud", "🔇", "regulation", "it is too loud"),
  createChoiceBoardItem("Too hard", "🧱", "regulation", "this is too hard"),

  createChoiceBoardItem("Music", "🎵", "leisure", "I want music"),
  createChoiceBoardItem("Game", "🎮", "leisure", "I want a game"),
  createChoiceBoardItem("Video", "📺", "leisure", "I want a video"),
  createChoiceBoardItem("Choice time", "⭐", "leisure", "I want choice time"),
];

export function createChoiceBoardItem(
  label = "New button",
  emoji = "⭐",
  category = "custom",
  phraseText = ""
) {
  const safeLabel = String(label || "New button").trim();
  const safePhrase = String(phraseText || safeLabel).trim();

  return {
    id: createId("board-item"),
    label: safeLabel,
    category,
    phraseText: safePhrase,
    visual: createEmojiVisual(emoji, `${safeLabel} visual`),
    isFavorite: category === "core",
  };
}

export function getChoiceBoardItems(profile) {
  const profileItems = profile?.choiceBoardItems;

  if (Array.isArray(profileItems) && profileItems.length > 0) {
    return profileItems.map((item) => ({
      ...item,
      phraseText: item.phraseText || item.label,
      isFavorite: Boolean(item.isFavorite),
    }));
  }

  return defaultChoiceBoardItems;
}

export function getChoiceBoardCategoryLabel(categoryId) {
  return choiceBoardCategories.find((category) => category.id === categoryId)?.label ?? categoryId;
}
