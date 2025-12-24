import React from 'react'
import './Dashboard.css'
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import Nav from "../../../components/Dashboard/Nav/Nav.jsx";
import ParkingGrid from '@/components/Dashboard/ParkingGrid/ParkingGrid';
import ParkingStatus from '@/components/Dashboard/ParkingStatus/ParkingStatus';

const Dashboard = () => {
  return (
    <div >
      <Sidebar />
      <Nav />
      <div className='dashboard'>
        <ParkingGrid/>
        <ParkingStatus/>
      </div>
    </div>
  )
}

export default Dashboard
