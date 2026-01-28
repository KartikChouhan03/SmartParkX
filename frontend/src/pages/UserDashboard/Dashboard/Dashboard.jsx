import React from "react";
import "./Dashboard.css";
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import Nav from "../../../components/Dashboard/Nav/Nav.jsx";
import ParkingGrid from "../../../components/Dashboard/ParkingGrid/ParkingGrid";
import ParkingStatus from "../../../components/Dashboard/ParkingStatus/ParkingStatus";
import LastParkingSummary from "../../../components/LastParkingSummary/LastParkingSummary";

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <Nav />
      <div className="dashboard">
        <ParkingGrid />
        <ParkingStatus />
        <LastParkingSummary />
      </div>
    </div>
  );
};

export default Dashboard;
