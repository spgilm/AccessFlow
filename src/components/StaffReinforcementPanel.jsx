/**
 * Staff token/reward settings and controls.
 */
import { useState } from "react";

export default function StaffReinforcementPanel({
  reinforcementSettings,
  onUpdateReinforcementSettings,
}) {
  const [newReward, setNewReward] = useState("");

  function update(field, value) {
    onUpdateReinforcementSettings({
      ...reinforcementSettings,
      [field]: value,
    });
  }

  function addReward(event) {
    event.preventDefault();
    const trimmed = newReward.trim();

    if (!trimmed) {
      return;
    }

    update("rewardOptions", [...reinforcementSettings.rewardOptions, trimmed]);
    setNewReward("");
  }

  return (
    <section className="panel reinforcement-panel" aria-labelledby="reinforcement-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Reinforcement</p>
          <h2 id="reinforcement-heading">Token and reward board</h2>
        </div>
      </div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={reinforcementSettings.enabled}
          onChange={(event) => update("enabled", event.target.checked)}
        />
        <span><strong>Show reward board in Student Mode</strong></span>
      </label>

      <div className="reinforcement-grid">
        <label>
          Tokens earned
          <input
            type="number"
            min="0"
            value={reinforcementSettings.tokensEarned}
            onChange={(event) => update("tokensEarned", Number(event.target.value))}
          />
        </label>

        <label>
          Token goal
          <input
            type="number"
            min="1"
            value={reinforcementSettings.tokenGoal}
            onChange={(event) => update("tokenGoal", Number(event.target.value))}
          />
        </label>

        <label>
          Praise phrase
          <input
            type="text"
            value={reinforcementSettings.praisePhrase}
            onChange={(event) => update("praisePhrase", event.target.value)}
          />
        </label>
      </div>

      <div className="row-actions">
        <button type="button" className="secondary-button" onClick={() => update("tokensEarned", reinforcementSettings.tokensEarned + 1)}>
          Award token
        </button>
        <button type="button" className="secondary-button" onClick={() => update("tokensEarned", 0)}>
          Reset tokens
        </button>
      </div>

      <form className="reward-add-form" onSubmit={addReward}>
        <label>
          Add reward
          <input value={newReward} onChange={(event) => setNewReward(event.target.value)} />
        </label>
        <button type="submit" className="secondary-button">Add</button>
      </form>

      <div className="reward-list">
        {reinforcementSettings.rewardOptions.map((reward) => (
          <article key={reward} className="reward-item">
            <span>{reward}</span>
            <button
              type="button"
              className="small-danger-button"
              onClick={() =>
                update(
                  "rewardOptions",
                  reinforcementSettings.rewardOptions.filter((item) => item !== reward)
                )
              }
            >
              Remove
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
