/**
 * Version 3 image provider.
 *
 * Current supported visual types:
 * - emoji
 * - uploaded image data URL
 *
 * AI-generated images should be added later through a backend route:
 *
 *   POST /api/generate-image
 *
 * The backend should hold API keys in environment variables and return a stored
 * image URL plus alt text.
 */

export function createEmojiVisual(emoji, altText) {
  return {
    type: "emoji",
    value: emoji,
    altText,
  };
}

export function createUploadedImageVisual(dataUrl, altText) {
  return {
    type: "image",
    value: dataUrl,
    altText: altText || "Uploaded visual support",
  };
}

export function updateEmojiVisual(existingVisual, emoji, altText) {
  return {
    type: "emoji",
    value: emoji || "⭐",
    altText: altText || existingVisual?.altText || "Visual support",
  };
}


export function createFontAwesomeVisual(iconName, altText) {
  return {
    type: "fontawesome",
    value: iconName,
    altText: altText || "Icon visual support",
  };
}
