/**
 * StaffAuthGate
 *
 * Shows a safe staff login/create-account screen instead of rendering the
 * full StaffView when no staff user is signed in.
 */
import AuthPanel from "../staff/settings/AuthPanel.jsx";
import PrototypeSafetyFooter from "./PrototypeSafetyFooter.jsx";

export default function StaffAuthGate({
  session,
  authStatus,
  isAuthWorking,
  onSignIn,
  onSignUp,
  onGoogleSignIn,
  onSignOut,
  onOpenStudentMode,
}) {
  return (
    <section className="staff-auth-gate" aria-labelledby="staff-auth-gate-heading">
      <div className="focus-header compact-focus-header">
        <p className="eyebrow">Staff access</p>
        <h2 id="staff-auth-gate-heading">Sign in or create a staff account</h2>
        <p>
          Staff tools include profile setup, documentation, saved visuals, and cloud snapshot controls.
          Sign in before opening Staff Mode.
        </p>
      </div>

      <AuthPanel
        session={session}
        authStatus={authStatus}
        isAuthWorking={isAuthWorking}
        onSignIn={onSignIn}
        onSignUp={onSignUp}
        onGoogleSignIn={onGoogleSignIn}
        onSignOut={onSignOut}
      />

      <div className="staff-auth-gate-actions">
        <button type="button" className="secondary-button" onClick={onOpenStudentMode}>
          Back to Student Mode
        </button>
      </div>

      <PrototypeSafetyFooter mode="staff" />
    </section>
  );
}
