/**
 * useVisualLibraryActions
 *
 * Groups visual-library mutations outside App.jsx.
 */
import {
  createVisualLibraryItem,
  defaultVisualLibraryItems,
  getVisualLibraryItems,
} from "../data/visualLibrary.js";

export function useVisualLibraryActions({
  updateSelectedProfile,
  clearPortableStatuses,
  setAnnouncement,
}) {
  function updateSelectedProfileVisualLibrary(updater) {
    updateSelectedProfile((profile) => ({
      ...profile,
      visualLibrary: updater(getVisualLibraryItems(profile)),
    }));
  }

  function handleAddVisualLibraryItem(item) {
    updateSelectedProfileVisualLibrary((currentItems) => [
      ...currentItems,
      createVisualLibraryItem(item),
    ]);

    clearPortableStatuses();
    setAnnouncement(`${item.label} visual saved.`);
  }

  function handleUpdateVisualLibraryItem(itemId, patch) {
    updateSelectedProfileVisualLibrary((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              ...patch,
              visual: patch.visual ?? item.visual,
            }
          : item
      )
    );

    clearPortableStatuses();
  }

  function handleDeleteVisualLibraryItem(itemId) {
    updateSelectedProfileVisualLibrary((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );

    clearPortableStatuses();
    setAnnouncement("Saved visual removed.");
  }

  function handleResetVisualLibrary() {
    updateSelectedProfile((profile) => ({
      ...profile,
      visualLibrary: defaultVisualLibraryItems,
    }));

    clearPortableStatuses();
    setAnnouncement("Visual library reset to default symbols.");
  }

  return {
    handleAddVisualLibraryItem,
    handleUpdateVisualLibraryItem,
    handleDeleteVisualLibraryItem,
    handleResetVisualLibrary,
  };
}
