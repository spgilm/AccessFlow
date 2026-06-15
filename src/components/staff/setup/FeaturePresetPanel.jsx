/**
 * FeaturePresetPanel
 *
 * v40 release-candidate preset launcher. Applies complete Student Mode
 * feature configurations so staff can avoid toggling dozens of settings.
 */
import { featurePresets } from "../../../data/featurePresets.js";
import { getDisplaySettings } from "../../../data/displaySettings.js";

export default function FeaturePresetPanel({ selectedProfile, onUpdateProfile, onOpenStudentMode }) {
  const displaySettings = getDisplaySettings(selectedProfile);

  function applyPreset(preset) {
    if (!selectedProfile) {
      return;
    }

    onUpdateProfile(selectedProfile.id, {
      displaySettings: {
        ...displaySettings,
        ...preset.settings,
        lastAppliedFeaturePreset: preset.id,
      },
    });
  }

  return (
    <section className="panel feature-preset-panel" aria-labelledby="feature-preset-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Release candidate presets</p>
          <h2 id="feature-preset-heading">Configure Student Mode quickly</h2>
          <p className="field-help">
            Apply a complete feature set for common access/support profiles. You can still fine-tune settings below.
          </p>
        </div>
        <button type="button" className="secondary-button" onClick={onOpenStudentMode}>
          Preview Student Mode
        </button>
      </div>

      <div className="feature-preset-grid">
        {featurePresets.map((preset) => {
          const active = displaySettings.lastAppliedFeaturePreset === preset.id;

          return (
            <article key={preset.id} className={active ? "feature-preset-card is-active" : "feature-preset-card"}>
              <div>
                <h3>{preset.name}</h3>
                <p>{preset.recommendedFor}</p>
              </div>
              <button type="button" onClick={() => applyPreset(preset)}>
                {active ? "Applied" : "Apply preset"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
