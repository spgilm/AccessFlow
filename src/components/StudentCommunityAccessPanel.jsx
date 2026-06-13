import IconSymbol from "./IconSymbol.jsx";

/**
 * StudentCommunityAccessPanel
 *
 * Student-facing community access / safety communication cards.
 */
export default function StudentCommunityAccessPanel({ lifeSkillsSettings, onSupportRequest }) {
  const cards = lifeSkillsSettings?.communityCards ?? [];
  const safetySteps = lifeSkillsSettings?.communitySafetySteps ?? [];

  function recordCard(item) {
    onSupportRequest?.({
      type: "community-access",
      label: `Community access: ${item.label}`,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel life-skills-panel community-access-panel" aria-labelledby="community-access-heading">
      <div>
        <p className="eyebrow">Community</p>
        <h3 id="community-access-heading">Help in the community</h3>
        <p className="field-help">{lifeSkillsSettings?.communityCardMessage}</p>
      </div>

      <div className="support-choice-grid">
        {cards.map((item) => (
          <button key={item.id} type="button" className="support-choice-button" onClick={() => recordCard(item)}>
            <IconSymbol item=item />
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>

      {safetySteps.length > 0 ? (
        <details className="student-tool-group compact-details">
          <summary>
            <span>
              <strong>Safety steps</strong>
              <small>What to remember outside the classroom/home</small>
            </span>
          </summary>
          <ol className="safety-step-list">
            {safetySteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </details>
      ) : null}
    </section>
  );
}
