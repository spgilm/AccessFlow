/**
 * Version 1 image provider.
 *
 * This intentionally returns emoji visuals instead of calling an AI image API.
 *
 * Reason:
 * - Frontend-only apps cannot safely store API keys.
 * - Free image generation APIs change frequently and often have rate limits.
 * - Emoji placeholders let the interaction model be tested immediately.
 *
 * Later:
 * Replace this with a call to your own backend endpoint:
 *
 *   const response = await fetch("/api/generate-image", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ label, prompt }),
 *   });
 *
 * The backend should hold API keys in environment variables.
 */

export function createEmojiVisual(emoji, altText) {
  return {
    type: "emoji",
    value: emoji,
    altText,
  };
}
