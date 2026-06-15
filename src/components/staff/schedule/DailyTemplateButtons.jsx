/**
 * DailyTemplateButtons provides one-tap schedule starters.
 *
 * These are deliberately simple, predictable examples. Staff can apply one template to
 * the selected date and then edit the resulting activities as needed.
 */
const dailyTemplates = [
  {
    id: "morning",
    label: "Morning Routine",
    tasks: ["Brush teeth", "Get dressed", "Eat breakfast", "Pack bag"],
  },
  {
    id: "school",
    label: "School Day",
    tasks: ["Morning meeting", "Reading", "Snack", "Math", "Choice time"],
  },
  {
    id: "vocational",
    label: "Vocational Day",
    tasks: ["Clock in", "Check task list", "Work task", "Break", "Clean up"],
  },
  {
    id: "community",
    label: "Community Trip",
    tasks: ["Get ready", "Ride bus", "Community activity", "Lunch", "Return"],
  },
  {
    id: "evening",
    label: "Evening Routine",
    tasks: ["Dinner", "Shower", "Pajamas", "Brush teeth", "Relax"],
  },
];

export default function DailyTemplateButtons({ onApplyDailyTemplate }) {
  return (
    <section className="panel daily-template-panel" aria-labelledby="daily-template-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Daily templates</p>
          <h2 id="daily-template-heading">Start with a routine</h2>
        </div>
      </div>

      <div className="daily-template-grid">
        {dailyTemplates.map((template) => (
          <button
            key={template.id}
            type="button"
            className="daily-template-button"
            onClick={() => onApplyDailyTemplate(template)}
          >
            <strong>{template.label}</strong>
            <span>{template.tasks.length} activities</span>
          </button>
        ))}
      </div>
    </section>
  );
}
