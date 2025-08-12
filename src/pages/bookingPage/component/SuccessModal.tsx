import {
  RiWhatsappFill,
  RiLinkedinFill,
  RiTwitterXFill,
  RiCloseCircleFill,
} from "react-icons/ri";
import { CgFacebook } from "react-icons/cg";
import { BsArrowRight, BsInstagram } from "react-icons/bs";
import SuccessModalBg from "../../../assets/images/success-background.png";
import SuccessCheck from "../../../assets/images/success.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const redirect = () => navigate("/");

    window.addEventListener("click", redirect);

    return () => {
      window.removeEventListener("click", redirect);
    };
  }, [isOpen, navigate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div
      aria-modal="true"
      role="dialog"
      className={`fixed inset-0 bg-black/20 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-light-blue rounded-3xl p-4 md:p-8 w-full md:max-w-[50.5rem] max-w-[min(90vw,50.5rem)] mx-4 relative isolate flex flex-col gap-y-3 md:gap-y-6 items-center transition-[transform,opacity] duration-300 ${
          isOpen
            ? "opacity-100 animate-modal-slide-in"
            : "opacity-0 animate-modal-slide-out"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={SuccessModalBg}
          alt="Success Modal Background"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10 rounded-3xl"
        />
        <div className="flex justify-end w-full">
          <button
            onClick={onClose}
            className="text-prussian-blue flex items-center gap-x-1 md:gap-x-2 p-1.5 md:p-3 bg-white rounded-full hover:opacity-90 transition-opacity text-sm md:text-base"
            title="close"
            type="button"
          >
            <RiCloseCircleFill size={24} />
          </button>
        </div>
        <img
          src={SuccessCheck}
          alt="Waitlist Success Check"
          className="size-16 md:size-[7.8125rem]"
        />
        <div className="flex flex-col gap-y-2 md:gap-y-4 items-center">
          <h2 className="text-prussian-blue font-bold text-xl md:text-2xl lg:text-[2rem] leading-tight md:leading-12 text-center font-aeonik">
            You've successfully applied to book a seat!
          </h2>
        </div>
        <p className="text-center text-prussian-blue font-aeonik font-medium text-xs md:text-sm lg:text-xl leading-6 md:leading-7 lg:leading-10 max-w-[32.5625rem] px-2 md:px-0">
          We'll let you know when your request is approved.
          <br />
          Follow our social media accounts for updates.
        </p>

        <div className="flex flex-1 items-center gap-x-2 md:gap-x-3 flex-wrap justify-center">
          <a
            href="https://www.facebook.com/btwawiinitiative"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit our Facebook page"
            className="rounded-full p-2 bg-light-yellow-base text-white hover:-translate-y-1 transition-transform"
          >
            <CgFacebook size={26} />
          </a>

          <a
            href="https://www.instagram.com/btwawi/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit our Instagram page"
            className="rounded-full p-2 bg-light-yellow-base text-white hover:-translate-y-1 transition-transform"
          >
            <BsInstagram size={26} />
          </a>

          <a
            href="https://www.linkedin.com/company/btwawiinitiative/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit our LinkedIn page"
            className="rounded-full p-2 bg-light-yellow-base text-white hover:-translate-y-1 transition-transform"
          >
            <RiLinkedinFill size={26} />
          </a>

          <a
            href="https://x.com/btwawi"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit our X page"
            className="rounded-full p-2 bg-light-yellow-base text-white hover:-translate-y-1 transition-transform"
          >
            <RiTwitterXFill size={26} />
          </a>
          <a
            href="http://wa.me/2348121314177"
            target="_blank"
            rel="noopener noreferrer"
            title="Chat us up on WhatsApp"
            className="text-sm font-extrabold font-aeonik flex items-center gap-2 p-[18px] md:p-6 rounded-full border border-prussianBlue hover:translate-x-1 transition-transform duration-200"
          >
            <RiWhatsappFill size={20} className="text-primaryGreen" />
            Chat with us
            <BsArrowRight size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
