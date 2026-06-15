/**
 * Reusable visual library data.
 *
 * Visual library items are profile-specific. Staff can save common symbols/photos once
 * and reuse them across activities, steps, Board buttons, and future tools.
 */
import { createId } from "../utils/formatters.js";
import { createEmojiVisual } from "../services/imageProvider.js";

export const visualLibraryCategories = [
  "General",
  "People",
  "Places",
  "Food",
  "Hygiene",
  "School",
  "Work",
  "Breaks",
  "Feelings",
  "Body",
  "Transportation",
  "Leisure",
  "Recently used",
  "Custom",
];

export const defaultVisualLibraryItems = [
  createVisualLibraryItem("Help", createEmojiVisual("🙋", "Help visual"), "General"),
  createVisualLibraryItem("Break", createEmojiVisual("🧘", "Break visual"), "Breaks"),
  createVisualLibraryItem("Bathroom", createEmojiVisual("🚽", "Bathroom visual"), "Hygiene"),
  createVisualLibraryItem("Drink", createEmojiVisual("💧", "Drink visual"), "Food"),
  createVisualLibraryItem("Snack", createEmojiVisual("🍎", "Snack visual"), "Food"),
  createVisualLibraryItem("Brush teeth", createEmojiVisual("🪥", "Brush teeth visual"), "Hygiene"),
  createVisualLibraryItem("Wash hands", createEmojiVisual("🧼", "Wash hands visual"), "Hygiene"),
  createVisualLibraryItem("Classroom", createEmojiVisual("🏫", "Classroom visual"), "Places"),
  createVisualLibraryItem("Home", createEmojiVisual("🏠", "Home visual"), "Places"),
  createVisualLibraryItem("Outside", createEmojiVisual("🌳", "Outside visual"), "Places"),
  createVisualLibraryItem("Happy", createEmojiVisual("😀", "Happy visual"), "Feelings"),
  createVisualLibraryItem("Mad", createEmojiVisual("😡", "Mad visual"), "Feelings"),
  createVisualLibraryItem("Pain", createEmojiVisual("🤕", "Pain visual"), "Body"),
  createVisualLibraryItem("Music", createEmojiVisual("🎵", "Music visual"), "Leisure"),
  createVisualLibraryItem("Walk", createEmojiVisual("🚶", "Walk visual"), "Transportation"),
];

export function createVisualLibraryItem(label, visual, category = "Custom") {
  const safeLabel = String(label || "Saved visual").trim();
  const safeVisual =
    visual && typeof visual === "object"
      ? {
          ...visual,
          altText: visual.altText || `${safeLabel} visual`,
        }
      : createEmojiVisual("⭐", `${safeLabel} visual`);

  return {
    id: createId("visual"),
    label: safeLabel,
    category,
    visual: safeVisual,
    createdAt: new Date().toISOString(),
  };
}

export function getVisualLibraryItems(profile) {
  const items = profile?.visualLibrary;

  if (Array.isArray(items) && items.length > 0) {
    return items;
  }

  return defaultVisualLibraryItems;
}
