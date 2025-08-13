export function RegistrationCTA() {
  return (
    <section className="w-full py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="text-center">
          <h2 className="text-btwawi-blue font-aeonik text-5xl font-bold leading-[48px] tracking-[-2.4px] max-w-[620px] mx-auto mb-16">
            Register early and be part of this life-changing experience.
          </h2>
          
          {/* Book Your Seat Button - functional */}
          <a
            href="https://eventbrite.com/e/abuja-2-0-tickets"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[10px] bg-btwawi-yellow rounded-[64px] px-[72px] py-[27px] w-fit mx-auto cursor-pointer hover:opacity-90 transition-opacity"
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
    </section>
  );
}
