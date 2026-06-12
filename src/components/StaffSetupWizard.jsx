/**
 * Guided staff onboarding flow for creating a usable first schedule without exposing all advanced tools at once.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useState } from "react";

/**
 * StaffSetupWizard is a guided first-run flow for staff.
 *
 * It does not replace the full Staff tabs. Instead, it gives new users a linear path:
 * profile → display complexity → choices → schedule → test Student Mode.
 */
const starterChoices = [
  "Brush teeth",
  "Eat snack",
  "Take a break",
  "Choice time",
  "Clean up",
  "Go for a walk",
];

const complexityPresets = {
  simple: {
    label: "Simple",
    settings: {
      showChooseTab: true,
      showMakeTab: false,
      showChoiceBoardTab: true,
      showWords: true,
      showProgress: false,
      showStepNumbers: false,
      showPromptControls: false,
      showTimers: true,
      defaultStudentView: "today",
    },
  },
  standard: {
    label: "Standard",
    settings: {
      showChooseTab: true,
      showMakeTab: true,
      showChoiceBoardTab: true,
      showWords: true,
      showProgress: true,
      showStepNumbers: true,
      showPromptControls: true,
      showTimers: true,
      defaultStudentView: "today",
    },
  },
  advanced: {
    label: "Advanced",
    settings: {
      showChooseTab: true,
      showMakeTab: true,
      showChoiceBoardTab: true,
      showWords: true,
      showProgress: true,
      showStepNumbers: true,
      showPromptControls: true,
      showTimers: true,
      defaultStudentView: "choose",
    },
  },
};

export default function StaffSetupWizard({
  selectedProfile,
  activityBank,
  activities,
  onUpdateProfile,
  onAddChoiceToBank,
  onAddBankChoiceToSchedule,
  onOpenStudentMode,
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [customChoice, setCustomChoice] = useState("");

  const steps = ["Profile", "Display", "Choices", "Schedule", "Test"];
  const currentStep = steps[stepIndex];

  function applyComplexity(presetKey) {
    if (!selectedProfile) {
      return;
    }

    onUpdateProfile(selectedProfile.id, {
      displaySettings: {
        ...(selectedProfile.displaySettings ?? {}),
        ...complexityPresets[presetKey].settings,
      },
    });
  }

  function addCustomChoice(event) {
    event.preventDefault();
    const trimmed = customChoice.trim();

    if (!trimmed) {
      return;
    }

    onAddChoiceToBank(trimmed);
    setCustomChoice("");
  }

  return (
    <section className="panel setup-wizard-panel" aria-labelledby="setup-wizard-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Setup wizard</p>
          <h2 id="setup-wizard-heading">Set up AccessFlow</h2>
        </div>
      </div>

      <ol className="setup-step-list" aria-label="Setup steps">
        {steps.map((step, index) => (
          <li key={step} className={index === stepIndex ? "is-active" : index < stepIndex ? "is-done" : ""}>
            {index + 1}. {step}
          </li>
        ))}
      </ol>

      {currentStep === "Profile" ? (
        <div className="setup-card">
          <h3>1. Choose the student/client</h3>
          <p>Current profile: <strong>{selectedProfile?.name ?? "No profile"}</strong></p>
          <p className="field-help">Use the Students tab if you need to add or rename a profile.</p>
        </div>
      ) : null}

      {currentStep === "Display" ? (
        <div className="setup-card">
          <h3>2. Pick display complexity</h3>
          <div className="setup-preset-grid">
            {Object.entries(complexityPresets).map(([key, preset]) => (
              <button key={key} type="button" onClick={() => applyComplexity(key)}>
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {currentStep === "Choices" ? (
        <div className="setup-card">
          <h3>3. Add first choices</h3>
          <div className="setup-choice-grid">
            {starterChoices.map((choice) => (
              <button key={choice} type="button" onClick={() => onAddChoiceToBank(choice)}>
                {choice}
              </button>
            ))}
          </div>

          <form className="inline-control-row" onSubmit={addCustomChoice}>
            <input
              type="text"
              value={customChoice}
              placeholder="Custom choice"
              onChange={(event) => setCustomChoice(event.target.value)}
            />
            <button type="submit">Add</button>
          </form>

          <p className="field-help">{activityBank.length} choices currently saved.</p>
        </div>
      ) : null}

      {currentStep === "Schedule" ? (
        <div className="setup-card">
          <h3>4. Build today’s schedule</h3>
          {activityBank.length === 0 ? (
            <p className="field-help">Add choices first, then place them on the schedule.</p>
          ) : (
            <div className="setup-choice-grid">
              {activityBank.slice(0, 8).map((choice) => (
                <button key={choice.id} type="button" onClick={() => onAddBankChoiceToSchedule(choice.id)}>
                  Add {choice.label}
                </button>
              ))}
            </div>
          )}
          <p className="field-help">{activities.length} activities are currently on the selected date.</p>
        </div>
      ) : null}

      {currentStep === "Test" ? (
        <div className="setup-card">
          <h3>5. Test Student Mode</h3>
          <p>Open Student Mode and check whether the screen is clear enough for the student/client.</p>
          <button type="button" className="primary-wide-button" onClick={onOpenStudentMode}>
            Open Student Mode
          </button>
        </div>
      ) : null}

      <div className="setup-nav">
        <button type="button" className="secondary-button" onClick={() => setStepIndex((current) => Math.max(0, current - 1))} disabled={stepIndex === 0}>
          Back
        </button>
        <button type="button" className="secondary-button" onClick={() => setStepIndex((current) => Math.min(steps.length - 1, current + 1))} disabled={stepIndex === steps.length - 1}>
          Next
        </button>
      </div>
    </section>
  );
}
