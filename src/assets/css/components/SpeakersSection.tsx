import React from 'react';
import Slider from 'react-slick';

interface Speaker {
  name: string;
  role: string;
  image: string;
  bgColor: string;
  nameStyle?: string;
  roleStyle?: string;
}

interface SpeakersSectionProps {
  data: Speaker[];
}

export function SpeakersSection({ data }: SpeakersSectionProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    customPaging: (i: number) => (
      <div className="w-3 h-3 rounded-full bg-[#104F98] hover:bg-btwawi-yellow transition-colors duration-200" />
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="flex justify-center gap-3 mt-8">
        {dots}
      </div>
    ),
  };

  return (
    <section className="w-full py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-btwawi-blue font-aeonik text-5xl font-bold leading-[48px] tracking-[-2.4px]">
            Meet the Speakers
          </h2>
          <a 
            href="#" 
            className="text-btwawi-yellow font-aeonik text-[32px] font-bold leading-[48px] tracking-[-1.6px] underline hover:opacity-80 transition-opacity"
          >
            See all
          </a>
        </div>
        
        {/* Speakers Carousel */}
        <div className="speakers-carousel">
          <Slider {...settings}>
            {data.map((speaker, index) => (
              <div key={index} className="px-3">
                <div className="w-[341px] h-[422px] relative mx-auto">
                  {/* Background */}
                  <div className={`w-full h-[420px] ${speaker.bgColor} rounded-t-lg`} />

                  {/* Yellow Name Section */}
                  <div className="absolute bottom-0 w-full h-[136px] bg-btwawi-yellow rounded-b-lg flex flex-col items-center justify-center text-center px-4">
                    <h3 className={`text-btwawi-blue font-aeonik text-3xl lg:text-4xl font-normal tracking-[-1.8px] mb-2 ${speaker.nameStyle || 'leading-[60px]'}`}>
                      {speaker.name.includes('\n') ? (
                        <span className="whitespace-pre-line">{speaker.name}</span>
                      ) : (
                        speaker.name
                      )}
                    </h3>
                    <p className={`text-btwawi-blue font-aeonik text-lg lg:text-[23px] font-normal tracking-[-1.15px] max-w-[250px] ${speaker.roleStyle || 'leading-[38.37px]'}`}>
                      {speaker.role}
                    </p>
                  </div>

                  {/* Speaker Image */}
                  <div className="absolute top-0 w-full">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-[284px] object-cover rounded-t-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
