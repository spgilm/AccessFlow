/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useState } from "react";

export default function TemplateManager({
  templates,
  selectedProfile,
  onSaveCurrentScheduleAsTemplate,
  onApplyTemplateToProfile,
  onDeleteTemplate,
}) {
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");

  function handleSaveTemplate(event) {
    event.preventDefault();

    const trimmedName = templateName.trim();
    if (!trimmedName || !selectedProfile) {
      return;
    }

    onSaveCurrentScheduleAsTemplate(trimmedName, templateDescription.trim());
    setTemplateName("");
    setTemplateDescription("");
  }

  return (
    <section className="panel template-panel" aria-labelledby="template-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Templates</p>
          <h2 id="template-heading">Reusable schedules</h2>
        </div>
      </div>

      <form className="template-save-form" onSubmit={handleSaveTemplate}>
        <label>
          Template name
          <input
            type="text"
            value={templateName}
            placeholder="Example: Morning Routine"
            onChange={(event) => setTemplateName(event.target.value)}
          />
        </label>

        <label>
          Description
          <input
            type="text"
            value={templateDescription}
            placeholder="Optional staff note"
            onChange={(event) => setTemplateDescription(event.target.value)}
          />
        </label>

        <button type="submit" disabled={!selectedProfile || !templateName.trim()}>
          Save current schedule as template
        </button>
      </form>

      {templates.length === 0 ? (
        <p className="field-help template-empty">
          No templates yet. Build a schedule and save it as a template.
        </p>
      ) : (
        <ol className="template-list">
          {templates.map((template) => (
            <li key={template.id} className="template-row">
              <div>
                <strong>{template.name}</strong>
                <p>{template.description || "No description"}</p>
                <span>{template.activities.length} activities</span>
              </div>

              <div className="row-actions">
                <button
                  type="button"
                  onClick={() => onApplyTemplateToProfile(template.id)}
                  disabled={!selectedProfile}
                >
                  Apply
                </button>
                <button
                  type="button"
                  className="small-danger-button"
                  onClick={() => onDeleteTemplate(template.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
