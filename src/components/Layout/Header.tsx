import btwawiLogo from "../../assets/images/btwawi-logo.png";
import { RiWhatsappFill } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import clsx from "clsx";

const Header = () => {
  return (
    <header className="w-full bg-white/20 pt-2 pb-7 before:content-[''] before:absolute before:inset-0 before:bg-fixed before:bg-no-repeat before:bg-skew-pattern dark:before:bg-skew-pattern-dark">
      <div
        className={clsx([
          "md:container  px-4 py-3 mt-4 mb-10 flex justify-between items-center",
        ])}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={btwawiLogo}
            alt="PeerMoove Logo"
            className="h-14 mr-3 shrink-0"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center">
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
                to={"/lagos"}
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
                className="text-sm hidden font-extrabold font-aeonik md:flex items-center gap-2 p-6 rounded-full border border-prussianBlue hover:translate-x-1 transition-transform duration-200"
              >
                <RiWhatsappFill size={20} className="text-primaryGreen" />
                Chat with us
                <BsArrowRight size={20} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
