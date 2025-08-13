import React from 'react';

interface StatCard {
  number: string;
  label: string;
  bgColor: string;
  width: string;
}

interface StatsData {
  title: string;
  cards: StatCard[];
}

interface StatsSectionProps {
  data: StatsData;
}

export function StatsSection({ data }: StatsSectionProps) {
  return (
    <section className="w-full py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex flex-col items-center max-w-[1143px] mx-auto">
          {/* Title */}
          <div className="w-full max-w-[748px] h-[103px] bg-white flex items-center justify-center mb-0 px-4">
            <h2 className="text-btwawi-blue font-aeonik text-3xl md:text-4xl lg:text-5xl font-normal leading-[49px] tracking-[-2.4px] text-center">
              {data.title}
            </h2>
          </div>

          {/* Stats Cards Container */}
          <div className={`flex flex-col md:flex-row w-full max-w-[1143px] h-auto md:h-[230px] ${
            data.cards.length === 3 ? 'justify-between' : 'justify-center'
          }`}>
            {data.cards.map((card, index) => (
              <div 
                key={index}
                className={`w-full ${card.width} h-[230px] ${card.bgColor} flex flex-col justify-center items-start px-[54px]`}
              >
                <div className="text-btwawi-blue font-aeonik text-6xl lg:text-[100px] font-bold leading-[112.71px] tracking-[-5px] mb-[-10px]">
                  {card.number}
                </div>
                <div className="text-btwawi-blue font-aeonik text-2xl lg:text-4xl font-normal leading-[117%] tracking-[-0.72px]">
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
