import { getSupabaseStatus } from "../services/supabaseWorkspace.js";

export default function SupabaseSyncPanel({
  session,
  syncStatus,
  isSyncing,
  onSaveCloudSnapshot,
  onLoadCloudSnapshot,
}) {
  const status = getSupabaseStatus();
  const signedIn = Boolean(session?.user?.id);
  const canSync = status.configured && signedIn && !isSyncing;

  return (
    <section className="panel supabase-sync-panel" aria-labelledby="supabase-sync-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Backend</p>
          <h2 id="supabase-sync-heading">Supabase sync</h2>
        </div>
      </div>

      <div className={`backend-status-card ${status.configured ? "is-configured" : "is-local"}`}>
        <span>Status</span>
        <strong>
          {status.configured
            ? signedIn
              ? "Supabase configured and signed in"
              : "Supabase configured, sign-in required"
            : "Local browser storage"}
        </strong>
        <p>
          {status.configured
            ? `Workspace label: ${status.workspaceLabel}`
            : "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Render to enable authenticated cloud snapshots."}
        </p>
      </div>

      <div className="backend-checklist">
        <div>
          <span className={status.hasUrl ? "check-good" : "check-missing"}>
            {status.hasUrl ? "✓" : "×"}
          </span>
          Supabase URL
        </div>
        <div>
          <span className={status.hasAnonKey ? "check-good" : "check-missing"}>
            {status.hasAnonKey ? "✓" : "×"}
          </span>
          Supabase anon key
        </div>
        <div>
          <span className={signedIn ? "check-good" : "check-missing"}>
            {signedIn ? "✓" : "×"}
          </span>
          Signed-in staff account
        </div>
      </div>

      <div className="data-actions-grid">
        <button
          type="button"
          className="secondary-button"
          onClick={onSaveCloudSnapshot}
          disabled={!canSync}
        >
          {isSyncing ? "Working..." : "Save cloud snapshot"}
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={onLoadCloudSnapshot}
          disabled={!canSync}
        >
          {isSyncing ? "Working..." : "Load latest snapshot"}
        </button>
      </div>

      {syncStatus ? (
        <p className="copy-status" role="status">
          {syncStatus}
        </p>
      ) : null}

      <p className="field-help backend-warning">
        v8 snapshots are user-scoped through Supabase Auth and RLS. Do not use with
        real student/client private data until organization roles, audit logging, and
        production policies are added.
      </p>
    </section>
  );
}
