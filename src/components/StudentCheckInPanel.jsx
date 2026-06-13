/**
 * Student-facing daily check-in.
 */
export default function StudentCheckInPanel({ onRecordCheckIn }) {
  const feelings = [
    ["Happy", "😀"],
    ["Sad", "😢"],
    ["Mad", "😡"],
    ["Worried", "😟"],
    ["Calm", "😌"],
  ];
  const energyLevels = ["Low", "Okay", "High"];
  const needs = ["Help", "Break", "Drink", "Bathroom", "Quiet"];

  function record(partial) {
    onRecordCheckIn(partial);
  }

  return (
    <section className="panel student-checkin-panel" aria-labelledby="student-checkin-heading">
      <div className="focus-header compact-focus-header">
        <p className="eyebrow">Check in</p>
        <h2 id="student-checkin-heading">How are you?</h2>
      </div>

      <div className="checkin-group" aria-label="Feelings">
        {feelings.map(([label, emoji]) => (
          <button key={label} type="button" onClick={() => record({ feeling: label })}>
            <span aria-hidden="true">{emoji}</span>
            <strong>{label}</strong>
          </button>
        ))}
      </div>

      <div className="checkin-group compact-checkin-group" aria-label="Energy">
        {energyLevels.map((level) => (
          <button key={level} type="button" onClick={() => record({ energy: level })}>
            {level}
          </button>
        ))}
      </div>

      <div className="checkin-group compact-checkin-group" aria-label="Need">
        {needs.map((need) => (
          <button key={need} type="button" onClick={() => record({ need })}>
            {need}
          </button>
        ))}
      </div>
    </section>
  );
}
