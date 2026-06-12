export const defaultDisplaySettings = {
  showChooseTab: true,
  showMakeTab: true,
  showChoiceBoardTab: true,
  showWords: true,
  showProgress: true,
  showStepNumbers: true,
  showPromptControls: true,
  showTimers: true,
  defaultStudentView: "today",
};

export function getDisplaySettings(profile) {
  return {
    ...defaultDisplaySettings,
    ...(profile?.displaySettings ?? {}),
  };
}
