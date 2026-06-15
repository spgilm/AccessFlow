/**
 * Student-facing token/reward board.
 */
export default function StudentRewardPanel({
  reinforcementSettings,
  onRequestReward,
}) {
  if (!reinforcementSettings?.enabled) {
    return null;
  }

  const goal = Math.max(1, Number(reinforcementSettings.tokenGoal || 1));
  const earned = Math.max(0, Number(reinforcementSettings.tokensEarned || 0));
  const tokens = Array.from({ length: goal }, (_, index) => index < earned);

  return (
    <section className="panel student-reward-panel" aria-labelledby="student-reward-heading">
      <div className="focus-header compact-focus-header">
        <p className="eyebrow">Rewards</p>
        <h2 id="student-reward-heading">{reinforcementSettings.praisePhrase || "Nice work!"}</h2>
      </div>

      <div className="token-row" aria-label={`${earned} of ${goal} tokens earned`}>
        {tokens.map((isEarned, index) => (
          <span key={index} className={isEarned ? "token is-earned" : "token"} aria-hidden="true">
            ⭐
          </span>
        ))}
      </div>

      <div className="reward-choice-grid">
        {reinforcementSettings.rewardOptions.map((reward) => (
          <button
            key={reward}
            type="button"
            disabled={earned < goal}
            onClick={() => onRequestReward(reward)}
          >
            {reward}
          </button>
        ))}
      </div>
    </section>
  );
}
