/**
 * Staff-facing one-click Student Mode accessibility presets.
 *
 * The goal is to make configuration easier for staff and reduce the chance that
 * Student Mode becomes cluttered by default.
 */
import { defaultDisplaySettings } from "../../../data/displaySettings.js";
import { defaultIndependenceSettings } from "../../../data/independenceSettings.js";

const presets = [
  {
    id: "simple-schedule",
    title: "Simple visual schedule",
    recommendedFor: "Students who need one clear schedule screen with minimal extras.",
    displaySettings: {
      interfaceLevel: "simple",
      studentModeLayout: "tabs",
      studentPanelLayout: "minimal",
      defaultStudentView: "today",
      touchSize: "large",
      textDisplay: "iconsAndWords",
      showScheduleDate: false,
      showCheckIn: false,
      showRewardBoard: false,
      showProgress: false,
      showSupportButtons: true,
      showBreakPlan: true,
      showTransitionSupports: false,
      showBoardActivitySection: false,
      showChooseTab: false,
      showMakeTab: false,
      showChoiceBoardTab: true,
      showStepNumbers: false,
      showPromptControls: false,
      showTimers: true,
      showStudentToolSummary: true,
      reduceMotion: true,
    },
    independenceSettings: {
      studentCanBuildSchedule: false,
      studentCanReorderSchedule: false,
      studentCanRemoveActivities: false,
      studentCanAddCustomActivities: false,
      studentCanClearSchedule: false,
    },
  },
  {
    id: "aac-board",
    title: "AAC / communication board",
    recommendedFor: "Students who primarily need communication access, requests, and sentence building.",
    displaySettings: {
      interfaceLevel: "simple",
      studentModeLayout: "boardOnly",
      studentPanelLayout: "minimal",
      defaultStudentView: "board",
      touchSize: "extraLarge",
      textDisplay: "iconsAndWords",
      showScheduleDate: false,
      showCheckIn: false,
      showRewardBoard: false,
      showProgress: false,
      showSupportButtons: false,
      showBreakPlan: false,
      showTransitionSupports: false,
      showBoardActivitySection: false,
      showChooseTab: false,
      showMakeTab: false,
      showChoiceBoardTab: true,
      showStepNumbers: false,
      showPromptControls: false,
      showTimers: false,
      showStudentToolSummary: false,
      reduceMotion: true,
    },
    independenceSettings: {
      studentCanBuildSchedule: false,
      studentCanReorderSchedule: false,
      studentCanRemoveActivities: false,
      studentCanAddCustomActivities: false,
      studentCanClearSchedule: false,
    },
  },
  {
    id: "first-then",
    title: "First / Then support",
    recommendedFor: "Students who need a very small sequence rather than a full schedule.",
    displaySettings: {
      interfaceLevel: "simple",
      studentModeLayout: "firstThenOnly",
      studentPanelLayout: "minimal",
      defaultStudentView: "today",
      touchSize: "extraLarge",
      textDisplay: "iconsAndWords",
      showScheduleDate: false,
      showCheckIn: false,
      showRewardBoard: false,
      showProgress: false,
      showSupportButtons: true,
      showBreakPlan: true,
      showTransitionSupports: true,
      showBoardActivitySection: false,
      showChooseTab: false,
      showMakeTab: false,
      showChoiceBoardTab: false,
      showStepNumbers: false,
      showPromptControls: false,
      showTimers: true,
      showStudentToolSummary: true,
      reduceMotion: true,
    },
    independenceSettings: {
      studentCanBuildSchedule: false,
      studentCanReorderSchedule: false,
      studentCanRemoveActivities: false,
      studentCanAddCustomActivities: false,
      studentCanClearSchedule: false,
    },
  },
  {
    id: "transition-regulation",
    title: "Transition and regulation support",
    recommendedFor: "Students who need help with waiting, changes, breaks, and returning to routine.",
    displaySettings: {
      interfaceLevel: "standard",
      studentModeLayout: "tabs",
      studentPanelLayout: "grouped",
      defaultStudentView: "today",
      touchSize: "large",
      textDisplay: "iconsAndWords",
      showScheduleDate: true,
      showCheckIn: true,
      showRewardBoard: false,
      showProgress: true,
      showSupportButtons: true,
      showBreakPlan: true,
      showTransitionSupports: true,
      showBoardActivitySection: false,
      showChooseTab: true,
      showMakeTab: false,
      showChoiceBoardTab: true,
      showStepNumbers: true,
      showPromptControls: false,
      showTimers: true,
      showStudentToolSummary: true,
      reduceMotion: true,
    },
    independenceSettings: {
      studentCanBuildSchedule: true,
      studentCanReorderSchedule: false,
      studentCanRemoveActivities: false,
      studentCanAddCustomActivities: false,
      studentCanClearSchedule: false,
    },
  },
  {
    id: "advanced-learning",
    title: "Advanced learning and self-management",
    recommendedFor: "Students who can handle more autonomy, task creation, and staff-supported data tracking.",
    displaySettings: {
      interfaceLevel: "advanced",
      studentModeLayout: "tabs",
      studentPanelLayout: "open",
      defaultStudentView: "today",
      touchSize: "standard",
      textDisplay: "iconsAndWords",
      showScheduleDate: true,
      showCheckIn: true,
      showRewardBoard: true,
      showProgress: true,
      showSupportButtons: true,
      showBreakPlan: true,
      showTransitionSupports: true,
      showBoardActivitySection: true,
      showChooseTab: true,
      showMakeTab: true,
      showChoiceBoardTab: true,
      showStepNumbers: true,
      showPromptControls: true,
      showTimers: true,
      showStudentToolSummary: true,
      reduceMotion: false,
    },
    independenceSettings: {
      studentCanBuildSchedule: true,
      studentCanReorderSchedule: true,
      studentCanRemoveActivities: true,
      studentCanAddCustomActivities: true,
      studentCanClearSchedule: true,
    },
  },
];

