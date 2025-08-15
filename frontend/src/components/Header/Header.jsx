import React, { useState, useEffect } from "react";
import "./Header.css";
import { assets } from "../../assets/assets.js";
import { useRef } from "react";
import { MoveRight, Play} from "lucide-react";
import { useNavigate } from "react-router-dom";


const Header = () => {

  const navigate = useNavigate();


  const fullHeadingText = "Smart Parking.\nSeamless Experience."; // Your heading text
  const [displayedHeading, setDisplayedHeading] = useState("");
  const headingTypingSpeed = 80; // Speed in milliseconds per character
  const pauseAfterPunctuationDelay = headingTypingSpeed * 4; // --- ADDED: Longer pause for punctuation/newlines (e.g., 7 times the base speed) ---
  const timeoutRef = useRef(null);

  useEffect(() => {
    let timeoutId;
    let currentCharacterIndex = 0;

    const typeCharacter = () => {
      if (currentCharacterIndex < fullHeadingText.length) {
        const charToAdd = fullHeadingText[currentCharacterIndex];
        setDisplayedHeading(prev => prev + charToAdd);
        currentCharacterIndex++;

        let delay = headingTypingSpeed; // Default delay
        if (['.', ',', '?', '!', '\n'].includes(charToAdd)) {
            delay = pauseAfterPunctuationDelay;
        }
        
        timeoutRef.current = setTimeout(typeCharacter, delay);
      } 
    };

    typeCharacter(); // Start the typing sequence

    return () => {
      clearTimeout(timeoutId); // Cleanup
    };
  }, [fullHeadingText, headingTypingSpeed, pauseAfterPunctuationDelay]); 

  return (
    <div className="header" id="header">
      {/* Video Background */}
      <video autoPlay loop muted playsInline className="header-video">
        <source src={assets.hero} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Centered Content */}
      <div className="header-contents">
        <div className="header-text">
          <h2>
            {displayedHeading}
          </h2>
          <p>
            From license plate detection to automated billing, parking has never
            been smarter.
          </p>

          <div className="header-buttons">
            <button className="started-btn" onClick={()=> navigate('/signin')}>Get Started <MoveRight size={20}/></button>
            <button className="video-btn">Watch Video<Play size={16}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;