/**
 * StaffVisualChoiceEditor
 *
 * Reusable editor for label + emoji fallback + Font Awesome icon + saved
 * Visual Library item assignment. Labels remain the communication/read-aloud/event-log value.
 */
import { useState } from "react";
import IconSymbol from "../../shared/IconSymbol.jsx";
import { getFlatIconLibrary } from "../../../data/iconLibrary.js";

const iconOptions = getFlatIconLibrary();

export default function StaffVisualChoiceEditor({
  title,
  description,
  items,
  onChangeItems,
  visualLibrary = [],
  addPlaceholder = "Add item",
  defaultIcon = "comment",
}) {
  const [newLabel, setNewLabel] = useState("");
  const [newIcon, setNewIcon] = useState(defaultIcon);

  function visualPatchFromLibraryItem(libraryItem) {
    if (!libraryItem?.visual) {
      return {};
    }

    const visual = libraryItem.visual;

    if (visual.type === "image") {
      return {
        visualLibraryItemId: libraryItem.id,
        visual,
        imageUrl: visual.value,
        icon: "",
        emoji: "",
      };
    }

    if (visual.type === "fontawesome") {
      return {
        visualLibraryItemId: libraryItem.id,
        visual,
        icon: visual.value,
        imageUrl: "",
      };
    }

    if (visual.type === "emoji") {
      return {
        visualLibraryItemId: libraryItem.id,
        visual,
        emoji: visual.value,
        imageUrl: "",
      };
    }

    return {
      visualLibraryItemId: libraryItem.id,
      visual,
    };
  }

  function addItem() {
    const label = newLabel.trim();
    if (!label) return;

    onChangeItems([
      ...(items ?? []),
      {
        id: `visual-choice-${Date.now()}`,
        label,
        emoji: "⭐",
        icon: newIcon || defaultIcon,
      },
    ]);

    setNewLabel("");
    setNewIcon(defaultIcon);
  }

  function updateItem(itemId, patch) {
    onChangeItems((items ?? []).map((item) => (item.id === itemId ? { ...item, ...patch } : item)));
  }

  function removeItem(itemId) {
    onChangeItems((items ?? []).filter((item) => item.id !== itemId));
  }

  function assignLibraryVisual(itemId, visualLibraryItemId) {
    if (!visualLibraryItemId) {
      updateItem(itemId, {
        visualLibraryItemId: "",
        visual: null,
        imageUrl: "",
      });
      return;
    }

    const libraryItem = visualLibrary.find((item) => item.id === visualLibraryItemId);
    updateItem(itemId, visualPatchFromLibraryItem(libraryItem));
  }

  return (
    <article className="staff-visual-choice-editor">
      <h3>{title}</h3>
      {description ? <p className="field-help">{description}</p> : null}

      <div className="compact-input-row visual-choice-add-row">
        <input
          type="text"
          value={newLabel}
          onChange={(event) => setNewLabel(event.target.value)}
          placeholder={addPlaceholder}
        />
        <select value={newIcon} onChange={(event) => setNewIcon(event.target.value)} aria-label={`Icon for ${title}`}>
          {iconOptions.map((icon) => (
            <option key={`${title}-${icon.name}`} value={icon.name}>
              {icon.label}
            </option>
          ))}
        </select>
        <button type="button" onClick={addItem}>Add</button>
      </div>

      <div className="visual-choice-editor-list">
        {(items ?? []).map((item) => (
          <section key={item.id} className="visual-choice-editor-card">
            <div className="visual-choice-preview">
              <IconSymbol item={item} />
              <strong>{item.label}</strong>
            </div>

            <label>
              Label
              <input
                type="text"
                value={item.label ?? ""}
                onChange={(event) => updateItem(item.id, { label: event.target.value })}
              />
            </label>

            <label>
              Saved visual
              <select
                value={item.visualLibraryItemId ?? ""}
                onChange={(event) => assignLibraryVisual(item.id, event.target.value)}
              >
                <option value="">No saved visual</option>
                {visualLibrary.map((visualItem) => (
                  <option key={`${title}-${item.id}-${visualItem.id}`} value={visualItem.id}>
                    {visualItem.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Emoji fallback
              <input
                type="text"
                value={item.emoji ?? ""}
                maxLength="4"
                onChange={(event) =>
                  updateItem(item.id, {
                    emoji: event.target.value,
                    visualLibraryItemId: item.visual?.type === "emoji" ? "" : item.visualLibraryItemId,
                    visual: item.visual?.type === "emoji" ? null : item.visual,
                  })
                }
              />
            </label>

            <label>
              Font Awesome icon
              <select
                value={item.icon ?? ""}
                onChange={(event) =>
                  updateItem(item.id, {
                    icon: event.target.value,
                    visualLibraryItemId: item.visual?.type === "fontawesome" ? "" : item.visualLibraryItemId,
                    visual: item.visual?.type === "fontawesome" ? null : item.visual,
                  })
                }
              >
                <option value="">Use emoji/image only</option>
                {iconOptions.map((icon) => (
                  <option key={`${title}-${item.id}-${icon.name}`} value={icon.name}>
                    {icon.label}
                  </option>
                ))}
              </select>
            </label>

            <button type="button" className="small-danger-button" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </section>
        ))}
      </div>
    </article>
  );
}
