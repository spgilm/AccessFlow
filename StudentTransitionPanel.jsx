/**
 * Staff-facing communication board manager.
 *
 * These buttons appear in Student Mode → Board and are used to build spoken messages.
 */
import { useState } from "react";
import EmojiPickerButton from "./EmojiPickerButton.jsx";
import { choiceBoardCategories } from "../data/choiceBoardItems.js";

export default function StaffChoiceBoardManager({
  boardItems,
  onAddBoardItem,
  onUpdateBoardItem,
  onDeleteBoardItem,
  onResetBoardItems,
}) {
  const [newLabel, setNewLabel] = useState("");
  const [newPhraseText, setNewPhraseText] = useState("");
  const [newEmoji, setNewEmoji] = useState("⭐");
  const [newCategory, setNewCategory] = useState("custom");

  function handleAdd(event) {
    event.preventDefault();
    const trimmed = newLabel.trim();

    if (!trimmed) {
      return;
    }

    onAddBoardItem({
      label: trimmed,
      phraseText: newPhraseText.trim() || trimmed,
      emoji: newEmoji,
      category: newCategory,
      isFavorite: false,
    });
    setNewLabel("");
    setNewPhraseText("");
    setNewEmoji("⭐");
    setNewCategory("custom");
  }

  return (
    <section className="panel board-manager-panel" aria-labelledby="board-manager-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Communication board</p>
          <h2 id="board-manager-heading">Student Board buttons</h2>
          <p className="field-help">
            These buttons appear in Student Mode → Board. The label is what the student sees.
            The spoken phrase is what gets added to the message strip.
          </p>
        </div>
      </div>

      <form className="board-add-form v17-board-add-form" onSubmit={handleAdd}>
        <label>
          Button label
          <input
            type="text"
            value={newLabel}
            placeholder="Example: Headphones"
            onChange={(event) => setNewLabel(event.target.value)}
          />
        </label>

        <label>
          Spoken phrase
          <input
            type="text"
            value={newPhraseText}
            placeholder="Example: I want headphones"
            onChange={(event) => setNewPhraseText(event.target.value)}
          />
        </label>

        <label>
          Emoji
          <input
            type="text"
            value={newEmoji}
            maxLength="4"
            placeholder="⭐"
            onChange={(event) => setNewEmoji(event.target.value)}
          />
        </label>

        <label>
          Category
          <select value={newCategory} onChange={(event) => setNewCategory(event.target.value)}>
            {choiceBoardCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="primary-wide-button">
          Add board button
        </button>
      </form>

      <div className="row-actions board-manager-actions">
        <button type="button" className="secondary-button" onClick={onResetBoardItems}>
          Reset to default board
        </button>
      </div>

      {boardItems.length === 0 ? (
        <p className="field-help">No board buttons saved yet.</p>
      ) : (
        <div className="board-manager-list">
          {boardItems.map((item) => (
            <article key={item.id} className="board-manager-card v17-board-manager-card">
              <EmojiPickerButton
                visual={item.visual ?? item.emoji}
                label={item.label}
                className="staff-row-visual-picker"
                onChange={(visual) => onUpdateBoardItem(item.id, { visual })}
              />

              <div className="board-manager-fields v17-board-manager-fields">
                <label>
                  Label
                  <input
                    type="text"
                    value={item.label}
                    onChange={(event) =>
                      onUpdateBoardItem(item.id, {
                        label: event.target.value,
                        visual: {
                          ...item.visual,
                          altText: `${event.target.value} visual`,
                        },
                      })
                    }
                  />
                </label>

                <label>
                  Spoken phrase
                  <input
                    type="text"
                    value={item.phraseText || item.label}
                    onChange={(event) => onUpdateBoardItem(item.id, { phraseText: event.target.value })}
                  />
                </label>

                <label>
                  Category
                  <select
                    value={item.category ?? "custom"}
                    onChange={(event) => onUpdateBoardItem(item.id, { category: event.target.value })}
                  >
                    {choiceBoardCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="button"
                className="small-danger-button"
                onClick={() => onDeleteBoardItem(item.id)}
              >
                Remove
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
