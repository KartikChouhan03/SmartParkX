import React from "react";
import "./HowItWorks.css";
import { assets } from "../../../assets/assets.js";
import { useEffect, useState, useRef } from "react";

const HowItWorks = () => {
  const howItWorksData = [
    {
      step: 1,
      title: "Seamless Entry & Exit",
      description:
        "Drivers don’t need tickets, cards, or manual check-ins. SmartParkX automatically recognizes vehicles at entry and exit, allowing smooth access without stopping or delays. This creates a faster flow of vehicles while eliminating common issues like lost tickets or manual errors.",
      image: assets.howitworks1,
    },
    {
      step: 2,
      title: "Find Parking Instantly",
      description:
        "SmartParkX helps users quickly understand parking availability without confusion or guesswork. The system shows which slots are available and which are occupied, saving time and reducing unnecessary vehicle movement. Whether you are a driver looking for a spot or an administrator monitoring capacity, everything is visible in one place.",
      image: assets.howitworks2,
    },
    {
      step: 3,
      title: "Automatic Parking Tracking",
      description:
        "Once a vehicle is parked, SmartParkX automatically starts tracking the parking session. Users can see their current parking status, duration, and estimated cost in real time, while administrators get accurate occupancy data without relying on manual reporting or staff intervention.",
      image: assets.howitworks3,
    },
    {
      step: 4,
      title: "Smart Monitoring & Control",
      description:
        "SmartParkX gives administrators complete control over parking operations through a dedicated dashboard. Slot usage, parking sessions, and system activity can be monitored easily, helping optimize space utilization, improve management efficiency, and plan for future expansion.",
      image: assets.howitworks4,
    },
  ];

  const [activeStep, setActiveStep] = useState(1);
  const timelineRefs = useRef([]);
  const timelineContainerRef = useRef(null);

  // ✅ MODIFIED: This useEffect now waits for the refs to be attached
  useEffect(() => {
    // Only proceed if there are elements to observe
    if (timelineRefs.current.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = parseInt(entry.target.dataset.step);
            setActiveStep(step);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.6,
      },
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [timelineRefs.current.length]); // ✅ MODIFIED: Add a dependency to re-run after refs are available

  // ✅ This useEffect remains correct and will now work
  useEffect(() => {
    const activeRef = timelineRefs.current[activeStep - 1];
    const container = timelineContainerRef.current;

    if (activeRef && container) {
      const containerTop = container.getBoundingClientRect().top;
      const activeTop = activeRef.getBoundingClientRect().top;
      const fillHeight = activeTop - containerTop + activeRef.offsetHeight / 2;

      container.style.setProperty("--fill-height", `${fillHeight}px`);
    }
  }, [activeStep]);

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="how-it-works-header">
        <h2 className="how-it-works-main-heading">How It Works</h2>
        <p className="how-it-works-subheading">
          Experience smart parking in four simple steps.
        </p>
      </div>

      <div className="how-it-works-timeline" ref={timelineContainerRef}>
        {howItWorksData.map((item, index) => (
          <div
            ref={(el) => (timelineRefs.current[index] = el)}
            key={item.step}
            className={`timeline-item ${
              item.step === activeStep ? "active" : ""
            }`}
            data-step={item.step}
          >
            {/* ... rest of the timeline item JSX ... */}
            {/* Image Container */}
            <div className="timeline-image-container">
              <img
                src={item.image}
                alt={`Step ${item.step}`}
                className="timeline-image"
              />
            </div>
            {/* Content Container */}
            <div className="timeline-content">
              <div className="timeline-step-indicator">
                <span className="step-number">{item.step}</span>
                <span className="step-line"></span>
              </div>
              <div className="timeline-text">
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
