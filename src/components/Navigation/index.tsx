import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Lucide from "../../base-components/Lucide";
import Button from "../../base-components/Button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Lagos", href: "/lagos" },
    { name: "Abuja", href: "/abuja" },
    { name: "Blog", href: "/blog" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleChatWithUs = () => {
    // WhatsApp chat link - replace with your conference WhatsApp number
    const whatsappNumber = "+2348072589256"; // Replace with actual number
    const message = "Hello! I'm interested in the conference.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-3 bg-[#FFFFFF82] backdrop-blur-21.3 shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto ">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                className="h-14 w-auto"
                src="/images/svg/btwawi-main-logo.svg"
                alt="Conference Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-[20px] font-normal text-primary transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-primary text-white shadow-lg"
                      : "text-gray-700 hover:bg-white/30 hover:text-gray-900 hover:backdrop-blur-sm"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Chat with Us Button */}
            <button
              onClick={handleChatWithUs}
              className="flex items-center space-x-2 text-primary p-4 rounded-full bg-white border border-primary shadow-lg"
            >
              <img src="/images/svg/whatsapp-logo.svg" alt="Chat Icon" className="w-4 h-4" />
              <span>Chat with Us</span>
              <Lucide icon="ArrowRight" className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <Lucide 
                icon={isMenuOpen ? "X" : "Menu"} 
                className="block h-6 w-6" 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div 
            className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white/20 backdrop-blur-md"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-primary text-white shadow-lg"
                    : "text-gray-700 hover:bg-white/30 hover:text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-white/20">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleChatWithUs();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Lucide icon="MessageCircle" className="w-4 h-4" />
                <span>Chat with Us</span>
                <Lucide icon="ArrowRight" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;