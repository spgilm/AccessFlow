/**
 * Staff-facing accessibility review checklist.
 */
import { accessibilityReviewItems, buildAccessibilityRecommendations } from "../data/accessibilityReview.js";

export default function AccessibilityReviewPanel({
  accessibilityReview,
  onUpdateAccessibilityReview,
}) {
  const recommendations = buildAccessibilityRecommendations(accessibilityReview);

  function update(itemId, value) {
    onUpdateAccessibilityReview({
      ...accessibilityReview,
      [itemId]: value,
    });
  }

  return (
    <section className="panel accessibility-review-panel" aria-labelledby="accessibility-review-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Accessibility review</p>
          <h2 id="accessibility-review-heading">Can the student use this?</h2>
          <p className="field-help">
            Use this checklist after observing the student/client using AccessFlow.
          </p>
        </div>
      </div>

      <div className="accessibility-checklist">
        {accessibilityReviewItems.map((item) => (
          <label key={item.id} className="checkbox-row">
            <input
              type="checkbox"
              checked={Boolean(accessibilityReview?.[item.id])}
              onChange={(event) => update(item.id, event.target.checked)}
            />
            <span><strong>{item.label}</strong></span>
          </label>
        ))}
      </div>

      <div className="recommendation-box">
        <h3>Recommendations</h3>
        {recommendations.length === 0 ? (
          <p className="field-help">No recommendations from unchecked items yet.</p>
        ) : (
          <ul>
            {recommendations.map((recommendation) => (
              <li key={recommendation}>{recommendation}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
