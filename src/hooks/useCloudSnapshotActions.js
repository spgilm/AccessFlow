/**
 * useCloudSnapshotActions
 *
 * Groups backup import/export and Supabase snapshot actions outside App.jsx.
 */
import { getTodayDateKey } from "../utils/documentationHelpers.js";
import {
  downloadTextFile,
  validateBackupPayload,
} from "../utils/exportHelpers.js";
import { normalizeImportedBackupData } from "../utils/importHelpers.js";
import { buildCurrentWorkspacePayload } from "../utils/workspacePayloadHelpers.js";
import {
  loadLatestWorkspaceSnapshot,
  saveWorkspaceSnapshot,
} from "../services/supabaseWorkspace.js";
import { formatCloudError } from "../utils/cloudErrorHelpers.js";

export function useCloudSnapshotActions({
  workspaceData,
  workspaceDataFingerprint,
  setProfiles,
  setTemplates,
  setSelectedProfileId,
  setDocumentationDate,
  setScheduleDate,
  setMode,
  setStudentViewMode,
  setSelectedActivityId,
  setCopyStatus,
  setExportStatus,
  setImportStatus,
  setSyncStatus,
  setIsSyncing,
  setAnnouncement,
  setSyncMetadata,
  markWorkspaceClean,
  markNextWorkspaceClean,
  markWorkspaceDirty,
}) {
  function applyImportedWorkspace(imported) {
    setProfiles(imported.profiles);
    setTemplates(imported.templates);
    setSelectedProfileId(imported.selectedProfileId);
    setDocumentationDate(imported.documentationDate || getTodayDateKey());
    setScheduleDate(imported.scheduleDate || imported.documentationDate || getTodayDateKey());
    setMode(imported.mode);
    setStudentViewMode(imported.studentViewMode);

    const nextProfile =
      imported.profiles.find((profile) => profile.id === imported.selectedProfileId) ??
      imported.profiles[0];

    setSelectedActivityId(nextProfile?.activities?.[0]?.id ?? null);
  }

  function handleExportBackup() {
    const payload = buildCurrentWorkspacePayload(workspaceData);

    const filename = `${getTodayDateKey()}-accessflow-backup.json`;
    downloadTextFile(filename, JSON.stringify(payload, null, 2), "application/json");
    setExportStatus("Backup exported.");
    setImportStatus("");
  }

  function handleImportBackup(file) {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const payload = JSON.parse(String(reader.result));
        const validationError = validateBackupPayload(payload);

        if (validationError) {
          setImportStatus(validationError);
          return;
        }

        const imported = normalizeImportedBackupData(payload.data);
        applyImportedWorkspace(imported);

        setImportStatus("Backup imported.");
        setExportStatus("");
        setCopyStatus("");
        setAnnouncement("AccessFlow backup imported.");
        markWorkspaceDirty("Imported backup is only in this browser until you save a new cloud snapshot.");
      } catch {
        setImportStatus("Could not import backup. Make sure the file is valid JSON.");
      }
    };

    reader.onerror = () => {
      setImportStatus("Could not read the selected backup file.");
    };

    reader.readAsText(file);
  }

  function restoreWorkspaceFromPayload(payload, sourceLabel = "backup", options = {}) {
    const validationError = validateBackupPayload(payload);

    if (validationError) {
      throw new Error(validationError);
    }

    const imported = normalizeImportedBackupData(payload.data);

    if (options.markCloudClean) {
      markNextWorkspaceClean();
    } else {
      markWorkspaceDirty("Restored workspace is local until you save a new cloud snapshot.");
    }

    applyImportedWorkspace(imported);
    setCopyStatus("");
    setExportStatus("");
    setImportStatus("");
    setSyncStatus(`Workspace restored from ${sourceLabel}.`);
  }

  async function handleSaveCloudSnapshot() {
    setIsSyncing(true);
    setSyncStatus("");

    try {
      const payload = buildCurrentWorkspacePayload(workspaceData);
      const saved = await saveWorkspaceSnapshot(payload);
      const savedAt = saved?.updated_at ?? new Date().toISOString();

      markWorkspaceClean(workspaceDataFingerprint);
      setSyncMetadata((current) => ({
        ...current,
        lastSavedAt: savedAt,
        lastSnapshotId: saved?.id ?? current.lastSnapshotId ?? null,
      }));
      setSyncStatus(`Shared staff workspace saved at ${new Date(savedAt).toLocaleString()}. Other staff can load this student list.`);
    } catch (error) {
      setSyncStatus(formatCloudError("Cloud save", error));
    } finally {
      setIsSyncing(false);
    }
  }

  async function handleLoadCloudSnapshot() {
    const shouldLoad = window.confirm(
      "Load the latest shared staff workspace? This will replace the current browser workspace with the latest shared student list for this workspace label."
    );

    if (!shouldLoad) {
      setSyncStatus("Cloud load cancelled. Current browser workspace was not changed.");
      return;
    }

    setIsSyncing(true);
    setSyncStatus("");

    try {
      const snapshot = await loadLatestWorkspaceSnapshot();

      if (!snapshot?.payload) {
        setSyncStatus("No shared staff workspace snapshot found yet. Save one from any staff account first.");
        return;
      }

      restoreWorkspaceFromPayload(snapshot.payload, "shared staff workspace", { markCloudClean: true });
      const loadedAt = snapshot.updated_at ?? snapshot.created_at ?? new Date().toISOString();
      setSyncMetadata((current) => ({
        ...current,
        lastLoadedAt: loadedAt,
        lastSnapshotId: snapshot.id ?? current.lastSnapshotId ?? null,
      }));
    } catch (error) {
      setSyncStatus(formatCloudError("Cloud load", error));
    } finally {
      setIsSyncing(false);
    }
  }

  return {
    handleExportBackup,
    handleImportBackup,
    handleSaveCloudSnapshot,
    handleLoadCloudSnapshot,
  };
}
