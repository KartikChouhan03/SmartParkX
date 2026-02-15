import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Switch } from "../../../components/ui/switch";
import WalletModal from "./WalletModal";
import "./WalletTab.css";
import { fetchProfile, addWalletFunds } from "../../../lib/api";
import { useStore } from "../../../Context/StoreContext";

const WalletTab = () => {
  const { history } = useStore();

  const [balance, setBalance] = useState(0);
  const [autoDeduct, setAutoDeduct] = useState(true);
  const [lowBalanceAlert, setLowBalanceAlert] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const user = await fetchProfile();
      setBalance(user.walletBalance);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMoney = async (amount) => {
    try {
      const res = await addWalletFunds(amount);
      setBalance(res.walletBalance);
    } catch (err) {
      console.error(err);
    }
  };

  // Only PAID sessions shown as deductions
  const transactions = history
    ?.filter((s) => s.paymentStatus === "PAID")
    .map((s) => ({
      id: s._id,
      date: new Date(s.exitTime).toLocaleDateString(),
      amount: -s.billAmount,
      type: "Parking",
    }));

  return (
    <div className="wallet-container">
      <h2 className="wallet-title">Wallet Settings</h2>

      <div className="wallet-card">
        <div>
          <p className="wallet-label">Current Balance</p>
          <h3 className="wallet-amount">₹{balance}</h3>
        </div>

        <Button className="add-money-btn" onClick={() => setOpenModal(true)}>
          Add Money
        </Button>
      </div>

      <div className="wallet-toggles">
        <div className="toggle-row">
          <span>Auto-Deduct for Parking Bills</span>
          <Switch checked={autoDeduct} onCheckedChange={setAutoDeduct} />
        </div>

        <div className="toggle-row">
          <span>Low Balance Alerts</span>
          <Switch
            checked={lowBalanceAlert}
            onCheckedChange={setLowBalanceAlert}
          />
        </div>
      </div>

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
            {transactions?.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.type}</td>
                <td className="tx-red">-₹{Math.abs(t.amount)}</td>
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
