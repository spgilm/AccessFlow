/**
 * Student-facing custom activity builder with speech input and student-created smaller steps.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useRef, useState } from "react";

function getSpeechRecognitionConstructor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export default function StudentMakeActivity({
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

  if (!canBuild || !canAddCustom) {
    return (
      <section className="panel focused-panel" aria-labelledby="make-disabled-heading">
        <div className="empty-visual" aria-hidden="true">🧭</div>
        <h2 id="make-disabled-heading">Staff makes new activities.</h2>
        <p className="field-help">Ask staff to add or change choices.</p>
      </section>
    );
  }

  return (
    <section className="panel focused-panel student-make-screen" aria-labelledby="student-make-heading">
      <div className="focus-header">
        <p className="eyebrow">Make</p>
        <h2 id="student-make-heading">Make my own activity</h2>
        <p>Create an activity and the smaller steps.</p>
      </div>

      <form className="student-step-builder" onSubmit={handleCustomSubmit}>
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
    </section>
  );
}
