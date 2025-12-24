import React from 'react';
import './Home.css';
import Header from '../../components/Landing/Header/Header';
import About from '../../components/Landing/About/About';
import Features from '../../components/Landing/Features/Features';
import HowItWorks from '../../components/Landing/HowItWorks/HowItWorks';
import ContactUs from '../../components/Landing/ContactUs/ContactUs';
import Footer from '../../components/Landing/Footer/Footer';
import Testimonial from '../../components/Landing/Testimonial/Testimonial';
import Navbar from '../../components/Landing/Navbar/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Features />
      <HowItWorks />
      <Testimonial />
      <ContactUs />
      <Footer />
    </>
  );
};

export default Home;
