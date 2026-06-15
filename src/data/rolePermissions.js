/**
 * Prototype role/permission settings.
 *
 * These settings document intended permissions before the normalized multi-user
 * production database exists.
 */
export const roleOptions = ["student", "caregiver", "directSupport", "teacherSpecialist", "admin"];

export const defaultRolePermissions = {
  activeRole: "admin",
  permissions: {
    student: {
      canUseStudentMode: true,
      canEditSchedule: false,
      canViewNotes: false,
      canExportReports: false,
    },
    caregiver: {
      canUseStudentMode: true,
      canEditSchedule: true,
      canViewNotes: true,
      canExportReports: false,
    },
    directSupport: {
      canUseStudentMode: true,
      canEditSchedule: true,
      canViewNotes: true,
      canExportReports: true,
    },
    teacherSpecialist: {
      canUseStudentMode: true,
      canEditSchedule: true,
      canViewNotes: true,
      canExportReports: true,
    },
    admin: {
      canUseStudentMode: true,
      canEditSchedule: true,
      canViewNotes: true,
      canExportReports: true,
    },
  },
};

export function getRolePermissions(settings) {
  return {
    ...defaultRolePermissions,
    ...(settings ?? {}),
    permissions: {
      ...defaultRolePermissions.permissions,
      ...(settings?.permissions ?? {}),
    },
  };
}
