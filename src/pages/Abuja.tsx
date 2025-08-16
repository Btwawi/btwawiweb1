import React from "react";
import { HeroSection } from "../assets/css/components/HeroSection";
import { StatsSection } from "../assets/css/components/StatsSection";
import { WhyAttendSection } from "../assets/css/components/WhyAttendSection";
import { SpeakersSection } from "../assets/css/components/SpeakersSection";
import { RegistrationCTA } from "../assets/css/components/RegistrationCTA";
import { SupportPartnerSections } from "../assets/css/components/SupportPartnerSections";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const abujaData = {
  hero: {
    label: "ABUJA 2.0",
    title: ["Bringing Halal", "Business Conversations", "to the Capital City"],
    subtitle:
      "After the great success of Abuja 1.0, Business The Way Allaah Wants It Initiative is returning to the Nation's capital with Abuja 2.0.",
    backgroundImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/f35aca83263f36993b25b34c90861e71bd1e7d72?width=2880",
    date: "Saturday, 29th November 2025",
  },
  stats: {
    title: "The milestones record in the past should be",
    cards: [
      {
        number: "500+",
        label: "Physical attendees",
        bgColor: "bg-btwawi-lightyellow",
        width: "md:w-[395px]",
      },
      {
        number: "300k+",
        label: "Viewers online",
        bgColor: "bg-btwawi-mediumyellow",
        width: "md:w-[353px]",
      },
    ],
  },
  speakers: [
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
      roleStyle: "leading-[28px]",
    },
    {
      name: "Abdul-Rahman\nOlakunle",
      role: "Author, Writer & Life Coach",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/5167e2eb9992873d33e63b42db4987324c6048b8?width=682",
      bgColor: "bg-btwawi-lightblue",
      nameStyle: "leading-[32px]",
    },
  ],
  whyAttend: {
    title: "Why attend Abuja 2.0?",
    content: [
      "Abuja 2.0 is your opportunity to learn how to grow your business the way Allaah wants. It is a space where you can connect with professionals, Islamic finance experts, and fellow entrepreneurs who share your values.",
      "You will explore halal investment and funding options that support your business goals without compromising your faith. From shopping with trusted Muslim vendors to hearing inspiring success stories from real business owners, Abuja 2.0 promises to leave you informed, motivated, and equipped for purposeful business growth.",
    ],
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/a56f533919ce67f16d4af27d170ab6e302b6bc66?width=1084",
  },
};

export default function Abuja() {
  return (
    <div className="">
      <Header />
      <HeroSection data={abujaData.hero} />
      <StatsSection data={abujaData.stats} />
      <WhyAttendSection data={abujaData.whyAttend} />
      <SpeakersSection data={abujaData.speakers} />
      <RegistrationCTA />
      <SupportPartnerSections />
      <Footer />
    </div>
  );
}
