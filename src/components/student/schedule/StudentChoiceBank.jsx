/**
 * Student-facing approved activity adder with category filtering.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useMemo, useState } from "react";
import VisualSupport from "../../shared/VisualSupport.jsx";
import { shouldShowText, shouldShowVisuals } from "../../../data/displaySettings.js";

export default function StudentChoiceBank({
  profile,
  libraryItems,
  independenceSettings,
  displaySettings,
  onAddActivity,
}) {
  const [category, setCategory] = useState("All");
  const showText = shouldShowText(displaySettings);
  const showVisuals = shouldShowVisuals(displaySettings);
  const canBuild = independenceSettings.studentCanBuildSchedule;
  const hasChoices = libraryItems.length > 0;
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(libraryItems.map((item) => item.category || "General")))],
    [libraryItems]
  );
  const filteredItems =
    category === "All"
      ? libraryItems
      : libraryItems.filter((item) => (item.category || "General") === category);

  if (!canBuild) {
    return (
      <section className="panel focused-panel" aria-labelledby="choose-disabled-heading">
        <div className="empty-visual" aria-hidden="true">🧭</div>
        <h2 id="choose-disabled-heading">Staff chooses activities.</h2>
        <p className="field-help">Ask staff to change this schedule.</p>
      </section>
    );
  }

  return (
    <section className="panel focused-panel student-choice-screen" aria-labelledby="student-choice-heading">
      <div className="focus-header">
        <p className="eyebrow">Add</p>
        <h2 id="student-choice-heading">Add to my schedule</h2>
        {showText ? (
          <p>Pick one card to add it to {profile?.name ? `${profile.name}'s` : "your"} schedule.</p>
        ) : null}
      </div>

      {categories.length > 2 ? (
        <div className="category-filter" role="group" aria-label="Activity categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "is-active" : ""}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      {!hasChoices ? (
        <div className="small-empty-state">
          <div className="empty-visual" aria-hidden="true">➕</div>
          <h3>No choices yet</h3>
          <p>Staff can add activity choices in Staff Mode.</p>
        </div>
      ) : (
        <div className="choice-card-grid">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="choice-card-button"
              onClick={() => onAddActivity({ type: "bank", choiceId: item.id })}
              aria-label={`Add ${item.label} to schedule`}
            >
              {showVisuals ? (
                <VisualSupport
                  visual={item.visual ?? item.emoji}
                  className="choice-card-visual"
                />
              ) : null}
              {showText ? (
                <span className="choice-card-label">{item.label}</span>
              ) : null}
              {showText ? <span className="choice-card-action">Add to schedule</span> : null}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
