import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import "./VehicleModal.css";

const VehicleModal = ({ open, onClose, onSave }) => {
  const [vehicle, setVehicle] = useState({
    number: "",
    type: "",
  });

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!vehicle.number.trim()) return;
    onSave(vehicle);
    onClose();
    setVehicle({ number: "", type: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="vehicle-modal">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
        </DialogHeader>

        <div className="modal-body">
          <div className="modal-group">
            <label>Vehicle Number</label>
            <Input
              name="number"
              value={vehicle.number}
              onChange={handleChange}
            />
          </div>

          <div className="modal-group">
            <label>Vehicle Type</label>
            <Input
              name="type"
              value={vehicle.type}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter>
          <Button className="save-vehicle" onClick={handleSubmit}>
            Save Vehicle
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default VehicleModal;
