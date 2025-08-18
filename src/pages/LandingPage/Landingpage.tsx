import { useState, useRef, useEffect } from "react";
import Header from "../../components/Layout/Header";
import HeroBg from "../../assets/images/hero-bg-min.jpg";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Lucide from "../../base-components/Lucide";
import partners from "../../assets/images/partners.png";
import recognitionBadge from "../../assets/images/merit.png";
import LoveMoney from "../../assets/images/love-money.png";
import JJC from "../../assets/images/JJC.png";
import btwawiLogo from "../../assets/images/btwawi-log-single.png";
import Olakunle from "../../assets/images/Olakunle.png";
import Oshodi from "../../assets/images/Oshodi.png";
import Ridwan from "../../assets/images/Ridwan.png";
import Tope from "../../assets/images/Tope.png";
import Footer from "../../components/Layout/Footer";

const LandingPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<number | null>(null);
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

  const successStories = [
    {
      id: 1,
      testimony:
        "May Allāh reward the organizers abundantly. The conference is just awesome. I can't wait to attend the next edition.",
      name: "Ayyub Talha-Mustapha",
      style: "yellow", // For indices 0 and 3 (1st and 4th)
    },
    {
      id: 2,
      testimony:
        "The conference, without a doubt, is well put together and one we hope to see reoccur, but if I may, I know the culture of freebies might be a bit annoying, but I hope this program remains so because being free is enough motivation for people to travel, and since it is the first of its kind (that I know of), it will gain more traction, BiidhniLlaah.",
      name: "Iraadatullah Abdullah",
      style: "blue", // For indices 1, 2, and 4 (2nd, 3rd, and 5th)
    },
    {
      id: 3,
      testimony:
        "I'd like to thank the organizers, especially Sis Kawthar. Thank you for putting this together for the Ummah; it was an inspiring and educating experience. You all did a great job, Barakallahu feekum.",
      name: "Naheemah Isiaq",
      style: "blue",
    },
    {
      id: 4,
      testimony:
        "I want to commend the efforts and the inspiration executed by the conveyor of the program. May Allah not deprive her of the ajr. May Allah also grant the ummah halaal wealth.",
      name: "Kafeelah Ayantol",
      style: "yellow",
    },
    {
      id: 5,
      testimony:
        "The organizers did a good job, they should keep it up. May ALLAH always make it easy. BarakaLlahu feekum to you all.",
      name: "Ademola Ridwan",
      style: "blue",
    },
  ];

  const partnersLogos = [
    { src: "/images/jpg/AltBank.jpg", alt: "AltBank" },
    { src: "/images/jpg/OICNM.jpg", alt: "OICNM" },
    { src: "/images/jpg/stecs.png", alt: "STECS" },
    { src: "/images/jpg/kanzulgina.jpg", alt: "Kanzulgina" },
    { src: "/images/jpg/one17.jpg", alt: "One17" },
    { src: "/images/jpg/daarul.jpg", alt: "Daarul" },
  ];

  const halalArticles = [
    {
      id: 1,
      image: "/images/jpg/article-1.jpg",
      title: "Building Wealth the Islamic Way: A Comprehensive Guide",
      description:
        "Explore the fundamental principles of Islamic wealth building and discover how to align your financial goals with your faith while achieving sustainable prosperity.",
      minsRead: "5mins read",
    },
    {
      id: 2,
      image: "/images/jpg/article-2.jpg",
      title: "Halal Investment Opportunities in 2025",
      description:
        "Discover the latest Sharia-compliant investment options that are gaining momentum in the global market and how you can participate ethically.",
      minsRead: "7mins read",
    },
    {
      id: 3,
      image: "/images/jpg/article-3.jpg",
      title: "Starting Your Halal Business: Essential Steps",
      description:
        "Learn the key considerations for launching a business that adheres to Islamic principles while maintaining competitiveness in today's market.",
      minsRead: "6mins read",
    },
  ];

  // Get style classes based on story style type
  const getStoryStyles = (style: string) => {
    return {
      background: style === "yellow" ? "bg-[#FFF7DC]" : "bg-[#F2F8FF]",
      iconColor: style === "yellow" ? "#EDC645" : "#002D62",
    };
  };

  return (
    <div className="overflow-x-hidden font-aeonik">
      <div
        className="min-h-screen lg:h-[135vh] relative bg-cover bg-center text-prussianBlue"
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        <Header onMenuToggle={handleMobileMenuToggle} />
        <section className="md:container px-4">
          <div className="hidden lg:block absolute bottom-0 left-0 w-full h-24 sm:h-1/2 md:h-1/2 lg:h-[43%] overflow-hidden z-10">
            <img
              src="/images/svg/hero-overlay.svg"
              alt="Hero Overlay"
              className="w-full h-auto min-h-full object-bottom pointer-events-none select-none"
            />
          </div>

          <div className="absolute inset-0 bg-black/40 rounded-lg z-[-1]"></div>
          <div className="absolute bottom-0 left-0 right-0 z-20 w-full pb-8 lg:pb-0">
            <div className="px-4 lg:container flex flex-col md:flex-row justify-between gap-8 lg:gap-12 relative z-20">
              <div className="flex items-center justify-center md:justify-start w-full md:w-1/2 mt-12 md:mt-0">
                <div className=" mb-6 md:mb-10 flex flex-col items-center md:items-start justify-center">
                  <h1 className="text-6xl sm:text-6xl lg:text-[160px] text-lightYellowBase font-bold tracking-tighter leading-none ">
                    BTWAWI
                  </h1>
                  <h2 className="text-4xl sm:text-4xl lg:text-[100px] font-bold text-white md:text-white tracking-tighter leading-none ">
                    CONFERENCE
                  </h2>
                  <h3 className="text-3xl sm:text-3xl lg:text-8xl font-light text-center md:text-left text-white md:text-white italic leading-none">
                    2025
                  </h3>
                </div>
              </div>

              <div className="flex flex-col w-full md:w-1/2 px-0 md:px-4 mt-4 md:mt-20 items-center md:items-start">
                <div className="flex flex-col gap-1 items-center md:items-start">
                  <h2 className="text-3xl sm:text-3xl lg:text-5xl font-bold text-white md:text-white leading-tight mb-2 md:mb-4 text-center md:text-left">
                    The <span className="font-light italic">Cycle</span> of
                    Wealth
                  </h2>
                  <p className="text-xl sm:text-xl lg:text-3xl text-white md:text-white leading-relaxed text-center md:text-left">
                    Islamic Approach to Earning,{" "}
                    <br className="hidden md:block" /> Preserving & Passing
                    Wealth
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6 w-full sm:w-auto">
                  <Link
                    to="/booking"
                    className="inline-flex items-center justify-center gap-2 py-4 sm:py-5 px-8 sm:px-12 rounded-full bg-lightYellowBase text-prussianBlue font-semibold hover:bg-prussianBlue hover:text-white transition text-sm sm:text-base w-full sm:w-auto"
                  >
                    Book your seat {"  "}
                    {/* @ts-ignore */}
                    &rarr;
                  </Link>
                  <Link
                    to="/partner"
                    className="inline-flex items-center justify-center gap-2 py-4 sm:py-5 px-8 sm:px-12 rounded-full bg-white text-prussianBlue font-semibold hover:bg-lightYellowBase hover:text-prussianBlue transition text-sm sm:text-base w-full sm:w-auto"
                  >
                    Become a partner &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="w-full md:container px-4 bg-lightYellowBase">
        <div className="flex justify-evenly mx-auto py-7">
          <img src="/images/svg/btwawi-icon.svg" alt="BTWAWI ICON" />
          <p className="text-sm md:text-[31.82px]  px-4 font-light">
            Lagos - Sunday,{" "}
            <span className="text-prussianBlue font-bold">
              23rd November, 2025
            </span>{" "}
            I Abuja - Saturday,{" "}
            <span className="text-prussianBlue font-bold">
              29th November, 2025
            </span>
          </p>
          <img src="/images/svg/btwawi-icon.svg" alt="BTWAWI ICON" />
        </div>
      </div>

      <section className="bg-white md:container px-4 my-5 md:my-10 py-5 md:py-10 max-w-7xl mx-auto">
        <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] overflow-hidden">
          <img
            src="/images/png/conference-hall-1.jpg"
            alt="Conference Hall"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-32 items-start">
            {/* First div - Title and Button */}
            <div className="space-y-6 max-w-xl">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-prussianBlue leading-12">
                <span className="font-bold">From a Vision to a Movement,</span>{" "}
                <span className="font-light italic">
                  The <br />
                  Journey of BTWAWI
                </span>
              </h2>
              <button
                type="button"
                className="inline-flex items-center bg-lightYellowBase text-prussianBlue text-[18px] font-bold px-[64px] py-[24px] rounded-full"
              >
                Continue Reading
                <Lucide icon="ArrowRight" className="w-5 h-5 ml-2" />
              </button>
            </div>

            <div className="space-y-6 max-w-2xl text-lg md:text-2xl text-prussianBlue ">
              <p className="leading-relaxed">
                In 2022, we began a journey that redefines how Muslims view
                business, one aligned with faith, ethics, and purpose. The first
                edition of Business The Way Allaah Wants It (BTWAWI) welcomed
                over 700 participants in Lagos, Nigeria and 2,000 online
                attendees.
              </p>
              <p className="leading-relaxed">
                It was a day filled with inspiring lectures, impactful
                workshops, and practical sessions that opened the hearts of many
                entrepreneurs to the beauty of Halal business practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="md:container px-4 bg-white max-w-7xl mx-auto my-5 md:my-10 py-5 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Image */}
          <div className="h-auto lg:h-full">
            <img
              src="/images/png/milestones-image.png"
              alt="Milestones"
              className="w-full h-full object-cover grayscale"
            />
          </div>

          {/* Right side - Milestones Content */}
          <div className="flex flex-col justify-center text-prussianBlue">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl px-4 lg:px-8 font-bold text-prussianBlue mb-8 lg:mb-12 text-center lg:text-left">
              <span className="font-light italic">Milestones</span> Recorded in
              every Sense
            </h2>

            {/* Milestone Boxes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full lg:w-[700px] h-auto lg:h-[500px]">
              {/* Box 1 */}
              <div className="bg-[#FFF6D6] flex flex-col items-center justify-center text-prussianBlue text-center p-8 lg:p-4">
                <span className="font-bold text-6xl lg:text-[100px] leading-none">
                  7k+
                </span>
                <span className="text-xl lg:text-[36px] leading-tight">
                  Registrations recorded
                </span>
              </div>

              {/* Box 2 */}
              <div className="bg-[#FFEEB7] flex flex-col items-center justify-center text-prussianBlue text-center p-8 lg:p-4">
                <span className="font-bold text-6xl lg:text-[100px] leading-none">
                  4k+
                </span>
                <span className="text-xl lg:text-[36px] leading-tight">
                  Physical attendees
                </span>
              </div>

              {/* Box 3 */}
              <div className="bg-[#FFE89D] flex flex-col items-center justify-center text-prussianBlue text-center p-8 lg:p-4">
                <span className="font-bold text-6xl lg:text-[100px] leading-none">
                  4M+
                </span>
                <span className="text-xl lg:text-[36px] leading-tight">
                  Views across platforms
                </span>
              </div>

              {/* Box 4 */}
              <div className="bg-[#FFE07A] flex flex-col items-center justify-center text-prussianBlue text-center p-8 lg:p-4">
                <span className="font-bold text-6xl lg:text-[100px] leading-none">
                  40M
                </span>
                <span className="text-xl lg:text-[36px] leading-tight">
                  Recorded Sales
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section
        className="md:container px-4 relative py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/png/speakers-carousel-background.png')",
        }}
      >
        {/* prussianBlue color overlay */}
        <div className="absolute inset-0 bg-prussianBlue/80"></div>

        {/* Content */}
        <div className="relative z-10 ">
          {/* Title */}
          <div className="mb-12 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-aeonik font-medium text-white leading-tight">
              Some <span className="italic font-light">Speakers</span>
              <br />
              who have Graced the
              <br />
              Past Editions
            </h2>
          </div>

          {/* Speakers Carousel */}
          <div className="relative overflow-hidden text-prussianBlue p-2 mt-8">
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
                    type="button"
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
      </section>

      {/* Success Stories Section */}
      <section className="md:container px-2 my-2 md:my-10 py-3 md:py-10 max-w-7xl mx-auto text-prussianBlue">
        <div className="">
          {/* Headlines */}
          <div className="mb-16 text-prussianBlue font-aeonik">
            <h2 className="text-4xl sm:text-5xl lg:text-[45px] font-medium leading-tight tracking-tight mb-4">
              Attendees{" "}
              <span className="italic font-light">Success Stories</span>
            </h2>
            <p className="text-xl sm:text-2xl font-normal leading-relaxed">
              How we helped individuals & business thrive at BTWAWI
            </p>
          </div>

          {/* Stories Grid */}
          <div className="space-y-8">
            {/* First Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Story 1 */}
              <div
                className={`${
                  getStoryStyles(successStories[0].style).background
                } p-8 text-left`}
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <svg
                    width="54"
                    height="42"
                    viewBox="0 0 54 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M37.7784 41.4352H32.7888V30.9808H37.5408C40.6296 30.9808 42.2928 30.268 42.2928 25.9912V20.2888H33.0264L33.0263 0H53.9351L53.9352 25.7536C53.9352 36.208 47.9952 41.4352 37.7784 41.4352ZM4.9896 41.4352H0V30.9808H4.752C8.0784 30.9808 9.504 30.268 9.504 25.9912V20.2888H0.237597V0H21.1464V25.7536C21.1464 36.208 15.2064 41.4352 4.9896 41.4352Z"
                      fill={getStoryStyles(successStories[0].style).iconColor}
                    />
                  </svg>
                </div>

                {/* Testimony */}
                <p className="font-aeonik text-2xl text-[#002D62] leading-normal mb-6">
                  {successStories[0].testimony}
                </p>

                {/* Name */}
                <p className="text-2xl font-normal text-[#002D62] flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-prussianBlue" />
                  {successStories[0].name}
                </p>
              </div>

              {/* Story 2 */}
              <div
                className={`lg:col-span-2 ${
                  getStoryStyles(successStories[1].style).background
                } p-8 text-left`}
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <svg
                    width="54"
                    height="42"
                    viewBox="0 0 54 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M37.7784 41.4352H32.7888V30.9808H37.5408C40.6296 30.9808 42.2928 30.268 42.2928 25.9912V20.2888H33.0264L33.0263 0H53.9351L53.9352 25.7536C53.9352 36.208 47.9952 41.4352 37.7784 41.4352ZM4.9896 41.4352H0V30.9808H4.752C8.0784 30.9808 9.504 30.268 9.504 25.9912V20.2888H0.237597V0H21.1464V25.7536C21.1464 36.208 15.2064 41.4352 4.9896 41.4352Z"
                      fill={getStoryStyles(successStories[1].style).iconColor}
                    />
                  </svg>
                </div>

                {/* Testimony */}
                <p className="font-aeonik text-2xl text-[#002D62] leading-normal mb-6">
                  {successStories[1].testimony}
                </p>

                {/* Name */}
                <p className="text-2xl font-normal text-[#002D62] flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-prussianBlue" />
                  {successStories[1].name}
                </p>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.slice(2).map((story) => (
                <div
                  key={story.id}
                  className={`${
                    getStoryStyles(story.style).background
                  } p-8 text-left`}
                >
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <svg
                      width="54"
                      height="42"
                      viewBox="0 0 54 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M37.7784 41.4352H32.7888V30.9808H37.5408C40.6296 30.9808 42.2928 30.268 42.2928 25.9912V20.2888H33.0264L33.0263 0H53.9351L53.9352 25.7536C53.9352 36.208 47.9952 41.4352 37.7784 41.4352ZM4.9896 41.4352H0V30.9808H4.752C8.0784 30.9808 9.504 30.268 9.504 25.9912V20.2888H0.237597V0H21.1464V25.7536C21.1464 36.208 15.2064 41.4352 4.9896 41.4352Z"
                        fill={getStoryStyles(story.style).iconColor}
                      />
                    </svg>
                  </div>

                  {/* Testimony */}
                  <p className="font-aeonik text-2xl text-[#002D62] leading-normal mb-6">
                    {story.testimony}
                  </p>

                  {/* Name */}
                  <p className="text-2xl font-normal text-[#002D62] flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-prussianBlue" />
                    {story.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Sponsors Section */}
      <section className="md:container px-4 my-2 md:my-10 py-1 md:py-10 max-w-7xl mx-auto">
        <div className="">
          {/* Headlines */}
          <div className="mb-16 text-prussianBlue font-aeonik">
            <h2 className="text-4xl sm:text-5xl lg:text-[45px] font-medium leading-tight tracking-tight mb-4">
              Our Past{" "}
              <span className="italic font-light">Partners & Sponsors</span>
            </h2>
            <p className="text-xl sm:text-2xl font-normal leading-relaxed max-w-5xl">
              We are proud to have worked alongside industry leaders and
              generous sponsors whose support and collaboration help us achieve
              our mission and create lasting impact.
            </p>
          </div>

          {/* Partners Logos Carousel */}
          <div className="relative overflow-hidden mx-auto w-full">
            <div className="flex space-x-12 justify-evenly items-center">
              {/* First set of logos */}
              {partnersLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-24 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
                />
              ))}

              {/* Duplicate set for seamless loop */}
              {partnersLogos.map((logo, index) => (
                <img
                  key={index + partnersLogos.length}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vendors Section */}
      <section className="md:container px-4 my-2 md:my-10 py-3 md:py-10 max-w-7xl mx-auto bg-white">
        <div className="">
          {/* Vendors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-6">
            {/* First Row */}
            {/* Text Content Div */}
            <div className="p-8 flex flex-col text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-[45px] font-medium leading-tight tracking-tight mb-4 text-prussianBlue">
                Cross-section of{" "}
                <span className="italic font-light">Our Past Vendors</span>
              </h2>
              <p className="text-lg sm:text-xl font-normal leading-relaxed">
                We've collaborated with diverse vendors over the years, each
                bringing unique value and expertise to our community.
              </p>
            </div>

            {/* Vendor Image 1 */}
            <div className="overflow-hidden h-48 lg:h-auto">
              <img
                src="/images/jpg/vendor-1.jpg"
                alt="Vendor 1"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Vendor Image 2 */}
            <div className="overflow-hidden h-48 lg:h-auto">
              <img
                src="/images/jpg/vendor-2.jpg"
                alt="Vendor 2"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Second Row */}
            {/* Vendor Image 3 */}
            <div className="lg:row-span-2 overflow-hidden h-48 lg:h-auto">
              <img
                src="/images/jpg/vendor-3.jpg"
                alt="Vendor 3"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Vendor Image 4 */}
            <div className="lg:row-span-2 overflow-hidden h-48 lg:h-auto">
              <img
                src="/images/jpg/vendor-4.jpg"
                alt="Vendor 4"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Vendor Image 5 */}
            <div className="lg:row-span-2 overflow-hidden h-48 lg:h-auto">
              <img
                src="/images/jpg/vendor-5.jpg"
                alt="Vendor 5"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Halal Articles Section */}
      <section className="md:container px-4 py-10 my-10 max-w-7xl mx-auto text-prussianBlue">
        <div>
          {/* Header with Headlines and Button */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
            {/* Headlines */}
            <div className="text-prussianBlue font-aeonik">
              <h2 className="text-4xl sm:text-5xl lg:text-[45px] font-medium leading-tight tracking-tight mb-4">
                Halal Articles carefully crafted
              </h2>
              <p className="text-xl sm:text-2xl font-normal leading-relaxed max-w-2xl">
                Discover insights, stories, and tips on topics that matter to
                you. Dive into our latest articles and join the conversation!
              </p>
            </div>

            {/* Explore All Articles Button */}
            <div className="flex-shrink-0">
              <Link
                to={"/our-blog"}
                className="bg-lightYellowBase text-prussianBlue font-bold flex gap-2 items-center px-9 py-6 rounded-full"
              >
                Explore all articles {"  "} &rarr;
              </Link>
            </div>
          </div>

          {/* Articles Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {halalArticles.map((article) => (
              <div key={article.id} className="bg-white overflow-hidden">
                {/* Article Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Content */}
                <div className="p-6 bg-[#FFF6E7]">
                  {/* Title */}
                  <h3 className="text-2xl font-normal text-prussianBlue mb-3 leading-tight">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#636363] text-base leading-relaxed mb-6 line-clamp-3">
                    {article.description}
                  </p>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between">
                    {/* Minutes Read */}
                    <span className="text-sm text-[#636363] font-normal">
                      {article.minsRead}
                    </span>

                    {/* Read More Button */}
                    <Link
                      to={"/our-blog"}
                      type="button"
                      className="flex items-center gap-2 px-5 py-3 text-[12px] font-bold border border-prussianBlue text-prussianBlue rounded-full"
                    >
                      Read more {"  "}&rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support BTWAWI Section */}
      <div className="md:container mx-auto px-4 my-1 md:my-10 py-1 md:py-10 ">
        <div className=" bg-neutralBlue py-12 px-4 md:px-12 mt-4 md:mt-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 text-prussianBlue text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-medium">Support BTWAWI</h2>
            <p className="mt-4 text-lg md:text-2xl leading-relaxed">
              Your contribution helps us expand our reach <br /> and deliver an
              exceptional experience for all <br /> attendees. Discover how you
              can make a <br /> difference.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 px-9 py-6 rounded-full bg-lightYellowBase text-prussianBlue font-semibold hover:bg-prussianBlue hover:text-white transition"
            >
              Support us {"  "} &rarr;
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
      <div className="md:container px-4 my-1 md:my-10 py-1 md:py-10 ">
        <div className="bg-lightPaleYellow mt-4 md:mt-8 py-8 lg:py-12 px-4 md:px-12 flex flex-col md:flex-row items-center gap-6 lg:gap-8">
          <div className="w-full md:w-1/2 flex justify-center order-2 md:order-1 ">
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
              className="mt-6 inline-flex items-center gap-2 px-9 py-6 rounded-full bg-lightYellowBase text-prussianBlue font-semibold hover:bg-prussianBlue hover:text-white transition"
            >
              Become a partner {"  "} &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Recognize a business Section */}
      <section className="md:container px-4 my-3 md:my-10 py-3 md:py-10">
        <div className="flex flex-col md:flex-row w-full bg-neutralBlue">
          <div className="text-prussianBlue font-aeonik py-10 text-lg md:text-3xl w-full md:w-1/2 px-4 md:px-12 leading-11 flex flex-col gap-4 md:gap-8 items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl md:text-5xl tracking-tighter font-medium">
              Recognize a Business
              <br /> That Inspires You
            </h2>
            <p>
              Know a brand or entrepreneur doing
              <br />
              business the way Allaah wants it with <br />
              honesty, integrity and excellence?
            </p>
            <div>
              <Link
                to="/recognize-a-business"
                className="mt-6 inline-flex text-lg items-center gap-2 px-9 py-6 rounded-full bg-lightYellowBase text-prussianBlue font-semibold hover:bg-prussianBlue hover:text-white transition"
              >
                Support them {"  "}&rarr;
              </Link>
            </div>
          </div>
          <div className="px-4 flex justify-center items-center md:px-12 w-full md:w-1/2 py-6 md:py-0">
            <img
              src={recognitionBadge}
              alt="recognition badge"
              className="max-w-full"
            />
          </div>
        </div>
      </section>

      {/* Apply for Grant Section */}
      <section className="md:container px-4 my-3 md:my-10 py-3 md:py-10 max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 bg-[#FFF7DC]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-10">
            {/* Left Content - Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-lg">
                <img
                  src="/images/jpg/grant-image.png"
                  alt="Partner With Purpose"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Content - Text and CTA */}
            <div className="text-center lg:text-left text-prussianBlue">
              <h2 className="text-4xl sm:text-5xl lg:text-[48px] font-medium leading-tight tracking-tight mb-6 text-prussianBlue font-aeonik">
                Apply for the BTWAWI Business Grant
              </h2>
              <p className="text-xl sm:text-2xl font-normal leading-relaxed mb-8 text-prussianBlue max-w-xl mx-auto lg:mx-0">
                Are you running a business that aligns with Islamic values and
                needs support to grow? We want to help.
              </p>

              {/* Partner Button */}
              <Link
                to={"/booking"}
                className="inline-flex items-center gap-2 px-9 py-6 text-[18px] rounded-full bg-lightYellowBase text-prussianBlue font-bold hover:bg-prussianBlue hover:text-white transition mx-auto lg:mx-0"
              >
                Become a partner &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Secure your booth Section */}
      <section className="md:container px-4 my-3 md:my-10 py-3 md:py-10">
        <div className="px-4 sm:px-6 py-6 lg:px-8 bg-[#F2F8FF]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Text and CTA */}
            <div className="flex flex-col text-prussianBlue text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-[48px] font-medium leading-tight tracking-tight mb-6 text-prussianBlue font-aeonik">
                Secure your booth at BTWAWI Conference
              </h2>
              <p className="text-xl sm:text-2xl font-normal leading-relaxed mb-8 text-prussianBlue max-w-xl mx-auto lg:mx-0">
                Enjoy exclusive benefits, early access to event information, and
                a streamlined check-in experience.
              </p>

              {/* CTA - Centered on mobile, aligned left on desktop */}
              <div className="flex justify-center lg:justify-start">
                <Link
                  to={"/booth-registration"}
                  className="inline-flex items-center gap-2 px-9 py-6 text-[18px] rounded-full bg-lightYellowBase text-prussianBlue font-bold hover:bg-prussianBlue hover:text-white transition"
                >
                  Secure yours
                  {"   "}&rarr;
                </Link>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <img
                  src="/images/jpg/booth-image.png"
                  alt="Support BTWAWI"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
