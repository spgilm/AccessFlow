/**
 * Student-facing AAC-style communication board.
 *
 * Board buttons build a message in a sentence strip. The student can say the
 * whole message, clear it, or delete the last selected word/phrase.
 */
import { useEffect, useMemo, useState } from "react";
import VisualSupport from "./VisualSupport.jsx";
import { shouldShowVisuals } from "../data/displaySettings.js";
import { choiceBoardCategories, getChoiceBoardCategoryLabel } from "../data/choiceBoardItems.js";

function speakMessage(message) {
  if (typeof window === "undefined" || !window.speechSynthesis || !message) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

export default function StudentChoiceBoard({
  boardItems,
  libraryItems,
  displaySettings,
  onAddActivity,
  onSupportRequest,
}) {
  const safeBoardItems = Array.isArray(boardItems) ? boardItems : [];
  const safeLibraryItems = Array.isArray(libraryItems) ? libraryItems : [];
  const [activeCategory, setActiveCategory] = useState("core");
  const [messageParts, setMessageParts] = useState([]);
  const [recentChoices, setRecentChoices] = useState([]);
  const phraseStarters = [
    { label: "I want", phraseText: "I want" },
    { label: "I need", phraseText: "I need" },
    { label: "I feel", phraseText: "I feel" },
    { label: "Go", phraseText: "go" },
  ];
  const showWords = displaySettings?.showWords !== false && displaySettings?.textDisplay !== "iconsOnly";
  const showVisuals = shouldShowVisuals(displaySettings);
  const sentenceText = messageParts.map((part) => part.phraseText || part.label).join(" ").replace(/\s+/g, " ").trim();

  const usedCategories = useMemo(() => {
    const categoryIds = new Set(safeBoardItems.map((item) => item.category || "custom"));

    return choiceBoardCategories.filter((category) => categoryIds.has(category.id));
  }, [safeBoardItems]);

  useEffect(() => {
    const categoryIds = usedCategories.map((category) => category.id);

    if (categoryIds.length > 0 && !categoryIds.includes(activeCategory)) {
      setActiveCategory(categoryIds[0]);
    }
  }, [activeCategory, usedCategories]);

  const filteredBoardItems = (
    activeCategory === "all"
      ? safeBoardItems
      : safeBoardItems.filter((item) => (item.category || "custom") === activeCategory)
  ).slice().sort((a, b) => Number(Boolean(b.isFavorite)) - Number(Boolean(a.isFavorite)));

  function addStarter(starter) {
    const nextPart = {
      id: `${starter.label}-${Date.now()}`,
      label: starter.label,
      phraseText: starter.phraseText,
    };

    setMessageParts((current) => [...current, nextPart]);
  }

  function addMessagePart(choice) {
    const nextPart = {
      id: `${choice.id}-${Date.now()}`,
      label: choice.label,
      phraseText: choice.phraseText || choice.label,
    };

    setMessageParts((current) => [...current, nextPart]);
    setRecentChoices((current) => [
      choice,
      ...current.filter((item) => item.id !== choice.id),
    ].slice(0, 6));

    onSupportRequest({
      type: `board-select-${choice.category ?? "choice"}`,
      label: choice.phraseText || choice.label,
      activityId: null,
      activityLabel: null,
    });
  }

  function sayMessage() {
    const message = sentenceText || "I need help";

    speakMessage(message);

    onSupportRequest({
      type: "board-message",
      label: message,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="panel focused-panel choice-board-screen aac-board-screen" aria-labelledby="choice-board-heading">
      <div className="focus-header">
        <p className="eyebrow">Choice board</p>
        <h2 id="choice-board-heading">What do you want to say?</h2>
        {showWords ? (
          <p className="field-help">
            Tap buttons to build a message. Then tap Say message.
          </p>
        ) : null}
      </div>

      <div className="aac-sentence-strip" aria-label="Message being built">
        <div className="aac-message-display" aria-live="polite">
          {sentenceText || "Tap buttons to make a message"}
        </div>

        <div className="aac-message-actions">
          <button type="button" className="primary-wide-button" onClick={sayMessage}>
            Say message
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => setMessageParts((current) => current.slice(0, -1))}
            disabled={messageParts.length === 0}
          >
            Backspace
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => setMessageParts([])}
            disabled={messageParts.length === 0}
          >
            Clear
          </button>
        </div>
      </div>

<div className="aac-starter-row" role="group" aria-label="Phrase starters">
  {phraseStarters.map((starter) => (
    <button
      key={starter.label}
      type="button"
      className="secondary-button"
      onClick={() => addStarter(starter)}
    >
      {starter.label}
    </button>
  ))}
</div>

{recentChoices.length > 0 ? (
  <details className="aac-recent-details">
    <summary>Recently used</summary>
    <div className="aac-recent-grid">
      {recentChoices.map((choice) => (
        <button key={choice.id} type="button" onClick={() => addMessagePart(choice)}>
          {choice.label}
        </button>
      ))}
    </div>
  </details>
) : null}

      {usedCategories.length > 1 ? (
        <div className="aac-category-tabs" role="group" aria-label="Communication categories">
          {usedCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={activeCategory === category.id ? "is-active" : ""}
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={activeCategory === category.id}
            >
              {category.label}
            </button>
          ))}
        </div>
      ) : null}

      {safeBoardItems.length === 0 ? (
        <div className="small-empty-state">
          <div className="empty-visual" aria-hidden="true">💬</div>
          <h3>No board buttons yet</h3>
          <p>Staff can add communication buttons in Staff Mode.</p>
        </div>
      ) : (
        <div className="choice-board-grid">
          {filteredBoardItems.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className="choice-board-button"
              onClick={() => addMessagePart(choice)}
              aria-label={`Add ${choice.phraseText || choice.label} to message`}
            >
              {showVisuals ? <VisualSupport visual={choice.visual ?? choice.emoji ?? "⭐"} className="choice-board-visual" /> : null}
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
                {showVisuals ? <VisualSupport visual={item.visual ?? item.emoji} className="choice-board-visual" /> : null}
                {showWords ? <span>{item.label}</span> : null}
              </button>
            ))}
          </div>
        </>
      ) : null}

      {activeCategory && showWords ? (
        <p className="field-help">
          Current page: {getChoiceBoardCategoryLabel(activeCategory)}
        </p>
      ) : null}
    </section>
  );
}
