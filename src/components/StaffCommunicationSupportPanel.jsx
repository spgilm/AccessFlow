/**
 * StaffCommunicationSupportPanel
 *
 * Staff-facing editor for communication support defaults.
 */
import StaffVisualChoiceEditor from "./StaffVisualChoiceEditor.jsx";

export default function StaffCommunicationSupportPanel({
  communicationSupportSettings,
  visualLibrary = [],
  onUpdateCommunicationSupportSettings,
}) {
  const painBodyParts = communicationSupportSettings?.painBodyParts ?? [];
  const painDescriptors = communicationSupportSettings?.painDescriptors ?? [];
  const regulationPathway = communicationSupportSettings?.regulationPathway ?? {};
  const waitingSupport = communicationSupportSettings?.waitingSupport ?? {};
  const sensoryRequests = communicationSupportSettings?.sensoryRequests ?? [];

  function updateSettings(patch) {
    onUpdateCommunicationSupportSettings({
      ...communicationSupportSettings,
      ...patch,
    });
  }

  function updateWaitingTimer(minutes) {
    updateSettings({
      waitingSupport: {
        ...waitingSupport,
        timerMinutes: Math.max(1, Number(minutes) || 1),
      },
    });
  }

  return (
    <section className="panel communication-support-settings-panel" aria-labelledby="communication-support-settings-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Communication supports</p>
          <h2 id="communication-support-settings-heading">Pain, sensory, feelings, and waiting</h2>
          <p className="field-help">
            Edit labels and visuals. Labels stay visible in Student Mode and remain the read-aloud/event-log text.
          </p>
        </div>
      </div>

      <div className="communication-settings-grid">
        <article>
          <h3>Pain/body board</h3>
          <p className="field-help">
            {painBodyParts.length} body choices and {painDescriptors.length} descriptor choices are available.
          </p>
          <p className="field-help">
            Use this for non-diagnostic communication. Staff should still follow agency health/safety procedures.
          </p>
        </article>

        <article>
          <h3>Regulation pathway</h3>
          <p className="field-help">
            {(regulationPathway.feelings ?? []).length} feelings and {(regulationPathway.needs ?? []).length} support needs are available.
          </p>
          <p className="field-help">
            Student path: feeling → need → ready check.
          </p>
        </article>

        <article>
          <h3>Waiting support</h3>
          <label>
            Wait timer minutes
            <input
              type="number"
              min="1"
              max="60"
              value={waitingSupport.timerMinutes ?? 2}
              onChange={(event) => updateWaitingTimer(event.target.value)}
            />
          </label>
        </article>

        <StaffVisualChoiceEditor
          title="Sensory requests"
          description="Customize sensory request labels, emoji fallbacks, and Font Awesome icons."
          items={sensoryRequests}
          visualLibrary={visualLibrary}
          defaultIcon="headphones"
          addPlaceholder="Add request, e.g. I need dim lights"
          onChangeItems={(nextItems) => updateSettings({ sensoryRequests: nextItems })}
        />
      </div>
    </section>
  );
}
