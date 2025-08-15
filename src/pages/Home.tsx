import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pt-[141px]">
      {/* Hero Section */}
      <section className="relative h-[100vh] min-h-[600px] w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/f35aca83263f36993b25b34c90861e71bd1e7d72?width=2880')"
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          {/* Main Heading */}
          <h1 className="text-white font-aeonik text-vw-5xl font-bold leading-tight mb-8 max-w-[1000px]">
            Business The Way<br />
            <span className="text-btwawi-yellow">Allaah Wants It</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white font-aeonik text-vw-2xl font-normal leading-relaxed mb-16 max-w-[800px]">
            Join thousands of faith-driven entrepreneurs building halal businesses across Nigeria
          </p>
          
          {/* Event Cards - Fixed row layout */}
          <div className="flex flex-nowrap gap-8 w-full max-w-[800px] min-w-[600px] overflow-x-auto">
            {/* Lagos Card */}
            <Link
              to="/lagos"
              className="flex-1 min-w-[280px] bg-white/90 backdrop-blur-sm rounded-2xl p-8 hover:bg-white transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="text-btwawi-blue font-aeonik text-vw-xl font-bold mb-4">
                LAGOS 4.0
              </div>
              <div className="text-btwawi-blue font-aeonik text-vw-lg mb-4">
                Sunday, 23rd November 2025
              </div>
              <div className="text-gray-600 font-aeonik text-vw-base mb-6">
                The 4th edition in Nigeria's commercial capital
              </div>
              <div className="bg-btwawi-yellow text-btwawi-blue px-6 py-3 rounded-full font-bold text-center group-hover:bg-btwawi-blue group-hover:text-white transition-colors duration-300">
                Learn More
              </div>
            </Link>

            {/* Abuja Card */}
            <Link
              to="/abuja"
              className="flex-1 min-w-[280px] bg-white/90 backdrop-blur-sm rounded-2xl p-8 hover:bg-white transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="text-btwawi-blue font-aeonik text-vw-xl font-bold mb-4">
                ABUJA 2.0
              </div>
              <div className="text-btwawi-blue font-aeonik text-vw-lg mb-4">
                Saturday, 29th November 2025
              </div>
              <div className="text-gray-600 font-aeonik text-vw-base mb-6">
                Bringing halal business to the capital city
              </div>
              <div className="bg-btwawi-yellow text-btwawi-blue px-6 py-3 rounded-full font-bold text-center group-hover:bg-btwawi-blue group-hover:text-white transition-colors duration-300">
                Learn More
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Event Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-btwawi-blue font-aeonik text-4xl md:text-5xl font-bold mb-8">
              Why Join BTWAWI Events?
            </h2>
            <p className="text-gray-600 font-aeonik text-xl max-w-[700px] mx-auto">
              Experience the largest gathering of Muslim entrepreneurs and business professionals in Nigeria
            </p>
          </div>

          <div className="flex flex-nowrap gap-12 min-w-[900px] overflow-x-auto">
            {/* Feature 1 */}
            <div className="text-center min-w-[280px] flex-1">
              <div className="w-20 h-20 bg-btwawi-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#002D62"/>
                </svg>
              </div>
              <h3 className="text-btwawi-blue font-aeonik text-vw-xl font-bold mb-4">
                Halal Business Education
              </h3>
              <p className="text-gray-600 font-aeonik text-vw-lg">
                Learn from experts about shariah-compliant business practices and Islamic finance
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center min-w-[280px] flex-1">
              <div className="w-20 h-20 bg-btwawi-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4C18.2091 4 20 5.79086 20 8C20 10.2091 18.2091 12 16 12C13.7909 12 12 10.2091 12 8C12 5.79086 13.7909 4 16 4ZM8 6C9.65685 6 11 7.34315 11 9C11 10.6569 9.65685 12 8 12C6.34315 12 5 10.6569 5 9C5 7.34315 6.34315 6 8 6ZM8 13C11.3137 13 14 15.6863 14 19V21H2V19C2 15.6863 4.68629 13 8 13ZM16 13C18.7614 13 21 15.2386 21 18V20H15V19C15 16.7909 14.7909 15 14 13.4722C14.5 13.1704 15.125 13 16 13Z" fill="#002D62"/>
                </svg>
              </div>
              <h3 className="text-btwawi-blue font-aeonik text-vw-xl font-bold mb-4">
                Networking Opportunities
              </h3>
              <p className="text-gray-600 font-aeonik text-vw-lg">
                Connect with thousands of like-minded entrepreneurs and potential business partners
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center min-w-[280px] flex-1">
              <div className="w-20 h-20 bg-btwawi-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="#002D62"/>
                </svg>
              </div>
              <h3 className="text-btwawi-blue font-aeonik text-vw-xl font-bold mb-4">
                Success Stories
              </h3>
              <p className="text-gray-600 font-aeonik text-vw-lg">
                Get inspired by real stories from successful Muslim business owners and entrepreneurs
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
