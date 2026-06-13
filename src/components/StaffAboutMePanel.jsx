/**
 * StaffAboutMePanel
 *
 * Staff-facing editor for the student/client self-advocacy passport.
 */
const fields = [
  ["Things that help", "thingsThatHelp"],
  ["Hard things", "hardThings"],
  ["How they say yes/no", "howISayYesNo"],
  ["How they ask for help", "howIAskForHelp"],
  ["Safe people", "safePeople"],
  ["Favorite rewards", "favoriteRewards"],
  ["Break choices", "breakChoices"],
  ["Sensory tools", "sensoryTools"],
  ["What not to do", "whatNotToDo"],
  ["Emergency/support notes", "emergencyNotes"],
];

export default function StaffAboutMePanel({ aboutMeProfile, onUpdateAboutMeProfile }) {
  function updateField(key, value) {
    onUpdateAboutMeProfile({
      ...aboutMeProfile,
      [key]: value,
    });
  }

  return (
    <section className="panel staff-about-me-panel" aria-labelledby="staff-about-me-heading">
      <div>
        <p className="eyebrow">Self-advocacy passport</p>
        <h2 id="staff-about-me-heading">About Me profile</h2>
        <p className="field-help">
          Keep this plain-language and useful for new staff, substitutes, job coaches, and caregivers.
        </p>
      </div>

      <div className="about-me-editor-grid">
        {fields.map(([label, key]) => (
          <label key={key}>
            {label}
            <textarea
              rows="2"
              value={aboutMeProfile?.[key] ?? ""}
              onChange={(event) => updateField(key, event.target.value)}
            />
          </label>
        ))}
      </div>
    </section>
  );
}
