import React, { useState } from 'react';
import './About.css';
import { assets } from '../../assets/assets.js';

const About = () => {

  const aboutPoints = [
    {
      id: 'smarter-future',
      title: 'A Smarter Parking Future',
      description: 'We envision cities where parking is no longer a hassle – but a smooth, automated experience driven by AI and real-time data.',
      icon: assets.about1,
      image: assets.image1,
    },
    {
      id: 'automation',
      title: 'Automation at Every Step',
      description: 'From license plate recognition upon entry to automated billing on exit, every every step of your parking journey is seamless and efficient.',
      icon: assets.about2,
      image: assets.image2,
    },
    {
      id: 'urban-mobility',
      title: 'Designed for Urban Mobility',
      description: 'Our solutions are tailored for dynamic urban environments, reducing congestion and improving accessibility for all city dwellers.',
      icon: assets.about3,
      image: assets.image3,
    },
  ];

  const [activeItemId, setActiveItemId] = useState(aboutPoints[0].id);

  const activeItemData = aboutPoints.find(point => point.id === activeItemId);

  return (
    <div className="about" id='about'>
      <div className="about-content-wrapper">

        {/* Left Column: Image Display */}
        <div className="about-image-column">
          {activeItemData && <img key={activeItemData.id} 
          src={activeItemData.image} alt={activeItemData.title} className="about-main-image" />}
        </div>

        {/* Right Column: Heading, Intro Description, and Interactive Cards */}
        <div className="about-info-column">
          <h2 className="about-main-heading">Revolutionizing Urban Parking with SmartParkX</h2>
          <p className="about-intro-description">
            SmartParkX is a fully automated smart parking solution designed to eliminate long
            wait times, manual billing, and confusion over parking availability. Using ANPR and
            real-time sensors, we ensure a seamless
            parking experience for every vehicle.
          </p>

          <div className="about-cards-wrapper">
            {aboutPoints.map(point => (
              <div
                key={point.id}
                className={`about-card ${activeItemId === point.id ? 'active' : 'inactive'}`}
                onClick={() => setActiveItemId(point.id)}
              >
                <div className="about-card-header">
                  <img src={point.icon} alt={`${point.title} icon`} className="about-card-icon" />
                  <h3>{point.title}</h3>
                </div>
                {activeItemId === point.id && (
                  <p className="about-card-description">{point.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;