import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaArrowRight, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { API_URLS, fetchApi } from "../../lib/api";
import { format, parse, startOfWeek, getDay, isSameDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import emailjs from "emailjs-com";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Add custom styles for mobile
const customStyles = `
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

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .rbc-month-view, .rbc-time-view, .rbc-agenda-view {
    min-height: 450px;
    border-radius: 16px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .rbc-month-row {
    min-height: 80px;
  }
  
  .rbc-day-bg, .rbc-header, .rbc-header + .rbc-header {
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }
  
  .rbc-today {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%);
    border: 1px solid rgba(59, 130, 246, 0.5);
  }
  
  .rbc-off-range-bg {
    background: rgba(255, 255, 255, 0.02);
  }
  
  .rbc-month-view .rbc-date-cell {
    padding: 4px;
    text-align: center;
    font-weight: 600;
    color: white;
  }
  
  .rbc-date-cell.rbc-now {
    font-weight: bold;
    color: #60a5fa;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.4) 100%);
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  
  .rbc-event {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    border-radius: 8px;
    padding: 3px 8px;
    color: white;
    font-size: 12px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    border: 1px solid rgba(245, 158, 11, 0.5);
  }
  
  .rbc-header {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    font-weight: 700;
    color: white;
    padding: 16px 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  /* Mobile optimizations */
  @media (max-width: 768px) {
    .rbc-toolbar {
      flex-direction: column;
      gap: 8px;
    }
    
    .rbc-toolbar .rbc-toolbar-label {
      margin: 8px 0;
    }
    
    .rbc-month-view {
      min-height: 70vh;
    }
    
    .rbc-month-row {
      min-height: 12vh;
    }
    
    .rbc-date-cell {
      min-height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .rbc-day-bg {
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(0,0,0,0.1);
    }
    
    .rbc-day-bg:hover {
      background-color: rgba(147, 51, 234, 0.1);
    }
  }
`;

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales: { "en-US": enUS },
});

const CustomToolbar = ({ label, onNavigate, onView }) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) onNavigate("NEXT");
    if (isRightSwipe) onNavigate("PREV");
  };

  return (
    <div
      className="rbc-toolbar flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 font-bold overflow-hidden group/btn"
        onClick={() => onNavigate("TODAY")}
      >
        <span className="relative z-10">Today</span>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
      </button>
      <div className="flex items-center gap-6">
        <button
          className="p-4 rounded-2xl hover:bg-white/10 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm border border-white/20"
          onClick={() => onNavigate("PREV")}
          aria-label="Previous month"
        >
          <FaChevronLeft className="text-white hover:text-blue-300" />
        </button>
        <span className="font-bold text-2xl text-white min-w-max">{label}</span>
        <button
          className="p-4 rounded-2xl hover:bg-white/10 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm border border-white/20"
          onClick={() => onNavigate("NEXT")}
          aria-label="Next month"
        >
          <FaChevronRight className="text-white hover:text-blue-300" />
        </button>
      </div>
      <div className="hidden sm:block w-24"></div> {/* Spacer for alignment */}
    </div>
  );
};

const showAlert = (message) => alert(message);

