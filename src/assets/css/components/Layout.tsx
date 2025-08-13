import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 h-[141px] transition-all duration-300 ${
        isScrolled 
          ? 'bg-btwawi-blue backdrop-blur-[10.65px]' 
          : 'bg-white/51 backdrop-blur-[10.65px]'
      }`}>
        <div className="flex flex-nowrap items-center justify-between h-full px-4 max-w-[1440px] mx-auto min-w-[800px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/062a06212635a043526a21f6fac51f1efe38ce4d?width=518"
                alt="BTWAWI Logo"
                className="w-[259px] h-16"
              />
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex flex-nowrap items-center gap-8">
            {/* Page Navigation */}
            <div className="flex flex-nowrap items-center gap-6 whitespace-nowrap">
              <Link
                to="/lagos"
                className={`font-wixmadefor text-xl leading-[29.32px] tracking-[-0.8px] transition-colors hover:opacity-80 ${
                  location.pathname === '/lagos'
                    ? isScrolled ? 'text-btwawi-yellow font-semibold' : 'text-btwawi-blue font-semibold'
                    : isScrolled ? 'text-white' : 'text-gray-500 hover:text-btwawi-blue'
                }`}
              >
                Lagos
              </Link>
              <Link
                to="/abuja"
                className={`font-wixmadefor text-xl leading-[29.32px] tracking-[-0.8px] transition-colors hover:opacity-80 ${
                  location.pathname === '/abuja'
                    ? isScrolled ? 'text-btwawi-yellow font-semibold' : 'text-btwawi-blue font-semibold'
                    : isScrolled ? 'text-white' : 'text-gray-500 hover:text-btwawi-blue'
                }`}
              >
                Abuja
              </Link>
              <Link
                to="/blog"
                className={`font-wixmadefor text-xl leading-[29.32px] tracking-[-0.8px] transition-colors hover:opacity-80 ${
                  location.pathname === '/blog'
                    ? isScrolled ? 'text-btwawi-yellow font-semibold' : 'text-btwawi-blue font-semibold'
                    : isScrolled ? 'text-white' : 'text-gray-500 hover:text-btwawi-blue'
                }`}
              >
                Blog
              </Link>
            </div>

            {/* Chat Button - Exact Figma Design */}
            <a
              href="https://wa.me/2348121314177"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity duration-200"
            >
              <svg width="201" height="64" viewBox="0 0 201 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.125011" y="0.125011" width="199.768" height="63.5811" rx="31.7906" fill="white"/>
                <rect x="0.125011" y="0.125011" width="199.768" height="63.5811" rx="31.7906" stroke="#002D62" strokeWidth="0.250022"/>
                <path d="M43.7843 20.6768H43.7787C37.5818 20.6768 32.5425 25.7175 32.5425 31.9158C32.5425 34.3743 33.3348 36.653 34.6821 38.5032L33.2814 42.6785L37.6014 41.2975C39.3786 42.4748 41.4986 43.1548 43.7843 43.1548C49.9812 43.1548 55.0205 38.1127 55.0205 31.9158C55.0205 25.7189 49.9812 20.6768 43.7843 20.6768Z" fill="#4CAF50"/>
                <path d="M50.324 36.5476C50.0529 37.3133 48.9767 37.9483 48.1183 38.1337C47.5311 38.2588 46.764 38.3585 44.1819 37.288C40.879 35.9197 38.752 32.5634 38.5863 32.3457C38.4275 32.1279 37.2516 30.5685 37.2516 28.9557C37.2516 27.3429 38.0707 26.5576 38.4008 26.2204C38.672 25.9436 39.1201 25.8172 39.55 25.8172C39.6891 25.8172 39.8141 25.8242 39.9265 25.8298C40.2567 25.8439 40.4224 25.8636 40.6402 26.3848C40.9113 27.038 41.5716 28.6508 41.6503 28.8166C41.7304 28.9824 41.8104 29.2072 41.6981 29.4249C41.5927 29.6497 41.5 29.7494 41.3342 29.9405C41.1684 30.1316 41.0111 30.2777 40.8453 30.4828C40.6936 30.6612 40.5222 30.8523 40.7132 31.1824C40.9043 31.5055 41.5646 32.5831 42.5368 33.4485C43.7913 34.5654 44.8084 34.9222 45.1723 35.0739C45.4435 35.1863 45.7666 35.1596 45.9647 34.9489C46.2161 34.6777 46.5266 34.2282 46.8427 33.7857C47.0675 33.4682 47.3513 33.4288 47.6491 33.5412C47.9526 33.6466 49.5583 34.4403 49.8885 34.6047C50.2186 34.7705 50.4364 34.8491 50.5165 34.9882C50.5951 35.1273 50.5951 35.7806 50.324 36.5476Z" fill="#FAFAFA"/>
                <text fill="#002D62" xmlSpace="preserve" style={{whiteSpace: 'pre'}} fontFamily="Aeonik" fontSize="14.7523" fontWeight="bold" letterSpacing="-0.04em">
                  <tspan x="62.3965" y="37.7535">Chat with us</tspan>
                </text>
                <path d="M167.997 32.4371C168.285 32.149 168.285 31.682 167.997 31.394L163.303 26.6998C163.015 26.4118 162.548 26.4118 162.259 26.6998C161.971 26.9879 161.971 27.4549 162.259 27.743L166.432 31.9155L162.259 36.0881C161.971 36.3762 161.971 36.8432 162.259 37.1312C162.548 37.4193 163.015 37.4193 163.303 37.1312L167.997 32.4371ZM149.772 31.9155L149.772 32.6531L167.475 32.6531L167.475 31.9155L167.475 31.1779L149.772 31.1779L149.772 31.9155Z" fill="#002D62"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
