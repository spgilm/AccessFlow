/**
 * StaffLifeSkillsSettingsPanel
 *
 * Staff-facing editor for community/vocational/life-skill settings.
 */
import StaffVisualChoiceEditor from "./StaffVisualChoiceEditor.jsx";

export default function StaffLifeSkillsSettingsPanel({ lifeSkillsSettings, visualLibrary = [], onUpdateLifeSkillsSettings }) {
  const communityCards = lifeSkillsSettings?.communityCards ?? [];
  const vocationalActions = lifeSkillsSettings?.vocationalActions ?? [];

  function updateSettings(patch) {
    onUpdateLifeSkillsSettings({
      ...lifeSkillsSettings,
      ...patch,
    });
  }

  return (
    <section className="panel life-skills-settings-panel" aria-labelledby="life-skills-settings-heading">
      <div>
        <p className="eyebrow">Life skills</p>
        <h2 id="life-skills-settings-heading">Community and vocational supports</h2>
        <p className="field-help">
          Configure labels and visual symbols for community cards and vocational task buttons.
        </p>
      </div>

      <div className="communication-settings-grid">
        <StaffVisualChoiceEditor
          title="Community cards"
          description="Community access, safety, and public-setting communication cards."
          items={communityCards}
          visualLibrary={visualLibrary}
          defaultIcon="location"
          addPlaceholder="Add community card"
          onChangeItems={(nextItems) => updateSettings({ communityCards: nextItems })}
        />

        <StaffVisualChoiceEditor
          title="Vocational actions"
          description="Work, classroom job, chore, or supported employment action buttons."
          items={vocationalActions}
          visualLibrary={visualLibrary}
          defaultIcon="briefcase"
          addPlaceholder="Add work action"
          onChangeItems={(nextItems) => updateSettings({ vocationalActions: nextItems })}
        />
      </div>
    </section>
  );
}
