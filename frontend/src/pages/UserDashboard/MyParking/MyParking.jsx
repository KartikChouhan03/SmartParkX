import Nav from "@/components/Dashboard/Nav/Nav";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import "./MyParking.css";
import ParkingHistory from "@/components/Dashboard/ParkingHistory/ParkingHistory";
import ParkingStatus from "@/components/Dashboard/ParkingStatus/ParkingStatus";
import SummaryCard from "@/components/Dashboard/SummaryCard/SummaryCard";
import React, { useState } from "react";
import "./MyParking.css";
import LastParkingSummary from "@/components/LastParkingSummary/LastParkingSummary";

const MyParking = () => {
  return (
    <div>
      <Sidebar />
      <Nav />
      <div className="my-parking">
        <h2 className="heading">My Parking Sessions</h2>
        <SummaryCard />
        <ParkingStatus />
        <LastParkingSummary />
        <ParkingHistory />
      </div>
    </div>
  );
};

export default MyParking;
