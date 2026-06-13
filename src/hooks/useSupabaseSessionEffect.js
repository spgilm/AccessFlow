/**
 * useSupabaseSessionEffect
 *
 * Reads the current Supabase session and subscribes to auth changes.
 * Returns a ref that App handlers can update after explicit sign-in/sign-out flows.
 */
import { useEffect, useRef } from "react";
import {
  getCurrentSession,
  isSupabaseConfigured,
  subscribeToAuthChanges,
} from "../services/supabaseWorkspace.js";

export function useSupabaseSessionEffect({
  setSession,
  setAuthStatus,
  setMode,
  setAnnouncement,
}) {
  const lastSessionUserIdRef = useRef(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return undefined;
    }

    let active = true;

    getCurrentSession()
      .then((currentSession) => {
        if (active) {
          setSession(currentSession);

          if (currentSession?.user?.id) {
            lastSessionUserIdRef.current = currentSession.user.id;
          }
        }
      })
      .catch((error) => {
        if (active) {
          setAuthStatus(`Could not read auth session: ${error.message}`);
        }
      });

    const unsubscribe = subscribeToAuthChanges((nextSession) => {
      const previousUserId = lastSessionUserIdRef.current;
      const nextUserId = nextSession?.user?.id ?? null;

      setSession(nextSession);

      if (nextUserId && nextUserId !== previousUserId) {
        setMode("staff");
        setAnnouncement("Staff signed in. Staff Mode opened.");
      }

      lastSessionUserIdRef.current = nextUserId;
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [setAnnouncement, setAuthStatus, setMode, setSession]);

  return lastSessionUserIdRef;
}
