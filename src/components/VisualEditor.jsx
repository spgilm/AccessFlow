/**
 * Staff visual editor.
 *
 * Supports emoji changes, photo upload/camera capture, reuse from the profile visual
 * library, and saving the current visual into the library.
 */
import { useMemo, useState } from "react";
import { createUploadedImageVisual, updateEmojiVisual } from "../services/imageProvider.js";
import { readFileAsDataUrl } from "../utils/fileHelpers.js";
import { visualLibraryCategories } from "../data/visualLibrary.js";
import EmojiPickerButton from "./EmojiPickerButton.jsx";
import VisualSupport from "./VisualSupport.jsx";

export default function VisualEditor({
  label,
  visual,
  fallbackLabel,
  onChange,
  onError,
  visualLibrary = [],
  onSaveVisualToLibrary,
}) {
  const [libraryCategory, setLibraryCategory] = useState("All");
  const [saveCategory, setSaveCategory] = useState("Recently used");
  const [saveLabel, setSaveLabel] = useState("");

  const categories = useMemo(() => {
    const usedCategories = new Set(visualLibrary.map((item) => item.category || "Custom"));
    return ["All", ...visualLibraryCategories.filter((category) => usedCategories.has(category))];
  }, [visualLibrary]);

  const filteredLibrary =
    libraryCategory === "All"
      ? visualLibrary
      : visualLibrary.filter((item) => (item.category || "Custom") === libraryCategory);

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];

    try {
      const dataUrl = await readFileAsDataUrl(file);
      onChange(createUploadedImageVisual(dataUrl, `${fallbackLabel} visual`));
      onError("");
    } catch (error) {
      onError(error.message);
    } finally {
      event.target.value = "";
    }
  }

  function handleEmojiChange(value) {
    onChange(updateEmojiVisual(visual, value, `${fallbackLabel} visual`));
  }

  function saveCurrentVisual() {
    if (!visual || !onSaveVisualToLibrary) {
      return;
    }

    const labelToSave = saveLabel.trim() || fallbackLabel || "Saved visual";

    onSaveVisualToLibrary({
      label: labelToSave,
      category: saveCategory,
      visual,
    });
    setSaveLabel("");
    setSaveCategory("Recently used");
  }

  return (
    <div className="visual-editor">
      <div className="visual-editor-preview-row">
        <span className="visual-editor-label">{label}</span>
        <EmojiPickerButton
          visual={visual}
          label={fallbackLabel}
          className="visual-editor-picker"
          onChange={onChange}
        />
        <span className="field-help">Tap icon to change emoji.</span>
      </div>

      <label>
        Emoji fallback
        <input
          type="text"
          value={visual?.type === "emoji" ? visual.value : ""}
          placeholder="⭐"
          maxLength={4}
          onChange={(event) => handleEmojiChange(event.target.value)}
        />
      </label>

      <label className="file-input-label">
        Upload image or take photo
        <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload} />
      </label>

      {visual?.type === "image" ? (
        <button
          type="button"
          className="secondary-button"
          onClick={() => handleEmojiChange("⭐")}
        >
          Use emoji instead
        </button>
      ) : null}

      {visualLibrary.length > 0 ? (
        <details className="visual-library-picker-details">
          <summary>Use saved visual</summary>

          <label>
            Library category
            <select value={libraryCategory} onChange={(event) => setLibraryCategory(event.target.value)}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <div className="visual-library-mini-grid">
            {filteredLibrary.map((item) => (
              <button
                key={item.id}
                type="button"
                className="visual-library-mini-button"
                onClick={() => onChange(item.visual)}
                aria-label={`Use ${item.label} visual`}
              >
                <VisualSupport visual={item.visual} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </details>
      ) : null}

      {onSaveVisualToLibrary ? (
        <details className="visual-save-details">
          <summary>Save this visual</summary>

          <label>
            Save as
            <input
              type="text"
              value={saveLabel}
              placeholder={fallbackLabel || "Saved visual"}
              onChange={(event) => setSaveLabel(event.target.value)}
            />
          </label>

          <label>
            Category
            <select value={saveCategory} onChange={(event) => setSaveCategory(event.target.value)}>
              {visualLibraryCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <button type="button" className="secondary-button" onClick={saveCurrentVisual}>
            Save current visual to library
          </button>
        </details>
      ) : null}
    </div>
  );
}
