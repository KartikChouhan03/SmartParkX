import React from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import "./ParkingHistory.css"

const ParkingHistory = () => {
  const historyData = [
    {
      id: 1,
      date: "2025-10-25",
      location: "Block A - SmartParkX Center",
      slot: "A12",
      duration: "1h 45m",
      cost: "₹60",
      status: "Completed",
    },
    {
      id: 2,
      date: "2025-10-20",
      location: "Mall Parking Zone B",
      slot: "B05",
      duration: "2h 10m",
      cost: "₹80",
      status: "Completed",
    },
    {
      id: 3,
      date: "2025-10-15",
      location: "TechPark Basement 2",
      slot: "T08",
      duration: "3h 05m",
      cost: "₹100",
      status: "Completed",
    },
    {
      id: 4,
      date: "2025-10-10",
      location: "Mall Basement 2",
      slot: "08",
      duration: "4h 05m",
      cost: "₹120",
      status: "Completed",
    },
  ];

  return (
    <div className="history-container">
      <h3 className="history-title">Past Parking Records</h3>

      <div className="history-table-wrapper">
        <Table className="history-table">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Slot Number</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {historyData.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.location}</TableCell>
                <TableCell>{record.slot}</TableCell>
                <TableCell>{record.duration}</TableCell>
                <TableCell>{record.cost}</TableCell>
                <TableCell>
                  <span className="status completed">{record.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ParkingHistory
