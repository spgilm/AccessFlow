export default function VisualSupport({ visual, className = "", fallback = "⭐" }) {
  const safeVisual = normalizeVisual(visual, fallback);

  if (safeVisual.type === "image" && safeVisual.value) {
    return (
      <span className={`visual-support visual-image-wrapper ${className}`}>
        <img src={safeVisual.value} alt={safeVisual.altText || "Visual support"} />
      </span>
    );
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

  return {
    type: "emoji",
    value: visual.value || visual.emoji || fallback,
    altText: visual.altText || "Visual support",
  };
}
