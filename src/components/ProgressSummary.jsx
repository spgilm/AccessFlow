import VisualSupport from "./VisualSupport.jsx";

function getNowNext(activities) {
  if (activities.length === 0) {
    return {
      now: {
        label: "No schedule yet",
        summary: "Add an activity to begin.",
        visual: "🗓️",
      },
      next: {
        label: "Plan the day",
        summary: "Choose from the activity library.",
        visual: "➕",
      },
    };
  }

  const nextIncompleteIndex = activities.findIndex((activity) => !activity.completed);

  if (nextIncompleteIndex === -1) {
    return {
      now: {
        label: "All done",
        summary: "Today’s schedule is complete.",
        visual: "✅",
      },
      next: {
        label: "Finished for now",
        summary: "No next activity.",
        visual: "⭐",
      },
    };
  }

  return {
    now: activities[nextIncompleteIndex] ?? null,
    next:
      activities[nextIncompleteIndex + 1] ?? {
        label: "Finished for now",
        summary: "No next activity.",
        visual: "⭐",
      },
  };
}

function getActivityVisual(activity, fallback) {
  if (!activity || typeof activity !== "object") {
    return fallback;
  }

  return activity.visual ?? activity.emoji ?? fallback;
}

function NowNextCard({ label, activity, fallbackVisual, className = "" }) {
  const title = activity?.label ?? "No activity";
  const summary = activity?.summary ?? "";
  const visual = getActivityVisual(activity, fallbackVisual);

  return (
    <div className={`now-next-card ${className}`}>
      <span className="now-next-label">{label}</span>
      <div className="now-next-content">
        <VisualSupport
          visual={visual}
          className="now-next-visual"
          fallback={fallbackVisual}
        />
        <span className="now-next-copy">
          <strong>{title}</strong>
          {summary ? <span className="now-next-summary">{summary}</span> : null}
        </span>
      </div>
    </div>
  );
}

export default function ProgressSummary({ activities }) {
  const total = activities.length;
  const completed = activities.filter((activity) => activity.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const { now, next } = getNowNext(activities);

  return (
    <section className="progress-panel" aria-label="Schedule progress">
      <div className="now-next-grid">
        <NowNextCard
          label="Now"
          activity={now}
          fallbackVisual="⭐"
          className="now-card"
        />
        <NowNextCard
          label="Next"
          activity={next}
          fallbackVisual="➡️"
        />
      </div>

      <div className="progress-row">
        <span>
          {completed} of {total} complete
        </span>
        <span>{percent}%</span>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Schedule completion"
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
}
