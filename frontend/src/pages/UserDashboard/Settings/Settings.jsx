import Nav from '@/components/Dashboard/Nav/Nav'
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar'
import "./Settings.css";
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileTab from "@/components/Dashboard/ProfileTab/ProfileTab";
import VehicleTab from "@/components/Dashboard/VehicleTab/VehicleTab";
import WalletTab from "@/components/Dashboard/WalletTab/WalletTab";
import NotificationsTab from '@/components/Dashboard/NotificationsTab/NotificationsTab';
import SecurityTab from '@/components/Dashboard/SecurityTab/SecurityTab';


const Settings = () => {
  return (
    <>
    <Sidebar />
    <Nav />
    <div className="settings">
        <Tabs defaultValue="profile" className="settings-tabs">

        <TabsList className="tabs-list">
            <TabsTrigger value="profile" className="tabs-trigger">Profile</TabsTrigger>
            <TabsTrigger value="vehicle" className="tabs-trigger">Vehicle</TabsTrigger>
            <TabsTrigger value="wallet" className="tabs-trigger">Wallet</TabsTrigger>
            <TabsTrigger value="notifications" className="tabs-trigger">Notifications</TabsTrigger>
            <TabsTrigger value="security" className="tabs-trigger">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
            <ProfileTab />
        </TabsContent>

        <TabsContent value="vehicle">
            <VehicleTab />
        </TabsContent>

        <TabsContent value="wallet">
            <WalletTab />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab/>
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab/>
        </TabsContent>

        </Tabs>
    </div>
        
    </>
    
  );
};

export default Settings;
