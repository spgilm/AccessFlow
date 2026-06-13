/**
 * Staff-facing reusable visual library manager.
 *
 * This lets staff save common visual supports once and reuse them when editing
 * activities and steps.
 */
import { useMemo, useState } from "react";
import EmojiPickerButton from "./EmojiPickerButton.jsx";
import VisualSupport from "./VisualSupport.jsx";
import { createEmojiVisual } from "../services/imageProvider.js";
import { visualLibraryCategories } from "../data/visualLibrary.js";

export default function StaffVisualLibraryPanel({
  selectedProfile,
  visualLibrary,
  onAddVisualLibraryItem,
  onUpdateVisualLibraryItem,
  onDeleteVisualLibraryItem,
  onResetVisualLibrary,
}) {
  const [label, setLabel] = useState("");
  const [emoji, setEmoji] = useState("⭐");
  const [category, setCategory] = useState("Custom");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = useMemo(() => {
    const savedCategories = new Set(visualLibrary.map((item) => item.category || "Custom"));
    return ["All", ...visualLibraryCategories.filter((item) => savedCategories.has(item))];
  }, [visualLibrary]);

  const filteredVisuals =
    filterCategory === "All"
      ? visualLibrary
      : visualLibrary.filter((item) => (item.category || "Custom") === filterCategory);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmed = label.trim();

    if (!trimmed) {
      return;
    }

    onAddVisualLibraryItem({
      label: trimmed,
      category,
      visual: createEmojiVisual(emoji || "⭐", `${trimmed} visual`),
    });

    setLabel("");
    setEmoji("⭐");
    setCategory("Custom");
  }

  return (
    <section className="panel visual-library-panel" aria-labelledby="visual-library-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Visual library</p>
          <h2 id="visual-library-heading">Reusable visuals for {selectedProfile?.name ?? "this student"}</h2>
          <p className="field-help">
            Save common symbols or photos once, then reuse them when editing activities and steps.
          </p>
        </div>
      </div>

      <form className="visual-library-add-form" onSubmit={handleSubmit}>
        <label>
          Visual label
          <input
            type="text"
            value={label}
            placeholder="Example: headphones"
            onChange={(event) => setLabel(event.target.value)}
          />
        </label>

        <label>
          Emoji
          <input
            type="text"
            value={emoji}
            maxLength="4"
            placeholder="⭐"
            onChange={(event) => setEmoji(event.target.value)}
          />
        </label>

        <label>
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {visualLibraryCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="primary-wide-button">
          Add visual
        </button>
      </form>

      <div className="visual-library-toolbar">
        <label>
          Show category
          <select value={filterCategory} onChange={(event) => setFilterCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="secondary-button" onClick={onResetVisualLibrary}>
          Reset default visuals
        </button>
      </div>

      {filteredVisuals.length === 0 ? (
        <p className="field-help">No visuals in this category.</p>
      ) : (
        <div className="visual-library-grid">
          {filteredVisuals.map((item) => (
            <article key={item.id} className="visual-library-card">
              <EmojiPickerButton
                visual={item.visual}
                label={item.label}
                className="visual-library-picker"
                onChange={(visual) => onUpdateVisualLibraryItem(item.id, { visual })}
              />

              <label>
                Label
                <input
                  type="text"
                  value={item.label}
                  onChange={(event) =>
                    onUpdateVisualLibraryItem(item.id, {
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
                Category
                <select
                  value={item.category || "Custom"}
                  onChange={(event) => onUpdateVisualLibraryItem(item.id, { category: event.target.value })}
                >
                  {visualLibraryCategories.map((categoryName) => (
                    <option key={categoryName} value={categoryName}>
                      {categoryName}
                    </option>
                  ))}
                </select>
              </label>

              <div className="visual-library-preview">
                <VisualSupport visual={item.visual} />
                <span>{item.category || "Custom"}</span>
              </div>

              <button
                type="button"
                className="small-danger-button"
                onClick={() => onDeleteVisualLibraryItem(item.id)}
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
