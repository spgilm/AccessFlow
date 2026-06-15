/**
 * Read-aloud helpers.
 *
 * Keeps text-to-speech cleanup outside App.jsx. These helpers remove decorative
 * emoji/visual nodes so the browser reads meaningful labels instead of visual clutter.
 */
export function stripEmojiAndVisualNoise(text) {
  return String(text ?? "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/[\uFE0E\uFE0F\u200D]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getTextWithoutVisuals(element) {
  const clone = element.cloneNode(true);

  clone
    .querySelectorAll(
      '[aria-hidden="true"], .visual-support, .visual-emoji, .emoji-picker-visual, .emoji-picker-shell, .choice-card-visual, .choice-board-visual'
    )
    .forEach((node) => node.remove());

  return stripEmojiAndVisualNoise(clone.innerText || clone.textContent || "");
}

export function getReadableText(target) {
  const interactive = target.closest?.("button, a, summary, label");
  const readable =
    interactive ??
    target.closest?.("h1, h2, h3, p, strong, small, li, legend, span");

  if (!readable) {
    return "";
  }

  const visibleText = getTextWithoutVisuals(readable);

  if (visibleText) {
    return visibleText.slice(0, 220);
  }

  const ariaLabel = readable.getAttribute?.("aria-label");
  return stripEmojiAndVisualNoise(ariaLabel).slice(0, 220);
}

export function speakText(text, rate = 0.9) {
  if (!text || typeof window === "undefined" || !window.speechSynthesis) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}
