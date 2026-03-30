import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';
import { API_URLS, fetchApi } from "../../lib/api";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetchApi(API_URLS.CMS_GALLERY)
        .then((data) => {
          if (!cancelled && data.ok) setGalleryItems(data.gallery || []);
        })
        .catch(() => {});
    };
    load();

    const onStorage = (e) => {
      if (e.key === "cmsUpdated") load();
    };
    const onCmsDataUpdated = () => load();

    window.addEventListener("storage", onStorage);
    window.addEventListener("cmsDataUpdated", onCmsDataUpdated);
    const interval = setInterval(load, 60000); // Refresh every 60 seconds
    return () => {
      cancelled = true;
      clearInterval(interval);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cmsDataUpdated", onCmsDataUpdated);
    };
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [galleryItems.length]);

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying && galleryItems.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Change slide every 4 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryItems.length]);

  const goToPrevious = () => {
    if (!galleryItems.length) return;
    setCurrentIndex(currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    if (!galleryItems.length) return;
    setCurrentIndex(currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section id="gallery" className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Primary gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-300/50 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-purple-300/40 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-pink-300/50 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="relative">
            {/* Glow effect behind title */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl scale-150"></div>

            <h2 className="relative text-3xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 mb-6 animate-fade-in-up sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl sm:mb-8">
              Event
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                Gallery
              </span>
            </h2>

            {/* Animated underline */}
            <div className="relative mx-auto w-48 h-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-sm animate-pulse delay-75"></div>
            </div>
          </div>

          <p className="text-gray-300 max-w-4xl mx-auto text-sm leading-relaxed font-light mt-6 animate-fade-in-up delay-200 sm:text-base md:text-lg lg:text-xl px-1 sm:mt-8">
            Witness the magic we've created at unforgettable events. From spectacular New Year celebrations to intimate wedding moments,
            explore our portfolio of breathtaking fireworks displays.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-8 sm:mt-12 animate-fade-in-up delay-300 px-2">
            <div className="text-center min-w-[5rem]">
              <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">30+</div>
              <div className="text-gray-400 text-sm">Events Covered</div>
            </div>
            <div className="text-center min-w-[5rem]">
              <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">300+</div>
              <div className="text-gray-400 text-sm">Photos Captured</div>
            </div>
            <div className="text-center min-w-[5rem]">
              <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">2+</div>
              <div className="text-gray-400 text-sm">Years of Magic</div>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {galleryItems.length === 0 && (
            <div className="rounded-3xl border border-white/10 bg-white/5 py-24 text-center text-gray-400">
              Gallery photos will appear here once the API is running and the catalog is loaded.
            </div>
          )}
          {/* Main Carousel */}
          {galleryItems.length > 0 && (
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {galleryItems.map((item, index) => (
                <div key={item.id} className="min-w-full relative">
                  <div className="relative h-[min(52vh,28rem)] sm:h-[min(60vh,32rem)] md:h-[70vh] lg:h-[80vh] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12">
                      <div className="max-w-4xl">
                        <div className="mb-2 inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 text-xs font-semibold text-white sm:mb-3 sm:px-4 sm:py-2 sm:text-sm">
                          {item.event}
                        </div>
                        <h3 className="text-xl font-bold leading-tight text-white mb-2 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl sm:mb-3 md:mb-4">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-200 leading-relaxed line-clamp-3 sm:line-clamp-none sm:text-base md:text-lg lg:text-xl">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 text-white shadow-lg backdrop-blur-xl transition-all hover:bg-white/20 sm:left-3 sm:p-3 md:left-6 md:p-4"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-base sm:text-lg md:text-xl" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 text-white shadow-lg backdrop-blur-xl transition-all hover:bg-white/20 sm:right-3 sm:p-3 md:right-6 md:p-4"
              aria-label="Next slide"
            >
              <FaChevronRight className="text-base sm:text-lg md:text-xl" />
            </button>

            {/* Auto-play toggle */}
            <button
              type="button"
              onClick={toggleAutoPlay}
              className="absolute right-1 top-2 z-10 rounded-full border border-white/20 bg-white/10 p-2 text-white shadow-lg backdrop-blur-xl transition-all hover:bg-white/20 sm:right-3 sm:top-4 sm:p-2.5 md:right-6 md:top-6 md:p-3"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? <FaPause className="text-sm" /> : <FaPlay className="text-sm" />}
            </button>
          </div>
          )}

          {/* Progress Indicators */}
          {galleryItems.length > 0 && (
          <div className="flex justify-center gap-2 mt-6">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-500 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
