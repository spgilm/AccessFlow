/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useId, useState } from "react";
import { createEmojiVisual } from "../../services/imageProvider.js";
import VisualSupport from "./VisualSupport.jsx";

const emojiChoices = [
  "⭐", "✅", "🎒", "🪥", "🧼", "👕", "🍎", "🍊", "🥪", "🍽️",
  "📚", "✏️", "🎨", "🎵", "🧩", "🏃", "🧘", "🗣️", "👂", "👀",
  "🚽", "🛏️", "🚌", "🏠", "🏫", "💧", "🧃", "🧹", "🧸", "🎮",
  "🐶", "🐱", "🌳", "☀️", "🌙", "❤️", "👍", "👋", "➡️", "🔔",
];

function getEmojiValue(visual, fallback = "⭐") {
  if (typeof visual === "string") {
    return visual || fallback;
  }

  if (!visual || typeof visual !== "object") {
    return fallback;
  }

  return visual.value || visual.emoji || fallback;
}

export default function EmojiPickerButton({
  visual,
  displayVisual,
  label,
  className = "",
  fallback = "⭐",
  onChange,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [customEmoji, setCustomEmoji] = useState("");
  const pickerId = useId();
  const chosenEmoji = getEmojiValue(visual, fallback);
  const shownEmoji = displayVisual ?? chosenEmoji;

  function chooseEmoji(emoji) {
    const safeEmoji = String(emoji || "").trim();

    if (!safeEmoji || !onChange) {
      return;
    }

    onChange(createEmojiVisual(safeEmoji, `${label} visual`));
    setIsOpen(false);
    setCustomEmoji("");
  }

  return (
    <span className={`emoji-picker-shell ${className}`}>
      <button
        type="button"
        className="emoji-picker-trigger"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={`Change icon for ${label}`}
        aria-expanded={isOpen}
        aria-controls={pickerId}
        disabled={disabled}
      >
        <VisualSupport
          visual={shownEmoji}
          className="emoji-picker-visual"
          fallback={fallback}
        />
      </button>

      {isOpen ? (
        <span className="emoji-picker-popover" id={pickerId} role="dialog" aria-label={`Choose icon for ${label}`}>
          <span className="emoji-picker-title">Choose icon</span>
          <span className="emoji-picker-grid">
            {emojiChoices.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className={emoji === chosenEmoji ? "is-selected" : ""}
                onClick={() => chooseEmoji(emoji)}
                aria-label={`Use ${emoji} icon`}
              >
                {emoji}
              </button>
            ))}
          </span>

          <label className="emoji-custom-label">
            Type emoji
            <span className="emoji-custom-row">
              <input
                type="text"
                value={customEmoji}
                maxLength="4"
                inputMode="text"
                placeholder="🙂"
                onChange={(event) => setCustomEmoji(event.target.value)}
              />
              <button type="button" onClick={() => chooseEmoji(customEmoji)}>
                Use
              </button>
            </span>
          </label>

          <button
            type="button"
            className="secondary-button emoji-picker-close"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </span>
      ) : null}
    </span>
  );
}
