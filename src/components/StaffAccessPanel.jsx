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
      <section className="staff-access-mini signed-in-mini" aria-label="Staff access">
        <span>Staff signed in</span>
        <button type="button" className="secondary-button" onClick={onOpenStaffMode}>
          Open Staff
        </button>
        <button
          type="button"
          className="secondary-button"
          onClick={onSignOut}
          disabled={isAuthWorking}
        >
          Sign out
        </button>
      </section>
    );
  }

  return (
    <section className="staff-access-mini" aria-label="Staff access">
      <button
        type="button"
        className="staff-login-link"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        Staff login / create account
      </button>

      {!supabaseStatus.configured && isOpen ? (
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

      {authStatus && !isOpen ? (
        <p className="copy-status" role="status">
          {authStatus}
        </p>
      ) : null}
    </section>
  );
}
