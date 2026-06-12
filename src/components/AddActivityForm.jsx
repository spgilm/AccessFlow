/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useRef, useState } from "react";

const examplePrompts = [
  "brush teeth",
  "wash hands",
  "get dressed",
  "pack backpack",
  "reading group",
  "speech therapy",
];

function getSpeechRecognitionConstructor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export default function AddActivityForm({ onAddActivity }) {
  const [taskText, setTaskText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmed = taskText.trim();
    if (!trimmed) {
      setError("Enter a task first.");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      await onAddActivity(trimmed);
      setTaskText("");
    } catch (generationError) {
      setError(generationError.message || "Could not create activity.");
    } finally {
      setIsGenerating(false);
    }
  }

  function useExample(example) {
    setTaskText(example);
    setError("");
  }

  function handleDictate() {
    const SpeechRecognition = getSpeechRecognitionConstructor();

    if (!SpeechRecognition) {
      setError("Speech input is not supported in this browser. Type the task instead.");
      return;
    }

    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setError("");
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) {
        setTaskText(transcript);
      }
    };

    recognition.onerror = () => {
      setError("Speech input did not work. Type the task or try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
  }

  return (
    <section className="panel add-panel" aria-labelledby="add-activity-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Create</p>
          <h2 id="add-activity-heading">Add one-time schedule item</h2>
        </div>
      </div>

      <form className="add-form" onSubmit={handleSubmit}>
        <label htmlFor="taskText">General task</label>
        <div className="input-row">
          <input
            id="taskText"
            name="taskText"
            type="text"
            value={taskText}
            placeholder="Example: brush teeth"
            autoComplete="off"
            onChange={(event) => setTaskText(event.target.value)}
          />
          <button
            type="button"
            className="dictate-button mic-button"
            onClick={handleDictate}
            aria-label={isListening ? "Stop dictation" : "Dictate task"}
            title={isListening ? "Stop dictation" : "Dictate task"}
            aria-pressed={isListening}
          >
            {isListening ? "■" : "🎙️"}
          </button>
          <button type="submit" disabled={isGenerating}>
            {isGenerating ? "Creating..." : "Add"}
          </button>
        </div>
        <p className="field-help">
          Type or dictate a general task. This adds an activity to today’s schedule only. Use Student Choices above to make reusable choice cards.
        </p>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      <div className="prompt-chips" aria-label="Example task prompts">
        {examplePrompts.map((example) => (
          <button
            className="chip"
            key={example}
            type="button"
            onClick={() => useExample(example)}
          >
            {example}
          </button>
        ))}
      </div>
    </section>
  );
}
