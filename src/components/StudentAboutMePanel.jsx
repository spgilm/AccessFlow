/**
 * StudentAboutMePanel
 *
 * Student-facing self-advocacy passport.
 */
const sections = [
  ["Things that help me", "thingsThatHelp"],
  ["Things that are hard", "hardThings"],
  ["How I say yes or no", "howISayYesNo"],
  ["How I ask for help", "howIAskForHelp"],
  ["My safe people", "safePeople"],
  ["My favorite rewards", "favoriteRewards"],
  ["My break choices", "breakChoices"],
  ["My sensory tools", "sensoryTools"],
];

export default function StudentAboutMePanel({ profile, aboutMeProfile }) {
  return (
    <section className="student-communication-panel about-me-panel" aria-labelledby="about-me-heading">
      <div>
        <p className="eyebrow">My profile</p>
        <h3 id="about-me-heading">About me</h3>
        <p className="field-help">This tells people how to support {profile?.name ?? "me"}.</p>
      </div>

      <div className="about-me-card-grid">
        {sections.map(([label, key]) => (
          <article key={key} className="about-me-card">
            <h4>{label}</h4>
            <p>{aboutMeProfile?.[key] || "Not set yet."}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
