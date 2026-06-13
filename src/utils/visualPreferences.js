/**
 * Visual preference helpers for v50.
 *
 * The preference affects how visuals are emphasized in Student Mode, but it
 * never removes the semantic label. Labels remain visible unless a future
 * staff-only advanced setting explicitly changes that.
 */
export const visualPreferenceOptions = [
  {
    value: "balanced",
    label: "Balanced visuals + labels",
    description: "Default: visual support above a clear label.",
  },
  {
    value: "largeVisuals",
    label: "Large visuals",
    description: "Larger icons/photos for students who benefit from stronger visual cues.",
  },
  {
    value: "labelFirst",
    label: "Label-first",
    description: "Emphasizes readable text while keeping the visual as support.",
  },
  {
    value: "labelsOnly",
    label: "Labels only",
    description: "Hides decorative symbols visually and relies on clear button text.",
  },
];

export function getVisualPreference(displaySettings) {
  const value = displaySettings?.visualPreference ?? "balanced";
  return visualPreferenceOptions.some((option) => option.value === value) ? value : "balanced";
}

export function getVisualPreferenceClass(displaySettings) {
  const classMap = {
    balanced: "student-visual-preference-balanced",
    largeVisuals: "student-visual-preference-large-visuals",
    labelFirst: "student-visual-preference-label-first",
    labelsOnly: "student-visual-preference-labels-only",
  };

  return classMap[getVisualPreference(displaySettings)] ?? classMap.balanced;
}

export function getVisualPreferenceLabel(displaySettings) {
  return visualPreferenceOptions.find((option) => option.value === getVisualPreference(displaySettings))?.label ?? "Balanced visuals + labels";
}
