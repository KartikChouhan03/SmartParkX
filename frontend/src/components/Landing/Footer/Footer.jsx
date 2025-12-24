import React from 'react';
import './Footer.css';
import { assets } from '../../../assets/assets.js';
import { Facebook, Twitter, Linkedin, Copyright, Instagram } from 'lucide-react';

const Footer = () => {

    const companyLinks = [
        { name: 'Home', href: '#' },
        { name: 'About Us', href: '#about' },
        { name: 'Key Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Contact', href: '#contact-us' },
    ];

    const supportLinks = [
        { name: 'FAQs', href: '#faqs' },
        { name: 'Privacy Policy', href: '#privacy-policy' },
        { name: 'Terms & Conditions', href: '#terms-conditions' },
        { name: 'Report an Issue', href: '#report-issue' },
    ];

    const contactInfo = {
        address: 'SmartParkX HQ,\nMumbai, India',
        email: 'support@smartparkx.in',
        phone: '07555 34565',
    };

    return (
        <footer className="footer-section">
            <div className="footer-content-wrapper">
                {/* Left Column: Logo, Tagline, Socials */}
                <div className="footer-col footer-col-left">
                    <div className="footer-logo-container">
                        <img src={assets.logo} alt="SmartParkX Logo" className="footer-logo" />
                        <h3>SmartParkX</h3>
                    </div>
                    <p className="footer-tagline">
                        Smart, sensor-driven parking with ANPR, real-time tracking, and
                        instant billing. Simplifying urban parking, one slot at a time.
                    </p>
                    <div className="footer-socials">
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <Instagram size={20} />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <Facebook size={20} />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <Twitter size={20} />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>

                {/* Right Columns: Links */}
                <div className="footer-links-group">
                    <h4>Company</h4>
                    <ul>
                        {companyLinks.map((link, index) => (
                            <li key={index}><a href={link.href}>{link.name}</a></li>
                        ))}
                    </ul>
                </div>

                <div className="footer-links-group">
                    <h4>Contact Info</h4>
                    <p>{contactInfo.address}</p>
                    <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
                    <p><a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
                </div>

                <div className="footer-links-group">
                    <h4>Support</h4>
                    <ul>
                        {supportLinks.map((link, index) => (
                            <li key={index}><a href={link.href}>{link.name}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* Bottom Footer Section */}
            <div className="footer-bottom">
                <p>
                    <Copyright size={14} /> 2025 SmartParkX. All rights reserved.
                </p>
                <div className="footer-bottom-links">
                    <a href="">Terms of Use</a>
                    <a href="">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;