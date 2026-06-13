/**
 * Prototype role/permission panel.
 */
import { roleOptions } from "../data/rolePermissions.js";

const roleLabels = {
  student: "Student/client",
  caregiver: "Caregiver",
  directSupport: "Direct support staff",
  teacherSpecialist: "Teacher/specialist",
  admin: "Admin",
};

const permissionLabels = {
  canUseStudentMode: "Use Student Mode",
  canEditSchedule: "Edit schedules",
  canViewNotes: "View notes",
  canExportReports: "Export reports",
};

export default function RolePermissionsPanel({ rolePermissions, onUpdateRolePermissions }) {
  function updateRolePermission(role, permission, value) {
    onUpdateRolePermissions({
      ...rolePermissions,
      permissions: {
        ...rolePermissions.permissions,
        [role]: {
          ...rolePermissions.permissions[role],
          [permission]: value,
        },
      },
    });
  }

  return (
    <section className="panel role-panel" aria-labelledby="role-panel-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Roles</p>
          <h2 id="role-panel-heading">Role permissions prototype</h2>
          <p className="field-help">
            Planning layer for future multi-user access. Current app still uses prototype snapshot sync.
          </p>
        </div>
      </div>

      <label>
        Active role preview
        <select
          value={rolePermissions.activeRole}
          onChange={(event) => onUpdateRolePermissions({ ...rolePermissions, activeRole: event.target.value })}
        >
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {roleLabels[role]}
            </option>
          ))}
        </select>
      </label>

      <div className="role-grid">
        {roleOptions.map((role) => (
          <article key={role} className="role-card">
            <h3>{roleLabels[role]}</h3>
            {Object.keys(permissionLabels).map((permission) => (
              <label key={permission} className="checkbox-row">
                <input
                  type="checkbox"
                  checked={Boolean(rolePermissions.permissions[role]?.[permission])}
                  onChange={(event) => updateRolePermission(role, permission, event.target.checked)}
                />
                <span><strong>{permissionLabels[permission]}</strong></span>
              </label>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
