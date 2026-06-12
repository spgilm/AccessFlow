export default function EmptyState({ variant = "student" }) {
  return (
    <section className="panel empty-state" aria-labelledby="empty-heading">
      <div className="empty-visual" aria-hidden="true">
        🗓️
      </div>
      <h2 id="empty-heading">No activities yet</h2>
      <p>
        {variant === "staff"
          ? "Use Staff Mode to add a general task and create visual steps."
          : "Ask staff to add activities to today's schedule."}
      </p>
    </section>
  );
}
