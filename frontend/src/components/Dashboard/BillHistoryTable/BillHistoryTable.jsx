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

const BillHistoryTable = () => {
  const billData = [
    {
      id: 1,
      date: "2025-10-25",
      location: "Block A - SmartParkX Center",
      duration: "1h 45m",
      amount: "₹60",
      status: "Paid",
    },
    {
      id: 2,
      date: "2025-10-20",
      location: "Mall Parking Zone B",
      duration: "2h 10m",
      amount: "₹80",
      status: "Paid",
    },
    {
      id: 3,
      date: "2025-10-15",
      location: "TechPark Basement 2",
      duration: "3h 05m",
      amount: "₹100",
      status: "Paid",
    },
  ];


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
            {billData.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell>{bill.date}</TableCell>
                <TableCell>{bill.location}</TableCell>
                <TableCell>{bill.duration}</TableCell>
                <TableCell>{bill.amount}</TableCell>
                <TableCell>
                  <span className="bill-status paid">{bill.status}</span>
                </TableCell>
                <TableCell>
                  <div className="bill-actions">
                    <button
                      className="bill-btn view-btn"
                      onClick={() => handleViewReceipt(bill)}
                    >
                      <ReceiptText size={18} />
                    </button>
                    
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BillHistoryTable;
