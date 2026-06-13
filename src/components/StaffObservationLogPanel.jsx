/**
 * StaffObservationLogPanel
 *
 * Quick staff observation/support pattern log.
 */
import { useState } from "react";

const helpOptions = [
  ["yes", "Yes"],
  ["somewhat", "Somewhat"],
  ["no", "No"],
  ["unknown", "Not sure"],
];

export default function StaffObservationLogPanel({ activities, onAddSupportObservation }) {
  const [form, setForm] = useState({
    activityId: "",
    whatHappened: "",
    studentCommunicated: "",
    supportOffered: "",
    didItHelp: "unknown",
    nextTime: "",
  });

  function updateField(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function submitObservation(event) {
    event.preventDefault();

    const activity = activities.find((item) => item.id === form.activityId) ?? null;

    onAddSupportObservation({
      ...form,
      activityLabel: activity?.label ?? "",
    });

    setForm({
      activityId: "",
      whatHappened: "",
      studentCommunicated: "",
      supportOffered: "",
      didItHelp: "unknown",
      nextTime: "",
    });
  }

  return (
    <section className="panel observation-log-panel" aria-labelledby="observation-log-heading">
      <div>
        <p className="eyebrow">Observation log</p>
        <h2 id="observation-log-heading">Quick support pattern note</h2>
        <p className="field-help">Fast event-based note: what happened, what was communicated, what helped.</p>
      </div>

      <form className="observation-form-grid" onSubmit={submitObservation}>
        <label>
          Activity
          <select value={form.activityId} onChange={(event) => updateField("activityId", event.target.value)}>
            <option value="">General / no activity</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>{activity.label}</option>
            ))}
          </select>
        </label>

        <label>
          What happened?
          <textarea rows="2" value={form.whatHappened} onChange={(event) => updateField("whatHappened", event.target.value)} />
        </label>

        <label>
          What did the student communicate?
          <textarea rows="2" value={form.studentCommunicated} onChange={(event) => updateField("studentCommunicated", event.target.value)} />
        </label>

        <label>
          What support was offered?
          <textarea rows="2" value={form.supportOffered} onChange={(event) => updateField("supportOffered", event.target.value)} />
        </label>

        <label>
          Did it help?
          <select value={form.didItHelp} onChange={(event) => updateField("didItHelp", event.target.value)}>
            {helpOptions.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>

        <label>
          What should we try next time?
          <textarea rows="2" value={form.nextTime} onChange={(event) => updateField("nextTime", event.target.value)} />
        </label>

        <button type="submit" className="primary-wide-button">Save observation</button>
      </form>
    </section>
  );
}
