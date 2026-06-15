/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
export const defaultIndependenceSettings = {
  studentCanBuildSchedule: true,
  studentCanReorderSchedule: true,
  studentCanRemoveActivities: true,
  studentCanAddCustomActivities: true,
  studentCanClearSchedule: false,
};

export function getIndependenceSettings(profile) {
  return {
    ...defaultIndependenceSettings,
    ...(profile?.independenceSettings ?? {}),
  };
}
