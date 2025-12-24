import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./ProfileTab.css";

const ProfileTab = () => {
  const [profile, setProfile] = useState({
    name: "Kartik Chouhan",
    email: "kartik@example.com",
    phone: "+91 9876543210",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving Profile:", profile);
    // Later → send to backend API
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile Settings</h2>

      <div className="profile-form">

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <Input
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <Input
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <Input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="profile-actions">
          <Button onClick={handleSave} className="save-btn">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
