import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import About from '../../components/About/About'
import Features from '../../components/Features/Features'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import ContactUs from '../../components/ContactUs/ContactUs'
import Footer from '../../components/Footer/Footer'
import Testimonial from '../../components/Testimonial/Testimonial'

const Home = () => {
  return (
    <div>
      <Header/>
      <About/>
      <Features/>
      <HowItWorks/>
      <Testimonial/>
      <ContactUs/>
      <Footer/>
    </div>
  )
}

export default Home
