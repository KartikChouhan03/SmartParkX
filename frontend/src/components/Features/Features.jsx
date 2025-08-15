import React from 'react'
import './Features.css'
import { Car, Radar, CreditCard } from 'lucide-react';

const Features = () => {
    const featuresData = [
        {
            title: 'ANPR-Based Entry & Exit',
            subtitle: 'License Plate Recognition',
            description: 'SmartParkX uses AI-powered ANPR cameras to detect and log vehicle number plates at entry and exit points. This ensures fast, contactless access – no physical tickets, QR codes, or manual intervention needed.',
            icon: Car,
        },
        {
            title: 'Real-Time Slot Detection',
            subtitle: 'Sensor-Driven Slot Accuracy',
            description: 'Each parking slot is equipped with precision sensors that detect occupancy in real-time – giving users up-to-the-second availability and auto-confirmation on parking.',
            icon: Radar,
        },
        {
            title: 'Smart Billing System',
            subtitle: 'Dynamic Time-Based Billing',
            description: 'Billing is dynamically calculated based on duration and pricing logic. Integrated payment options ensure users can pay instantly — no kiosk, no hassle.',
            icon: CreditCard,
        },
    ];

    return (
        <section className="features-section" id="features">
            <div className="features-header">
                <h2 className="features-main-heading">What Makes Us Smart</h2>
                <a href="#" className="features-view-more-btn">
                    View More <i className="arrow-icon">→</i>
                </a>
            </div>

            <div className="features-cards-wrapper">
                {featuresData.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <div className="feature-card-header">
                            <h3>{feature.title}</h3>
                            <feature.icon size={24} strokeWidth={2} className="feature-card-icon" />
                        </div>
                        <div className="feature-card-content">
                            <h4>{feature.subtitle}</h4>
                            <p>{feature.description}</p>
                        </div>
                        <a href="#" className="feature-read-more-link">
                            Read More <i className="arrow-icon">→</i>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;