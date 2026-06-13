/**
 * Student-facing transition and waiting supports.
 */
import TimerButton from "./TimerButton.jsx";

export default function StudentTransitionPanel({
  currentActivity,
  nextActivity,
  transitionSettings,
  onSupportRequest,
}) {
  if (!transitionSettings?.showTransitionPanel) {
    return null;
  }

  function logTransition(type, label) {
    onSupportRequest({
      type,
      label,
      activityId: currentActivity?.id ?? null,
      activityLabel: currentActivity?.label ?? null,
    });
  }

  return (
    <section className="panel transition-support-panel" aria-labelledby="transition-support-heading">
      <div className="focus-header compact-focus-header">
        <p className="eyebrow">Transition help</p>
        <h2 id="transition-support-heading">What happens next?</h2>
      </div>

      <div className="transition-now-next">
        <article>
          <span>Now</span>
          <strong>{currentActivity?.label ?? "No activity"}</strong>
        </article>
        <article>
          <span>Next</span>
          <strong>{nextActivity?.label ?? "Finished"}</strong>
        </article>
      </div>

      <div className="transition-button-grid">
        <button
          type="button"
          onClick={() =>
            logTransition(
              "transition-almost-done",
              `${transitionSettings.almostDonePhrase} ${nextActivity ? `${transitionSettings.nextPhrase} ${nextActivity.label}.` : ""}`
            )
          }
        >
          Almost done
        </button>

        {transitionSettings.showWaitCard ? (
          <button
            type="button"
            onClick={() => logTransition("transition-wait", transitionSettings.waitPhrase)}
          >
            Wait
          </button>
        ) : null}

        {transitionSettings.showTryAgain ? (
          <button
            type="button"
            onClick={() => logTransition("transition-try-again", transitionSettings.tryAgainPhrase)}
          >
            Try again
          </button>
        ) : null}

        {transitionSettings.showReturnFromBreak ? (
          <button
            type="button"
            onClick={() =>
              logTransition("transition-return-from-break", transitionSettings.returnFromBreakPhrase)
            }
          >
            Return from break
          </button>
        ) : null}
      </div>

      <TimerButton
        minutes={transitionSettings.defaultCountdownMinutes}
        label="Transition countdown"
      />
    </section>
  );
}
