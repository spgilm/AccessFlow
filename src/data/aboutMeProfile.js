/**
 * About Me / self-advocacy passport defaults.
 */
export const defaultAboutMeProfile = {
  thingsThatHelp: "Show me what is next. Give me time. Use clear choices.",
  hardThings: "Unexpected changes, waiting, loud spaces, and unclear directions.",
  howISayYesNo: "Use the Yes / No board, gestures, words, or preferred communication method.",
  howIAskForHelp: "Use help button, communication board, or show staff what is hard.",
  safePeople: "Teacher, direct support staff, job coach, nurse, trusted caregiver.",
  favoriteRewards: "Music, break, preferred activity, praise, choice time.",
  breakChoices: "Quiet space, walk, headphones, breathing, water, fidget.",
  sensoryTools: "Headphones, lower lights, space, movement, deep pressure if appropriate.",
  whatNotToDo: "Do not rush, crowd, shame, or use too much language when I am overwhelmed.",
  emergencyNotes: "Prototype only. Do not enter real emergency or medical data yet.",
};

export function getAboutMeProfile(profile) {
  return {
    ...defaultAboutMeProfile,
    ...(profile?.aboutMeProfile ?? {}),
  };
}
