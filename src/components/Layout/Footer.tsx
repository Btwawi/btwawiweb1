import btwawiLogo from "../../assets/images/btwawi-logo.png";
import btwawiFooter from "../../assets/images/footer.png";
import { RiWhatsappFill, RiLinkedinFill, RiTwitterXFill } from "react-icons/ri";
import { CgFacebook } from "react-icons/cg";
import { BsArrowRight, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="md:container px-4 py-10 flex flex-col md:flex-row justify-between items-center w-full">
        {/* Logo */}
        <div className="flex flex-col gap-4 font-aeonik md:items-start items-center">
          <img
            src={btwawiLogo}
            alt="PeerMoove Logo"
            className="h-18 mb-2  mr-3 shrink-0"
          />

          <p className="text-xl text-prussianBlue">
            Redefining how Muslims view business — <br /> one aligned with
            faith, ethics, and purpose.{" "}
          </p>

          <div className="flex gap-2">
            <a
              href="https://www.facebook.com/btwawiinitiative"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit our Facebook page"
              className="rounded-full p-2 bg-lightYellowBase text-white hover:-translate-y-1 transition-transform"
            >
              <CgFacebook size={26} />
            </a>

            <a
              href="https://www.instagram.com/btwawi/"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit our Instagram page"
              className="rounded-full p-2 bg-lightYellowBase text-white hover:-translate-y-1 transition-transform"
            >
              <BsInstagram size={26} />
            </a>

            <a
              href="https://www.linkedin.com/company/btwawiinitiative/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit our LinkedIn page"
              className="rounded-full p-2 bg-lightYellowBase text-white hover:-translate-y-1 transition-transform"
            >
              <RiLinkedinFill size={26} />
            </a>

            <a
              href="https://x.com/btwawi"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit our X page"
              className="rounded-full p-2 bg-lightYellowBase text-white hover:-translate-y-1 transition-transform"
            >
              <RiTwitterXFill size={26} />
            </a>
          </div>
        </div>

        <div className="flex  md:w-2/4 md:gap-36 gap-16 mt-6  items-center justify-between font-aeonik">
          <ul className="flex flex-col items-center gap-2 md:text-lg text-lightGray">
            <li className="w-full">
              <h4 className="font-semibold text-left">Explore</h4>
            </li>
            <li className="w-full text-left">
              <Link to={"/speakers"}>Speakers</Link>
            </li>
            <li className="w-full text-left">
              <Link to={"/partners"}>Partners</Link>
            </li>
            <li className="w-full text-left">
              <Link to={"/sponsors"}>Sponsors</Link>
            </li>
            <li className="w-full text-left">
              <Link to={"/blog"}>Blog</Link>
            </li>
          </ul>
          {/* Links to past editions */}
          <ul className="flex flex-col items-center gap-2 md:text-lg text-lightGray">
            <li className="w-full">
              <h4 className="font-semibold text-left">Editions</h4>
            </li>
            <li className="w-full text-left">
              <a
                href="https://www.youtube.com/watch?v=2ETM1Hxkyuo"
                target="_blank"
                rel="noopener noreferrer"
                title="Watch Abuja 1.0 on our Youtube Channel"
              >
                Abuja 1.0
              </a>
            </li>
            <li className="w-full text-left">
              <a
                href="https://www.youtube.com/watch?v=lYhlIgFSnxw&t=17s"
                target="_blank"
                rel="noopener noreferrer"
                title="Watch Lagos 3.0 on our Youtube Channel"
              >
                Lagos 3.0
              </a>
            </li>
            <li className="w-full text-left">
              <a
                href="https://www.youtube.com/watch?v=oSDD5C3Ps6U"
                target="_blank"
                rel="noopener noreferrer"
                title="Watch Lagos 2.0 on our Youtube Channel"
              >
                Lagos 2.0
              </a>
            </li>
            <li className="w-full text-left">
              <a
                href="https://www.youtube.com/watch?v=jZykJgVhwQg"
                target="_blank"
                rel="noopener noreferrer"
                title="Watch Lagos 1.0 on our Youtube Channel"
              >
                Lagos 1.0
              </a>
            </li>
          </ul>
          {/* Contact details */}
          <ul className="flex  flex-col items-center gap-2 font-wix md:text-lg text-lightGray">
            <li className="w-full">
              <h4 className="font-semibold text-left">Contact Us</h4>
            </li>
            <li className="w-full text-left">
              <a
                href="tel:+2348121314177"
                title="Call us on this number +2348121314177"
              >
                +2348121314177
              </a>
            </li>
            <li className="w-full text-left">
              <a
                href="mailto:info@btwawi.com"
                title="Send us a mail at info@btwawi.com"
              >
                info@btwawi.com
              </a>
            </li>
            <li>
              <a
                href="http://wa.me/2348121314177"
                rel="noopener noreferrer"
                target="_blank"
                title="Chat with us on WhatsApp"
                className="text-sm font-extrabold font-aeonik flex items-center gap-2 p-[18px] md:p-6 rounded-full border border-prussianBlue"
              >
                <RiWhatsappFill size={20} className="text-primaryGreen" />
                Chat with us
                <BsArrowRight size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <img
        src={btwawiFooter}
        className="md:h-20 h-12 object-fit w-full"
        alt="footer bottom"
      />
    </footer>
  );
};

export default Footer;
