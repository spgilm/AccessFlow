/**
 * StudentGuidedScheduleBuilder
 *
 * Student-facing guided schedule builder. It scaffolds choice-making across
 * routine sections without requiring the student to build a whole day from scratch.
 */
import { useMemo, useState } from "react";
import VisualSupport from "../../shared/VisualSupport.jsx";
import { shouldShowText, shouldShowVisuals } from "../../../data/displaySettings.js";

const builderSections = [
  {
    id: "start",
    label: "Start",
    description: "What should come first?",
    categories: ["Morning", "General", "School", "Work"],
  },
  {
    id: "work",
    label: "Work / school",
    description: "What work or learning activity should happen?",
    categories: ["School", "Work", "Chores", "General"],
  },
  {
    id: "break",
    label: "Break",
    description: "What break or regulation choice should be available?",
    categories: ["Breaks", "Leisure", "General"],
  },
  {
    id: "reward",
    label: "Reward / fun",
    description: "What motivating choice can come later?",
    categories: ["Leisure", "Food", "Community", "General"],
  },
];

export default function StudentGuidedScheduleBuilder({
  profile,
  libraryItems,
  displaySettings,
  onAddActivity,
}) {
  const [selectedChoices, setSelectedChoices] = useState({});
  const [status, setStatus] = useState("");

  const showText = shouldShowText(displaySettings);
  const showVisuals = shouldShowVisuals(displaySettings);

  const choicesBySection = useMemo(() => {
    const map = {};

    builderSections.forEach((section) => {
      const matched = libraryItems.filter((item) =>
        section.categories.includes(item.category || "General")
      );

      map[section.id] = matched.length > 0 ? matched.slice(0, 6) : libraryItems.slice(0, 6);
    });

    return map;
  }, [libraryItems]);

  function selectChoice(sectionId, choiceId) {
    setSelectedChoices((current) => ({
      ...current,
      [sectionId]: current[sectionId] === choiceId ? "" : choiceId,
    }));
    setStatus("");
  }

  async function addSelectedToSchedule() {
    const orderedChoiceIds = builderSections
      .map((section) => selectedChoices[section.id])
      .filter(Boolean);

    if (orderedChoiceIds.length === 0) {
      setStatus("Choose at least one activity first.");
      return;
    }

    for (const choiceId of orderedChoiceIds) {
      await onAddActivity({ type: "bank", choiceId });
    }

    setStatus("Selected activities added to the schedule.");
  }

  if (!libraryItems.length) {
    return null;
  }

  return (
    <section className="panel guided-schedule-builder" aria-labelledby="guided-builder-heading">
      <div className="focus-header compact-focus-header">
        <p className="eyebrow">Build my day</p>
        <h2 id="guided-builder-heading">Pick a few activities</h2>
        {showText ? (
          <p>Choose one activity from each section, then add them to the schedule.</p>
        ) : null}
      </div>

      <div className="guided-builder-section-grid">
        {builderSections.map((section) => (
          <article key={section.id} className="guided-builder-section">
            <div>
              <h3>{section.label}</h3>
              {showText ? <p className="field-help">{section.description}</p> : null}
            </div>

            <div className="guided-choice-row" role="group" aria-label={section.label}>
              {(choicesBySection[section.id] ?? []).map((item) => {
                const selected = selectedChoices[section.id] === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={selected ? "guided-choice-card is-selected" : "guided-choice-card"}
                    onClick={() => selectChoice(section.id, item.id)}
                    aria-pressed={selected}
                  >
                    {showVisuals ? (
                      <VisualSupport
                        visual={item.visual ?? item.emoji}
                        className="guided-choice-visual"
                      />
                    ) : null}
                    {showText ? <strong>{item.label}</strong> : null}
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <div className="guided-builder-actions">
        <button type="button" className="primary-wide-button" onClick={addSelectedToSchedule}>
          Add selected to schedule
        </button>
        {status ? <p className="copy-status">{status}</p> : null}
      </div>
    </section>
  );
}
