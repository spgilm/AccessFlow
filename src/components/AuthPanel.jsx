import { useState } from "react";
import { getSupabaseStatus } from "../services/supabaseWorkspace.js";

export default function AuthPanel({
  session,
  authStatus,
  isAuthWorking,
  onSignIn,
  onSignUp,
  onSignOut,
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

  return (
    <section className="panel auth-panel" aria-labelledby="auth-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Account</p>
          <h2 id="auth-heading">Staff sign-in</h2>
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
        v8 uses Supabase email/password auth when configured. Some projects require email
        confirmation before first sign-in.
      </p>
    </section>
  );
}
