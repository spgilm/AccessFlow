/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
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
