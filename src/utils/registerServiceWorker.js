/**
 * Registers the prototype service worker for install/offline app-shell support.
 */
export function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => undefined);
  });
}
