/**
 * v53 GUI review panel.
 *
 * This is a staff-facing design review checklist for preventing feature
 * accretion from overwhelming the Student Mode interface.
 */
export default function StaffGuiReviewPanel({ displaySettings }) {
  const navigationPreset = displaySettings?.studentNavigationPreset ?? "core";
  const isFull = navigationPreset === "full";
  const isCustom = navigationPreset === "custom";

  const reviewItems = [
    {
      label: "Default student navigation",
      status: navigationPreset === "core" || navigationPreset === "simple" ? "Ready" : "Review",
      note:
        navigationPreset === "core" || navigationPreset === "simple"
          ? "Student Mode is using a low-clutter navigation preset."
          : "Full or custom navigation may be appropriate, but should be tested with the specific student.",
    },
    {
      label: "Communication language",
      status: "Ready",
      note: "Student-facing communication is labeled Talk instead of Board.",
    },
    {
      label: "Calm tools",
      status: "Ready",
      note: "Regulation tools are grouped under Calm instead of mixed into every screen.",
    },
    {
      label: "Games visibility",
      status: displaySettings?.showGamesTab === false || navigationPreset !== "full" ? "Ready" : "Review",
      note: "Games should be optional and should not compete with Help or Calm tools.",
    },
  ];

  return (
    <section className="panel gui-review-panel" aria-labelledby="gui-review-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">v53 GUI review</p>
          <h2 id="gui-review-heading">Declutter check</h2>
          <p className="field-help">
            Use this panel before adding more features. The goal is to keep Student Mode simple enough to use under stress.
          </p>
        </div>
      </div>

      <div className="gui-review-summary">
        <article>
          <span>Navigation preset</span>
          <strong>{navigationPreset}</strong>
        </article>
        <article>
          <span>Risk level</span>
          <strong>{isFull || isCustom ? "Needs review" : "Lower clutter"}</strong>
        </article>
      </div>

      <div className="gui-review-list">
        {reviewItems.map((item) => (
          <article key={item.label} className={item.status === "Ready" ? "is-ready" : "needs-review"}>
            <span>{item.status}</span>
            <strong>{item.label}</strong>
            <p>{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
