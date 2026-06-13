/**
 * Profile/routine template shortcuts.
 */
export default function RoutineTemplatePanel({
  onApplyDailyTemplate,
  onApplyCurrentScheduleToTomorrow,
  onApplyCurrentScheduleToWeek,
}) {
  const routines = [
    {
      id: "morning",
      label: "Morning routine",
      tasks: ["Bathroom", "Brush teeth", "Get dressed", "Breakfast", "Pack bag"],
    },
    {
      id: "school",
      label: "School routine",
      tasks: ["Morning meeting", "Reading", "Snack", "Math", "Choice time"],
    },
    {
      id: "work",
      label: "Work routine",
      tasks: ["Clock in", "Check task list", "Work task", "Break", "Clean up"],
    },
    {
      id: "community",
      label: "Community trip",
      tasks: ["Get ready", "Ride", "Community activity", "Lunch", "Return"],
    },
    {
      id: "evening",
      label: "Evening routine",
      tasks: ["Dinner", "Shower", "Pajamas", "Brush teeth", "Relax"],
    },
  ];

  return (
    <section className="panel routine-template-panel" aria-labelledby="routine-template-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Routine templates</p>
          <h2 id="routine-template-heading">Build common routines</h2>
          <p className="field-help">
            Apply profile-friendly routines, or copy the current schedule forward.
          </p>
        </div>
      </div>

      <div className="routine-template-grid">
        {routines.map((routine) => (
          <button
            key={routine.id}
            type="button"
            className="daily-template-button"
            onClick={() => onApplyDailyTemplate(routine)}
          >
            <strong>{routine.label}</strong>
            <span>{routine.tasks.length} activities</span>
          </button>
        ))}
      </div>

      <div className="routine-copy-actions">
        <button type="button" className="secondary-button" onClick={onApplyCurrentScheduleToTomorrow}>
          Copy current schedule to tomorrow
        </button>
        <button type="button" className="secondary-button" onClick={onApplyCurrentScheduleToWeek}>
          Copy current schedule to weekdays
        </button>
      </div>
    </section>
  );
}
