import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import "./ParkingHistory.css";
import { useStore } from "../../../Context/StoreContext";

const ParkingHistory = () => {
  const { history } = useStore();

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
            {history.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-4 text-gray-500"
                >
                  No parking records found.
                </TableCell>
              </TableRow>
            ) : (
              history.map((record) => {
                const entry = new Date(record.entryTime);
                const exit = new Date(record.exitTime);
                const durationMin = Math.ceil((exit - entry) / (1000 * 60));

                return (
                  <TableRow key={record._id}>
                    <TableCell>{exit.toLocaleDateString()}</TableCell>
                    <TableCell>SmartParkX Main Parking</TableCell>
                    <TableCell>{record.slot || "—"}</TableCell>
                    <TableCell>{durationMin} min</TableCell>
                    <TableCell>₹{record.billAmount}</TableCell>
                    <TableCell>
                      <span className="status completed">Completed</span>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ParkingHistory;
