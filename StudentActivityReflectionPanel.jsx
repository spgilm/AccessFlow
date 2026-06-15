/**
 * AboutMeExportPanel
 *
 * Copyable About Me / self-advocacy passport export.
 */
import { useMemo, useState } from "react";

function buildAboutMeText(profile, aboutMeProfile) {
  const name = profile?.name ?? "Selected profile";
  return [
    `About Me: ${name}`,
    `Generated: ${new Date().toLocaleString()}`,
    "",
    "Things that help me",
    aboutMeProfile?.thingsThatHelp || "-",
    "",
    "Things that are hard",
    aboutMeProfile?.hardThings || "-",
    "",
    "How I say yes or no",
    aboutMeProfile?.howISayYesNo || "-",
    "",
    "How I ask for help",
    aboutMeProfile?.howIAskForHelp || "-",
    "",
    "My safe people",
    aboutMeProfile?.safePeople || "-",
    "",
    "My favorite rewards",
    aboutMeProfile?.favoriteRewards || "-",
    "",
    "My break choices",
    aboutMeProfile?.breakChoices || "-",
    "",
    "My sensory tools",
    aboutMeProfile?.sensoryTools || "-",
    "",
    "What not to do",
    aboutMeProfile?.whatNotToDo || "-",
    "",
    "Emergency/support notes",
    aboutMeProfile?.emergencyNotes || "-",
    "",
    "Prototype note: do not use with real identifying data until privacy/security controls are production-ready.",
  ].join("\n");
}

export default function AboutMeExportPanel({ selectedProfile, aboutMeProfile }) {
  const [copyStatus, setCopyStatus] = useState("");
  const aboutMeText = useMemo(
    () => buildAboutMeText(selectedProfile, aboutMeProfile),
    [selectedProfile, aboutMeProfile]
  );

  async function copyAboutMe() {
    try {
      await navigator.clipboard.writeText(aboutMeText);
      setCopyStatus("About Me profile copied.");
    } catch {
      setCopyStatus("Copy unavailable. Select the text and copy manually.");
    }
  }

  return (
    <section className="panel about-me-export-panel" aria-labelledby="about-me-export-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">About Me export</p>
          <h2 id="about-me-export-heading">Copy self-advocacy passport</h2>
          <p className="field-help">Use mock data only until production privacy/security controls are complete.</p>
        </div>
        <button type="button" className="secondary-button" onClick={copyAboutMe}>
          Copy About Me
        </button>
      </div>

      {copyStatus ? <p className="copy-status">{copyStatus}</p> : null}
      <pre className="handoff-preview">{aboutMeText}</pre>
    </section>
  );
}
