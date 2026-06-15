import IconSymbol from "../../shared/IconSymbol.jsx";

/**
 * StudentVocationalTaskPanel
 *
 * Student-facing vocational task mode for work/job-coach routines.
 */
export default function StudentVocationalTaskPanel({ lifeSkillsSettings, onSupportRequest }) {
  const actions = lifeSkillsSettings?.vocationalActions ?? [];

  function recordAction(item) {
    onSupportRequest?.({
      type: "vocational-task",
      label: `Vocational task: ${item.label}`,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel life-skills-panel vocational-task-panel" aria-labelledby="vocational-task-heading">
      <div>
        <p className="eyebrow">Work</p>
        <h3 id="vocational-task-heading">Work task mode</h3>
        <p className="field-help">Use these buttons during job, classroom work, chores, or supported employment routines.</p>
      </div>

      <div className="support-choice-grid">
        {actions.map((item) => (
          <button key={item.id} type="button" className="support-choice-button" onClick={() => recordAction(item)}>
            <IconSymbol item={item} />
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
