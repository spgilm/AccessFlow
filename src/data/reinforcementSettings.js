/**
 * Token/reward support defaults.
 */
export const defaultReinforcementSettings = {
  enabled: true,
  tokenGoal: 5,
  tokensEarned: 0,
  rewardOptions: ["Choice time", "Music", "Walk", "Game", "Quiet activity"],
  praisePhrase: "Nice work!",
};

export function getReinforcementSettings(profile) {
  return {
    ...defaultReinforcementSettings,
    ...(profile?.reinforcementSettings ?? {}),
    rewardOptions:
      Array.isArray(profile?.reinforcementSettings?.rewardOptions) &&
      profile.reinforcementSettings.rewardOptions.length > 0
        ? profile.reinforcementSettings.rewardOptions
        : defaultReinforcementSettings.rewardOptions,
  };
}
