import { useRef, useState } from "react";

export default function DataManagementPanel({
  exportStatus,
  importStatus,
  onExportBackup,
  onImportBackup,
}) {
  const fileInputRef = useRef(null);
  const [pendingFileName, setPendingFileName] = useState("");

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      setPendingFileName("");
      return;
    }

    setPendingFileName(file.name);
    onImportBackup(file);
    event.target.value = "";
  }

  return (
    <section className="panel data-management-panel" aria-labelledby="data-management-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Data</p>
          <h2 id="data-management-heading">Backup / restore</h2>
        </div>
      </div>

      <p className="field-help">
        Export a JSON backup before major edits or before testing new versions. Import restores
        profiles, schedules, templates, and documentation stored in this browser.
      </p>

      <div className="data-actions-grid">
        <button type="button" className="secondary-button" onClick={onExportBackup}>
          Export JSON backup
        </button>

        <label className="file-input-button">
          Import JSON backup
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {pendingFileName ? (
        <p className="data-file-name">Selected file: {pendingFileName}</p>
      ) : null}

      {exportStatus ? (
        <p className="copy-status" role="status">
          {exportStatus}
        </p>
      ) : null}

      {importStatus ? (
        <p className="copy-status" role="status">
          {importStatus}
        </p>
      ) : null}
    </section>
  );
}
