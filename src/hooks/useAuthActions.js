/**
 * useAuthActions
 *
 * Groups staff account/authentication handlers outside App.jsx.
 */
import {
  signInWithEmail,
  signInWithGoogle,
  signOut,
  signUpWithEmail,
} from "../services/supabaseWorkspace.js";

export function useAuthActions({
  setIsAuthWorking,
  setAuthStatus,
  setSession,
  lastSessionUserIdRef,
  setMode,
  setAnnouncement,
  setSyncStatus,
}) {
  async function handleSignUp(email, password) {
    setIsAuthWorking(true);
    setAuthStatus("");

    try {
      const data = await signUpWithEmail(email, password);

      if (data?.session) {
        setSession(data.session);
        lastSessionUserIdRef.current = data.session.user?.id ?? null;
        setMode("staff");
        setAuthStatus("Account created. Staff Mode opened.");
        setAnnouncement("Staff account created. Staff Mode opened.");
      } else {
        setAuthStatus("Account created. Check your email if confirmation is required, then sign in.");
      }
    } catch (error) {
      setAuthStatus(`Sign-up failed: ${error.message}`);
    } finally {
      setIsAuthWorking(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsAuthWorking(true);
    setAuthStatus("");

    try {
      await signInWithGoogle();
      setAuthStatus("Redirecting to Google sign-in...");
      setAnnouncement("Redirecting to Google sign-in.");
    } catch (error) {
      setAuthStatus(`Google sign-in failed: ${error.message}`);
    } finally {
      setIsAuthWorking(false);
    }
  }

  async function handleSignIn(email, password) {
    setIsAuthWorking(true);
    setAuthStatus("");

    try {
      const data = await signInWithEmail(email, password);
      setSession(data.session ?? null);
      lastSessionUserIdRef.current = data.session?.user?.id ?? null;
      setMode("staff");
      setAuthStatus("Signed in. Staff Mode opened.");
      setAnnouncement("Staff signed in. Staff Mode opened.");
    } catch (error) {
      setAuthStatus(`Sign-in failed: ${error.message}`);
    } finally {
      setIsAuthWorking(false);
    }
  }

  async function handleSignOut() {
    setIsAuthWorking(true);
    setAuthStatus("");

    try {
      await signOut();
      setSession(null);
      lastSessionUserIdRef.current = null;
      setAuthStatus("Signed out.");
      setSyncStatus("");
    } catch (error) {
      setAuthStatus(`Sign-out failed: ${error.message}`);
    } finally {
      setIsAuthWorking(false);
    }
  }

  return {
    handleSignUp,
    handleGoogleSignIn,
    handleSignIn,
    handleSignOut,
  };
}
