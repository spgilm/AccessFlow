/**
 * Date-copy helpers for schedule cloning.
 */
function parseLocalDateKey(dateKey) {
  const [year, month, day] = String(dateKey || "").split("-").map(Number);
  return new Date(year || 1970, (month || 1) - 1, day || 1);
}

function toLocalDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function getTomorrowDateKey(dateKey) {
  const date = parseLocalDateKey(dateKey);
  date.setDate(date.getDate() + 1);
  return toLocalDateKey(date);
}

export function getWeekdayDateKeysFromDate(dateKey) {
  const anchor = parseLocalDateKey(dateKey);
  const dayOfWeek = anchor.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(anchor);
  monday.setDate(anchor.getDate() + mondayOffset);

  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return toLocalDateKey(date);
  });
}
