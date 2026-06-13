/**
 * Print-friendly visual schedule helper.
 */
import VisualSupport from "./VisualSupport.jsx";

export default function PrintSchedulePanel({ activities }) {
  return (
    <section className="panel print-schedule-panel" aria-labelledby="print-schedule-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Print</p>
          <h2 id="print-schedule-heading">Print visual schedule</h2>
          <p className="field-help">
            Opens the browser print dialog. Print styles simplify the schedule.
          </p>
        </div>
        <button type="button" className="secondary-button" onClick={() => window.print()}>
          Print schedule
        </button>
      </div>

      <div className="print-schedule-preview">
        {activities.map((activity, index) => (
          <article key={activity.id} className="print-schedule-card">
            <span>{index + 1}</span>
            <VisualSupport visual={activity.visual ?? activity.emoji ?? "⭐"} />
            <strong>{activity.label}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
