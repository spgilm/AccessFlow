export default function EmptyState() {
  return (
    <section className="panel empty-state" aria-labelledby="empty-heading">
      <div className="empty-visual" aria-hidden="true">
        🗓️
      </div>
      <h2 id="empty-heading">No activities yet</h2>
      <p>Add a general task above. AccessFlow will create a visual schedule card and smaller steps.</p>
    </section>
  );
}
