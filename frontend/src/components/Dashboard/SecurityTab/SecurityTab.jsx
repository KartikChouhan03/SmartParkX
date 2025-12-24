import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import "./SecurityTab.css";

const SecurityTab = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: "",
  });

  const [twoFA, setTwoFA] = useState(false);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirmPass) return;

    if (passwords.newPass !== passwords.confirmPass) {
      console.log("Passwords do not match");
      return;
    }

    console.log("Password Updated:", passwords);
    // Later → call backend API

    setPasswords({ current: "", newPass: "", confirmPass: "" });
  };

  const handleLogoutAll = () => {
    console.log("Logging out all sessions...");
    // Backend logout logic later
  };

  return (
    <div className="security-container">
      <h2 className="security-title">Security Settings</h2>

      {/* Change Password Section */}
      <div className="sec-block">
        <h3>Change Password</h3>

        <div className="sec-group">
          <label>Current Password</label>
          <Input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handleChange}
          />
        </div>

        <div className="sec-group">
          <label>New Password</label>
          <Input
            type="password"
            name="newPass"
            value={passwords.newPass}
            onChange={handleChange}
          />
        </div>

        <div className="sec-group">
          <label>Confirm New Password</label>
          <Input
            type="password"
            name="confirmPass"
            value={passwords.confirmPass}
            onChange={handleChange}
          />
        </div>

        <Button className="save-pass-btn" onClick={handlePasswordChange}>
          Update Password
        </Button>
      </div>

      {/* 2FA Toggle Section */}
      <div className="sec-block">
        <h3>Two-Factor Authentication</h3>

        <div className="sec-toggle">
          <span>Enable 2FA</span>
          <Switch checked={twoFA} onCheckedChange={() => setTwoFA(!twoFA)} />
        </div>
      </div>

      {/* Logout all devices */}
      <div className="sec-block">
        <h3>Account Security</h3>
        <Button className="logout-btn" onClick={handleLogoutAll}>
          Logout From All Devices
        </Button>
      </div>
    </div>
  );
};

export default SecurityTab;
