/**
 * StudentScheduleChoiceLauncher
 *
 * Makes the independence path explicit from the Schedule screen:
 * pick a staff-approved choice and add it directly to the student's schedule.
 */
import { useState } from "react";
import VisualSupport from "../../shared/VisualSupport.jsx";
import { shouldShowText, shouldShowVisuals } from "../../../data/displaySettings.js";

export default function StudentScheduleChoiceLauncher({
  libraryItems,
  independenceSettings,
  displaySettings,
  onAddActivity,
  onOpenAddTab,
  canOpenAddTab = false,
}) {
  const [status, setStatus] = useState("");
  const showText = shouldShowText(displaySettings);
  const showVisuals = shouldShowVisuals(displaySettings);
  const canBuild = independenceSettings?.studentCanBuildSchedule !== false;
  const visibleChoices = libraryItems.slice(0, 6);

  async function addChoice(choice) {
    await onAddActivity({ type: "bank", choiceId: choice.id });
    setStatus(`${choice.label} added to schedule.`);
  }

  return (
    <section className="panel schedule-choice-launcher" aria-labelledby="schedule-choice-heading">
      <div className="focus-header compact-focus-header">
        <p className="eyebrow">Add to schedule</p>
        <h2 id="schedule-choice-heading">Pick something to do</h2>
        {showText ? (
          <p>Choose a card. It will go into your schedule.</p>
        ) : null}
      </div>

      {!canBuild ? (
        <div className="small-empty-state">
          <div className="empty-visual" aria-hidden="true">🔒</div>
          <h3>Staff is choosing today.</h3>
          <p>Ask staff if you want to add something.</p>
        </div>
      ) : !libraryItems.length ? (
        <div className="small-empty-state">
          <div className="empty-visual" aria-hidden="true">➕</div>
          <h3>No choices yet</h3>
          <p>Staff can add activity choices in Staff Mode.</p>
        </div>
      ) : (
        <>
          <div className="schedule-choice-quick-grid" aria-label="Activities to add to schedule">
            {visibleChoices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                className="schedule-choice-button"
                onClick={() => addChoice(choice)}
                aria-label={`Add ${choice.label} to my schedule`}
              >
                {showVisuals ? (
                  <VisualSupport
                    visual={choice.visual ?? choice.emoji}
                    className="schedule-choice-visual"
                  />
                ) : null}
                {showText ? (
                  <>
                    <strong>{choice.label}</strong>
                    <span>Add to my schedule</span>
                  </>
                ) : null}
              </button>
            ))}
          </div>

          <div className="row-actions">
            {canOpenAddTab ? (
              <button type="button" className="secondary-button" onClick={onOpenAddTab}>
                See more choices
              </button>
            ) : null}
            {status ? <p className="copy-status" role="status">{status}</p> : null}
          </div>
        </>
      )}
    </section>
  );
}
