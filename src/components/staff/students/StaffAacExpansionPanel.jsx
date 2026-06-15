/**
 * StaffAacExpansionPanel
 *
 * Staff-facing editor for AAC expansion boards. v46 allows staff to edit
 * the label, emoji fallback, and Font Awesome icon for existing items.
 */
import { useState } from "react";
import IconSymbol from "../../shared/IconSymbol.jsx";
import { getFlatIconLibrary } from "../../../data/iconLibrary.js";

const iconOptions = getFlatIconLibrary();

const groups = [
  ["coreWords", "Core words"],
  ["quickPhrases", "Quick phrases"],
  ["feelings", "Feelings"],
  ["socialScripts", "Social scripts"],
];

export default function StaffAacExpansionPanel({ aacExpansionSettings, visualLibrary = [], onUpdateAacExpansionSettings }) {
  const [drafts, setDrafts] = useState({});
  const [iconDrafts, setIconDrafts] = useState({});

  function updateSettings(patch) {
    onUpdateAacExpansionSettings({
      ...aacExpansionSettings,
      ...patch,
    });
  }

  function updateItem(groupKey, itemId, patch) {
    updateSettings({
      [groupKey]: (aacExpansionSettings?.[groupKey] ?? []).map((item) =>
        item.id === itemId ? { ...item, ...patch } : item
      ),
    });
  }

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

  function assignLibraryVisual(groupKey, itemId, visualLibraryItemId) {
    if (!visualLibraryItemId) {
      updateItem(groupKey, itemId, {
        visualLibraryItemId: "",
        visual: null,
        imageUrl: "",
      });
      return;
    }

    const libraryItem = visualLibrary.find((item) => item.id === visualLibraryItemId);
    updateItem(groupKey, itemId, visualPatchFromLibraryItem(libraryItem));
  }

  function addItem(groupKey) {
    const label = drafts[groupKey]?.trim();
    if (!label) return;

    updateSettings({
      [groupKey]: [
        ...(aacExpansionSettings?.[groupKey] ?? []),
        {
          id: `${groupKey}-${Date.now()}`,
          label,
          emoji: "⭐",
          icon: iconDrafts[groupKey] || "comment",
        },
      ],
    });

    setDrafts((current) => ({ ...current, [groupKey]: "" }));
    setIconDrafts((current) => ({ ...current, [groupKey]: "comment" }));
  }

  function removeItem(groupKey, itemId) {
    updateSettings({
      [groupKey]: (aacExpansionSettings?.[groupKey] ?? []).filter((item) => item.id !== itemId),
    });
  }

  return (
    <section className="panel staff-aac-expansion-panel" aria-labelledby="staff-aac-expansion-heading">
      <div>
        <p className="eyebrow">AAC expansion</p>
        <h2 id="staff-aac-expansion-heading">Core words, phrases, feelings, and scripts</h2>
        <p className="field-help">
          Edit labels and visual supports. Labels remain the communication message and read-aloud text.
        </p>
      </div>

      <div className="communication-settings-grid">
        {groups.map(([groupKey, title]) => (
          <article key={groupKey}>
            <h3>{title}</h3>

            <div className="compact-input-row aac-add-row">
              <input
                type="text"
                value={drafts[groupKey] ?? ""}
                onChange={(event) => setDrafts((current) => ({ ...current, [groupKey]: event.target.value }))}
                placeholder={`Add ${title.toLowerCase()}`}
              />
              <select
                value={iconDrafts[groupKey] ?? "comment"}
                onChange={(event) => setIconDrafts((current) => ({ ...current, [groupKey]: event.target.value }))}
                aria-label={`Icon for ${title}`}
              >
                {iconOptions.map((icon) => (
                  <option key={`${groupKey}-${icon.name}`} value={icon.name}>
                    {icon.label}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => addItem(groupKey)}>Add</button>
            </div>

            <div className="aac-editor-list">
              {(aacExpansionSettings?.[groupKey] ?? []).map((item) => (
                <article key={item.id} className="aac-editor-card">
                  <div className="aac-editor-preview">
                    <IconSymbol item={item} />
                    <strong>{item.label}</strong>
                  </div>

                  <label>
                    Label
                    <input
                      type="text"
                      value={item.label}
                      onChange={(event) => updateItem(groupKey, item.id, { label: event.target.value })}
                    />
                  </label>

                  <label>
                    Saved visual
                    <select
                      value={item.visualLibraryItemId ?? ""}
                      onChange={(event) => assignLibraryVisual(groupKey, item.id, event.target.value)}
                    >
                      <option value="">No saved visual</option>
                      {visualLibrary.map((visualItem) => (
                        <option key={`${groupKey}-${item.id}-${visualItem.id}`} value={visualItem.id}>
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
                            updateItem(groupKey, item.id, {
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
                            updateItem(groupKey, item.id, {
                              icon: event.target.value,
                              visualLibraryItemId: item.visual?.type === "fontawesome" ? "" : item.visualLibraryItemId,
                              visual: item.visual?.type === "fontawesome" ? null : item.visual,
                            })
                          }
                    >
                      <option value="">Use emoji only</option>
                      {iconOptions.map((icon) => (
                        <option key={`${groupKey}-${item.id}-${icon.name}`} value={icon.name}>
                          {icon.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button type="button" className="small-danger-button" onClick={() => removeItem(groupKey, item.id)}>
                    Remove
                  </button>
                </article>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
