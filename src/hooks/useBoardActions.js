/**
 * useBoardActions
 *
 * Groups communication-board management handlers outside App.jsx.
 */
import {
  createChoiceBoardItem,
  defaultChoiceBoardItems,
  getChoiceBoardItems,
} from "../data/choiceBoardItems.js";

export function useBoardActions({
  updateSelectedProfile,
  clearPortableStatuses,
  setAnnouncement,
}) {
  function updateSelectedProfileChoiceBoard(updater) {
    updateSelectedProfile((profile) => ({
      ...profile,
      choiceBoardItems: updater(getChoiceBoardItems(profile)),
    }));
  }

  function handleAddBoardItem(item) {
    updateSelectedProfileChoiceBoard((currentItems) => [
      ...currentItems,
      createChoiceBoardItem(item.label, item.emoji, item.category, item.phraseText),
    ]);

    clearPortableStatuses();
    setAnnouncement(`${item.label} added to the communication board.`);
  }

  function handleUpdateBoardItem(itemId, patch) {
    updateSelectedProfileChoiceBoard((currentItems) =>
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

  function handleDeleteBoardItem(itemId) {
    updateSelectedProfileChoiceBoard((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );

    clearPortableStatuses();
    setAnnouncement("Communication board button removed.");
  }

  function handleResetBoardItems() {
    updateSelectedProfileChoiceBoard(() => defaultChoiceBoardItems);

    clearPortableStatuses();
    setAnnouncement("Communication board reset to default buttons.");
  }

  return {
    handleAddBoardItem,
    handleUpdateBoardItem,
    handleDeleteBoardItem,
    handleResetBoardItems,
  };
}
