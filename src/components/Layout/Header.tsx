import btwawiLogo from "../../assets/images/btwawi-logo.png";
import { RiWhatsappFill } from "react-icons/ri";
import { BsArrowRight, BsList, BsX } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";

const Header = ({ onMenuToggle }: { onMenuToggle: any }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Notify parent component about menu state change
    if (onMenuToggle) {
      onMenuToggle(!isMenuOpen);
    }
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-sm shadow-sm relative z-50">
      <div className="container px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={btwawiLogo}
            alt="PeerMoove Logo"
            className="h-10 md:h-14 mr-3 shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex items-center space-x-6 md:space-x-10 font-wix text-lg md:text-xl text-prussianBlue">
            <li>
              <Link
                to={"/lagos"}
                className="hover:underline hover:underline-offset-8 transition duration-200"
              >
                Lagos
              </Link>
            </li>
            <li>
              <Link
                to={"/abuja"}
                className="hover:underline hover:underline-offset-8 transition duration-200"
              >
                Abuja
              </Link>
            </li>
            <li>
              <Link
                to={"/our-blog"}
                className="hover:underline hover:underline-offset-8 transition duration-200"
              >
                Blog
              </Link>
            </li>
            <li>
              <a
                href="http://wa.me/2348121314177"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with us on Whatsapp"
                aria-label=""
                className="text-sm hidden font-extrabold font-aeonik bg-white md:flex items-center gap-2 p-6 rounded-full hover:translate-x-1 transition-transform duration-200"
              >
                {/* @ts-ignore */}
                <RiWhatsappFill size={20} className="text-primaryGreen" />
                Chat with us
                {/* @ts-ignore */}
                <BsArrowRight size={20} />
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-prussianBlue focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            //  @ts-ignore
            <BsX size={32} />
          ) : (
            //  @ts-ignore
            <BsList size={32} />
          )}
        </button>
      </div>

      {/* Mobile Navigation - now uses conditional rendering instead of max-height transitions */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
          <ul className="flex flex-col items-center space-y-4 font-wix text-lg text-prussianBlue py-6">
            <li>
              <Link
                to={"/lagos"}
                className="hover:underline hover:underline-offset-8 transition duration-200"
                onClick={toggleMenu}
              >
                Lagos
              </Link>
            </li>
            <li>
              <Link
                to={"/abuja"}
                className="hover:underline hover:underline-offset-8 transition duration-200"
                onClick={toggleMenu}
              >
                Abuja
              </Link>
            </li>
            <li>
              <Link
                to={"/our-blog"}
                className="hover:underline hover:underline-offset-8 transition duration-200"
                onClick={toggleMenu}
              >
                Blog
              </Link>
            </li>
            <li className="pt-2">
              <a
                href="http://wa.me/2348121314177"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with us on Whatsapp"
                aria-label=""
                className="text-sm font-extrabold font-aeonik bg-white flex items-center gap-2 px-6 py-3 rounded-full hover:translate-x-1 transition-transform duration-200"
                onClick={toggleMenu}
              >
                {/* @ts-ignore */}
                <RiWhatsappFill size={20} className="text-primaryGreen" />
                Chat with us
                {/* @ts-ignore */}
                <BsArrowRight size={20} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
