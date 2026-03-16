import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Event gallery images with event-specific content
  const galleryItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      title: 'New Year Celebration 2025',
      description: 'Spectacular midnight fireworks display',
      event: 'New Year Celebration'
    },
    {
      id: 2,
      image: 'https://c8.alamy.com/comp/2MPC9JP/visitors-watch-the-fireworks-display-during-a-new-year-celebration-event-at-the-hakkeijima-sea-paradise-aquarium-amusement-park-complex-in-yokohama-southwest-of-tokyo-monday-jan-1-2018-ap-photoshizuo-kambayashi-2MPC9JP.jpg',
      title: 'New Year Fireworks',
      description: 'Crowds gathered for the annual celebration',
      event: 'New Year Celebration'
    },
    {
      id: 3,
      image: 'https://i.pinimg.com/originals/31/8e/74/318e7476fa76984b0685d3cde7511a39.jpg',
      title: 'Midnight Spectacle',
      description: 'Fireworks lighting up the night sky',
      event: 'New Year Celebration'
    },
    {
      id: 4,
      image: 'https://i.pinimg.com/736x/ca/b9/f1/cab9f12141267677a4220eeb44af70ca.jpg',
      title: 'Sankranthi Festival',
      description: 'Traditional harvest festival celebrations',
      event: 'Sankranthi Festival'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=549&h=415&q=80',
      title: 'Festival Rituals',
      description: 'Cultural performances and traditions',
      event: 'Sankranthi Festival'
    },
    {
      id: 6,
      image: 'https://i.pinimg.com/736x/92/cf/9b/92cf9b901a421471ee4b6f7b9055b8f7.jpg',
      title: 'River Bank Celebrations',
      description: 'Festive atmosphere by the Godavari river',
      event: 'Sankranthi Festival'
    },
    {
      id: 7,
      image: 'https://www.sparkfx.com.au/wp-content/uploads/2019/01/3.jpg',
      title: 'Wedding Fireworks',
      description: 'Romantic wedding ceremony with fireworks',
      event: 'Wedding Celebration'
    },
    {
      id: 8,
      image: 'https://flashfireworks.com.au/wp-content/uploads/2020/11/indoor-fireworks-wedding-background-1536x1026.jpg',
      title: 'Bridal Entrance',
      description: 'Magical entrance with custom fireworks',
      event: 'Wedding Celebration'
    },
    {
      id: 9,
      image: 'https://media.istockphoto.com/id/2098903945/photo/the-bride-and-groom-on-the-wedding-ceremony-venue-with-fireworks-at-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=tBkj3dAmiFhF03fTjDRAhItFa2Zd5vw3FdxfetZ8OYk=',
      title: 'Reception Spectacle',
      description: 'Grand reception with fireworks finale',
      event: 'Wedding Celebration'
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2074&q=80',
      title: 'Corporate Event',
      description: 'Professional fireworks for business events',
      event: 'Corporate Event'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Change slide every 4 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryItems.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section id="gallery" className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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

            <h2 className="relative text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 mb-8 animate-fade-in-up">
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

          <p className="text-gray-300 max-w-4xl mx-auto text-xl leading-relaxed font-light mt-8 animate-fade-in-up delay-200">
            Witness the magic we've created at unforgettable events. From spectacular New Year celebrations to intimate wedding moments,
            explore our portfolio of breathtaking fireworks displays.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-12 animate-fade-in-up delay-300">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">30+</div>
              <div className="text-gray-400 text-sm">Events Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">300+</div>
              <div className="text-gray-400 text-sm">Photos Captured</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">2+</div>
              <div className="text-gray-400 text-sm">Years of Magic</div>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {galleryItems.map((item, index) => (
                <div key={item.id} className="min-w-full relative">
                  <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <div className="max-w-4xl">
                        <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                          {item.event}
                        </div>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xl text-gray-200 leading-relaxed">
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
              onClick={goToPrevious}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25 border border-white/20"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25 border border-white/20"
            >
              <FaChevronRight className="text-xl" />
            </button>

            {/* Auto-play toggle */}
            <button
              onClick={toggleAutoPlay}
              className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25 border border-white/20"
            >
              {isAutoPlaying ? <FaPause className="text-sm" /> : <FaPlay className="text-sm" />}
            </button>
          </div>

          {/* Progress Indicators */}
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
