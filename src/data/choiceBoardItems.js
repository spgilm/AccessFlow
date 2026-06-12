/**
 * Default communication board items.
 *
 * Board is for quick communication / requests / regulation choices.
 * Choose is for approved activities that can be added to the schedule.
 */
import { createId } from "../utils/formatters.js";
import { createEmojiVisual } from "../services/imageProvider.js";

export const defaultChoiceBoardItems = [
  createChoiceBoardItem("Help", "🙋", "support"),
  createChoiceBoardItem("Break", "🧘", "regulation"),
  createChoiceBoardItem("Drink", "💧", "needs"),
  createChoiceBoardItem("Snack", "🍎", "needs"),
  createChoiceBoardItem("Bathroom", "🚽", "needs"),
  createChoiceBoardItem("Quiet", "🤫", "regulation"),
  createChoiceBoardItem("Music", "🎵", "leisure"),
  createChoiceBoardItem("Walk", "🚶", "movement"),
];

export function createChoiceBoardItem(label = "New button", emoji = "⭐", category = "custom") {
  const safeLabel = String(label || "New button").trim();

  return {
    id: createId("board-item"),
    label: safeLabel,
    category,
    visual: createEmojiVisual(emoji, `${safeLabel} visual`),
  };
}

export function getChoiceBoardItems(profile) {
  const profileItems = profile?.choiceBoardItems;

  if (Array.isArray(profileItems) && profileItems.length > 0) {
    return profileItems;
  }

  return defaultChoiceBoardItems;
}
