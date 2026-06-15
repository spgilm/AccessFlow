/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { getSupabaseStatus } from "../../../services/supabaseWorkspace.js";

function formatDateTime(value) {
  if (!value) {
    return "Not yet";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return date.toLocaleString();
}

export default function SupabaseSyncPanel({
  session,
  syncStatus,
  isSyncing,
  syncMetadata,
  hasUnsavedCloudChanges,
  syncReminder,
  onSaveCloudSnapshot,
  onLoadCloudSnapshot,
}) {
  const status = getSupabaseStatus();
  const signedIn = Boolean(session?.user?.id);
  const canSync = status.configured && signedIn && !isSyncing;
  const currentEmail = session?.user?.email ?? "No staff account signed in";

  return (
    <section className="panel supabase-sync-panel" aria-labelledby="supabase-sync-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Backend</p>
          <h2 id="supabase-sync-heading">Shared staff workspace</h2>
        </div>
      </div>

      <div className={`backend-status-card ${status.configured ? "is-configured" : "is-local"}`}>
        <span>Connection status</span>
        <strong>
          {status.configured
            ? signedIn
              ? "Supabase ready"
              : "Supabase configured, sign-in required"
            : "Local browser storage only"}
        </strong>
        <p>
          {status.configured
            ? `Shared workspace label: ${status.workspaceLabel}`
            : "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Render to enable authenticated shared workspace snapshots."}
        </p>
        {status.configured ? (
          <p className="field-help">
            All signed-in staff using this same workspace label can load the same student list after another staff member saves it.
          </p>
        ) : null}
        <p className="backend-account-line">Signed-in staff: {currentEmail}</p>
      </div>

      <div className="backend-checklist" aria-label="Supabase setup checklist">
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
          Supabase publishable / anon key
        </div>
        <div>
          <span className={signedIn ? "check-good" : "check-missing"}>
            {signedIn ? "✓" : "×"}
          </span>
          Signed-in staff account
        </div>
      </div>

      <div className="sync-metadata-card" aria-label="Cloud snapshot status">
        <div>
          <span>Last saved</span>
          <strong>{formatDateTime(syncMetadata?.lastSavedAt)}</strong>
        </div>
        <div>
          <span>Last loaded</span>
          <strong>{formatDateTime(syncMetadata?.lastLoadedAt)}</strong>
        </div>
        <div>
          <span>Unsaved cloud changes</span>
          <strong>{hasUnsavedCloudChanges ? "Yes" : "No"}</strong>
        </div>
      </div>

      {hasUnsavedCloudChanges || syncReminder ? (
        <div className="sync-reminder" role="status">
          <strong>Save reminder</strong>
          <p>{syncReminder || "This browser workspace has changes that are not saved to Supabase yet."}</p>
        </div>
      ) : null}

      <div className="data-actions-grid">
        <button
          type="button"
          className="secondary-button"
          onClick={onSaveCloudSnapshot}
          disabled={!canSync}
        >
          {isSyncing ? "Working..." : "Save shared student list"}
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={onLoadCloudSnapshot}
          disabled={!canSync}
        >
          {isSyncing ? "Working..." : "Load shared student list"}
        </button>
      </div>

      <p className="field-help load-warning">
        Loading the shared student list replaces this browser workspace with the latest saved workspace for all staff using this workspace label. AccessFlow asks for confirmation before loading.
      </p>

      {syncStatus ? (
        <p className="copy-status" role="status">
          {syncStatus}
        </p>
      ) : null}

      <div className="prototype-warning" role="note">
        <strong>Prototype data boundary</strong>
        <p>
          Use fake names and test records only. v56.1 shares prototype student profiles across signed-in staff accounts that use the same workspace label, but it is still not approved for real student/client private data.
        </p>
        <p>
          Production use still needs organization membership, role-based workspace permissions, audit logging, data retention rules, image storage policies, and a normalized database model.
        </p>
      </div>
    </section>
  );
}
