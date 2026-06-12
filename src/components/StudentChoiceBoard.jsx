/**
 * Student-facing communication board.
 *
 * Board buttons do not add items to the schedule. They log wants/needs/support events.
 * Approved activities may optionally appear below as a secondary section.
 */
import VisualSupport from "./VisualSupport.jsx";

export default function StudentChoiceBoard({
  boardItems,
  libraryItems,
  displaySettings,
  onAddActivity,
  onSupportRequest,
}) {
  const safeBoardItems = Array.isArray(boardItems) ? boardItems : [];
  const safeLibraryItems = Array.isArray(libraryItems) ? libraryItems : [];
  const showWords = displaySettings?.showWords !== false;

  return (
    <section className="panel focused-panel choice-board-screen" aria-labelledby="choice-board-heading">
      <div className="focus-header">
        <p className="eyebrow">Choice board</p>
        <h2 id="choice-board-heading">What do you want?</h2>
        {showWords ? (
          <p className="field-help">
            Tap a button to tell staff what you want or need.
          </p>
        ) : null}
      </div>

      {safeBoardItems.length === 0 ? (
        <div className="small-empty-state">
          <div className="empty-visual" aria-hidden="true">💬</div>
          <h3>No board buttons yet</h3>
          <p>Staff can add communication buttons in Staff Mode.</p>
        </div>
      ) : (
        <div className="choice-board-grid">
          {safeBoardItems.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className="choice-board-button"
              onClick={() =>
                onSupportRequest({
                  type: `board-${choice.category ?? "choice"}`,
                  label: choice.label,
                  activityId: null,
                  activityLabel: null,
                })
              }
            >
              <VisualSupport visual={choice.visual ?? choice.emoji ?? "⭐"} className="choice-board-visual" />
              {showWords ? <span>{choice.label}</span> : null}
            </button>
          ))}
        </div>
      )}

      {safeLibraryItems.length > 0 ? (
        <>
          <h3 className="choice-board-subheading">Activities</h3>
          {showWords ? (
            <p className="field-help">
              These add approved activities to the schedule.
            </p>
          ) : null}
          <div className="choice-board-grid">
            {safeLibraryItems.slice(0, 8).map((item) => (
              <button
                key={item.id}
                type="button"
                className="choice-board-button"
                onClick={() => onAddActivity({ type: "bank", choiceId: item.id })}
              >
                <VisualSupport visual={item.visual ?? item.emoji} className="choice-board-visual" />
                {showWords ? <span>{item.label}</span> : null}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
