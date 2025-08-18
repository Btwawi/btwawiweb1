import { useEffect, useState } from "react";
import HeroBg from "../../assets/images/lagos-bg.png";
import partners from "../../assets/images/partners.png";
import whyYouShouldntMiss from "../../assets/images/why-you-shouldnt-miss.png";
import LoveMoney from "../../assets/images/love-money.png";
import JJC from "../../assets/images/JJC.png";
import btwawiLogo from "../../assets/images/btwawi-log-single.png";
import Olakunle from "../../assets/images/Olakunle.png";
import Oshodi from "../../assets/images/Oshodi.png";
import Ridwan from "../../assets/images/Ridwan.png";
import Tope from "../../assets/images/Tope.png";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function LagosPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = (isOpen: any) => {
    setIsMobileMenuOpen(isOpen);
  };

  const speakers = [
    {
      name: "Abdul-Rahman Olakunle",
      title: "Author, Writer & Life Coach",
      image: Olakunle,
    },
    {
      name: "JJC Skillz",
      title: "Entrepreneur & Founder of Tribe Nation",
      image: JJC,
    },
    {
      name: "Tope Salahudeen",
      title: "Halal Investment Analyst, CEO, Helpa.me",
      image: Tope,
    },
    {
      name: "Ridwan Sanusi",
      title: "Founder & CEO, Halvest",
      image: Ridwan,
    },
    {
      name: "Basheer Oshodi",
      title: "Chief Executive, Trust Arthur",
      image: Oshodi,
    },
  ];

  const totalSlides = Math.ceil(speakers.length / visibleCards);

  const maxIndex = Math.max(0, speakers.length - visibleCards);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      const tablet = window.innerWidth < 768;

      setIsMobile(mobile);

      if (mobile) {
        setVisibleCards(2);
      } else if (tablet) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(Math.max(index, 0), maxIndex));
  };

  const getTransform = () => {
    const cardWidthPercentage = 100 / visibleCards;
    return `translateX(-${currentIndex * cardWidthPercentage}%)`;
  };

  const getCurrentSlideGroup = () => {
    return Math.floor(currentIndex / visibleCards);
  };

  return (
    <div className="font-aeonik overflow-x-hidden">
      <div
        className="h-[130vh] lg:h-[140vh] relative bg-cover bg-center text-prussianBlue mb-10 md:mb-40"
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        <Header onMenuToggle={handleMobileMenuToggle} />
        <div className="mt-8 lg:mt-16 flex flex-col gap-6 items-center text-center">
          <p className="font-semibold text-xl lg:text-3xl capitalize tracking-widest">
            LAGOS <span className="italic font-light ">4.0</span>
          </p>
          <p className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight">
            Lagos, It's Time
            <br />
            for the{" "}
            <span className="bg-lightYellowBase px-1 lg:px-1.5 inline-block">
              4th Edition
            </span>
          </p>
          <p className="text-base sm:text-lg lg:text-2xl leading-relaxed">
            After three powerful editions in Lagos, Business The Way Allaah
            <br />
            Wants It Initiative  is back with Lagos 4.0, the city’s most
            impactful
            <br />
            faith-based business gathering.
          </p>

          <div className="bg-white/80 flex flex-row items-center justify-center gap-4 lg:gap-10 px-6 lg:px-12 py-4 lg:py-8">
            <img src={btwawiLogo} alt="logo" />
            <p className="text-lg sm:text-xl lg:text-3xl">
              Sunday, <span className="font-bold">23rd November, 2025</span>
            </p>
            <img src={btwawiLogo} alt="logo" />
          </div>
        </div>

        {/* Past Editions Section */}
        <div className="px-4 md:container container absolute right-0 left-0 -bottom-8 sm:-bottom-12 lg:-bottom-16 translate-y-8 sm:translate-y-12 lg:translate-y-16">
          <div className="bg-neutralYellow py-12 px-4 md:px-12 flex flex-col items-center justify-center gap-0">
            <h2 className="text-lg sm:text-xl lg:text-4xl py-2 font-semibold text-prussianBlue bg-white w-[800px] text-center">
              <span className="italic font-light">Milestones</span> Recorded in
              the past
            </h2>
            <div className="flex flex-col sm:flex-row text-prussianBlue text-center w-[800px]">
              <div className="flex p-3 flex-col bg-cornsilk sm:w-1/3 items-center ">
                <span className="text-4xl md:text-6xl font-bold">3.5K+</span>
                <span className="text-2xl sm:text-xl lg:text-2xl">
                  Physical attendees
                </span>
              </div>
              <div className="flex p-3 flex-col bg-paleYellow items-center sm:w-1/3">
                <span className="text-4xl md:text-6xl font-bold">200K+</span>
                <span className="text-2xl sm:text-xl lg:text-2xl">
                  Viewers online
                </span>
              </div>
              <div className="flex px-3 py-5 flex-col bg-cornsilk items-center sm:w-1/3">
                <span className="text-4xl md:text-6xl font-bold">₦35M+</span>
                <span className="text-2xl sm:text-xl lg:text-2xl">
                  Vendor sales
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why You Shouldnt Miss Section */}
      <div className="md:container mt-10 md:mt-30 px-4">
        <div className="bg-white py-12 px-4 md:px-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <img
              src={whyYouShouldntMiss}
              alt="A crowd of attendees at an event"
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 text-prussianBlue font-aeonik">
            <h2 className="text-2xl md:text-4xl font-semibold">
              Why You{" "}
              <span className="italic font-light">
                Shouldn't <br /> Miss
              </span>{" "}
              Lagos 4.0:
            </h2>
            <p className="mt-4 text-lg md:text-2xl leading-relaxed">
              At Lagos 4.0, you will get the chance to hear from some of the top
              Muslim business experts and speakers who are shaping the halal
              economy. You’ll discover real, shariah-compliant finance options
              that align with your values, engage with ethical brands and
              trusted Islamic institutions, and be inspired by real stories of
              successful businesses built without haram practices.
            </p>
            <p className="mt-4 text-lg md:text-2xl leading-relaxed">
              Most importantly, you will connect with thousands of faith-driven
              founders and professionals who are building, growing, and
              thriving, all while staying true to their deen.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 py-4 px-8 rounded-full bg-lightYellowBase text-prussianBlue font-semibold hover:bg-prussianBlue hover:text-white transition"
            >
              Read more &rarr;
            </a>
          </div>
        </div>
      </div>
      {/* Meet the Speakers Section */}
      <div className="md:container mx-auto px-4">
        <div className="py-6 px-4 md:px-12 text-prussianBlue">
          <h2 className="flex justify-between text-2xl md:text-4xl font-semibold">
            Meet the Speakers
            <Link
              to={"/speakers"}
              className="underline font-bold text-lg sm:text-xl lg:text-2xl text-lightYellowBase hover:text-prussianBlue transition"
            >
              See all
            </Link>
          </h2>

          <div className="relative overflow-hidden p-2 mt-8">
            {/* Slider container */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: getTransform() }}
            >
              {speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <div className="flex flex-col items-center px-2">
                    <div className="bg-neutralBlue w-full flex justify-center">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full aspect-square object-cover"
                      />
                    </div>
                    {/* Card footer */}
                    <div className="w-full flex flex-col items-center bg-lightYellowBase py-8 max-h-[120px] min-h-[120px]">
                      <h3 className="text-base sm:text-lg md:text-2xl font-medium">
                        {speaker.name}
                      </h3>
                      <p className="text-center text-xs sm:text-sm px-1">
                        {speaker.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center items-center mt-8 gap-3">
              {Array.from({ length: totalSlides }).map((_, index) => {
                const isActive = index === getCurrentSlideGroup();
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(index * visibleCards)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-lightYellowBase scale-125"
                        : "bg-prussianBlue"
                    }`}
                    title={`Go to slide ${index + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Register Early Section */}
      <div className="md:container px-4">
        <div className="text-prussianBlue py-12 px-4 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold">
            Register early and be part of <br /> this life-changing experience.
          </h2>
          <div className="mt-8">
            <Link
              to={"/booking"}
              className="inline-flex items-center text-lg tracking-tighter gap-2 py-5 px-8 rounded-full bg-lightYellowBase text-prussianBlue font-semibold hover:bg-prussianBlue hover:text-white transition"
            >
              Book your seat &rarr;
            </Link>
          </div>
        </div>
      </div>
      {/* Support BTWAWI Section */}
      <div className="md:container mx-auto px-4">
        <div className=" bg-neutralBlue py-12 px-4 md:px-12 mt-4 md:mt-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 text-prussianBlue text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-medium ">
              Support BTWAWI
            </h2>
            <p className="mt-4 text-lg md:text-2xl leading-relaxed">
              Your contribution helps us expand our reach <br /> and deliver an
              exceptional experience for all <br /> attendees. Discover how you
              can make a <br /> difference.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 py-4 px-8 rounded-full bg-lightYellowBase text-prussianBlue font-semibold hover:bg-prussianBlue hover:text-white transition"
            >
              Donate now {"   "}&rarr;
            </a>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={LoveMoney}
              alt="Love and money"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
      {/* Partner With Purpose Section */}
      <div className="md:container px-4">
        <div className="mb-8 sm:mb-16 lg:mb-40 bg-lightPaleYellow mt-4 md:mt-8 py-8 lg:py-12 px-4 md:px-12 flex flex-col md:flex-row items-center gap-6 lg:gap-8">
          <div className="w-full md:w-1/2 flex justify-center order-2 md:order-1">
            <img
              src={partners}
              alt="Handshake representing partnership"
              className="w-full max-w-md bg-prussianBlue"
            />
          </div>
          <div className="w-full md:w-1/2 text-prussianBlue space-y-4 lg:space-y-8 text-center md:text-left order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl tracking-tighter font-medium">
              Partner With Purpose
            </h2>
            <p className="mt-4 text-lg md:text-2xl leading-relaxed">
              Partnering with Business The Way Allaah <br /> Wants It Initiative
              is not just an act of <br /> goodwill, it is a smart business
              move.
            </p>
            <Link
              to="/booth-registration"
              className="mt-6 inline-flex items-center gap-2 py-5 px-8 rounded-full bg-lightYellowBase text-prussianBlue font-semibold hover:bg-prussianBlue hover:text-white transition"
            >
              Become a partner &rarr;
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