const productDomId = (name) =>
  String(name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

const Products = () => {
  const [showForm, setShowForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formData, setFormData] = useState({ name: "", phone: "", occasion: "" });
  const [events, setEvents] = useState([]);
  const [emailSent, setEmailSent] = useState(false); // <-- NEW: prevent duplicate email
  const [products, setProducts] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let isFirstLoad = true;
    const load = () => {
      fetchApi(API_URLS.CMS_PRODUCTS)
        .then((data) => {
          if (!cancelled && data.ok) setProducts(data.products || []);
        })
        .catch(() => {})
        .finally(() => {
          if (!cancelled && isFirstLoad) {
            setCatalogLoading(false);
            isFirstLoad = false;
          }
        });
    };
    load();

    const refreshHandler = () => {
      load();
    };

    window.addEventListener("cmsDataUpdated", refreshHandler);
    const interval = setInterval(load, 60000); // Refresh every 60 seconds
    return () => {
      cancelled = true;
      clearInterval(interval);
      window.removeEventListener("cmsDataUpdated", refreshHandler);
    };
  }, []);

  // Load saved bookings
  useEffect(() => {
    const savedEvents = localStorage.getItem("bookedEvents");
    if (savedEvents) {
      const parsed = JSON.parse(savedEvents).map(ev => ({
        ...ev,
        start: new Date(ev.start),
        end: new Date(ev.end)
      }));
      setEvents(parsed);
    }
  }, []);

  // Save bookings
  useEffect(() => {
    localStorage.setItem("bookedEvents", JSON.stringify(events));
  }, [events]);

  const handleBookNow = (product) => {
    setSelectedProduct(product);
    setEmailSent(false); // reset email flag for new booking
    setShowForm(true);
  };

  /** -------------------------
   * FORM SUBMIT
   * ------------------------- */
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Success alert
    alert("Form details submitted successfully!");

    // Close form popup
    setShowForm(false);

    // Open calendar
    setShowCalendar(true);
  };

  /** -------------------------
   * DATE SELECTION / BOOKING
   * ------------------------- */
  const processDateSelection = (date) => {
    const selectedDate = new Date(date);
    selectedDate.setHours(12, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      showAlert("Cannot book past dates.");
      return;
    }

    const alreadyBooked = events.some(ev => {
      const eventDate = new Date(ev.start);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === selectedDate.getTime();
    });

    if (alreadyBooked) {
      showAlert("This date is already booked!");
      return;
    }

    if (window.confirm(`Confirm booking for ${selectedProduct?.name.replace(/-/g, " ")} on ${selectedDate.toDateString()}?`)) {
      const newEvent = {
        id: Date.now(),
        title: `Booked: ${selectedProduct?.name}`,
        start: selectedDate,
        end: selectedDate,
        allDay: true,
      };

      setEvents(prev => [...prev, newEvent]);

      // Send email only once
      sendEmail(selectedDate);

      showAlert(`Booking confirmed for ${selectedProduct?.name} on ${selectedDate.toDateString()}!`);
      setShowCalendar(false);
    }
  };

  const handleSelectSlot = ({ start }) => {
    // Add a small delay to improve touch feedback
    const selectedCell = document.querySelector('.rbc-day-bg.rbc-selected-cell');
    if (selectedCell) {
      selectedCell.style.transition = 'background-color 0.2s';
      selectedCell.style.backgroundColor = '#fef9c3';
      
      setTimeout(() => {
        if (selectedCell) {
          selectedCell.style.transition = 'background-color 0.3s';
          selectedCell.style.backgroundColor = '';
        }
        processDateSelection(start);
      }, 150);
    } else {
      processDateSelection(start);
    }
  };

  /** ---------------------------
   * EMAIL SEND (ONLY ONCE)
   * --------------------------- */
  const sendEmail = (date) => {
    if (emailSent || !selectedProduct) return; // <-- prevent duplicates

    const emailData = {
      product: selectedProduct.name,
      name: formData.name,
      phone: formData.phone,
      occasion: formData.occasion,
      booking_date: date.toLocaleDateString(),
    };

    emailjs
      .send("service_80on2il", "template_wflm9wo", emailData, "JSypFwbJbZ8zqx-hf")
      .then(() => {
        console.log("Email sent successfully");
        setEmailSent(true); // <-- mark as sent
      })
      .catch(err => console.error("EmailJS Error:", err));
  };

  return (
    <section id="products" className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden min-h-screen">
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

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="relative">
            {/* Glow effect behind title */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl scale-150"></div>

            <h1 className="relative text-3xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 mb-6 animate-fade-in-up sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl sm:mb-8">
              Our
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                Premium Products
              </span>
            </h1>

            {/* Animated underline */}
            <div className="relative mx-auto w-48 h-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-sm animate-pulse delay-75"></div>
            </div>
          </div>

          <p className="text-gray-300 max-w-4xl mx-auto text-sm leading-relaxed font-light mt-6 animate-fade-in-up delay-200 sm:text-base md:text-lg lg:text-xl px-1 sm:mt-8">
            Discover our exclusive collection of cutting-edge event technology and premium entertainment solutions,
            crafted to transform your special moments into unforgettable experiences.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8 sm:mt-12 animate-fade-in-up delay-300 px-2">
            <div className="text-center min-w-[4.5rem]">
              <div className="text-2xl font-bold text-white sm:text-3xl">
                {catalogLoading ? "…" : products.length > 0 ? `${products.length}+` : "—"}
              </div>
              <div className="text-gray-400 text-sm">Products</div>
            </div>
            <div className="text-center min-w-[4.5rem]">
              <div className="text-2xl font-bold text-white sm:text-3xl">1000+</div>
              <div className="text-gray-400 text-sm">Happy Events</div>
            </div>
            <div className="text-center min-w-[4.5rem]">
              <div className="text-2xl font-bold text-white sm:text-3xl">5★</div>
              <div className="text-gray-400 text-sm">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
          {catalogLoading && products.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-16">Loading products…</div>
          )}
          {!catalogLoading && products.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-16">
              No products available. Start the API server and open the admin panel to seed the catalog.
            </div>
          )}

          {products.map((p, index) => (
            <div
              key={p.id}
              id={`product-${productDomId(p.name)}`}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glassmorphism Card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 border border-white/20 overflow-hidden h-full">

                {/* Animated border gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                {/* Image Container */}
                <div className="relative overflow-hidden rounded-t-3xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                  <img
                    src={p.image}
                    className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    alt={p.name.replace(/-/g, " ")}
                  />

                  {/* Overlay content */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-between">
                      <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400 text-sm" />
                          <span className="text-white text-sm font-medium">{p.rating}</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                        <FaArrowRight className="text-white text-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300 line-clamp-2">
                    {p.name.replace(/-/g, " ")}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                    {p.description}
                  </p>

                  {/* Features */}
                  {p.features && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {p.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-white/10 text-gray-200 px-2 py-1 rounded-full backdrop-blur-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price and CTA */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col">
                      <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 sm:text-2xl">
                        ₹{p.price}
                      </span>
                      <span className="text-xs text-gray-400">Starting from</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBookNow(p)}
                      className="relative w-full shrink-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-5 py-2.5 text-center text-sm font-semibold text-white rounded-2xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:-rotate-1 overflow-hidden group/btn sm:w-auto sm:px-6 sm:py-3 sm:text-base"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Book Now
                        <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 rounded-3xl"></div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* FORM POPUP */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/80 p-0 backdrop-blur-md animate-fade-in sm:items-center sm:p-4">
          <div className="max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl sm:rounded-3xl sm:p-8 transform animate-in fade-in-0 zoom-in-95 duration-500">
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-3xl opacity-50 blur-sm animate-pulse"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Enter Your Details</h3>
                  <p className="text-gray-300 text-sm">Let's make your event magical</p>
                </div>
                <button
                  className="p-3 hover:bg-white/10 rounded-full transition-all duration-200 hover:rotate-90"
                  onClick={() => setShowForm(false)}
                >
                  <FaTimes className="text-gray-300 hover:text-white" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white/20 transition-all duration-300 outline-none backdrop-blur-sm"
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter 10-digit phone number"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white/20 transition-all duration-300 outline-none backdrop-blur-sm"
                    pattern="[0-9]{10}"
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white">Occasion</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Wedding, Birthday, Corporate Event"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white/20 transition-all duration-300 outline-none backdrop-blur-sm"
                    onChange={e => setFormData({ ...formData, occasion: e.target.value })}
                  />
                </div>

                <button
                  className="w-full relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 rounded-2xl hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 font-bold text-lg overflow-hidden group/btn mt-8"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Submit Details
                    <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CALENDAR POPUP */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/80 p-0 backdrop-blur-md animate-fade-in sm:items-center sm:p-4">
          <div className="max-h-[95dvh] w-full max-w-5xl overflow-y-auto rounded-t-3xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl sm:rounded-3xl sm:p-8 transform animate-in fade-in-0 zoom-in-95 duration-500">
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-3xl opacity-50 blur-sm animate-pulse"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Select Your Perfect Date</h3>
                  <p className="text-gray-300 text-sm">Choose an available date to make your event unforgettable</p>
                </div>
                <button
                  className="p-3 hover:bg-white/10 rounded-full transition-all duration-200 hover:rotate-90"
                  onClick={() => setShowCalendar(false)}
                >
                  <FaTimes className="text-gray-300 hover:text-white" />
                </button>
              </div>

              <div className="w-full overflow-hidden bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <Calendar
                  date={currentDate}
                  onNavigate={(date) => setCurrentDate(date)}
                  localizer={localizer}
                  events={events}
                  selectable
                  startAccessor="start"
                  endAccessor="end"
                  onSelectSlot={handleSelectSlot}
                  components={{
                    toolbar: (props) => <CustomToolbar {...props} />,
                    month: {
                      dateHeader: ({ date, label }) => {
                        const isToday = isSameDay(date, new Date());
                        const isSelected = isSameDay(date, currentDate);
                        return (
                          <div
                            className={`rbc-date-cell ${isToday ? 'rbc-now' : ''} ${isSelected ? 'bg-blue-500/30' : ''} hover:bg-purple-500/20 transition-all duration-300 backdrop-blur-sm`}
                            style={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '50%',
                              aspectRatio: '1/1',
                              margin: '0 auto',
                              maxWidth: '40px',
                              cursor: 'pointer',
                              color: 'white',
                              fontWeight: '600',
                            }}
                          >
                            {label}
                          </div>
                        );
                      },
                    },
                  }}
                  defaultView={Views.MONTH}
                  views={[Views.MONTH]}
                  style={{
                    minHeight: "450px",
                    maxHeight: "75vh",
                    '--cell-size': '45px',
                  }}
                  dayPropGetter={(date) => ({
                    style: {
                      minHeight: '65px',
                      cursor: 'pointer',
                    },
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Products;
