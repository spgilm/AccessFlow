import VisualSupport from "./VisualSupport.jsx";

const quickChoices = [
  { id: "help", label: "Help", visual: "🙋" },
  { id: "break", label: "Break", visual: "🧘" },
  { id: "drink", label: "Drink", visual: "💧" },
  { id: "snack", label: "Snack", visual: "🍎" },
  { id: "bathroom", label: "Bathroom", visual: "🚽" },
  { id: "quiet", label: "Quiet", visual: "🤫" },
  { id: "music", label: "Music", visual: "🎵" },
  { id: "walk", label: "Walk", visual: "🚶" },
];

export default function StudentChoiceBoard({ libraryItems, displaySettings, onAddActivity, onSupportRequest }) {
  return (
    <section className="panel focused-panel choice-board-screen" aria-labelledby="choice-board-heading">
      <div className="focus-header">
        <p className="eyebrow">Choice board</p>
        <h2 id="choice-board-heading">What do you want?</h2>
      </div>

      <div className="choice-board-grid">
        {quickChoices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            className="choice-board-button"
            onClick={() =>
              onSupportRequest({
                type: `choice-${choice.id}`,
                label: choice.label,
                activityId: null,
                activityLabel: null,
              })
            }
          >
            <VisualSupport visual={choice.visual} className="choice-board-visual" />
            {displaySettings?.showWords !== false ? <span>{choice.label}</span> : null}
          </button>
        ))}
      </div>

      {libraryItems.length > 0 ? (
        <>
          <h3 className="choice-board-subheading">Activities</h3>
          <div className="choice-board-grid">
            {libraryItems.slice(0, 8).map((item) => (
              <button
                key={item.id}
                type="button"
                className="choice-board-button"
                onClick={() => onAddActivity({ type: "bank", choiceId: item.id })}
              >
                <VisualSupport visual={item.visual ?? item.emoji} className="choice-board-visual" />
                {displaySettings?.showWords !== false ? <span>{item.label}</span> : null}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
