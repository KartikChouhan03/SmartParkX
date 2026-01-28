import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Car, Clock, ParkingSquare, Wallet } from "lucide-react";
import { useStore } from "../../../Context/StoreContext";
import "./SummaryCard.css";

const SummaryCard = () => {
  const { summary, activeSession } = useStore();

  if (!summary) return null;

  const duration = activeSession
    ? Math.floor((Date.now() - new Date(summary.entryTime)) / 60000) + "m"
    : "--";

  const cards = [
    {
      title: "Current Parking",
      value: summary.currentSlot || "—",
      icon: <Car />,
    },
    {
      title: "Active Duration",
      value: duration,
      icon: <Clock />,
    },
    {
      title: "Total Parkings",
      value: summary.totalParkings,
      icon: <ParkingSquare />,
    },
    {
      title: "Total Bill Paid",
      value: `₹${summary.totalBillPaid}`,
      icon: <Wallet />,
    },
  ];

  return (
    <div className="summary-card-container">
      {cards.map((card, i) => (
        <Card key={i} className="summary-card">
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
