import React, {useState} from 'react'
import Home from './pages/Home/Home.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import About from './components/Landing/About/About.jsx'
import Features from './components/Landing/Features/Features.jsx'
import HowItWorks from './components/Landing/HowItWorks/HowItWorks.jsx'
import Testimonial from './components/Landing/Testimonial/Testimonial.jsx'
import ContactUs from './components/Landing/ContactUs/ContactUs.jsx'
import Footer from './components/Landing/Footer/Footer.jsx'

import Auth from './pages/Auth/Auth.jsx'

import Dashboard from './pages/UserDashboard/Dashboard/Dashboard.jsx' 
import MyParking from './pages/UserDashboard/MyParking/MyParking.jsx'
import BillHistory from './pages/UserDashboard/BillHistory/BillHistory.jsx'
import Settings from './pages/UserDashboard/Settings/Settings.jsx'

const App = () => {

  return (
      <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/features" element={<Features/>} />
        <Route path="/howitworks" element={<HowItWorks/>} />
        <Route path="/testimonial" element={<Testimonial/>} />
        <Route path="/contactus" element={<ContactUs/>} />
        <Route path="/footer" element={<Footer/>} />

        <Route path="/login" element={<Auth/>} />

        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/myparking' element={<MyParking/>} />
        <Route path='/billhistory' element={<BillHistory/>} />
        <Route path="/settings" element={<Settings/>} />
        
      </Routes>
    </>
  )
}

export default App
