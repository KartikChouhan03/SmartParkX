import React from "react";
import "./HowItWorks.css";
import { assets } from "../../assets/assets.js";
import { useEffect, useState, useRef } from "react";

const HowItWorks = () => {
  const howItWorksData = [
    {
      step: 1,
      title: "Find & Reserve a Spot",
      description:
        "Use our mobile app to view real-time parking availability and reserve a spot at your destination before you even leave.",
      image: assets.howitworks1,
    },
    {
      step: 2,
      title: "Seamless Entry & Exit",
      description:
        "Our system uses ANPR to automatically recognize your vehicle’s license plate, allowing for barrier-free entry and exit without a ticket.",
      image: assets.howitworks2,
    },
    {
      step: 3,
      title: "Effortless Payments",
      description:
        "Billing is automatically calculated based on the time you spent. Payments are processed digitally, so you can drive out without stopping at a kiosk.",
      image: assets.howitworks3,
    },
    {
      step: 4,
      title: "Guidance to Your Car",
      description:
        "For large car parks, the app can guide you back to your vehicle, ensuring you never waste time searching for your car again.",
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
      }
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