import React, { useState } from "react";
import "./QuickAction.css";

import {
  ShieldAlert,
  Ban,
  Wrench,
  Ticket,
  DoorOpen,
  ChevronDown,
} from "lucide-react";

const QuickAction = () => {
  const [showMoreActions, setShowMoreActions] = useState(false);

  return (
    <div className="quick-actions-toolbar">
      <h3 className="toolbar-title">Quick Actions</h3>
      <div className="action-buttons">
        {/* Primary: Emergency */}
        <button className="quick-btn emergency">
          <ShieldAlert size={18} />
          <span>Emergency Open</span>
        </button>

        {/* Secondary: Manual Entry */}
        <button className="quick-btn outline">
          <Ticket size={18} />
          <span>Manual Entry</span>
        </button>

        {/* Dropdown: More Actions */}
        <div className="action-dropdown">
          <button
            className="quick-btn outline icon-only"
            onClick={() => setShowMoreActions(!showMoreActions)}
          >
            More <ChevronDown size={16} />
          </button>

          {showMoreActions && (
            <div className="dropdown-menu">
              <button className="dropdown-item">
                <DoorOpen size={16} /> Waive Fee
              </button>
              <button className="dropdown-item">
                <Ban size={16} /> Block Plate
              </button>
              <button className="dropdown-item">
                <Wrench size={16} /> Maintenance
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickAction;
