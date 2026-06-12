import { useState } from "react";
import AuthPanel from "./AuthPanel.jsx";
import { getSupabaseStatus } from "../services/supabaseWorkspace.js";

export default function StaffAccessPanel({
  session,
  authStatus,
  isAuthWorking,
  onSignIn,
  onSignUp,
  onSignOut,
  onOpenStaffMode,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const signedInEmail = session?.user?.email;
  const supabaseStatus = getSupabaseStatus();

  if (signedInEmail) {
    return (
      <section className="panel staff-access-panel is-signed-in" aria-labelledby="staff-access-heading">
        <div>
          <p className="eyebrow">Staff access</p>
          <h2 id="staff-access-heading">Staff signed in</h2>
          <p className="staff-access-summary">
            {signedInEmail}
          </p>
        </div>

        <div className="staff-access-actions">
          <button type="button" className="secondary-button" onClick={onOpenStaffMode}>
            Open Staff Mode
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={onSignOut}
            disabled={isAuthWorking}
          >
            Sign out
          </button>
        </div>

        {authStatus ? (
          <p className="copy-status" role="status">
            {authStatus}
          </p>
        ) : null}
      </section>
    );
  }

  return (
    <section className="panel staff-access-panel" aria-labelledby="staff-access-heading">
      <div className="staff-access-collapsed">
        <div>
          <p className="eyebrow">Staff access</p>
          <h2 id="staff-access-heading">Staff login / create account</h2>
          <p className="staff-access-summary">
            Use this only for staff setup, documentation, and cloud sync. Student Mode stays visible by default.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
        >
          {isOpen ? "Hide staff login" : "Staff login"}
        </button>
      </div>

      {!supabaseStatus.configured ? (
        <p className="field-help staff-access-warning">
          Supabase is not configured yet. Staff login requires the Render environment variables.
        </p>
      ) : null}

      {isOpen ? (
        <div className="staff-access-auth">
          <AuthPanel
            session={session}
            authStatus={authStatus}
            isAuthWorking={isAuthWorking}
            onSignIn={onSignIn}
            onSignUp={onSignUp}
            onSignOut={onSignOut}
            variant="compact"
          />
        </div>
      ) : null}
    </section>
  );
}
