import "./RecentActivity.css";

function ActivityItem({ type, label, time, status }) {
  return (
    <div className="activity-item">
      <div className="activity-left">
        <span className={`activity-dot ${status}`} />
        <div className="activity-text">
          <div className="activity-label">{label}</div>
          <div className="activity-time">{time}</div>
        </div>
      </div>

      <span className={`activity-status ${status}`}>{type}</span>
    </div>
  );
}

export default function RecentActivity() {
  return (
    <div className="recent-activity">
      <h3 className="recent-activity-title">Recent Activity</h3>

      <div className="activity-list">
        <ActivityItem
          type="ENTRY"
          label="Vehicle entry detected · MH12 AB 1234"
          time="2 minutes ago"
          status="success"
        />

        <ActivityItem
          type="SLOT"
          label="Slot A12 auto-confirmed by sensor"
          time="2 minutes ago"
          status="success"
        />

        <ActivityItem
          type="EXIT"
          label="Vehicle exit detected · MH12 AB 1234"
          time="45 minutes ago"
          status="success"
        />

        <ActivityItem
          type="BILLING"
          label="Parking bill generated · ₹120"
          time="45 minutes ago"
          status="success"
        />

        <ActivityItem
          type="PAYMENT"
          label="Payment pending at exit gate · MH04 XY 7788"
          time="1 hour ago"
          status="warning"
        />
      </div>
    </div>
  );
}
