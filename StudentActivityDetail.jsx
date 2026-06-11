import { useState } from "react";

const examplePrompts = [
  "brush teeth",
  "wash hands",
  "get dressed",
  "pack backpack",
  "reading group",
  "speech therapy",
];

export default function AddActivityForm({ onAddActivity }) {
  const [taskText, setTaskText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <section className="panel add-panel" aria-labelledby="add-activity-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Create</p>
          <h2 id="add-activity-heading">Add a visual activity</h2>
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
          <button type="submit" disabled={isGenerating}>
            {isGenerating ? "Creating..." : "Add"}
          </button>
        </div>
        <p className="field-help">
          Local templates create the activity label, emoji, and steps. Edit the result below.
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
