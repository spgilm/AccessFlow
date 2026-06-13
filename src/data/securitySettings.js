/**
 * Staff security prototype settings.
 *
 * This is local prototype protection only. Production should use real auth roles.
 */
export const defaultStaffSecurity = {
  pinEnabled: false,
  pin: "1234",
  hideStaffSwitchInStudentMode: false,
  autoReturnToStudent: false,
};

export function getStaffSecurity(settings) {
  return {
    ...defaultStaffSecurity,
    ...(settings ?? {}),
  };
}
