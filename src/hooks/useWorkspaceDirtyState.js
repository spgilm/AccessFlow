/**
 * useWorkspaceDirtyState
 *
 * Tracks whether the current browser workspace differs from the last clean
 * baseline. Used by the Supabase sync UI.
 */
import { useEffect, useRef, useState } from "react";

const DEFAULT_DIRTY_MESSAGE =
  "This browser workspace has changes that have not been saved to Supabase yet.";

export function useWorkspaceDirtyState(workspaceDataFingerprint) {
  const [hasUnsavedCloudChanges, setHasUnsavedCloudChanges] = useState(false);
  const [syncReminder, setSyncReminder] = useState("");
  const dirtyBaselineRef = useRef("");
  const hasInitializedDirtyTrackingRef = useRef(false);
  const suppressNextDirtyCheckRef = useRef(false);

  useEffect(() => {
    if (!hasInitializedDirtyTrackingRef.current) {
      hasInitializedDirtyTrackingRef.current = true;
      dirtyBaselineRef.current = workspaceDataFingerprint;
      return;
    }

    if (suppressNextDirtyCheckRef.current) {
      suppressNextDirtyCheckRef.current = false;
      dirtyBaselineRef.current = workspaceDataFingerprint;
      setHasUnsavedCloudChanges(false);
      setSyncReminder("");
      return;
    }

    if (workspaceDataFingerprint !== dirtyBaselineRef.current) {
      setHasUnsavedCloudChanges(true);
      setSyncReminder(DEFAULT_DIRTY_MESSAGE);
    }
  }, [workspaceDataFingerprint]);

  function markWorkspaceClean(nextBaseline = workspaceDataFingerprint) {
    dirtyBaselineRef.current = nextBaseline;
    suppressNextDirtyCheckRef.current = false;
    setHasUnsavedCloudChanges(false);
    setSyncReminder("");
  }

  function markNextWorkspaceClean() {
    suppressNextDirtyCheckRef.current = true;
    setHasUnsavedCloudChanges(false);
    setSyncReminder("");
  }

  function markWorkspaceDirty(message = DEFAULT_DIRTY_MESSAGE) {
    setHasUnsavedCloudChanges(true);
    setSyncReminder(message);
  }

  return {
    hasUnsavedCloudChanges,
    syncReminder,
    markWorkspaceClean,
    markNextWorkspaceClean,
    markWorkspaceDirty,
  };
}