function getCurrentSummary(displaySettings) {
  return [
    `${displaySettings?.interfaceLevel ?? "standard"} level`,
    `${displaySettings?.studentModeLayout ?? "tabs"} layout`,
    `${displaySettings?.studentPanelLayout ?? "grouped"} panels`,
    `${displaySettings?.touchSize ?? "standard"} touch`,
    `${displaySettings?.textDisplay ?? "iconsAndWords"} text/visuals`,
  ].join(" • ");
}

export default function StudentModePresetPanel({
  selectedProfile,
  displaySettings,
  onUpdateProfile,
  onOpenStudentMode,
}) {
  function applyPreset(preset) {
    if (!selectedProfile) {
      return;
    }

    onUpdateProfile(selectedProfile.id, {
      displaySettings: {
        ...defaultDisplaySettings,
        ...(selectedProfile.displaySettings ?? {}),
        ...preset.displaySettings,
      },
      independenceSettings: {
        ...defaultIndependenceSettings,
        ...(selectedProfile.independenceSettings ?? {}),
        ...preset.independenceSettings,
      },
    });
  }

  return (
    <section className="panel student-mode-preset-panel" aria-labelledby="student-mode-preset-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Guided configuration</p>
          <h2 id="student-mode-preset-heading">Student Mode presets</h2>
          <p className="field-help">
            Apply a clean starting point, then adjust individual settings if needed.
          </p>
        </div>
        <button type="button" className="secondary-button" onClick={onOpenStudentMode}>
          Preview Student Mode
        </button>
      </div>

      <div className="current-student-config-card">
        <strong>Current setup</strong>
        <span>{getCurrentSummary(displaySettings)}</span>
      </div>

      <div className="preset-card-grid">
        {presets.map((preset) => (
          <article key={preset.id} className="preset-card">
            <h3>{preset.title}</h3>
            <p>{preset.recommendedFor}</p>
            <ul>
              <li>{preset.displaySettings.studentModeLayout}</li>
              <li>{preset.displaySettings.studentPanelLayout} panels</li>
              <li>{preset.displaySettings.touchSize} touch</li>
            </ul>
            <button type="button" className="primary-wide-button" onClick={() => applyPreset(preset)}>
              Apply preset
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
