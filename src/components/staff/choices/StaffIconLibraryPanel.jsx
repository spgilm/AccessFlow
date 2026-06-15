/**
 * StaffIconLibraryPanel
 *
 * Curated Font Awesome Free icon picker. Staff can add selected icons to the
 * profile Visual Library. Student labels are still required and remain the
 * read-aloud/screen-reader/event-log text.
 */
import { useMemo, useState } from "react";
import IconSymbol from "../../shared/IconSymbol.jsx";
import { curatedIconLibrary } from "../../../data/iconLibrary.js";
import { createFontAwesomeVisual } from "../../../services/imageProvider.js";

export default function StaffIconLibraryPanel({ onAddVisualLibraryItem }) {
  const [category, setCategory] = useState(curatedIconLibrary[0]?.category ?? "Help / support");
  const [search, setSearch] = useState("");

  const categories = curatedIconLibrary.map((group) => group.category);

  const filteredIcons = useMemo(() => {
    const group = curatedIconLibrary.find((item) => item.category === category) ?? curatedIconLibrary[0];
    const icons = group?.icons ?? [];
    const query = search.trim().toLowerCase();

    if (!query) {
      return icons;
    }

    return icons.filter((icon) =>
      [icon.name, icon.label, icon.recommendedUse].some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }, [category, search]);

  function addIcon(icon) {
    onAddVisualLibraryItem({
      label: icon.label,
      category: category.includes("/") ? category.split("/")[0].trim() : category,
      visual: createFontAwesomeVisual(icon.name, `${icon.label} icon`),
    });
  }

  return (
    <section className="panel staff-icon-library-panel" aria-labelledby="staff-icon-library-heading">
      <div>
        <p className="eyebrow">Icon library</p>
        <h2 id="staff-icon-library-heading">Font Awesome visual symbols</h2>
        <p className="field-help">
          Add curated Font Awesome Free icons to this profile’s Visual Library. Labels stay visible and remain the communication message.
        </p>
      </div>

      <div className="icon-library-toolbar">
        <label>
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          Search icons
          <input
            type="search"
            value={search}
            placeholder="help, quiet, bathroom..."
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </div>

      <div className="icon-library-grid">
        {filteredIcons.map((icon) => (
          <article key={icon.name} className="icon-library-card">
            <div className="icon-library-preview" aria-hidden="true">
              <IconSymbol icon={icon.name} label={icon.label} />
            </div>
            <h3>{icon.label}</h3>
            <p>{icon.recommendedUse}</p>
            <code>{icon.name}</code>
            <button type="button" className="secondary-button" onClick={() => addIcon(icon)}>
              Add to Visual Library
            </button>
          </article>
        ))}
      </div>

      {filteredIcons.length === 0 ? <p className="field-help">No icons match that search.</p> : null}
    </section>
  );
}
