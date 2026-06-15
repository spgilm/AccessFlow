/**
 * Staff recommendations based on profile settings and accessibility review.
 */
export default function ProfileRecommendationsPanel({
  displaySettings,
  accessibilityReview,
  transitionSettings,
  reinforcementSettings,
}) {
  const recommendations = [];

  if (displaySettings.studentModeLayout === "tabs" && !accessibilityReview?.["default-screen"]) {
    recommendations.push("Consider Board-only or First/Then-only layout if the tabbed workflow is too much.");
  }

  if (displaySettings.touchSize !== "extraLarge" && !accessibilityReview?.["touch-targets"]) {
    recommendations.push("Try Extra large touch size for more reliable access.");
  }

  if (!transitionSettings?.showTransitionPanel && !accessibilityReview?.["transition-support"]) {
    recommendations.push("Enable transition supports for waiting, changes, and returns from break.");
  }

  if (!reinforcementSettings?.enabled) {
    recommendations.push("Enable the reward board if reinforcement/token supports are useful for this student.");
  }

  if (recommendations.length === 0) {
    recommendations.push("No high-priority recommendations from current settings.");
  }

  return (
    <section className="panel profile-recommendations-panel" aria-labelledby="profile-recommendations-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Recommendations</p>
          <h2 id="profile-recommendations-heading">Profile suggestions</h2>
        </div>
      </div>

      <ul className="recommendation-list">
        {recommendations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
