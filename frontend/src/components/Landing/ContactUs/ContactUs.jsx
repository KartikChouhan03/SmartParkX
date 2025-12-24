import React from 'react';
import './ContactUs.css';
import { Mail, Phone, Calendar, MapPin } from 'lucide-react';

const ContactUs = () => {
    
    const contactInfo = [
        {
            title: 'Mail to Us',
            subtitle: 'support@smartparkx.in',
            icon: <Mail size={24} />,
        },
        {
            title: 'Call for Help',
            subtitle: '554 743 872',
            icon: <Phone size={24} />,
        },
        {
            title: 'Monday - Friday',
            subtitle: '9am - 8pm',
            icon: <Calendar size={24} />,
        },
        {
            title: 'Address:',
            subtitle: 'HQ, Mumbai, India',
            icon: <MapPin size={24} />,
        },
    ];

    return (
        <section className="contact-us-section" id="contact-us">
            <div className="contact-container">

                {/* Left Column: Contact Information */}
                <div className="contact-info-column">
                    <h2 className="contact-heading">Contact Us: Let's Get in Touch</h2>
                    <p className="contact-description">
                        We'd love to hear from you! Whether you have questions, suggestions, or 
                        want to get started - drop us a message.
                    </p>

                    <div className="contact-details-wrapper">
                        {contactInfo.map((item, index) => (
                            <div key={index} className="contact-detail-item">
                                <div className="contact-icon">{item.icon}</div>
                                <div className="contact-text-content">
                                    <h4>{item.title}</h4>
                                    <p>{item.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="contact-form-column">
                    <form className="contact-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" placeholder="Enter your name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="tel" id="phone" placeholder="63937 54021" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" placeholder="email@gmail.com" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <select id="subject">
                                    <option>Choose a Subject</option>
                                    <option>General Inquiry</option>
                                    <option>Technical Support</option>
                                    <option>Partnership</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" placeholder="Write Your Message"></textarea>
                        </div>
                        <button type="submit" className="send-message-btn">Send Message →</button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default ContactUs;
