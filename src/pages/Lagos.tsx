import React, { useState } from "react";
import { HeroSection } from "../assets/css/components/HeroSection";
import { StatsSection } from "../assets/css/components/StatsSection";
import { WhyAttendSection } from "../assets/css/components/WhyAttendSection";
import { SpeakersSection } from "../assets/css/components/SpeakersSection";
import { RegistrationCTA } from "../assets/css/components/RegistrationCTA";
import { SupportPartnerSections } from "../assets/css/components/SupportPartnerSections";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const lagosData = {
  hero: {
    label: "LAGOS 4.0",
    title: ["Lagos, It's Time", "for the 4th Edition"],
    subtitle:
      "After three powerful editions in Lagos, Business The Way Allaah Wants It Initiative is back with Lagos 4.0, the city's most impactful faith-based business gathering.",
    backgroundImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/2183d28cf061eb71e685fc6a145a86d6e99ac31d?width=2880",
    date: "Sunday, 23rd November 2025",
  },
  stats: {
    title: "The milestones record in the past should be",
    cards: [
      {
        number: "3.5K+",
        label: "Physical attendees",
        bgColor: "bg-btwawi-lightyellow",
        width: "md:w-[395px]",
      },
      {
        number: "200K+",
        label: "Viewers online",
        bgColor: "bg-btwawi-mediumyellow",
        width: "md:w-[353px]",
      },
      {
        number: "₦35M+",
        label: "Vendor sales",
        bgColor: "bg-btwawi-lightyellow",
        width: "md:w-[395px]",
      },
    ],
  },
  speakers: [
    {
      name: "Abdulrasheed\nBello (JJC Skillz)",
      role: "Entrepreneur",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/8bfb5ebb48ebf1b03c80d24a00fa36fda6de344a?width=682",
      bgColor: "bg-btwawi-lightblue",
      nameStyle: "leading-[31px]",
    },
    {
      name: "Ridwan Sanusi",
      role: "Founder & CEO, Halvest",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/77b2592f3625665c569901019ab22391c23731fb?width=682",
      bgColor: "bg-btwawi-creamyellow",
    },
    {
      name: "Basheer Oshodi",
      role: "Chief Executive, Trust Arthur",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/82e3fec5377d1cdd63e797d738064eba64c811f9?width=682",
      bgColor: "bg-btwawi-lightblue",
    },
    {
      name: "Tope Salahudeen",
      role: "Halal Investment Analyst, CEO, Helpa.me",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/7169f722ea6b25a6ea0c5603b0050d0890b0696b?width=682",
      bgColor: "bg-btwawi-creamyellow",
      roleStyle: "leading-[25px]",
    },
    {
      name: "Abdul-Rahman\nOlakunle",
      role: "Author, Writer & Life Coach",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/5167e2eb9992873d33e63b42db4987324c6048b8?width=682",
      bgColor: "bg-btwawi-lightblue",
      nameStyle: "leading-[31px]",
    },
  ],
  whyAttend: {
    title: "Why attend Lagos 4.0?",
    content: [
      "At Lagos 4.0, you will get the chance to hear from some of the top Muslim business experts and speakers who are shaping the halal economy. You'll discover real, shariah-compliant finance options that align with your values, engage with ethical brands and trusted Islamic institutions, and be inspired by real stories of successful businesses built without haram practices.",
      "Most importantly, you will connect with thousands of faith-driven founders and professionals who are building, growing, and thriving, all while staying true to their deen.",
    ],
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/a56f533919ce67f16d4af27d170ab6e302b6bc66?width=1084",
  },
};

export default function Lagos() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = (isOpen: any) => {
    setIsMobileMenuOpen(isOpen);
  };
  return (
    <div>
      <Header onMenuToggle={handleMobileMenuToggle} />
      {/* @ts-ignore */}
      <HeroSection data={lagosData.hero} className="mt-[-241px] relative" />
      <StatsSection data={lagosData.stats} />
      <WhyAttendSection data={lagosData.whyAttend} />
      <SpeakersSection data={lagosData.speakers} />
      <RegistrationCTA />
      <SupportPartnerSections />
      <Footer />
    </div>
  );
}
