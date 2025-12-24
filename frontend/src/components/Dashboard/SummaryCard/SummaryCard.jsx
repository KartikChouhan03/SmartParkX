import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Car, Clock, ParkingSquare, Wallet } from "lucide-react";
import "./SummaryCard.css";

// Dummy data - replace later with API data
const cardData = [
  { id: 1, title: "Current Parking", value: "Slot 3", icon: <Car /> },
  { id: 2, title: "Active Duration", value: "15m", icon: <Clock /> },
  { id: 3, title: "Total Parkings", value: "18", icon: <ParkingSquare /> },
  { id: 4, title: "Total Bill Paid", value: "₹320", icon: <Wallet /> },
];

const SummaryCard = () => {
  return (
    <div className="summary-card-container">
      {cardData.map((card) => (
        <Card key={card.id} className="summary-card">
          <CardHeader className="summary-card-header">
            <div className="summary-icon">{card.icon}</div>
            <CardTitle className="summary-title">{card.title}</CardTitle>
          </CardHeader>
          <CardContent className="summary-value">{card.value}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCard;
