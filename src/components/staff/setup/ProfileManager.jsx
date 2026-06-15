/**
 * Staff-facing student/client profile manager, independence settings, and display settings editor.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useState } from "react";
import { getIndependenceSettings } from "../../../data/independenceSettings.js";
import { getDisplaySettings, studentNavigationPresets } from "../../../data/displaySettings.js";
import { getVisualPreferenceLabel, visualPreferenceOptions } from "../../../utils/visualPreferences.js";

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

function getStudentPreviewSummary() {
  if (displaySettings.studentModeLayout === "boardOnly") {
    return "Student Mode will open as Talk only.";
  }

  if (displaySettings.studentModeLayout === "firstThenOnly") {
    return "Student Mode will show a First / Then view only.";
  }

  const preset = studentNavigationPresets.find(
    (item) => item.id === (displaySettings.studentNavigationPreset ?? "core")
  );

  if (preset) {
    return `Navigation preset: ${preset.label}.`;
  }

  return "Student Mode will use the selected navigation and display settings.";
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
  <legend>Student display and access settings</legend>
  <p className="field-help">
    These options control what the student/client sees and how large/simple the interface feels.
  </p>

  <label>
    Student experience level
    <select
      value={displaySettings.interfaceLevel}
      onChange={(event) => {
        const level = event.target.value;
        const preset =
          level === "simple"
            ? {
                interfaceLevel: "simple",
                studentModeLayout: "tabs",
                studentPanelLayout: "minimal",
                defaultStudentView: "schedule",
                studentNavigationPreset: "simple",
                showChooseTab: false,
                showMakeTab: false,
                showChoiceBoardTab: true,
                showHelpTab: true,
                showProgress: false,
                showPromptControls: false,
                showStepNumbers: false,
                showScheduleDate: false,
                showCheckIn: true,
                showRewardBoard: true,
                showSupportButtons: true,
                showBreakPlan: true,
                showTransitionSupports: false,
                showBoardActivitySection: false,
                touchSize: "large",
              }
            : level === "advanced"
              ? {
                  interfaceLevel: "advanced",
                  studentModeLayout: "tabs",
                  studentPanelLayout: "open",
                  defaultStudentView: "schedule",
                  studentNavigationPreset: "full",
                  showChooseTab: true,
                  showMakeTab: true,
                  showChoiceBoardTab: true,
                  showHelpTab: true,
                  showProgress: true,
                  showPromptControls: true,
                  showStepNumbers: true,
                  showScheduleDate: true,
                  showCheckIn: true,
                  showRewardBoard: true,
                  showSupportButtons: true,
                  showBreakPlan: true,
                  showTransitionSupports: true,
                  showBoardActivitySection: true,
                  touchSize: "standard",
                }
              : {
                  interfaceLevel: "standard",
                  studentModeLayout: "tabs",
                  studentPanelLayout: "grouped",
                  defaultStudentView: "schedule",
                  studentNavigationPreset: "core",
                  showChooseTab: false,
                  showMakeTab: false,
                  showChoiceBoardTab: true,
                  showHelpTab: true,
                  showProgress: true,
                  showPromptControls: false,
                  showStepNumbers: true,
                  showScheduleDate: true,
                  showCheckIn: false,
                  showRewardBoard: true,
                  showSupportButtons: true,
                  showBreakPlan: true,
                  showTransitionSupports: true,
                  showBoardActivitySection: false,
                  touchSize: "large",
                };

        onUpdateProfile(selectedProfile.id, {
          displaySettings: {
            ...displaySettings,
            ...preset,
          },
        });
      }}
    >
      <option value="simple">Simple</option>
      <option value="standard">Standard</option>
      <option value="advanced">Advanced</option>
    </select>
  </label>

  <label>
    Student mode layout
    <select
      value={displaySettings.studentModeLayout}
      onChange={(event) => updateDisplaySetting("studentModeLayout", event.target.value)}
    >
      <option value="tabs">Tabs</option>
      <option value="boardOnly">Board only</option>
      <option value="firstThenOnly">First / Then only</option>
    </select>
  </label>

  <label>
    Student navigation preset
    <select
      value={displaySettings.studentNavigationPreset ?? "core"}
      onChange={(event) => updateDisplaySetting("studentNavigationPreset", event.target.value)}
      disabled={displaySettings.studentModeLayout !== "tabs"}
    >
      {studentNavigationPresets.map((preset) => (
        <option key={preset.id} value={preset.id}>
          {preset.label}
        </option>
      ))}
    </select>
    <small className="field-help">
      Use Core for the normal default. Play stays visible, while Me/Make/extra builder tools stay hidden unless needed.
    </small>
  </label>

  <label>
    Student panel layout
    <select
      value={displaySettings.studentPanelLayout ?? "grouped"}
      onChange={(event) => updateDisplaySetting("studentPanelLayout", event.target.value)}
    >
      <option value="open">Open panels</option>
      <option value="grouped">Grouped panels</option>
      <option value="minimal">Minimal collapsed panels</option>
    </select>
  </label>

  <label>
    Default student screen
    <select
      value={displaySettings.defaultStudentView}
      onChange={(event) => updateDisplaySetting("defaultStudentView", event.target.value)}
      disabled={displaySettings.studentModeLayout !== "tabs"}
    >
      <option value="profile">Me</option>
      <option value="schedule">Schedule</option>
      <option value="choose">Add</option>
      <option value="make">Make</option>
      <option value="board">Talk</option>
      <option value="help">Help</option>
      <option value="relax">Calm</option>
      <option value="games">Play</option>
    </select>
  </label>

  <label>
    Touch size
    <select
      value={displaySettings.touchSize}
      onChange={(event) => updateDisplaySetting("touchSize", event.target.value)}
    >
      <option value="standard">Standard</option>
      <option value="large">Large</option>
      <option value="extraLarge">Extra large</option>
    </select>
  </label>

  <label>
    Text and visual display
    <select
      value={displaySettings.textDisplay}
      onChange={(event) => {
        const textDisplay = event.target.value;

        onUpdateProfile(selectedProfile.id, {
          displaySettings: {
            ...displaySettings,
            textDisplay,
            showWords: textDisplay !== "iconsOnly",
          },
        });
      }}
    >
      <option value="iconsAndWords">Icons and words</option>
      <option value="iconsOnly">Icons only</option>
      <option value="wordsOnly">Words only</option>
    </select>
  </label>

  <label>
    Visual preference
    <select
      value={displaySettings.visualPreference ?? "balanced"}
      onChange={(event) => updateDisplaySetting("visualPreference", event.target.value)}
    >
      {visualPreferenceOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <small className="field-help">
      Controls visual emphasis only. Labels remain visible and remain the read-aloud/event-log text.
    </small>
  </label>

  {[
    ["reduceMotion", "Reduce motion"],
    ["confirmBeforeMajorActions", "Confirm before major actions"],
    ["playAudioFeedback", "Play audio feedback"],
    ["showProgress", "Show progress bar"],
    ["showScheduleDate", "Show schedule date"],
    ["showCheckIn", "Show student check-in"],
    ["showRewardBoard", "Show reward board"],
    ["showSupportButtons", "Show support buttons"],
    ["showBreakPlan", "Show break plan"],
    ["showTransitionSupports", "Show transition supports"],
    ["showPainBodyPanel", "Show pain/body communication"],
    ["showSensoryPanel", "Show sensory requests"],
    ["showRegulationPathway", "Show regulation pathway"],
    ["showWaitingSupport", "Show waiting support"],
    ["showYesNoPanel", "Show yes/no/maybe board"],
    ["showHelpRequestBuilder", "Show help request builder"],
    ["showDecisionSupport", "Show decision support"],
    ["showStuckPathway", "Show stuck pathway"],
    ["showScheduleChangeRequest", "Show schedule change request"],
    ["showCommunityAccessPanel", "Show community access cards"],
    ["showVocationalTaskPanel", "Show vocational task mode"],
    ["showActivityPrepPanel", "Show activity prep"],
    ["showActivityReflectionPanel", "Show activity reflection"],
    ["showTryAgainLaterPanel", "Show try-again-later tool"],
    ["showCalmScreenPanel", "Show calm screen"],
    ["showCommunicationRepairPanel", "Show communication repair"],
    ["showSwitchScannerPanel", "Show switch scanning prototype"],
    ["showCoreWordsPanel", "Show core words board"],
    ["showQuickPhrasesPanel", "Show quick phrases board"],
    ["showFeelingsIntensityPanel", "Show feelings intensity board"],
    ["showSocialScriptsPanel", "Show social scripts board"],
    ["reducedChoiceMode", "Reduced choice / calm-first mode"],
    ["eyeGazeFriendly", "Eye-gaze friendly spacing"],
    ["showBoardActivitySection", "Show activities section on Board"],
    ["showStudentToolSummary", "Show student settings summary"],
    ["showProfileTab", "Show Me tab"],
    ["showScheduleTab", "Show Schedule tab"],
    ["showChooseTab", "Show Add tab"],
    ["showMakeTab", "Show Make tab"],
    ["showChoiceBoardTab", "Show Talk tab"],
    ["showHelpTab", "Show Help tab"],
    ["showRelaxTab", "Show Calm tab"],
    ["showGamesTab", "Show Play tab"],
    ["showGuidedScheduleBuilder", "Show guided schedule builder"],
    ["showAboutMePanel", "Show About Me profile"],
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

<div className="staff-preview-note" aria-label="Student Mode preview summary">
  <strong>Student Mode preview</strong>
  <span>{getStudentPreviewSummary()}</span>
  <small>
    Touch size: {displaySettings.touchSize}. Text/visual display: {displaySettings.textDisplay}. Visual preference: {getVisualPreferenceLabel(displaySettings)}. Navigation: {displaySettings.studentNavigationPreset ?? "core"}. Panel layout: {displaySettings.studentPanelLayout ?? "grouped"}.
  </small>
</div>

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
