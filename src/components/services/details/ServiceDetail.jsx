import React from 'react';
import { Link } from 'react-router-dom';

const ServiceDetail = ({ 
  title, 
  description, 
  features, 
  idealFor, 
  icon: Icon,
  imageUrl,
  iconBgColor = 'bg-blue-100',
  iconTextColor = 'text-blue-600',
  buttonBgColor = 'bg-yellow-500',
  buttonHoverColor = 'hover:bg-yellow-600'
}) => {
  return (
    <div className="min-h-[calc(100dvh-var(--header-stack-h))] min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-yellow-600 hover:text-yellow-700 transition-colors duration-300 mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Home
          </Link>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 p-8 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                <div className={`w-32 h-32 rounded-full ${iconBgColor} flex items-center justify-center`}>
                  {Icon && <Icon className={`text-6xl ${iconTextColor}`} />}
                </div>
              </div>
              
              <div className="p-8 md:p-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
                <p className="text-lg text-gray-600 mb-6">{description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Features</h3>
                    <ul className="space-y-2">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Ideal For</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {idealFor.map((item, index) => (
                        <div key={index} className="bg-blue-50 p-3 rounded-lg">
                          <h4 className="font-medium text-blue-800">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link
                    to="/contact"
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${buttonBgColor} ${buttonHoverColor} transition-colors duration-300`}
                  >
                    Book This Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
