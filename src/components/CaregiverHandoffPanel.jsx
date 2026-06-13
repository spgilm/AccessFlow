/**
 * CaregiverHandoffPanel
 *
 * Staff-facing caregiver/family handoff generator.
 */
import { useMemo, useState } from "react";

function buildHandoffText({ selectedProfile, prompts, responses }) {
  const lines = [
    `Caregiver / family handoff for ${selectedProfile?.name ?? "selected profile"}`,
    `Generated: ${new Date().toLocaleString()}`,
    "",
  ];

  prompts.forEach((prompt) => {
    lines.push(`${prompt}`);
    lines.push(responses[prompt]?.trim() || "-");
    lines.push("");
  });

  lines.push("Prototype note: do not use with real identifying data until production privacy/security controls are complete.");

  return lines.join("\n");
}

export default function CaregiverHandoffPanel({ selectedProfile, lifeSkillsSettings }) {
  const prompts = lifeSkillsSettings?.handoffPrompts ?? [];
  const [responses, setResponses] = useState({});
  const [copyStatus, setCopyStatus] = useState("");

  const handoffText = useMemo(
    () => buildHandoffText({ selectedProfile, prompts, responses }),
    [selectedProfile, prompts, responses]
  );

  function updateResponse(prompt, value) {
    setResponses((current) => ({
      ...current,
      [prompt]: value,
    }));
    setCopyStatus("");
  }

  async function copyHandoff() {
    try {
      await navigator.clipboard.writeText(handoffText);
      setCopyStatus("Caregiver handoff copied.");
    } catch {
      setCopyStatus("Copy unavailable. Select the text and copy manually.");
    }
  }

  return (
    <section className="panel caregiver-handoff-panel" aria-labelledby="caregiver-handoff-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Caregiver handoff</p>
          <h2 id="caregiver-handoff-heading">Family / caregiver summary</h2>
          <p className="field-help">Use mock data only. Avoid identifying information until production controls are complete.</p>
        </div>
        <button type="button" className="secondary-button" onClick={copyHandoff}>
          Copy handoff
        </button>
      </div>

      <div className="handoff-prompt-grid">
        {prompts.map((prompt) => (
          <label key={prompt}>
            {prompt}
            <textarea
              rows="2"
              value={responses[prompt] ?? ""}
              onChange={(event) => updateResponse(prompt, event.target.value)}
              placeholder="Brief note"
            />
          </label>
        ))}
      </div>

      {copyStatus ? <p className="copy-status">{copyStatus}</p> : null}

      <pre className="handoff-preview">{handoffText}</pre>
    </section>
  );
}
