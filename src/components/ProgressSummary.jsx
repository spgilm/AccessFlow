function getNowNext(activities) {
  const nextIncompleteIndex = activities.findIndex((activity) => !activity.completed);

  if (nextIncompleteIndex === -1) {
    return {
      now: "All done",
      next: "Finished for now",
    };
  }

  return {
    now: activities[nextIncompleteIndex]?.label ?? "No activity",
    next: activities[nextIncompleteIndex + 1]?.label ?? "Finished for now",
  };
}

export default function ProgressSummary({ activities }) {
  const total = activities.length;
  const completed = activities.filter((activity) => activity.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const { now, next } = getNowNext(activities);

  return (
    <section className="progress-panel" aria-label="Schedule progress">
      <div className="now-next-grid">
        <div className="now-next-card">
          <span className="now-next-label">Now</span>
          <strong>{now}</strong>
        </div>
        <div className="now-next-card">
          <span className="now-next-label">Next</span>
          <strong>{next}</strong>
        </div>
      </div>

      <div className="progress-row">
        <span>
          {completed} of {total} complete
        </span>
        <span>{percent}%</span>
      </div>

      <div className="progress-track" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
}
