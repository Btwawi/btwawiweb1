import React from 'react';

interface WhyAttendData {
  title: string;
  content: string[];
  image: string;
}

interface WhyAttendSectionProps {
  data: WhyAttendData;
}

export function WhyAttendSection({ data }: WhyAttendSectionProps) {
  return (
    <section className="w-full py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* Left - Image */}
          <div className="w-full lg:w-[542px] flex-shrink-0">
            <img
              src={data.image}
              alt="Conference attendees"
              className="w-full h-[571px] object-cover rounded-lg"
            />
          </div>

          {/* Right - Content */}
          <div className="w-full lg:w-[593px] flex flex-col">
            {/* Title */}
            <h2 className="text-btwawi-blue font-aeonik text-3xl lg:text-5xl leading-[49px] tracking-[-2.4px] mb-8 font-bold">
              {data.title}
            </h2>

            {/* Content */}
            <div className="text-btwawi-blue font-aeonik text-xl lg:text-2xl font-normal leading-[117%] tracking-[-0.48px] mb-12 space-y-6">
              {data.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#"
              className="inline-flex items-center gap-[10px] px-[72px] py-[27px] bg-btwawi-yellow rounded-[64px] hover:bg-btwawi-yellow/90 transition-colors duration-200 w-fit"
            >
              <span className="text-btwawi-blue font-aeonik text-xl font-bold leading-[32.37px] tracking-[-0.8px]">
                Book your seat
              </span>
              <svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.7071 8.2071C25.0976 7.81658 25.0976 7.18342 24.7071 6.79289L18.3431 0.428931C17.9526 0.0384062 17.3195 0.0384063 16.9289 0.428931C16.5384 0.819455 16.5384 1.45262 16.9289 1.84314L22.5858 7.5L16.9289 13.1569C16.5384 13.5474 16.5384 14.1805 16.9289 14.5711C17.3195 14.9616 17.9526 14.9616 18.3431 14.5711L24.7071 8.2071ZM0 7.5L8.74228e-08 8.5L24 8.5L24 7.5L24 6.5L-8.74228e-08 6.5L0 7.5Z" fill="#002D62"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
