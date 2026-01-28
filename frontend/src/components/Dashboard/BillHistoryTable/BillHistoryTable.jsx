import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Download, ReceiptText } from "lucide-react";
import "./BillHistoryTable.css";
import ReceiptModal from "@/components/Dashboard/BillHistoryTable/ReceiptModal";
import { useState } from "react";
import { useStore } from "../../../Context/StoreContext";

const BillHistoryTable = () => {
  const { history } = useStore();

  const handleDownload = (row) => {
    console.log("Downloading receipt for:", row);
    // Later -> generate PDF
  };

  const [openModal, setOpenModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const handleViewReceipt = (row) => {
    setSelectedReceipt(row);
    setOpenModal(true);
  };

  return (
    <div className="bill-container">
      <ReceiptModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={selectedReceipt}
      />
      <h3 className="bill-title">Bill History</h3>

      <div className="bill-table-wrapper">
        <Table className="bill-table">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {history.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-4 text-gray-500"
                >
                  No bill history found.
                </TableCell>
              </TableRow>
            ) : (
              history.map((bill) => {
                const entry = new Date(bill.entryTime);
                const exit = new Date(bill.exitTime);
                const durationMin = Math.ceil((exit - entry) / (1000 * 60));

                return (
                  <TableRow key={bill._id}>
                    <TableCell>{exit.toLocaleDateString()}</TableCell>
                    <TableCell>SmartParkX Main Parking</TableCell>
                    <TableCell>{durationMin} min</TableCell>
                    <TableCell>₹{bill.billAmount}</TableCell>
                    <TableCell>
                      <span className="bill-status paid">Paid</span>
                    </TableCell>
                    <TableCell>
                      <button
                        className="bill-btn view-btn"
                        onClick={() =>
                          handleViewReceipt({
                            _id: bill._id,
                            date: exit.toLocaleString(),
                            location: "SmartParkX Main Parking",
                            duration: `${durationMin} min`,
                            amount: `₹${bill.billAmount}`,
                            status: "Paid",
                          })
                        }
                      >
                        <ReceiptText size={18} />
                      </button>
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

export default BillHistoryTable;
