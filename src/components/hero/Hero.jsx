import React, { useEffect, useRef, useState } from 'react';
import heroVideo from './hero.mp4';
import BookingForm from '../booking/BookingForm';

const Hero = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const videoRef = useRef(null);

  // Ensure video plays properly on mobile devices
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      
      // Try to play the video (muted autoplay with promise)
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented
          video.muted = true;
          video.play();
        });
      }
    }
  }, []);

  return (
    <section className="relative hero-min-height flex items-center justify-center text-white overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover brightness-100 contrast-105"
          style={{
            objectFit: 'cover',
            minHeight: '100vh',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <source 
            src={heroVideo} 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        {/* Lighter Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto z-10 px-4 text-center sm:px-6">
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 animate-fade-in px-1">
          <span className="text-yellow-400">AK</span> Events & Fireworks
        </h1>

        <p className="mb-8 max-w-3xl mx-auto px-1 text-base font-light leading-relaxed sm:mb-10 sm:text-lg md:text-xl lg:text-2xl">
          Igniting Your Special Moments with Spectacular Fireworks & Unforgettable Events
        </p>
        
        <div className="flex w-full max-w-md flex-col gap-3 px-2 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
          <button
            type="button"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3.5 px-8 rounded-full text-base sm:w-auto sm:py-4 sm:px-10 sm:text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-yellow-500/30"
            onClick={(e) => {
              e.preventDefault();
              setShowBookingForm(true);
            }}
          >
            Book Now
          </button>
          
          <button
            type="button"
            className="w-full border-2 border-white bg-transparent py-3.5 px-8 text-base font-bold text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-white/20 sm:w-auto sm:py-4 sm:px-10 sm:text-lg"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Our Services
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <svg 
          className="w-10 h-10 text-white hover:text-yellow-400 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowBookingForm(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 mt-auto w-full max-h-[90dvh] max-w-md overflow-y-auto rounded-t-2xl sm:mt-0 sm:rounded-2xl sm:mx-4">
            <BookingForm onClose={() => setShowBookingForm(false)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
