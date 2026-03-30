import React from 'react';
import { FaStar, FaFire, FaCalendarAlt, FaMagic, FaCertificate } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about-us" className="relative overflow-hidden py-12 sm:py-16 md:py-24 bg-gradient-to-br from-slate-950 via-indigo-950 to-black">
      <div className="absolute inset-0">
        <div className="absolute -top-28 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-28 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-pink-500/20 via-orange-500/10 to-transparent blur-3xl animate-pulse delay-500"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-pink-200 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] animate-fade-in-up sm:text-4xl md:text-5xl lg:text-6xl px-1">
            About <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">AK Events & Fireworks</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-sm text-slate-200 font-light leading-relaxed animate-fade-in-up delay-150 sm:mt-6 sm:text-base md:text-lg px-1">
            We bring every celebration to life with premium pyrotechnic design, flawless execution, and the kind of wow-factor that becomes the talk of the town.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          <div className="relative rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden p-5 sm:p-8 md:p-10 animate-fade-in-left">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-80" />
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg">
                  <FaMagic className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">We Craft Experiences</h3>
                  <p className="mt-2 text-slate-200 leading-relaxed">
                    Every show is designed from scratch to match your vision, venue, and audience energy.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-100">
                    <FaStar className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Elite Team</h4>
                    <p className="text-slate-300 text-sm">Certified pyrotechnicians & event planners.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-pink-500/20 text-pink-100">
                    <FaFire className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Custom Shows</h4>
                    <p className="text-slate-300 text-sm">Choreographed fireworks matched to your soundtrack.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 text-blue-100">
                    <FaCalendarAlt className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">End-to-End Planning</h4>
                    <p className="text-slate-300 text-sm">Permits, logistics, and on-site safety coordination.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-100">
                    <FaCertificate className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Trusted Excellence</h4>
                    <p className="text-slate-300 text-sm">Rave reviews from weddings, festivals, and corporate events.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.02] hover:shadow-blue-500/50"
                >
                  Book a Free Consultation
                </a>
                <a
                  href="#gallery"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  View Our Portfolio
                </a>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-black/30 to-white/5 backdrop-blur-xl animate-fade-in-right">
            <img
              src="https://images.unsplash.com/photo-1528197594958-96c20a75a403?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
              alt="Fireworks celebration"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white/10 border border-white/10 p-5 backdrop-blur-xl">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="mt-1 text-sm text-slate-200">Live Events Produced</div>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/10 p-5 backdrop-blur-xl">
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="mt-1 text-sm text-slate-200">Firework Choreographies</div>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/10 p-5 backdrop-blur-xl">
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="mt-1 text-sm text-slate-200">Cities Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
