import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import VehicleModal from "./VehicleModal";
import "./VehicleTab.css";

const VehicleTab = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      number: "MH14AB1234",
      type: "Car",
      default: true,
    },
    {
      id: 2,
      number: "GJ05CE1122",
      type: "car",
      default: false,
    },
  ]);

  const [openModal, setOpenModal] = useState(false);

  const handleVehicle = (newVehicle) => {
    setVehicles([...vehicles, { ...newVehicle, id: Date.now() }]);
  };

  const handleDelete = (id) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  const handleSetDefault = (id) => {
    setVehicles(
      vehicles.map((v) =>
        v.id === id ? { ...v, default: true } : { ...v, default: false }
      )
    );
  };

  return (
    <div className="vehicle-container">
      <div className="vehicle-header">
        <h2 className="vehicle-title">Your Vehicles</h2>
        <Button className="add-btn" onClick={() => setOpenModal(true)}>
          <Plus size={18} /> Add Vehicle
        </Button>
      </div>

      <div className="vehicle-list">
        {vehicles.map((vehicle) => (
          <div className="vehicle-card" key={vehicle.id}>
            <div className="vehicle-info">
              <h3>{vehicle.number}</h3>
              <p>{vehicle.type}</p>
            </div>

            <div className="vehicle-actions">
              <div className="default-toggle">
                <span>Default</span>
                <Switch
                  checked={vehicle.default}
                  onCheckedChange={() => handleSetDefault(vehicle.id)}
                />
              </div>

              <button
                className="delete-btn"
                onClick={() => handleDelete(vehicle.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <VehicleModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleVehicle}
      />
    </div>
  );
};

export default VehicleTab;
