/**
 * Staff controls for transition/wait support phrases.
 */
export default function StaffTransitionSettingsPanel({
  transitionSettings,
  onUpdateTransitionSettings,
}) {
  function update(field, value) {
    onUpdateTransitionSettings({
      ...transitionSettings,
      [field]: value,
    });
  }

  return (
    <section className="panel transition-settings-panel" aria-labelledby="transition-settings-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Transitions</p>
          <h2 id="transition-settings-heading">Waiting and transition supports</h2>
          <p className="field-help">
            Configure student-facing supports for waiting, changes, and returning from breaks.
          </p>
        </div>
      </div>

      <div className="transition-settings-grid">
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={transitionSettings.showTransitionPanel}
            onChange={(event) => update("showTransitionPanel", event.target.checked)}
          />
          <span><strong>Show transition panel in Student Mode</strong></span>
        </label>

        <label>
          Countdown minutes
          <input
            type="number"
            min="0"
            value={transitionSettings.defaultCountdownMinutes}
            onChange={(event) => update("defaultCountdownMinutes", Number(event.target.value))}
          />
        </label>

        <label>
          Almost done phrase
          <input
            type="text"
            value={transitionSettings.almostDonePhrase}
            onChange={(event) => update("almostDonePhrase", event.target.value)}
          />
        </label>

        <label>
          Next phrase
          <input
            type="text"
            value={transitionSettings.nextPhrase}
            onChange={(event) => update("nextPhrase", event.target.value)}
          />
        </label>

        <label>
          Wait phrase
          <input
            type="text"
            value={transitionSettings.waitPhrase}
            onChange={(event) => update("waitPhrase", event.target.value)}
          />
        </label>

        <label>
          Try again phrase
          <input
            type="text"
            value={transitionSettings.tryAgainPhrase}
            onChange={(event) => update("tryAgainPhrase", event.target.value)}
          />
        </label>

        <label>
          Return from break phrase
          <input
            type="text"
            value={transitionSettings.returnFromBreakPhrase}
            onChange={(event) => update("returnFromBreakPhrase", event.target.value)}
          />
        </label>
      </div>
    </section>
  );
}
