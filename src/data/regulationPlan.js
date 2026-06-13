/**
 * Regulation/support plan defaults.
 */
export const defaultRegulationPlan = {
  triggers: "Unexpected changes, waiting, loud spaces, unclear directions.",
  earlySigns: "Pacing, refusal, covering ears, asking to leave, repeated questions.",
  proactiveSupports: "Preview schedule, offer choices, use First/Then, provide transition warning.",
  calmingStrategies: "Break, quiet space, walk, breathing, headphones, preferred item.",
  staffResponse: "Use calm voice, reduce language, validate feeling, offer two clear choices.",
  recoverySteps: "Return from break, review now/next, restart with easier step.",
};

export function getRegulationPlan(profile) {
  return {
    ...defaultRegulationPlan,
    ...(profile?.regulationPlan ?? {}),
  };
}
