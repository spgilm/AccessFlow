export function normalizeTaskText(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function toDisplayLabel(value) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
}

export function createId(prefix = "item") {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
