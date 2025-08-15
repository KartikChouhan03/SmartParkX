 import React from 'react';
 import './Testimonial.css';
 import { Star } from 'lucide-react';
 import { assets } from '../../assets/assets.js'; // Assuming you have an assets file for images

 const Testimonial = () => {
  const testimonial = {
   quote:
    '"SmartParkX is truly a game-changer. As someone who commutes daily to a busy tech park, parking used to be one of the most stressful parts of my day. But now, I just drive in — the system recognizes my license plate instantly, guides me to an available slot, and handles billing automatically. I never have to deal with guards, tokens, or wasted time anymore. The whole experience feels premium and futuristic. I honestly can\'t imagine going back to the old way of parking."',
   author: 'Tanya Mehra',
   title: 'Regular Commuter',
   rating: 5,
   image: assets.testimonialavatar, // Replace with the actual path to the user's avatar image
  };

  const renderStars = (count) => {
   const stars = [];
   for (let i = 0; i < count; i++) {
    stars.push(<Star key={i} fill="#FFC107" color="#FFC107" size={16} />);
   }
   return stars;
  };

  return (
   <section className="testimonial-section">
    <div className="testimonial-container">
     <div className="testimonial-left">
      <h2>Hear From Our Users</h2>
      <div className="testimonial-card">
       <p className="testimonial-quote">{testimonial.quote}</p>
       <div className="testimonial-author-info">
        <img src={testimonial.image} alt={testimonial.author} className="testimonial-avatar" />
        <div className="testimonial-author-details">
         <h4 className="testimonial-author-name">{testimonial.author}</h4>
         <p className="testimonial-author-title">{testimonial.title}</p>
        </div>
        <div className="testimonial-rating">{renderStars(testimonial.rating)}</div>
       </div>
      </div>
      <div className="testimonial-navigation">
       <button className="nav-button">&lt;</button>
       <button className="nav-button">&gt;</button>
      </div>
     </div>
     <div className="testimonial-right">
      <img src={assets.testimonial} alt="" className="testimonial-image" /> 
     </div>
    </div>
   </section>
  );
 };

 export default Testimonial;