/**
 * Staff regulation/support plan editor.
 */
const fields = [
  ["triggers", "Likely triggers"],
  ["earlySigns", "Early warning signs"],
  ["proactiveSupports", "Proactive supports"],
  ["calmingStrategies", "Calming strategies"],
  ["staffResponse", "Staff response"],
  ["recoverySteps", "Recovery / return steps"],
];

export default function RegulationPlanPanel({ regulationPlan, onUpdateRegulationPlan }) {
  function update(field, value) {
    onUpdateRegulationPlan({
      ...regulationPlan,
      [field]: value,
    });
  }

  return (
    <section className="panel regulation-plan-panel" aria-labelledby="regulation-plan-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Regulation</p>
          <h2 id="regulation-plan-heading">Support plan</h2>
          <p className="field-help">
            Practical support notes for transitions, distress, refusal, waiting, or sensory overload.
          </p>
        </div>
      </div>

      <div className="regulation-grid">
        {fields.map(([field, label]) => (
          <label key={field}>
            {label}
            <textarea
              rows="3"
              value={regulationPlan[field] ?? ""}
              onChange={(event) => update(field, event.target.value)}
            />
          </label>
        ))}
      </div>
    </section>
  );
}
