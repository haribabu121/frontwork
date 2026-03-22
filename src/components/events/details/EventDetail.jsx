import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft, FaClock, FaUsers, FaTicketAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EventDetail = ({ event }) => {
  if (!event) return <div className="text-center py-20">Loading event details...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-yellow-600 hover:text-yellow-700 transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Event Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            className="w-full h-full object-cover opacity-30"
            src={event.image}
            alt={event.title}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold leading-tight text-white mb-4 sm:text-3xl md:text-4xl lg:text-5xl px-1">{event.title}</h1>
            <div className="flex flex-wrap justify-center items-center gap-4 text-white/90">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-yellow-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-yellow-400" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
                <div className="prose max-w-none text-gray-600">
                  <p className="mb-6">
                    {event.description || 'Join us for an unforgettable experience at our upcoming event. More details will be announced soon.'}
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Highlights</h3>
                  <ul className="space-y-2 mb-6">
                    {event.highlights?.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {highlight}
                      </li>
                    )) || (
                      <>
                        <li>Spectacular firework displays</li>
                        <li>Live entertainment and performances</li>
                        <li>Delicious food and beverages</li>
                        <li>Family-friendly activities</li>
                        <li>VIP experiences available</li>
                      </>
                    )}
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Event Schedule</h3>
                  <div className="space-y-4 mb-6">
                    {event.schedule?.map((item, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 w-32">
                          <span className="font-medium text-gray-900">{item.time}</span>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    )) || (
                      <div className="flex">
                        <div className="flex-shrink-0 w-32">
                          <span className="font-medium text-gray-900">06:00 PM</span>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">Gates Open</h4>
                          <p className="text-gray-600">Arrive early to get the best spots</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Event Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-6">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Event Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-50 flex items-center justify-center">
                      <FaCalendarAlt className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Date & Time</p>
                      <p className="text-base font-medium text-gray-900">
                        {event.date}
                      </p>
                      <p className="text-sm text-gray-500">
                        {event.time || '06:00 PM - 11:00 PM'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-50 flex items-center justify-center">
                      <FaMapMarkerAlt className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-base font-medium text-gray-900">
                        {event.location}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {event.address || 'Vijayawada, Andhra Pradesh'}
                      </p>
                      {event.mapLink && (
                        <a 
                          href={event.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-yellow-600 hover:text-yellow-700 mt-1"
                        >
                          View on map
                          <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {event.ticketPrice && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-50 flex items-center justify-center">
                        <FaTicketAlt className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Tickets</p>
                        <p className="text-base font-medium text-gray-900">
                          {event.ticketPrice}
                        </p>
                        {event.ticketLink && (
                          <a 
                            href={event.ticketLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-yellow-600 hover:text-yellow-700 mt-1"
                          >
                            Get Tickets
                            <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <a
                    href={event.ticketLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300"
                  >
                    Book Now
                  </a>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      Questions?{' '}
                      <a href="#contact" className="text-yellow-600 hover:text-yellow-700">
                        Contact Us
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
              <img
                src={event.galleryImage1 || "https://images.unsplash.com/photo-1511578314321-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"}
                alt={event.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
              <img
                src={event.galleryImage2 || "https://images.unsplash.com/photo-1505373876331-ff89baa5dba7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"}
                alt={event.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
