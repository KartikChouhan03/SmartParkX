import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import "./NotificationsTab.css";

const NotificationsTab = () => {
  const [notify, setNotify] = useState({
    parkingStart: true,
    parkingEnd: true,
    billGenerated: true,
    lowBalance: true,
    paymentSuccess: true,
  });

  const toggle = (key) => {
    setNotify({ ...notify, [key]: !notify[key] });
  };

  return (
    <div className="noti-container">
      <h2 className="noti-title">Notifications</h2>

      <div className="noti-list">

        <div className="noti-row">
          <span>Parking Started</span>
          <Switch checked={notify.parkingStart} onCheckedChange={() => toggle("parkingStart")} />
        </div>

        <div className="noti-row">
          <span>Parking Ended</span>
          <Switch checked={notify.parkingEnd} onCheckedChange={() => toggle("parkingEnd")} />
        </div>

        <div className="noti-row">
          <span>Bill Generated</span>
          <Switch checked={notify.billGenerated} onCheckedChange={() => toggle("billGenerated")} />
        </div>

        <div className="noti-row">
          <span>Low Wallet Balance</span>
          <Switch checked={notify.lowBalance} onCheckedChange={() => toggle("lowBalance")} />
        </div>

        <div className="noti-row">
          <span>Payment Successful</span>
          <Switch checked={notify.paymentSuccess} onCheckedChange={() => toggle("paymentSuccess")} />
        </div>

      </div>
    </div>
  );
};

export default NotificationsTab;
