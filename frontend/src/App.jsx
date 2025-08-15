import React, {useState} from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import About from './components/About/About.jsx'
import Features from './components/Features/Features.jsx'
import HowItWorks from './components/HowItWorks/HowItWorks.jsx'
import Testimonial from './components/Testimonial/Testimonial.jsx'
import ContactUs from './components/ContactUs/ContactUs.jsx'
import Footer from './components/Footer/Footer.jsx'

import Signin from './pages/Signin/Signin.jsx'

const App = () => {

  const location = useLocation();
  const noNavbarPaths = ['/signin','/login','/admin'];
  const showNavbar = !noNavbarPaths.includes(location.pathname);

  return (
    <div className='app'>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/features" element={<Features/>} />
        <Route path="/howitworks" element={<HowItWorks/>} />
        <Route path="/testimonial" element={<Testimonial/>} />
        <Route path="/contactus" element={<ContactUs/>} />
        <Route path="/footer" element={<Footer/>} />

        <Route path="/signin" element={<Signin/>} />

      </Routes>
    </div>
  )
}

export default App
