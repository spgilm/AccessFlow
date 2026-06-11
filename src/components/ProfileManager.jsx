import { useState } from "react";

export default function ProfileManager({
  profiles,
  selectedProfile,
  selectedProfileId,
  onSelectProfile,
  onAddProfile,
  onUpdateProfile,
  onDeleteProfile,
}) {
  const [newProfileName, setNewProfileName] = useState("");

  function handleAddProfile(event) {
    event.preventDefault();

    const trimmed = newProfileName.trim();
    if (!trimmed) {
      return;
    }

    onAddProfile(trimmed);
    setNewProfileName("");
  }

  return (
    <section className="panel profile-panel" aria-labelledby="profile-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Profiles</p>
          <h2 id="profile-heading">Student / client</h2>
        </div>
      </div>

      <div className="profile-layout">
        <label>
          Active profile
          <select
            value={selectedProfileId ?? ""}
            onChange={(event) => onSelectProfile(event.target.value)}
          >
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
        </label>

        <form className="compact-form" onSubmit={handleAddProfile}>
          <label>
            Add profile
            <div className="inline-control-row">
              <input
                type="text"
                value={newProfileName}
                placeholder="Student name"
                onChange={(event) => setNewProfileName(event.target.value)}
              />
              <button type="submit">Add</button>
            </div>
          </label>
        </form>
      </div>

      {selectedProfile ? (
        <div className="profile-editor">
          <label>
            Profile name
            <input
              type="text"
              value={selectedProfile.name}
              onChange={(event) =>
                onUpdateProfile(selectedProfile.id, { name: event.target.value })
              }
            />
          </label>

          <label>
            Support notes
            <textarea
              value={selectedProfile.notes ?? ""}
              rows="3"
              placeholder="Access needs, prompts, reinforcement preferences, sensory notes, etc."
              onChange={(event) =>
                onUpdateProfile(selectedProfile.id, { notes: event.target.value })
              }
            />
          </label>

          <div className="profile-meta">
            <span>{selectedProfile.activities.length} activities in current schedule</span>
            <button
              type="button"
              className="small-danger-button"
              onClick={() => onDeleteProfile(selectedProfile.id)}
              disabled={profiles.length <= 1}
            >
              Delete profile
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
