import { useRef, useState } from "react";
import VisualSupport from "./VisualSupport.jsx";

function getSpeechRecognitionConstructor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export default function StudentScheduleBuilder({
  profile,
  libraryItems,
  independenceSettings,
  onAddActivity,
}) {
  const [customTask, setCustomTask] = useState("");
  const [customSteps, setCustomSteps] = useState(["", ""]);
  const [dictationError, setDictationError] = useState("");
  const [listeningTarget, setListeningTarget] = useState(null);
  const recognitionRef = useRef(null);

  const canBuild = independenceSettings.studentCanBuildSchedule;
  const canAddCustom = independenceSettings.studentCanAddCustomActivities;
  const hasChoices = libraryItems.length > 0;

  function updateCustomStep(index, value) {
    setCustomSteps((currentSteps) =>
      currentSteps.map((step, stepIndex) => (stepIndex === index ? value : step))
    );
  }

  function addCustomStep() {
    setCustomSteps((currentSteps) => [...currentSteps, ""]);
  }

  function removeCustomStep(index) {
    setCustomSteps((currentSteps) =>
      currentSteps.filter((_, stepIndex) => stepIndex !== index)
    );
  }

  function applyTranscript(target, transcript) {
    if (!transcript) {
      return;
    }

    if (target === "task") {
      setCustomTask(transcript);
      return;
    }

    if (target.startsWith("step-")) {
      const stepIndex = Number(target.replace("step-", ""));

      if (Number.isFinite(stepIndex)) {
        updateCustomStep(stepIndex, transcript);
      }
    }
  }

  function handleDictate(target) {
    const SpeechRecognition = getSpeechRecognitionConstructor();

    if (!SpeechRecognition) {
      setDictationError("Speech input is not supported in this browser. Type the words instead.");
      return;
    }

    if (recognitionRef.current && listeningTarget === target) {
      recognitionRef.current.stop();
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setDictationError("");
      setListeningTarget(target);
    };

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      applyTranscript(target, transcript);
    };

    recognition.onerror = () => {
      setDictationError("Speech input did not work. Type the words or try again.");
    };

    recognition.onend = () => {
      setListeningTarget(null);
      recognitionRef.current = null;
    };

    recognition.start();
  }

  function handleCustomSubmit(event) {
    event.preventDefault();

    const trimmed = customTask.trim();
    const stepLabels = customSteps.map((step) => step.trim()).filter(Boolean);

    if (!trimmed) {
      return;
    }

    onAddActivity({
      type: "custom",
      taskText: trimmed,
      stepLabels,
    });
    setCustomTask("");
    setCustomSteps(["", ""]);
    setDictationError("");
  }

  if (!canBuild) {
    return (
      <section className="panel student-builder-panel simple-student-panel" aria-labelledby="builder-disabled-heading">
        <div className="empty-visual" aria-hidden="true">
          🧭
        </div>
        <h2 id="builder-disabled-heading">Staff made this schedule.</h2>
        <p>Ask staff to change the choices.</p>
      </section>
    );
  }

  return (
    <section className="panel student-builder-panel simple-student-panel" aria-labelledby="student-builder-heading">
      <div className="simple-section-title">
        <p className="eyebrow">My choices</p>
        <h2 id="student-builder-heading">Choose an activity</h2>
      </div>

      {!hasChoices ? (
        <div className="empty-bank-message student-empty-bank">
          <div className="empty-visual" aria-hidden="true">➕</div>
          <p>No choices yet.</p>
          <p className="field-help">
            Staff can add choices.
          </p>
        </div>
      ) : (
        <div className="library-grid simplified-choice-grid">
          {libraryItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="library-card simplified-choice-card"
              onClick={() => onAddActivity({ type: "bank", choiceId: item.id })}
              aria-label={`Add ${item.label} to schedule`}
            >
              <VisualSupport
                visual={item.visual ?? item.emoji}
                className="library-visual simplified-choice-visual"
              />
              <span className="library-label">{item.label}</span>
              <span className="library-step-count">Add</span>
            </button>
          ))}
        </div>
      )}

      {canAddCustom ? (
        <form className="student-custom-form simplified-custom-form student-step-builder" onSubmit={handleCustomSubmit}>
          <div className="simple-section-title">
            <p className="eyebrow">Make my own</p>
            <h2>Add an activity and steps</h2>
          </div>

          <label>
            Activity
            <div className="speech-input-row">
              <input
                type="text"
                value={customTask}
                placeholder="Example: make a snack"
                onChange={(event) => setCustomTask(event.target.value)}
              />
              <button
                type="button"
                className="dictate-button mic-button"
                onClick={() => handleDictate("task")}
                aria-label={listeningTarget === "task" ? "Stop dictating activity" : "Dictate activity"}
                title={listeningTarget === "task" ? "Stop dictating activity" : "Dictate activity"}
                aria-pressed={listeningTarget === "task"}
              >
                {listeningTarget === "task" ? "■" : "🎙️"}
              </button>
            </div>
          </label>

          <div className="student-made-steps" aria-label="Student-created smaller steps">
            <div className="section-heading-row compact-heading-row">
              <h3>Smaller steps</h3>
              <button type="button" className="secondary-button" onClick={addCustomStep}>
                Add step
              </button>
            </div>

            {customSteps.map((step, index) => {
              const target = `step-${index}`;

              return (
                <div key={`custom-step-${index}`} className="student-made-step-row">
                  <span className="step-number">{index + 1}</span>
                  <input
                    type="text"
                    value={step}
                    placeholder={`Step ${index + 1}`}
                    onChange={(event) => updateCustomStep(index, event.target.value)}
                  />
                  <button
                    type="button"
                    className="dictate-button mic-button"
                    onClick={() => handleDictate(target)}
                    aria-label={listeningTarget === target ? `Stop dictating step ${index + 1}` : `Dictate step ${index + 1}`}
                    title={listeningTarget === target ? `Stop dictating step ${index + 1}` : `Dictate step ${index + 1}`}
                    aria-pressed={listeningTarget === target}
                  >
                    {listeningTarget === target ? "■" : "🎙️"}
                  </button>
                  {customSteps.length > 1 ? (
                    <button
                      type="button"
                      className="small-danger-button"
                      onClick={() => removeCustomStep(index)}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>

          {dictationError ? (
            <p className="form-error" role="alert">
              {dictationError}
            </p>
          ) : null}

          <button type="submit" className="primary-wide-button">
            Add to my schedule
          </button>
          <p className="field-help">
            Staff can review this later and save it to Student Choices.
          </p>
        </form>
      ) : null}
    </section>
  );
}
