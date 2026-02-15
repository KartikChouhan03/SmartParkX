import React from "react";
import "./BillingTable.css";

export default function BillingTable() {
  const [records, setRecords] = React.useState([
    {
      id: 1,
      plate: "MH12AB1234",
      entry: "10:12 AM",
      exit: "—",
      duration: "2h 15m",
      amount: "₹120",
      status: "Pending",
    },
    {
      id: 2,
      plate: "KA01XY7788",
      entry: "09:00 AM",
      exit: "11:10 AM",
      duration: "2h 10m",
      amount: "₹140",
      status: "Paid",
    },
  ]);

  const handleMarkPaid = (id) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === id ? { ...record, status: "Paid" } : record,
      ),
    );
  };

  return (
    <div className="billing-card">
      <div className="card-header">
        <h3>Billing Records</h3>
      </div>

      <table className="billing-table">
        <thead>
          <tr>
            <th>Plate</th>
            <th>Entry Time</th>
            <th>Exit Time</th>
            <th>Duration</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.plate}</td>
              <td>{record.entry}</td>
              <td>{record.exit}</td>
              <td>{record.duration}</td>
              <td>{record.amount}</td>
              <td>
                <span className={`status ${record.status.toLowerCase()}`}>
                  {record.status}
                </span>
              </td>
              <td>
                {record.status === "Pending" ? (
                  <button
                    className="mark-paid"
                    onClick={() => handleMarkPaid(record.id)}
                  >
                    Mark Paid
                  </button>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
