import "./ANPRLogs.css";

export default function ANPRLogs() {
  return (
    <div className="anpr-page">
      {/* ===== Header ===== */}
      <div className="anpr-header">
        <div>
          <h1 className="anpr-title">ANPR Logs</h1>
          <p className="anpr-subtitle">
            Vehicle entry and exit records captured via ANPR
          </p>
        </div>

        {/* Filters (static for now) */}
        <div className="anpr-filters">
          <select>
            <option>Today</option>
            <option>Last 24 Hours</option>
            <option>Custom</option>
          </select>

          <select>
            <option>All Gates</option>
            <option>Entry</option>
            <option>Exit</option>
          </select>

          <select>
            <option>All Status</option>
            <option>Active</option>
            <option>Completed</option>
            <option>Unpaid</option>
          </select>
        </div>
      </div>

      {/* ===== Logs Table ===== */}
      <div className="anpr-table-wrapper">
        <table className="anpr-table">
          <thead>
            <tr>
              <th>Plate Number</th>
              <th>Gate</th>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {/* Dummy rows for UI */}
            <tr>
              <td>MP22AJ9834</td>
              <td>Entry</td>
              <td>12 Sep 2026, 08:48 AM</td>
              <td>
                <span className="status active">Active</span>
              </td>
            </tr>

            <tr>
              <td>DL01CD5678</td>
              <td>Exit</td>
              <td>12 Sep 2026, 09:00 AM</td>
              <td>
                <span className="status completed">Completed</span>
              </td>
            </tr>

            <tr>
              <td>MH12AB1234</td>
              <td>Entry</td>
              <td>12 Sep 2026, 09:30 AM</td>
              <td>
                <span className="status active">Active</span>
              </td>
            </tr>

            <tr>
              <td>MH23AB1634</td>
              <td>Entry</td>
              <td>12 Sep 2026, 09:35 AM</td>
              <td>
                <span className="status active">Active</span>
              </td>
            </tr>

            <tr>
              <td>MH12HT9634</td>
              <td>Exit</td>
              <td>12 Sep 2026, 09:40 AM</td>
              <td>
                <span className="status completed">Completed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
