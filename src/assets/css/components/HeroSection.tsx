import React from "react";

interface HeroData {
  label: string;
  title: string[];
  subtitle: string;
  backgroundImage: string;
  date: string;
  className?: string;
}

interface HeroSectionProps {
  data: HeroData;
}

export function HeroSection({ data }: HeroSectionProps) {
  const [cityName, version] = data.label.split(" ");

  return (
    <section className="relative h-[100vh] min-h-[800px] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('${data.backgroundImage}')`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* City Label */}
        <div className="mb-4 md:mb-8">
          <h1 className="text-btwawi-blue font-aeonik text-vw-2xl md:text-vw-3xl italic font-normal tracking-[3.82px] uppercase">
            <span className="font-bold">{cityName}</span>{" "}
            <span className="font-normal">{version}</span>
          </h1>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-btwawi-blue font-aeonik text-vw-4xl md:text-vw-5xl lg:text-vw-6xl xl:text-vw-7xl font-bold leading-tight tracking-[-3.2px] max-w-[888px] mx-auto px-4">
            {data.title.map((line, index) => (
              <span key={index}>
                {line}
                {index < data.title.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-btwawi-blue font-aeonik text-vw-lg md:text-vw-xl lg:text-vw-2xl font-normal leading-[117%] tracking-[-0.48px] max-w-[668px] mx-auto px-4">
            {data.subtitle}
          </p>
        </div>

        {/* Event Date - responsive */}
        <div className="w-full max-w-[668px] h-[111px] relative mx-auto">
          <div className="w-full h-[111px] bg-white/27 backdrop-blur-[150.85px] absolute left-0 top-0 rounded-lg" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-btwawi-blue font-aeonik text-vw-xl md:text-vw-2xl lg:text-vw-3xl tracking-[-0.04em] text-center font-bold">
              {data.date}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
