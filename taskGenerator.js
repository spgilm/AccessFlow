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
