import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import WalletModal from "./WalletModal";
import "./WalletTab.css";

const WalletTab = () => {
  const [balance, setBalance] = useState(320); // Dummy balance

  const [autoDeduct, setAutoDeduct] = useState(true);
  const [lowBalanceAlert, setLowBalanceAlert] = useState(true);

  const [transactions, setTransactions] = useState([
    { id: 1, date: "2025-10-20", amount: -60, type: "Parking" },
    { id: 2, date: "2025-10-15", amount: 200, type: "Added" },
    { id: 3, date: "2025-10-10", amount: -80, type: "Parking" },
  ]);

  const [openModal, setOpenModal] = useState(false);

  const handleAddMoney = (amount) => {
    setBalance(balance + amount);

    setTransactions([
      { id: Date.now(), date: new Date().toISOString().split("T")[0], amount, type: "Added" },
      ...transactions,
    ]);
  };

  return (
    <div className="wallet-container">
      <h2 className="wallet-title">Wallet Settings</h2>

      {/* Wallet Balance Card */}
      <div className="wallet-card">
        <div>
          <p className="wallet-label">Current Balance</p>
          <h3 className="wallet-amount">₹{balance}</h3>
        </div>

        <Button className="add-money-btn" onClick={() => setOpenModal(true)}>
          Add Money
        </Button>
      </div>

      {/* Toggles */}
      <div className="wallet-toggles">
        <div className="toggle-row">
          <span>Auto-Deduct for Parking Bills</span>
          <Switch checked={autoDeduct} onCheckedChange={setAutoDeduct} />
        </div>

        <div className="toggle-row">
          <span>Low Balance Alerts</span>
          <Switch checked={lowBalanceAlert} onCheckedChange={setLowBalanceAlert} />
        </div>
      </div>

      {/* Transaction History */}
      <div className="wallet-history">
        <h3>Recent Transactions</h3>

        <table className="wallet-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.type}</td>
                <td className={t.amount < 0 ? "tx-red" : "tx-green"}>
                  {t.amount < 0 ? `-₹${Math.abs(t.amount)}` : `+₹${t.amount}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <WalletModal 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        onAdd={handleAddMoney} 
      />
    </div>
  );
};

export default WalletTab;
