/**
 * StaffVisualCoveragePanel
 *
 * Audits communication-button visual coverage and applies suggested icons
 * where items are emoji-only or text fallback.
 */
import IconSymbol from "./IconSymbol.jsx";
import {
  applySuggestedIconsToSettings,
  buildVisualCoverageRows,
} from "../utils/visualCoverage.js";

export default function StaffVisualCoveragePanel({
  aacExpansionSettings,
  communicationSupportSettings,
  selfAdvocacySupportSettings,
  lifeSkillsSettings,
  onUpdateAacExpansionSettings,
  onUpdateCommunicationSupportSettings,
  onUpdateSelfAdvocacySupportSettings,
  onUpdateLifeSkillsSettings,
}) {
  const settings = {
    aacExpansionSettings,
    communicationSupportSettings,
    selfAdvocacySupportSettings,
    lifeSkillsSettings,
  };

  const groups = buildVisualCoverageRows(settings);
  const totalItems = groups.reduce((sum, group) => sum + group.total, 0);
  const iconCount = groups.reduce((sum, group) => sum + group.iconCount, 0);
  const savedVisualCount = groups.reduce((sum, group) => sum + group.savedVisualCount, 0);
  const weakVisualCount = groups.reduce((sum, group) => sum + group.emojiOnlyCount + group.textFallbackCount, 0);

  function applySuggestedIcons() {
    const nextSettings = applySuggestedIconsToSettings(settings);

    onUpdateAacExpansionSettings(nextSettings.aacExpansionSettings);
    onUpdateCommunicationSupportSettings(nextSettings.communicationSupportSettings);
    onUpdateSelfAdvocacySupportSettings(nextSettings.selfAdvocacySupportSettings);
    onUpdateLifeSkillsSettings(nextSettings.lifeSkillsSettings);
  }

  return (
    <section className="panel visual-coverage-panel" aria-labelledby="visual-coverage-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Visual coverage</p>
          <h2 id="visual-coverage-heading">Communication visual audit</h2>
          <p className="field-help">
            Review which communication buttons use saved visuals, Font Awesome icons, emoji-only visuals, or text fallback.
            Labels remain the communication/read-aloud/event-log text.
          </p>
        </div>
        <button type="button" className="secondary-button" onClick={applySuggestedIcons}>
          Apply suggested icons
        </button>
      </div>

      <div className="visual-coverage-summary-grid">
        <article>
          <strong>{totalItems}</strong>
          <span>Total buttons</span>
        </article>
        <article>
          <strong>{savedVisualCount}</strong>
          <span>Saved visuals</span>
        </article>
        <article>
          <strong>{iconCount}</strong>
          <span>Font Awesome icons</span>
        </article>
        <article>
          <strong>{weakVisualCount}</strong>
          <span>Emoji/text fallback</span>
        </article>
      </div>

      <div className="visual-coverage-group-list">
        {groups.map((group) => (
          <details key={group.path} className="visual-coverage-group">
            <summary>
              <span>
                <strong>{group.label}</strong>
                <small>
                  {group.total} total · {group.savedVisualCount} saved · {group.iconCount} icons · {group.emojiOnlyCount + group.textFallbackCount} weak
                </small>
              </span>
            </summary>

            <div className="visual-coverage-row-list">
              {group.rows.map((item) => (
                <article key={item.id} className={item.needsSuggestion ? "visual-coverage-row needs-visual" : "visual-coverage-row"}>
                  <div className="visual-coverage-preview">
                    <IconSymbol item={item} />
                    <strong>{item.label}</strong>
                  </div>
                  <span>{item.source}</span>
                  {item.needsSuggestion ? <span>Suggestion: {item.suggestedIcon}</span> : <span>Looks covered</span>}
                </article>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
