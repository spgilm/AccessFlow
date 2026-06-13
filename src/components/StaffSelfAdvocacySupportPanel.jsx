/**
 * StaffSelfAdvocacySupportPanel
 *
 * Staff-facing editor for self-advocacy communication defaults.
 */
import StaffVisualChoiceEditor from "./StaffVisualChoiceEditor.jsx";

export default function StaffSelfAdvocacySupportPanel({
  selfAdvocacySupportSettings,
  visualLibrary = [],
  onUpdateSelfAdvocacySupportSettings,
}) {
  const yesNoResponses = selfAdvocacySupportSettings?.yesNoResponses ?? [];
  const helpTopics = selfAdvocacySupportSettings?.helpTopics ?? [];
  const helpActions = selfAdvocacySupportSettings?.helpActions ?? [];
  const decisionChoices = selfAdvocacySupportSettings?.decisionChoices ?? [];
  const stuckReasons = selfAdvocacySupportSettings?.stuckReasons ?? [];
  const scheduleChangeRequests = selfAdvocacySupportSettings?.scheduleChangeRequests ?? [];

  function updateSettings(patch) {
    onUpdateSelfAdvocacySupportSettings({
      ...selfAdvocacySupportSettings,
      ...patch,
    });
  }

  return (
    <section className="panel self-advocacy-settings-panel" aria-labelledby="self-advocacy-settings-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Self-advocacy</p>
          <h2 id="self-advocacy-settings-heading">Answers, help, choices, and change requests</h2>
          <p className="field-help">
            Edit labels and visuals. Labels remain the communication/read-aloud/event-log value.
          </p>
        </div>
      </div>

      <div className="communication-settings-grid">
        <StaffVisualChoiceEditor
          title="Yes / No board"
          description="Consent, refusal, uncertainty, and asking for more time."
          items={yesNoResponses}
          visualLibrary={visualLibrary}
          defaultIcon="check"
          addPlaceholder="Add response"
          onChangeItems={(nextItems) => updateSettings({ yesNoResponses: nextItems })}
        />

        <StaffVisualChoiceEditor
          title="Help topics"
          description={`${helpTopics.length} help topics available.`}
          items={helpTopics}
          visualLibrary={visualLibrary}
          defaultIcon="help"
          addPlaceholder="Add help topic"
          onChangeItems={(nextItems) => updateSettings({ helpTopics: nextItems })}
        />

        <StaffVisualChoiceEditor
          title="Help actions"
          description={`${helpActions.length} help actions available.`}
          items={helpActions}
          visualLibrary={visualLibrary}
          defaultIcon="hand"
          addPlaceholder="Add help action"
          onChangeItems={(nextItems) => updateSettings({ helpActions: nextItems })}
        />

        <StaffVisualChoiceEditor
          title="Decision choices"
          description={`${decisionChoices.length} decision choices available.`}
          items={decisionChoices}
          visualLibrary={visualLibrary}
          defaultIcon="comment"
          addPlaceholder="Add decision choice"
          onChangeItems={(nextItems) => updateSettings({ decisionChoices: nextItems })}
        />

        <StaffVisualChoiceEditor
          title="Stuck reasons"
          description={`${stuckReasons.length} stuck reasons available.`}
          items={stuckReasons}
          visualLibrary={visualLibrary}
          defaultIcon="question"
          addPlaceholder="Add stuck reason"
          onChangeItems={(nextItems) => updateSettings({ stuckReasons: nextItems })}
        />

        <StaffVisualChoiceEditor
          title="Schedule change requests"
          description={`${scheduleChangeRequests.length} change request options available.`}
          items={scheduleChangeRequests}
          visualLibrary={visualLibrary}
          defaultIcon="calendar"
          addPlaceholder="Add schedule change request"
          onChangeItems={(nextItems) => updateSettings({ scheduleChangeRequests: nextItems })}
        />
      </div>
    </section>
  );
}
