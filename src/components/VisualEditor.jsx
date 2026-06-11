import { createUploadedImageVisual, updateEmojiVisual } from "../services/imageProvider.js";
import { readFileAsDataUrl } from "../utils/fileHelpers.js";
import VisualSupport from "./VisualSupport.jsx";

export default function VisualEditor({
  label,
  visual,
  fallbackLabel,
  onChange,
  onError,
}) {
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

  return (
    <div className="visual-editor">
      <div>
        <span className="visual-editor-label">{label}</span>
        <VisualSupport visual={visual} className="visual-editor-preview" />
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
        Upload image
        <input type="file" accept="image/*" onChange={handleImageUpload} />
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
    </div>
  );
}
