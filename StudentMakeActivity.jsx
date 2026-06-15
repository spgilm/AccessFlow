/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useState } from "react";
import AuthPanel from "./AuthPanel.jsx";
import { getSupabaseStatus } from "../services/supabaseWorkspace.js";

export default function StaffAccessPanel({
  session,
  authStatus,
  isAuthWorking,
  onSignIn,
  onSignUp,
  onGoogleSignIn,
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
            onGoogleSignIn={onGoogleSignIn}
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
