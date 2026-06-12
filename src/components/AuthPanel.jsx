/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useState } from "react";
import { getSupabaseStatus } from "../services/supabaseWorkspace.js";

export default function AuthPanel({
  session,
  authStatus,
  isAuthWorking,
  onSignIn,
  onSignUp,
  onGoogleSignIn,
  onSignOut,
  variant = "full",
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabaseStatus = getSupabaseStatus();
  const signedInEmail = session?.user?.email;

  async function handleSubmit(event, action) {
    event.preventDefault();

    if (action === "signin") {
      await onSignIn(email, password);
      return;
    }

    await onSignUp(email, password);
  }

  const isCompact = variant === "compact";
  const headingId = isCompact ? "student-staff-auth-heading" : "auth-heading";

  return (
    <section
      className={`${isCompact ? "auth-panel compact-auth-panel" : "panel auth-panel"}`}
      aria-labelledby={headingId}
    >
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Account</p>
          <h2 id={headingId}>Staff sign-in</h2>
        </div>
      </div>

      {!supabaseStatus.configured ? (
        <div className="backend-status-card is-local">
          <span>Status</span>
          <strong>Supabase not configured</strong>
          <p>Add Supabase environment variables in Render to enable accounts.</p>
        </div>
      ) : signedInEmail ? (
        <div className="signed-in-card">
          <span>Signed in as</span>
          <strong>{signedInEmail}</strong>
          <button
            type="button"
            className="secondary-button"
            onClick={onSignOut}
            disabled={isAuthWorking}
          >
            Sign out
          </button>
        </div>
      ) : (
        <form className="auth-form" onSubmit={(event) => handleSubmit(event, "signin")}>
          {onGoogleSignIn ? (
            <>
              <button
                type="button"
                className="google-signin-button"
                onClick={onGoogleSignIn}
                disabled={isAuthWorking}
              >
                <span aria-hidden="true">G</span>
                Continue with Google
              </button>

              <div className="auth-divider" role="separator">
                <span>or use email</span>
              </div>
            </>
          ) : null}

          <label>
            Email
            <input
              type="email"
              value={email}
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <div className="row-actions">
            <button type="submit" className="secondary-button" disabled={isAuthWorking}>
              {isAuthWorking ? "Working..." : "Sign in"}
            </button>
            <button
              type="button"
              className="secondary-button"
              disabled={isAuthWorking}
              onClick={(event) => handleSubmit(event, "signup")}
            >
              Create account
            </button>
          </div>
        </form>
      )}

      {authStatus ? (
        <p className="copy-status" role="status">
          {authStatus}
        </p>
      ) : null}

      <p className="field-help auth-help">
        AccessFlow uses Supabase Auth when configured. Staff can sign in with email/password
        or Google if the Google provider is enabled in Supabase.
      </p>
    </section>
  );
}
