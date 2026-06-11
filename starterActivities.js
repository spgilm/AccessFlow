import AddActivityForm from "./AddActivityForm.jsx";
import StaffActivityEditor from "./StaffActivityEditor.jsx";
import StaffActivityList from "./StaffActivityList.jsx";

export default function StaffView({
  activities,
  selectedActivity,
  selectedActivityId,
  onAddActivity,
  onSelectActivity,
  onMoveActivity,
  onUpdateActivity,
  onUpdateStep,
  onAddStep,
  onDeleteStep,
  onMoveStep,
  onDeleteActivity,
  onResetDemo,
  onClearSchedule,
}) {
  return (
    <div className="staff-view">
      <AddActivityForm onAddActivity={onAddActivity} />

      <div className="workspace-grid staff-grid">
        <StaffActivityList
          activities={activities}
          selectedActivityId={selectedActivityId}
          onSelectActivity={onSelectActivity}
          onMoveActivity={onMoveActivity}
          onDeleteActivity={onDeleteActivity}
        />

        <StaffActivityEditor
          activity={selectedActivity}
          onUpdateActivity={onUpdateActivity}
          onUpdateStep={onUpdateStep}
          onAddStep={onAddStep}
          onDeleteStep={onDeleteStep}
          onMoveStep={onMoveStep}
          onDeleteActivity={onDeleteActivity}
        />
      </div>

      <section className="panel controls-panel" aria-label="Schedule controls">
        <button type="button" className="secondary-button" onClick={onResetDemo}>
          Reset demo
        </button>
        <button type="button" className="danger-button" onClick={onClearSchedule}>
          Clear schedule
        </button>
      </section>
    </div>
  );
}
