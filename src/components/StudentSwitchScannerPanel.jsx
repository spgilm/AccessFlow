import IconSymbol from "./IconSymbol.jsx";

/**
 * StudentSwitchScannerPanel
 *
 * Prototype switch-scanning board. This is a front-end access-method demo,
 * not a hardware integration layer.
 */
import { useEffect, useMemo, useState } from "react";

const scannerItems = [
  { id: "help", label: "Help", emoji: "🙋", icon: "help" },
  { id: "break", label: "Break", emoji: "🧘", icon: "pause" },
  { id: "yes", label: "Yes", emoji: "✅", icon: "check" },
  { id: "no", label: "No", emoji: "❌", icon: "xmark" },
  { id: "wait", label: "Wait", emoji: "✋", icon: "clock" },
  { id: "board", label: "Board", emoji: "💬", icon: "comment" },
];

export default function StudentSwitchScannerPanel({ onSupportRequest }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanIndex, setScanIndex] = useState(0);
  const [scanSpeed, setScanSpeed] = useState(1500);
  const items = useMemo(() => scannerItems, []);

  useEffect(() => {
    if (!isScanning) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setScanIndex((current) => (current + 1) % items.length);
    }, scanSpeed);

    return () => window.clearInterval(timer);
  }, [isScanning, items.length, scanSpeed]);

  function selectItem(item = items[scanIndex]) {
    onSupportRequest?.({
      type: "switch-scan-select",
      label: `Switch scan selected: ${item.label}`,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel switch-scanner-panel" aria-labelledby="switch-scanner-heading">
      <div>
        <p className="eyebrow">Switch access</p>
        <h3 id="switch-scanner-heading">Scan choices</h3>
        <p className="field-help">Prototype single-switch scanning. Use Start scan, then Select highlighted.</p>
      </div>

      <div className="switch-scanner-controls">
        <button type="button" className="secondary-button" onClick={() => setIsScanning((current) => !current)}>
          {isScanning ? "Pause scan" : "Start scan"}
        </button>
        <button type="button" className="primary-wide-button" onClick={() => selectItem()}>
          Select highlighted
        </button>
        <label>
          Scan speed
          <select value={scanSpeed} onChange={(event) => setScanSpeed(Number(event.target.value))}>
            <option value="2200">Slow</option>
            <option value="1500">Medium</option>
            <option value="900">Fast</option>
          </select>
        </label>
      </div>

      <div className="switch-scan-grid" role="list" aria-label="Switch scanning choices">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="listitem"
            className={index === scanIndex ? "switch-scan-choice is-scanning" : "switch-scan-choice"}
            onClick={() => {
              setScanIndex(index);
              selectItem(item);
            }}
            aria-current={index === scanIndex ? "true" : undefined}
            aria-label={item.label}
          >
            <IconSymbol item={item} />
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
