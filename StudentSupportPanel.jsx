/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useMemo, useState } from "react";
import EmojiPickerButton from "./EmojiPickerButton.jsx";
import { createId } from "../utils/formatters.js";
import { moveItemById } from "../utils/activityHelpers.js";

export default function StaffChoiceBankPanel({
  selectedProfile,
  activityBank,
  onAddChoiceToBank,
  onUpdateBankChoice,
  onAddBankChoiceToSchedule,
  onDeleteBankChoice,
}) {
  const [taskText, setTaskText] = useState("");
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const hasChoices = activityBank.length > 0;
  const selectedChoice = useMemo(
    () => activityBank.find((choice) => choice.id === selectedChoiceId) ?? null,
    [activityBank, selectedChoiceId]
  );

  function handleSubmit(event) {
    event.preventDefault();

    const trimmed = taskText.trim();
    if (!trimmed) {
      return;
    }

    onAddChoiceToBank(trimmed);
    setTaskText("");
  }

  function updateStep(choice, stepId, patch) {
    onUpdateBankChoice(choice.id, {
      steps: choice.steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              ...patch,
            }
          : step
      ),
    });
  }

  function addStep(choice) {
    onUpdateBankChoice(choice.id, {
      completed: false,
      steps: [
        ...choice.steps,
        {
          id: createId("bank-step"),
          label: "New step",
          visual: {
            type: "emoji",
            value: "⭐",
            altText: "New step visual",
          },
          completed: false,
        },
      ],
    });
  }

  function deleteStep(choice, stepId) {
    onUpdateBankChoice(choice.id, {
      completed: false,
      steps: choice.steps.filter((step) => step.id !== stepId),
    });
  }

  function moveStep(choice, stepId, direction) {
    onUpdateBankChoice(choice.id, {
      steps: moveItemById(choice.steps, stepId, direction),
    });
  }

  return (
    <section className="panel staff-bank-panel simple-bank-panel" aria-labelledby="staff-bank-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Student schedule choices</p>
          <h2 id="staff-bank-heading">Activities the student can add</h2>
        </div>
      </div>

      <div className="bank-setup-grid">
        <form className="bank-create-card" onSubmit={handleSubmit}>
          <div className="bank-step-number" aria-hidden="true">1</div>
          <div>
            <h3>Make a choice card</h3>
            <p>Create an approved activity the student can add to their schedule.</p>
          </div>

          <label>
            Activity name
            <div className="inline-control-row">
              <input
                type="text"
                value={taskText}
                placeholder="Example: eat an orange"
                onChange={(event) => setTaskText(event.target.value)}
              />
              <button type="submit">Save schedule choice</button>
            </div>
          </label>
        </form>

        <div className="bank-create-card">
          <div className="bank-step-number" aria-hidden="true">2</div>
          <div>
            <h3>Edit the steps</h3>
            <p>Choose a card below. Adjust the smaller steps before the student uses it.</p>
          </div>
        </div>
      </div>

      {!hasChoices ? (
        <div className="empty-bank-message">
          <div className="empty-visual" aria-hidden="true">➕</div>
          <p>No schedule choices yet.</p>
          <p className="field-help">Add one activity above. Then the student can add it from Student Mode.</p>
        </div>
      ) : (
        <div className="bank-choice-list simplified-bank-list" aria-label="Saved student choices">
          {activityBank.map((choice) => (
            <article
              key={choice.id}
              className={`bank-choice-card simplified-bank-card ${
                selectedChoiceId === choice.id ? "is-selected" : ""
              }`}
            >
              <div className="bank-choice-main">
                <EmojiPickerButton
                  visual={choice.visual ?? choice.emoji}
                  label={choice.label}
                  className="bank-choice-visual-picker"
                  onChange={(visual) => onUpdateBankChoice(choice.id, { visual })}
                />
                <div>
                  <h3>{choice.label}</h3>
                  <span>{choice.steps.length} steps saved</span>
                </div>
              </div>

              <div className="row-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setSelectedChoiceId(choice.id)}
                >
                  Edit steps
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => onAddBankChoiceToSchedule(choice.id)}
                >
                  Add to today’s schedule
                </button>
                <button
                  type="button"
                  className="small-danger-button"
                  onClick={() => {
                    if (selectedChoiceId === choice.id) {
                      setSelectedChoiceId(null);
                    }

                    onDeleteBankChoice(choice.id);
                  }}
                >
                  Remove choice
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedChoice ? (
        <div className="bank-editor-card" aria-labelledby="bank-editor-heading">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Choice editor</p>
              <h3 id="bank-editor-heading">Edit {selectedChoice.label}</h3>
            </div>
            <button
              type="button"
              className="secondary-button"
              onClick={() => setSelectedChoiceId(null)}
            >
              Close editor
            </button>
          </div>

          <div className="editor-grid">
            <label>
              Choice name
              <input
                type="text"
                value={selectedChoice.label}
                onChange={(event) =>
                  onUpdateBankChoice(selectedChoice.id, {
                    label: event.target.value,
                    sourceText: event.target.value,
                    visual: {
                      ...selectedChoice.visual,
                      altText: `${event.target.value} visual`,
                    },
                  })
                }
              />
            </label>

            <label>
              Category
              <select
                value={selectedChoice.category ?? "General"}
                onChange={(event) =>
                  onUpdateBankChoice(selectedChoice.id, {
                    category: event.target.value,
                  })
                }
              >
                <option value="General">General</option>
                <option value="Morning">Morning</option>
                <option value="Hygiene">Hygiene</option>
                <option value="Food">Food</option>
                <option value="School">School</option>
                <option value="Work">Work</option>
                <option value="Leisure">Leisure</option>
                <option value="Breaks">Breaks</option>
                <option value="Chores">Chores</option>
                <option value="Community">Community</option>
              </select>
            </label>

            <label>
              Timer minutes
              <input
                type="number"
                min="0"
                value={selectedChoice.timerMinutes ?? ""}
                placeholder="Optional"
                onChange={(event) =>
                  onUpdateBankChoice(selectedChoice.id, {
                    timerMinutes: event.target.value ? Number(event.target.value) : "",
                  })
                }
              />
            </label>

            <label className="full-width">
              Staff note
              <textarea
                rows="2"
                value={selectedChoice.summary}
                onChange={(event) =>
                  onUpdateBankChoice(selectedChoice.id, {
                    summary: event.target.value,
                  })
                }
              />
            </label>
          </div>

          <div className="editor-subheader">
            <div>
              <p className="eyebrow">Smaller steps</p>
              <h3>Steps the student will see</h3>
            </div>
            <button
              type="button"
              className="secondary-button"
              onClick={() => addStep(selectedChoice)}
            >
              Add step
            </button>
          </div>

          {selectedChoice.steps.length === 0 ? (
            <p className="field-help">Add at least one step before the student uses this choice.</p>
          ) : (
            <ol className="staff-step-editor-list">
              {selectedChoice.steps.map((step, index) => (
                <li key={step.id} className="staff-step-editor-row">
                  <div className="step-edit-grid bank-step-edit-grid">
                    <EmojiPickerButton
                      visual={step.visual ?? step.emoji}
                      label={step.label}
                      className="staff-row-visual-picker"
                      onChange={(visual) => updateStep(selectedChoice, step.id, { visual })}
                    />
                    <label>
                      Step {index + 1}
                      <input
                        type="text"
                        value={step.label}
                        onChange={(event) =>
                          updateStep(selectedChoice, step.id, {
                            label: event.target.value,
                            visual: {
                              ...step.visual,
                              altText: `${event.target.value} visual`,
                            },
                          })
                        }
                      />
                    </label>
                  </div>

                  <div className="row-actions step-actions" aria-label={`Actions for step ${index + 1}`}>
                    <button
                      type="button"
                      onClick={() => moveStep(selectedChoice, step.id, "up")}
                      disabled={index === 0}
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      onClick={() => moveStep(selectedChoice, step.id, "down")}
                      disabled={index === selectedChoice.steps.length - 1}
                    >
                      Down
                    </button>
                    <button
                      type="button"
                      className="small-danger-button"
                      onClick={() => deleteStep(selectedChoice, step.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      ) : null}
    </section>
  );
}
