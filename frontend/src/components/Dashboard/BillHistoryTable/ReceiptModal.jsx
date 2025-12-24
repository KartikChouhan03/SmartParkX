import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import "./ReceiptModal.css";

const ReceiptModal = ({ open, onClose, data }) => {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="receipt-modal">
        <DialogHeader>
          <DialogTitle>Parking Receipt</DialogTitle>
        </DialogHeader>

        <div className="receipt-body">
          <div className="receipt-row">
            <span>Date:</span>
            <span>{data.date}</span>
          </div>

          <div className="receipt-row">
            <span>Location:</span>
            <span>{data.location}</span>
          </div>

          <div className="receipt-row">
            <span>Duration:</span>
            <span>{data.duration}</span>
          </div>

          <div className="receipt-row">
            <span>Amount Paid:</span>
            <span>{data.amount}</span>
          </div>

          <div className="receipt-row">
            <span>Status:</span>
            <span className="receipt-status">{data.status}</span>
          </div>
        </div>

        <DialogFooter>
          <button className="download-receipt-btn">
            <Download size={18} />
            Download PDF
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
