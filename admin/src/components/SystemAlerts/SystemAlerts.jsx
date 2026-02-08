import "./SystemAlerts.css";

function AlertItem({ title, description, severity }) {
  return (
    <div className={`alert-item alert-${severity}`}>
      <div className="alert-content">
        <div className="alert-title">{title}</div>
        <div className="alert-description">{description}</div>
      </div>
      <span className={`alert-badge ${severity}`}>{severity}</span>
    </div>
  );
}

export default function SystemAlerts() {
  return (
    <div className="system-alerts">
      <h3 className="system-alerts-title">Alerts</h3>

      <div className="alerts-list">
        <AlertItem
          title="Payment Pending at Exit"
          description="Vehicle MH04 XY 7788 blocked at exit gate"
          severity="warning"
        />

        <AlertItem
          title="ANPR Mismatch Detected"
          description="Entry and exit plates do not match · Gate 2"
          severity="danger"
        />
      </div>
    </div>
  );
}
