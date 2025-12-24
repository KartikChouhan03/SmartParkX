import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./WalletModal.css";

const WalletModal = ({ open, onClose, onAdd }) => {
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    const value = parseInt(amount);
    if (isNaN(value) || value <= 0) return;

    onAdd(value);
    setAmount("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="wallet-modal">
        <DialogHeader>
          <DialogTitle>Add Money</DialogTitle>
        </DialogHeader>

        <div className="wallet-modal-body">
          <label>Enter Amount</label>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 100"
          />
        </div>

        <DialogFooter>
          <Button className="wallet-add-btn" onClick={handleAdd}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
