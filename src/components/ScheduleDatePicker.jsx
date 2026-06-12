/**
 * ScheduleDatePicker keeps date navigation simple and explicit.
 *
 * Staff can plan future dates, and students can see which day's schedule is active.
 * The component intentionally avoids a full calendar grid because the mobile UI should
 * stay low-clutter and predictable.
 */
export default function ScheduleDatePicker({ scheduleDate, onScheduleDateChange, compact = false }) {
  return (
    <section className={compact ? "schedule-date-strip compact-date-strip" : "panel schedule-date-strip"}>
      <label>
        Schedule date
        <input
          type="date"
          value={scheduleDate}
          onChange={(event) => onScheduleDateChange(event.target.value)}
        />
      </label>
    </section>
  );
}
