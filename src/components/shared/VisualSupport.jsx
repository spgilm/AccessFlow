/**
 * VisualSupport
 *
 * Renders saved reusable visuals: emoji, uploaded images, and v45 Font Awesome icons.
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getIconDefinition } from "../../data/iconLibrary.js";

export default function VisualSupport({ visual, className = "", fallback = "⭐" }) {
  const safeVisual = normalizeVisual(visual, fallback);

  if (safeVisual.type === "image" && safeVisual.value) {
    return (
      <span className={`visual-support visual-image-wrapper ${className}`}>
        <img src={safeVisual.value} alt={safeVisual.altText || "Visual support"} />
      </span>
    );
  }

  if (safeVisual.type === "fontawesome" && safeVisual.value) {
    const iconDefinition = getIconDefinition(safeVisual.value);

    if (iconDefinition) {
      return (
        <span className={`visual-support visual-fontawesome ${className}`} aria-hidden="true">
          <FontAwesomeIcon icon={iconDefinition} />
        </span>
      );
    }
  }

  return (
    <span className={`visual-support visual-emoji ${className}`} aria-hidden="true">
      {safeVisual.value || fallback}
    </span>
  );
}

function normalizeVisual(visual, fallback) {
  if (typeof visual === "string") {
    return {
      type: "emoji",
      value: visual || fallback,
      altText: "Visual support",
    };
  }

  if (!visual || typeof visual !== "object") {
    return {
      type: "emoji",
      value: fallback,
      altText: "Visual support",
    };
  }

  if (visual.type === "image") {
    return {
      type: "image",
      value: visual.value,
      altText: visual.altText || "Visual support",
    };
  }

  if (visual.type === "fontawesome") {
    return {
      type: "fontawesome",
      value: visual.value,
      altText: visual.altText || "Icon visual support",
    };
  }

  return {
    type: "emoji",
    value: visual.value || visual.emoji || fallback,
    altText: visual.altText || "Visual support",
  };
}
