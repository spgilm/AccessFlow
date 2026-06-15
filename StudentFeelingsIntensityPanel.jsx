/**
 * StaffAlternativeAccessGuidePanel
 *
 * Staff-facing guide for calm mode, communication repair, switch scanning,
 * and eye-gaze friendly presets.
 */
export default function StaffAlternativeAccessGuidePanel({ displaySettings }) {
  const enabledItems = [
    displaySettings?.showCalmScreenPanel !== false ? "Calm screen" : null,
    displaySettings?.showCommunicationRepairPanel !== false ? "Communication repair" : null,
    displaySettings?.showSwitchScannerPanel !== false ? "Switch scanning prototype" : null,
    displaySettings?.reducedChoiceMode === true ? "Reduced-choice mode" : null,
    displaySettings?.eyeGazeFriendly === true ? "Eye-gaze friendly spacing" : null,
  ].filter(Boolean);

  return (
    <section className="panel alternative-access-guide-panel" aria-labelledby="alternative-access-guide-heading">
      <div>
        <p className="eyebrow">Alternative access</p>
        <h2 id="alternative-access-guide-heading">Calm mode and access-method supports</h2>
        <p className="field-help">
          Use these options for students who need fewer choices, larger stable targets, communication repair,
          or switch-scanning style access.
        </p>
      </div>

      <div className="alternative-access-status-grid">
        <article>
          <strong>Enabled now</strong>
          <p>{enabledItems.length > 0 ? enabledItems.join(", ") : "No alternative access tools enabled."}</p>
        </article>
        <article>
          <strong>Best presets</strong>
          <p>Try “Alternative access / eye gaze” or “Calm-first reduced choice” in Release candidate presets.</p>
        </article>
        <article>
          <strong>Prototype note</strong>
          <p>Switch scanning is a front-end prototype. Hardware switch integration is a later production task.</p>
        </article>
      </div>
    </section>
  );
}
