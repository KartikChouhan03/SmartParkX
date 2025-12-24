import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../../assets/assets.js';


const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='logo-container'>
        <img src={assets.logo} alt="SmartParkX Logo" className="logo" />
        <p>SmartParkX</p>
        </Link>
        
        <ul className='navbar-menu'>
          <Link to='/' onClick={() => {
            setMenu("home");
            const headerElement = document.getElementById('header');
            if (headerElement) {
              headerElement.scrollIntoView({ behavior: 'smooth' });
            }
          }} className={menu==="home"?"active":""}>Home</Link>

          <a href='#about' onClick={() => setMenu("about")} className={menu==="about"?"active":""}>About</a>

          <a href='#features' onClick={() => setMenu("features")} className={menu==="features"?"active":""}>Features</a>

          <a href='#how-it-works' onClick={() => setMenu("how-it-works")} className={menu==="how-it-works"?"active":""}>How it works</a>

          <a href='#contact-us' onClick={() => setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</a>

        </ul>

        <div className='navbar-right'>
          
          <button onClick={()=>navigate('/login')} className='login-btn'>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;