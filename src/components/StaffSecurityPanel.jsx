/**
 * Staff PIN lock prototype panel.
 */
export default function StaffSecurityPanel({
  staffSecurity,
  onUpdateStaffSecurity,
  onLockStaff,
}) {
  function update(field, value) {
    onUpdateStaffSecurity({
      ...staffSecurity,
      [field]: value,
    });
  }

  return (
    <section className="panel security-panel" aria-labelledby="security-panel-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Security prototype</p>
          <h2 id="security-panel-heading">Staff PIN lock</h2>
          <p className="field-help">
            Prototype-only protection. Production should use real user roles and authentication.
          </p>
        </div>
        <button type="button" className="secondary-button" onClick={onLockStaff}>
          Lock Staff Mode
        </button>
      </div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={staffSecurity.pinEnabled}
          onChange={(event) => update("pinEnabled", event.target.checked)}
        />
        <span><strong>Require PIN to open Staff Mode</strong></span>
      </label>

      <label>
        Staff PIN
        <input
          type="password"
          value={staffSecurity.pin}
          onChange={(event) => update("pin", event.target.value)}
        />
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={staffSecurity.hideStaffSwitchInStudentMode}
          onChange={(event) => update("hideStaffSwitchInStudentMode", event.target.checked)}
        />
        <span><strong>Hide Staff button visually in Student Mode</strong></span>
      </label>
    </section>
  );
}
