import { useState, useRef, useEffect } from "react";

import Lucide from "../../base-components/Lucide";

const LandingPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<number | null>(null);

  const speakersData = [
    {
      id: 1,
      name: "Abdulrasheed Bello (JJC Skillz)",
      role: "Islamic Finance Expert",
      image: "/images/png/speaker-jjc.png",
    },
    {
      id: 2,
      name: "Ridwan Sanusi",
      role: "Founder & CEO, Halvest",
      image: "/images/png/speaker-ridwan.png",
    },
    {
      id: 3,
      name: "Basheer Oshodi",
      role: "Chief Executive, Trust Arthur",
      image: "/images/png/speaker-basheer.png",
    },
    {
      id: 4,
      name: "Tope Salahudeen",
      role: "Halal Investment Analyst,CEO, Helpa.me",
      image: "/images/png/speaker-tope.png",
    },
    {
      id: 5,
      name: "Abdul-Rahman Olakunle",
      role: "Author, Writer & Life Coach",
      image: "/images/png/speaker-olakunle.png",
    },
    {
      id: 6,
      name: "Abdulrasheed Bello (JJC Skillz)",
      role: "Islamic Finance Expert",
      image: "/images/png/speaker-jjc.png",
    },
    {
      id: 7,
      name: "Ridwan Sanusi",
      role: "Founder & CEO, Halvest",
      image: "/images/png/speaker-ridwan.png",
    },
    {
      id: 8,
      name: "Basheer Oshodi",
      role: "Chief Executive, Trust Arthur",
      image: "/images/png/speaker-basheer.png",
    },
    {
      id: 9,
      name: "Tope Salahudeen",
      role: "Halal Investment Analyst,CEO, Helpa.me",
      image: "/images/png/speaker-tope.png",
    },
    {
      id: 10,
      name: "Abdul-Rahman Olakunle",
      role: "Author, Writer & Life Coach",
      image: "/images/png/speaker-olakunle.png",
    },
  ];

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

  // Auto-slide functionality
  useEffect(() => {
    const startAutoSlide = () => {
      autoSlideRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % speakersData.length);
      }, 4000); // Change slide every 4 seconds
    };

    startAutoSlide();

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [speakersData.length]);

  // Handle carousel scroll when activeSlide changes
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 320 + 24; // card width + gap
      carouselRef.current.scrollTo({
        left: activeSlide * cardWidth,
        behavior: "smooth",
      });
    }
  }, [activeSlide]);

  // Handle manual indicator click
  const handleIndicatorClick = (index: number) => {
    setActiveSlide(index);

    // Reset auto-slide timer when user manually changes slide
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }

    // Restart auto-slide after 6 seconds of inactivity
    setTimeout(() => {
      autoSlideRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % speakersData.length);
      }, 4000);
    }, 6000);
  };

  // Pause auto-slide on hover
  const handleCarouselMouseEnter = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  };

  // Resume auto-slide when mouse leaves
  const handleCarouselMouseLeave = () => {
    autoSlideRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % speakersData.length);
    }, 4000);
  };

  const handleChatWithUs = () => {
    const whatsappNumber = "+2348072589256"; // Replace with actual number
    const message = "Hello! I'm interested in the conference.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      {/* Hero Section with Background Image + Bottom Overlay */}
      <section
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/jpg/hero-bg.jpg')",
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Bottom decorative overlay (fixed to bottom of hero section) */}
        {/* <img
          src="/images/png/hero-overlay.png"
            alt="Hero Overlay"
          className="absolute bottom-0 left-0 w-full pointer-events-none select-none z-10"
        /> */}
        {/* <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 md:h-40 lg:h-48 overflow-hidden z-10"> */}
        <div className="hidden lg:block absolute bottom-0 left-0 w-full h-24 sm:h-1/2 md:h-1/2 lg:h-1/2 overflow-hidden z-10">
          <img
            src="/images/svg/hero-overlay.svg"
            alt="Hero Overlay"
            className="w-full h-auto min-h-full object-bottom pointer-events-none select-none"
          />
        </div>

        {/* Hero Content now above overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-start justify-between pb-10 w-full">
          {/* <div className="absolute bottom-0 left-0 right-0 z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24 lg:pb-32"> */}
          <div className="flex justify-between lg:grid-cols-2 gap-8 lg:gap-12 items-end max-w-7xl mx-auto">
            {/* First div - Conference Title */}
            <div className="text-center lg:text-left">
              <div className="mb-4">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl text-secondary font-bold leading-none mb-2">
                  BTWAWI
                </h1>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-none mb-2">
                  CONFERENCE
                </h2>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white italic leading-none">
                  2025
                </h3>
              </div>
            </div>

            {/* Second div - Conference Description and Buttons */}
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                  The Cycle of Wealth
                </h2>
                <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 leading-relaxed">
                  Islamic Approach to Earning, Preserving & Passing Wealth
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="flex items-center w-full sm:w-auto bg-secondary font-semibold px-[64px] py-[24px] text-lg rounded-full">
                  Book your seat
                  <Lucide icon="ArrowRight" className="w-5 h-5 ml-2" />
                </button>
                <button className="flex items-center w-full sm:w-auto bg-white font-semibold px-[64px] py-[24px] text-lg rounded-full">
                  Become a partner
                  <Lucide icon="ArrowRight" className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Days & Time section */}
      <section className="py-10 bg-secondary">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex justify-evenly"> */}
        <div className="flex justify-evenly max-w-7xl mx-auto">
          <img src="/images/svg/btwawi-icon.svg" alt="BTWAWI ICON" />
          <p className="text-[31.82px] px-4 font-light">
            Lagos - Sunday,{" "}
            <span className="text-primary font-bold">23rd November, 2025</span>{" "}
            I Abuja - Saturday,{" "}
            <span className="text-primary font-bold">29th November, 2025</span>
          </p>
          <img src="/images/svg/btwawi-icon.svg" alt="BTWAWI ICON" />
        </div>
      </section>

      {/* Conference Hall Image and Content Section */}
      <section className="bg-white m-10 py-10 max-w-7xl mx-auto">
        <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] overflow-hidden">
          <img
            src="/images/png/conference-hall-1.jpg"
            alt="Conference Hall"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Content below image */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-32 items-start">
            {/* First div - Title and Button */}
            <div className="space-y-6 max-w-xl">
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-tight">
                <span className="font-bold">From a Vision to a Movement,</span>{" "}
                <span className="font-light italic">The Journey of BTWAWI</span>
              </h2>
              <button className="inline-flex items-center bg-secondary text-primary text-[18px] font-bold px-[64px] py-[24px] rounded-full">
                Continue Reading
                <Lucide icon="ArrowRight" className="w-5 h-5 ml-2" />
              </button>
            </div>

            {/* Second div - Description paragraphs */}
            <div className="space-y-6 max-w-2xl">
              <p className="text-lg leading-relaxed">
                In 2022, we began a journey that redefines how Muslims view
                business, one aligned with faith, ethics, and purpose. The first
                edition of Business The Way Allaah Wants It (BTWAWI) welcomed
                over 700 participants in Lagos, Nigeria and 2,000 online
                attendees.
              </p>
              <p className="text-lg leading-relaxed">
                It was a day filled with inspiring lectures, impactful
                workshops, and practical sessions that opened the hearts of many
                entrepreneurs to the beauty of Halal business practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="bg-white max-w-7xl mx-auto py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left side - Image */}
          <div className="h-full">
            <img
              src="/images/png/milestones-image.png"
              alt="Milestones"
              className="w-full h-full object-cover grayscale"
            />
          </div>

          {/* Right side - Milestones Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl px-8 font-bold text-primary mb-12 text-center lg:text-left">
              <span className="font-light italic">Milestones</span> Recorded in
              every Sense
            </h2>

            {/* Milestone Boxes Grid */}
            <div className="grid grid-cols-2 w-[700px] h-[500px]">
              {/* Box 1 */}
              <div className="bg-[#FFF6D6] flex flex-col items-center justify-center text-primary text-center">
                <span className="font-bold text-[100px] leading-none">7k+</span>
                <span className="text-[36px] leading-tight">
                  Registrations recorded
                </span>
              </div>

              {/* Box 2 */}
              <div className="bg-[#FFEEB7] flex flex-col items-center justify-center text-primary text-center">
                <span className="font-bold text-[100px] leading-none">4k+</span>
                <span className="text-[36px] leading-tight">
                  Physical attendees
                </span>
              </div>

              {/* Box 3 */}
              <div className="bg-[#FFE89D] flex flex-col items-center justify-center text-primary text-center">
                <span className="font-bold text-[100px] leading-none">4M+</span>
                <span className="text-[36px] leading-tight">
                  Views across platforms
                </span>
              </div>

              {/* Box 4 */}
              <div className="bg-[#FFE07A] flex flex-col items-center justify-center text-primary text-center">
                <span className="font-bold text-[100px] leading-none">40M</span>
                <span className="text-[36px] leading-tight">
                  Recorded Sales
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section
        className="relative py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/png/speakers-carousel-background.png')",
        }}
      >
        {/* Primary color overlay */}
        <div className="absolute inset-0 bg-primary/80"></div>

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
          <div className="relative max-w-7xl mx-auto">
            <div
              ref={carouselRef}
              onMouseEnter={handleCarouselMouseEnter}
              onMouseLeave={handleCarouselMouseLeave}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hidden gap-6 pb-8"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Mock speakers data */}
              {speakersData.map((speaker) => (
                <div
                  key={speaker.id}
                  className="flex-none snap-center w-80 bg-secondary overflow-hidden shadow-lg flex flex-col"
                >
                  {/* Speaker Image */}
                  <div className="h-80 overflow-hidden bg-white flex-shrink-0">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Speaker Info */}
                  <div className="bg-secondary p-6 text-center flex flex-grow flex-col ">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {speaker.name}
                    </h3>
                    <p className="text-primary text-lg">{speaker.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: speakersData.length }, (_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === activeSlide ? "bg-secondary" : "bg-white/30"
                  }`}
                  // onClick={() => {
                  //   const carousel =
                  //     document.querySelector(".speakers-carousel");
                  //   const cardWidth = 320 + 24; // card width + gap
                  //   carousel?.scrollTo({
                  //     left: index * cardWidth,
                  //     behavior: "smooth",
                  //   });
                  // }}
                  onClick={() => handleIndicatorClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 my-16 max-w-7xl mx-auto">
        <div className="">
          {/* Headlines */}
          <div className="mb-16 text-primary font-aeonik">
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
                  <div className="w-3 h-3 rounded-full bg-primary" />
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
                  <div className="w-3 h-3 rounded-full bg-primary" />
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
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    {story.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Sponsors Section */}
      <section className="py-16 my-16 max-w-7xl mx-auto">
        <div className="">
          {/* Headlines */}
          <div className="mb-16 text-primary font-aeonik">
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
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
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
      <section className="py-16 my-16 max-w-7xl mx-auto bg-white">
        <div className="">
          {/* Vendors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-6">
            {/* First Row */}
            {/* Text Content Div */}
            <div className="p-8 flex flex-col text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-[45px] font-medium leading-tight tracking-tight mb-4 text-primary">
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
      <section className="py-16 my-16 max-w-7xl mx-auto">
        <div>
          {/* Header with Headlines and Button */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
            {/* Headlines */}
            <div className="text-primary font-aeonik">
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
              <button className="bg-secondary text-primary font-bold flex items-center px-9 py-6 rounded-full">
                Explore all articles
                <Lucide icon="ArrowRight" className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>

          {/* Articles Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {halalArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white overflow-hidden"
              >
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
                  <h3 className="text-2xl font-normal text-primary mb-3 leading-tight">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#636363] text-base leading-relaxed mb-6">
                    {article.description}
                  </p>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between">
                    {/* Minutes Read */}
                    <span className="text-sm text-[#636363] font-normal">
                      {article.minsRead}
                    </span>

                    {/* Read More Button */}
                    <button className="flex items-center px-4 py-2 text-[10px] font-bold border border-primary text-primary rounded-full">
                      Read more
                      <Lucide icon="ArrowRight" className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support BTWAWI Section */}
      <section className="max-w-7xl mx-auto py-16 my-16 bg-[#F2F8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Text and CTA */}
            <div className="text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-[48px] font-medium leading-tight tracking-tight mb-6 text-primary font-aeonik">
                Support BTWAWI
              </h2>
              <p className="text-xl sm:text-2xl font-normal leading-relaxed mb-8 text-primary max-w-xl">
                Your contribution helps us expand our reach and deliver an
                exceptional experience for all attendees. Discover how you can
                make a difference.
              </p>

              {/* Support Button */}
              <button className="bg-secondary text-primary font-bold flex items-center px-9 py-6 text-[18px] rounded-full hover:bg-secondary/90 transition-colors">
                Support us
                <Lucide icon="ArrowRight" className="w-5 h-5 ml-2" />
              </button>
            </div>

            {/* Right Content - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-lg">
                <img
                  src="/images/jpg/support-image.png"
                  alt="Support BTWAWI"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner With Purpose Section */}
      <section className="py-16 my-16 bg-[#FFF7DC] max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-lg bg-primary">
                <img
                  src="/images/jpg/partner-image.png"
                  alt="Partner With Purpose"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Content - Text and CTA */}
            <div className="text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-[48px] font-medium leading-tight tracking-tight mb-6 text-primary font-aeonik">
                Partner With Purpose
              </h2>
              <p className="text-xl sm:text-2xl font-normal leading-relaxed mb-8 text-primary max-w-xl">
                Partnering with Business The Way Allaah Wants It Initiative is
                not just an act of goodwill, it is a smart business move.
              </p>

              {/* Partner Button */}
              <button className="bg-secondary text-primary font-bold flex items-center px-9 py-6 text-[18px] rounded-full hover:bg-secondary/90 transition-colors">
                Become a partner
                <Lucide icon="ArrowRight" className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recognize a business Section */}
      <section className="max-w-7xl mx-auto py-16 my-16 bg-[#F2F8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Text and CTA */}
            <div className="text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-[48px] font-medium leading-tight tracking-tight mb-6 text-primary font-aeonik">
                Recognize a Business That Inspires You
              </h2>
              <p className="text-xl sm:text-2xl font-normal leading-relaxed mb-8 text-primary max-w-xl">
                Know a brand or entrepreneur doing business the way Allaah wants
                it with honesty, integrity, and excellence?
              </p>

              {/* CTA */}
              <button className="bg-secondary text-primary font-bold flex items-center px-9 py-6 text-[18px] rounded-full hover:bg-secondary/90 transition-colors">
                Support us
                <Lucide icon="ArrowRight" className="w-5 h-5 ml-2" />
              </button>
            </div>

            {/* Right Content - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-lg">
                <img
                  src="/images/jpg/recognize-image.png"
                  alt="Support BTWAWI"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply for Grant Section */}
      <section className="py-16 my-16 bg-[#FFF7DC] max-w-7xl mx-auto ">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
            <div className="text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-[48px] font-medium leading-tight tracking-tight mb-6 text-primary font-aeonik">
                Apply for the BTWAWI Business Grant
              </h2>
              <p className="text-xl sm:text-2xl font-normal leading-relaxed mb-8 text-primary max-w-xl">
                Are you running a business that aligns with Islamic values and
                needs support to grow? We want to help.
              </p>

              {/* Partner Button */}
              <button className="bg-secondary text-primary font-bold flex items-center px-9 py-6 text-[18px] rounded-full hover:bg-secondary/90 transition-colors">
                Become a partner
                <Lucide icon="ArrowRight" className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Secure your booth Section */}
      <section className="max-w-7xl mx-auto py-16 my-16 bg-[#F2F8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Text and CTA */}
            <div className="text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-[48px] font-medium leading-tight tracking-tight mb-6 text-primary font-aeonik">
                Secure your booth at BTWAWI Conference
              </h2>
              <p className="text-xl sm:text-2xl font-normal leading-relaxed mb-8 text-primary max-w-xl">
                Enjoy exclusive benefits, early access to event information, and
                a streamlined check-in experience.
              </p>

              {/* CTA */}
              <button className="bg-secondary text-primary font-bold flex items-center px-9 py-6 text-[18px] rounded-full hover:bg-secondary/90 transition-colors">
                Support us
                <Lucide icon="ArrowRight" className="w-5 h-5 ml-2" />
              </button>
            </div>

            {/* Right Content - Image */}
            <div className="flex justify-center lg:justify-end">
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
    </div>
  );
};

export default LandingPage;
