/**
 * Staff quick session note wizard.
 */
import { useState } from "react";

export default function SessionNoteWizardPanel({ onAddSessionNote }) {
  const [setting, setSetting] = useState("");
  const [focus, setFocus] = useState("");
  const [whatWorked, setWhatWorked] = useState("");
  const [concerns, setConcerns] = useState("");
  const [nextTime, setNextTime] = useState("");

  function submit(event) {
    event.preventDefault();

    onAddSessionNote({
      setting,
      focus,
      whatWorked,
      concerns,
      nextTime,
    });

    setSetting("");
    setFocus("");
    setWhatWorked("");
    setConcerns("");
    setNextTime("");
  }

  return (
    <section className="panel session-note-panel" aria-labelledby="session-note-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Session note</p>
          <h2 id="session-note-heading">Quick note wizard</h2>
        </div>
      </div>

      <form className="session-note-grid" onSubmit={submit}>
        <label>
          Setting
          <input value={setting} onChange={(event) => setSetting(event.target.value)} />
        </label>
        <label>
          Goal / skill focus
          <input value={focus} onChange={(event) => setFocus(event.target.value)} />
        </label>
        <label>
          What worked?
          <textarea rows="2" value={whatWorked} onChange={(event) => setWhatWorked(event.target.value)} />
        </label>
        <label>
          Concerns / barriers
          <textarea rows="2" value={concerns} onChange={(event) => setConcerns(event.target.value)} />
        </label>
        <label>
          Next time
          <textarea rows="2" value={nextTime} onChange={(event) => setNextTime(event.target.value)} />
        </label>
        <button type="submit" className="primary-wide-button">
          Save session note
        </button>
      </form>
    </section>
  );
}
