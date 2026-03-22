import React from 'react';
import { FaCloud, FaHorse, FaFire, FaMusic } from 'react-icons/fa';
import { GiFlowers, GiSparkles } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 'cloud-effects',
      icon: <FaCloud className="text-5xl sm:text-6xl text-blue-400 mb-6 transition-all duration-300 group-hover:scale-110" />,
      title: 'Cloud Effects',
      description: 'Magical Entrances with Dreamy Ambience.'
    },
    {
      id: 'luxury-wedding',
      icon: <GiSparkles className="text-5xl sm:text-6xl text-yellow-500 mb-6 transition-all duration-300 group-hover:scale-110" />,
      title: 'Luxury Wedding & Event Design',
      description: 'Elegant Themes | Premium Decor | Royal Touch.'
    },
    {
      id: 'grand-entry',
      icon: <FaHorse className="text-5xl sm:text-6xl text-amber-700 mb-6 transition-all duration-300 group-hover:scale-110" />,
      title: 'Grand Entry Concepts',
      description: 'Vintage Cars | Horses | LED Dhol | Dry Ice | Flower Shower.'
    },
    {
      id: 'venue-decoration',
      icon: <GiFlowers className="text-5xl sm:text-6xl text-pink-500 mb-6 transition-all duration-300 group-hover:scale-110" />,
      title: 'Venue Decoration',
      description: 'Transform any venue into a magical space with our expert decoration services.'
    },
    {
      id: 'fireworks',
      icon: <FaFire className="text-5xl sm:text-6xl text-red-500 mb-6 transition-all duration-300 group-hover:scale-110" />,
      title: 'High-Impact Fireworks',
      description: 'Sky Shots | Stage Pyro | Cold Pyro | Confetti Blasts.'
    },
    {
      id: 'sound-light',
      icon: <FaMusic className="text-5xl sm:text-6xl text-purple-500 mb-6 transition-all duration-300 group-hover:scale-110" />,
      title: 'Sound, Light & Visual Effects',
      description: 'Immersive Audio-Visual Coordination.'
    }
  ];

  return (
    <section id="services" className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-br from-slate-950 via-indigo-950 to-black overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl animate-pulse" />
        <div className="absolute -bottom-28 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-pink-500/20 via-orange-500/10 to-transparent blur-3xl animate-pulse delay-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_65%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-14 px-1">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-fuchsia-200 drop-shadow-[0_0_25px_rgba(255,255,255,0.18)] animate-fade-in-up sm:text-4xl md:text-5xl lg:text-6xl">
            Premium Products
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-sm text-slate-200 font-light leading-relaxed animate-fade-in-up delay-150 sm:mt-6 sm:text-base md:text-lg">
            Explore our premium product lineup, designed with rich color themes and polished experiences for every event.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-purple-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-70" />
              <div className="relative z-10 flex h-full flex-col items-center p-6 text-center sm:p-8 md:p-10">
                <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/10 shadow-lg transition group-hover:scale-105">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-white">
                  {service.title}
                </h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8">
                  {service.description}
                </p>

                <Link
                  to={
                    service.id === 'cloud-effects' ? '/services/cloud-effects' :
                    service.id === 'luxury-wedding' ? '/services/luxury-wedding' :
                    service.id === 'grand-entry' ? '/services/grand-entry' :
                    service.id === 'venue-decoration' ? '/services/venue-decoration' :
                    service.id === 'fireworks' ? '/services/fireworks' :
                    service.id === 'sound-light' ? '/services/sound-light-visual' : '#'
                  }
                  className="mt-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02] hover:shadow-blue-500/40"
                >
                  Explore
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="absolute inset-0 border-2 border-transparent rounded-3xl group-hover:border-blue-500/40" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.9s ease-out both;
        }
      `}</style>
    </section>
  );
};

export default Services;
