/**
 * GoalSupportRecommendationsPanel
 *
 * Staff-facing non-diagnostic support recommendations derived from
 * communication patterns and active goals.
 */
import { buildSupportRecommendations } from "../../../utils/supportRecommendations.js";

export default function GoalSupportRecommendationsPanel({ supportEvents, progressGoals }) {
  const { recommendations } = buildSupportRecommendations({ supportEvents, progressGoals });

  return (
    <section className="panel recommendations-panel" aria-labelledby="recommendations-heading">
      <div>
        <p className="eyebrow">Support planning</p>
        <h2 id="recommendations-heading">Goal-aware support recommendations</h2>
        <p className="field-help">
          These are staff-review prompts, not clinical decisions. Use them to guide team discussion.
        </p>
      </div>

      {recommendations.length === 0 ? (
        <p className="field-help">No recommendation patterns yet. More communication/goal data will make this more useful.</p>
      ) : (
        <div className="recommendation-list">
          {recommendations.map((item) => (
            <article key={item.id} className="recommendation-card">
              <h3>{item.title}</h3>
              <p>{item.reason}</p>
              <ul>
                {item.suggestions.map((suggestion) => (
                  <li key={suggestion}>{suggestion}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
