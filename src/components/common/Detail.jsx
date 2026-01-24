import React, { useState } from "react";
import { FaStar, FaFireAlt, FaTimes } from "react-icons/fa";
import Marquee from "./Marquee";

const Detail = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  const announcements = [
    { icon: <FaStar />, text: "Special discount on all types of events!" },
    { icon: <FaFireAlt />, text: "Book now and get 10% off on all services!" },
    { text: "Limited time offer: Free decoration with every booking!" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
      <div className="relative">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-3 top-3 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-gray-100 focus:outline-none"
          aria-label="Close banner"
        >
          <FaTimes className="h-4 w-4" />
        </button>
        <Marquee items={announcements} speed={25} className="py-3 pr-12" />
      </div>
    </div>
  );
};

export default Detail;
