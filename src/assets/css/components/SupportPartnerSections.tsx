export function SupportPartnerSections() {
  return (
    <div className="w-full">
      {/* Support BTWAWI Section */}
      <section className="w-full h-[451px] bg-btwawi-palebluebg">
        <div className="max-w-[1440px] mx-auto px-4 h-full flex items-center">
          <div className="w-[1240px] mx-auto flex items-center justify-between">
            <div className="flex-1 pr-8">
              <h2 className="text-btwawi-blue font-aeonik text-5xl font-medium leading-[49px] tracking-[-2.4px] mb-8">
                Support BTWAWI
              </h2>
              <p className="text-btwawi-blue font-aeonik text-2xl font-normal leading-[117%] tracking-[-0.48px] max-w-[454px] mb-12">
                Your contribution helps us expand our reach and deliver an exceptional experience for all attendees. Discover how you can make a difference.
              </p>
              
              {/* Support Button */}
              <div className="flex items-center gap-[8.85px] bg-btwawi-yellow rounded-[56.64px] px-[63.72px] py-[23.9px] w-fit cursor-pointer hover:opacity-90 transition-opacity">
                <span className="text-btwawi-blue font-aeonik text-[17.7px] font-bold leading-[28.65px] tracking-[-0.71px]">
                  Support us
                </span>
                <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.6718 8.02231C23.0174 7.67668 23.0174 7.11629 22.6718 6.77065L17.0393 1.13818C16.6937 0.792545 16.1333 0.792545 15.7876 1.13818C15.442 1.48382 15.442 2.04421 15.7876 2.38984L20.7943 7.39648L15.7876 12.4031C15.442 12.7488 15.442 13.3091 15.7876 13.6548C16.1333 14.0004 16.6937 14.0004 17.0393 13.6548L22.6718 8.02231ZM0.804565 7.39648L0.804566 8.28154L22.0459 8.28154L22.0459 7.39648L22.0459 6.51143L0.804565 6.51143L0.804565 7.39648Z" fill="#002D62"/>
                </svg>
              </div>
            </div>
            
            {/* Support Images */}
            <div className="relative w-[528px] h-[457px]">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/52db6c4b10cc7942ee5adb62a5ab8421879977d3?width=1040"
                alt="Support Image"
                className="absolute right-0 top-0 w-[520px] h-[457px] object-cover"
              />
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/cd7581bb54d0955de1cb8a69d984619fac5176ff?width=487"
                alt="Heart with money"
                className="absolute left-0 bottom-0 w-[243px] h-[214px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Partner With Purpose Section */}
      <section className="w-full h-[451px] bg-btwawi-paleyellowbg">
        <div className="max-w-[1440px] mx-auto px-4 h-full flex items-center">
          <div className="w-[1240px] mx-auto flex items-center justify-between">
            {/* Partnership Image */}
            <div className="w-[475px] h-[374px] bg-btwawi-blue relative">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/0aa9372d97f927ec7c349eae1007bf2043fe8ff2?width=950"
                alt="Partnership handshake"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 pl-8">
              <h2 className="text-btwawi-blue font-aeonik text-5xl font-medium leading-[49px] tracking-[-2.4px] mb-8">
                Partner With Purpose
              </h2>
              <p className="text-btwawi-blue font-aeonik text-2xl font-normal leading-[117%] tracking-[-0.48px] max-w-[454px] mb-12">
                Partnering with Business The Way Allaah Wants It Initiative is not just an act of goodwill, it is a smart business move.
              </p>
              
              {/* Partner Button */}
              <div className="flex items-center gap-[8.85px] bg-btwawi-yellow rounded-[56.64px] px-[63.72px] py-[23.9px] w-fit cursor-pointer hover:opacity-90 transition-opacity">
                <span className="text-btwawi-blue font-aeonik text-[17.7px] font-bold leading-[28.65px] tracking-[-0.71px]">
                  Become a partner
                </span>
                <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.6719 8.02231C23.0175 7.67668 23.0175 7.11629 22.6719 6.77065L17.0394 1.13818C16.6938 0.792545 16.1334 0.792545 15.7878 1.13818C15.4421 1.48382 15.4421 2.04421 15.7878 2.38984L20.7944 7.39648L15.7878 12.4031C15.4421 12.7488 15.4421 13.3091 15.7878 13.6548C16.1334 14.0004 16.6938 14.0004 17.0394 13.6548L22.6719 8.02231ZM0.804688 7.39648L0.804688 8.28154L22.0461 8.28154L22.0461 7.39648L22.0461 6.51143L0.804687 6.51143L0.804688 7.39648Z" fill="#002D62"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
