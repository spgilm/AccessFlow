export default function VisualSupport({ visual, className = "", fallback = "⭐" }) {
  const safeVisual = visual ?? {
    type: "emoji",
    value: fallback,
    altText: "Visual support",
  };

  if (safeVisual.type === "image") {
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
