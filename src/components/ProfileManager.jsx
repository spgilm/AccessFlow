/**
 * Staff-facing student/client profile manager, independence settings, and display settings editor.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useState } from "react";
import { getIndependenceSettings } from "../data/independenceSettings.js";
import { getDisplaySettings } from "../data/displaySettings.js";

export default function ProfileManager({
  profiles,
  selectedProfile,
  selectedProfileId,
  onSelectProfile,
  onAddProfile,
  onUpdateProfile,
  onDeleteProfile,
}) {
  const [newProfileName, setNewProfileName] = useState("");
  const independenceSettings = getIndependenceSettings(selectedProfile);
  const displaySettings = getDisplaySettings(selectedProfile);

  function handleAddProfile(event) {
    event.preventDefault();

    const trimmed = newProfileName.trim();
    if (!trimmed) {
      return;
    }

    onAddProfile(trimmed);
    setNewProfileName("");
  }

  function updateIndependenceSetting(settingName, value) {
    if (!selectedProfile) {
      return;
    }

    onUpdateProfile(selectedProfile.id, {
      independenceSettings: {
        ...independenceSettings,
        [settingName]: value,
      },
    });
  }

  function updateDisplaySetting(settingName, value) {
    if (!selectedProfile) {
      return;
    }

    onUpdateProfile(selectedProfile.id, {
      displaySettings: {
        ...displaySettings,
        [settingName]: value,
      },
    });
  }

  return (
    <section className="panel profile-panel" aria-labelledby="profile-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Profiles</p>
          <h2 id="profile-heading">Student / client</h2>
        </div>
      </div>

      <div className="profile-layout">
        <label>
          Active profile
          <select
            value={selectedProfileId ?? ""}
            onChange={(event) => onSelectProfile(event.target.value)}
          >
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
        </label>

        <form className="compact-form" onSubmit={handleAddProfile}>
          <label>
            Add profile
            <div className="inline-control-row">
              <input
                type="text"
                value={newProfileName}
                placeholder="Student name"
                onChange={(event) => setNewProfileName(event.target.value)}
              />
              <button type="submit">Add</button>
            </div>
          </label>
        </form>
      </div>

      {selectedProfile ? (
        <div className="profile-editor">
          <label>
            Profile name
            <input
              type="text"
              value={selectedProfile.name}
              onChange={(event) =>
                onUpdateProfile(selectedProfile.id, { name: event.target.value })
              }
            />
          </label>

          <label>
            Support notes
            <textarea
              value={selectedProfile.notes ?? ""}
              rows="3"
              placeholder="Access needs, prompts, reinforcement preferences, sensory notes, etc."
              onChange={(event) =>
                onUpdateProfile(selectedProfile.id, { notes: event.target.value })
              }
            />
          </label>

          <fieldset className="independence-settings">
            <legend>Student independence settings</legend>
            <p className="field-help">
              These options decide how much the student/client can plan independently in Student Mode.
            </p>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={independenceSettings.studentCanBuildSchedule}
                onChange={(event) =>
                  updateIndependenceSetting("studentCanBuildSchedule", event.target.checked)
                }
              />
              <span>
                <strong>Student can build schedule</strong>
                <small>Add approved activities from Plan My Day.</small>
              </span>
            </label>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={independenceSettings.studentCanReorderSchedule}
                onChange={(event) =>
                  updateIndependenceSetting("studentCanReorderSchedule", event.target.checked)
                }
              />
              <span>
                <strong>Student can reorder schedule</strong>
                <small>Move activities up or down in their own plan.</small>
              </span>
            </label>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={independenceSettings.studentCanRemoveActivities}
                onChange={(event) =>
                  updateIndependenceSetting("studentCanRemoveActivities", event.target.checked)
                }
              />
              <span>
                <strong>Student can remove activities</strong>
                <small>Remove an activity they added by mistake or no longer need.</small>
              </span>
            </label>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={independenceSettings.studentCanAddCustomActivities}
                onChange={(event) =>
                  updateIndependenceSetting("studentCanAddCustomActivities", event.target.checked)
                }
              />
              <span>
                <strong>Student can add custom activity</strong>
                <small>Type or dictate an activity that staff can refine later.</small>
              </span>
            </label>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={independenceSettings.studentCanClearSchedule}
                onChange={(event) =>
                  updateIndependenceSetting("studentCanClearSchedule", event.target.checked)
                }
              />
              <span>
                <strong>Student can start schedule over</strong>
                <small>Allows clearing the current schedule from Student Mode.</small>
              </span>
            </label>
          </fieldset>

          <fieldset className="independence-settings display-settings">
            <legend>Student display settings</legend>
            <p className="field-help">
              These options control how much visual complexity the student/client sees.
            </p>

            <label>
              Default student screen
              <select
                value={displaySettings.defaultStudentView}
                onChange={(event) => updateDisplaySetting("defaultStudentView", event.target.value)}
              >
                <option value="today">Today</option>
                <option value="choose">Choose</option>
                <option value="make">Make</option>
                <option value="board">Choice Board</option>
              </select>
            </label>

            {[
              ["showChooseTab", "Show Choose tab"],
              ["showMakeTab", "Show Make tab"],
              ["showChoiceBoardTab", "Show Choice Board tab"],
              ["showWords", "Show words with visuals"],
              ["showProgress", "Show progress bar"],
              ["showStepNumbers", "Show step numbers"],
              ["showPromptControls", "Show support-level controls"],
              ["showTimers", "Show timers"],
            ].map(([settingName, label]) => (
              <label key={settingName} className="checkbox-row">
                <input
                  type="checkbox"
                  checked={displaySettings[settingName]}
                  onChange={(event) => updateDisplaySetting(settingName, event.target.checked)}
                />
                <span>
                  <strong>{label}</strong>
                </span>
              </label>
            ))}
          </fieldset>

          <div className="profile-meta">
            <span>{selectedProfile.activities.length} activities in current schedule</span>
            <button
              type="button"
              className="small-danger-button"
              onClick={() => onDeleteProfile(selectedProfile.id)}
              disabled={profiles.length <= 1}
            >
              Delete profile
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
