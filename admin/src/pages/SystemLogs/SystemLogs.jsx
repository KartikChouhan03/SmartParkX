import "./SystemLogs.css";

export default function SystemLogs() {
  return (
    <div className="system-page">
      {/* ===== Header ===== */}
      <div className="system-header">
        <h1 className="system-title">System Health & Logs</h1>
        <p className="system-subtitle">
          Real-time system status and administrative events
        </p>
      </div>

      {/* ===== Health Panel ===== */}
      <div className="health-grid">
        <div className="health-card healthy">
          <span className="health-label">Backend API</span>
          <span className="health-status">Online</span>
        </div>

        <div className="health-card healthy">
          <span className="health-label">Database</span>
          <span className="health-status">Connected</span>
        </div>

        <div className="health-card warning">
          <span className="health-label">ANPR Camera</span>
          <span className="health-status">1 Offline</span>
        </div>

        <div className="health-card danger">
          <span className="health-label">Slot Sensors</span>
          <span className="health-status">2 Disconnected</span>
        </div>
      </div>

      {/* ===== Logs Table ===== */}
      <div className="logs-table-wrapper">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Source</th>
              <th>Message</th>
              <th>Severity</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>12 Sep 2026, 11:05 AM</td>
              <td>Billing</td>
              <td>Payment confirmed manually for MH12AB1234</td>
              <td>
                <span className="severity info">Info</span>
              </td>
            </tr>

            <tr>
              <td>12 Sep 2026, 10:48 AM</td>
              <td>ANPR Camera</td>
              <td>Camera 2 disconnected</td>
              <td>
                <span className="severity warning">Warning</span>
              </td>
            </tr>

            <tr>
              <td>12 Sep 2026, 10:22 AM</td>
              <td>Slot Sensor</td>
              <td>Slot B6 sensor not responding</td>
              <td>
                <span className="severity critical">Critical</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
