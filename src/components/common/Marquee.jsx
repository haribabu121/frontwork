import React, { useState } from "react";

const Marquee = ({ items, speed = 15, className = "" }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className={`overflow-hidden whitespace-nowrap w-full bg-yellow-500 text-white py-2 relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="inline-block"
        style={{ 
          animation: `marquee ${speed}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
          paddingRight: '0.5rem'
        }}
      >
        {items.map((item, index) => (
          <span key={index} className="mx-6 inline-flex items-center">
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;