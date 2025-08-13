import React, { useState } from "react";
import { SEOHead } from "../assets/css/components/SEOHead";

export default function ArticleDetail() {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Comment submitted:", { comment, name, email });
    // Reset form
    setComment("");
    setName("");
    setEmail("");
  };

  return (
    <div className="pt-[141px]">
      <SEOHead
        title="Unlocking Global Opportunities in Halal Markets - BTWAWI Blog"
        description="The halal industry is experiencing unprecedented growth, valued at over $2 trillion globally and spanning sectors from food and finance to cosmetics and travel."
      />

      {/* Article Header */}
      <div className="max-w-[1440px] mx-auto px-[100px] pt-[101px]">
        <div className="flex justify-between items-start mb-[77px]">
          <h1 className="text-btwawi-blue font-aeonik text-[48px] font-medium leading-[52px] tracking-[-2.4px] w-[615px]">
            Unlocking Global Opportunities in Halal Markets
          </h1>
          <div className="text-[#636363] font-aeonik text-2xl font-normal leading-5 tracking-[-1.2px] text-right">
            3mins read, Posted on 31st July, 2025
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-[1240px] h-[407px] mb-[49px]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/df60f9f55d04286b4d1ffcef537aebe3be10e918?width=2480"
            alt="Global Halal Markets"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="w-[1235px] mb-[216px]">
          <div className="text-btwawi-blue font-aeonik text-2xl font-normal leading-[27px] tracking-[-1.2px] text-justify space-y-6">
            <p>
              The halal industry is experiencing unprecedented growth, valued at
              over $2 trillion globally and spanning sectors from food and
              finance to cosmetics and travel. This expansion presents exciting
              opportunities for businesses ready to innovate and adapt to the
              evolving needs of Muslim consumers.
            </p>

            <p>
              One of the key drivers behind this surge is a rising demand for
              transparency, quality, and ethical practices. Consumers are
              increasingly seeking products and services that not only comply
              with halal standards but also uphold values of sustainability and
              social responsibility. As a result, businesses that prioritize
              these elements are gaining a competitive edge.
            </p>

            <p>
              Emerging markets in Southeast Asia, the Middle East, and Africa
              are leading the charge, offering fertile ground for new ventures.
              For instance, Indonesia's rapidly growing middle class is fueling
              demand for diverse halal products, while the Gulf states are
              investing heavily in halal tourism and finance.
            </p>

            <p>
              However, tapping into these opportunities requires an
              understanding of local cultures, regulatory frameworks, and
              consumer expectations. Building partnerships with local
              stakeholders, investing in halal certification, and leveraging
              digital platforms can help businesses navigate this complex
              landscape.
            </p>

            <p>
              At the upcoming Halal Business Conference, industry leaders will
              share insights on market entry strategies, innovation, and the
              future of halal trade. Whether you're a seasoned entrepreneur or
              just starting, now is the time to explore the vast potential of
              the halal economy.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-[53px]">
          {/* Previous Article */}
          <div className="flex items-center gap-5">
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.642039 4.35849C0.444053 4.1605 0.444053 3.8395 0.642039 3.64151L3.86842 0.415132C4.06641 0.217145 4.38741 0.217145 4.58539 0.415132C4.78338 0.613119 4.78338 0.934119 4.58539 1.13211L1.7175 4L4.58539 6.86789C4.78338 7.06588 4.78338 7.38688 4.58539 7.58487C4.38741 7.78285 4.06641 7.78285 3.86842 7.58487L0.642039 4.35849ZM13.168 4L13.168 4.50698L1.00053 4.50698L1.00053 4L1.00053 3.49302L13.168 3.49302L13.168 4Z"
                fill="#002D62"
              />
            </svg>
            <span className="text-btwawi-blue font-aeonik text-2xl font-normal leading-[27px] tracking-[-1.2px]">
              Previous article
            </span>
          </div>

          {/* Next Article */}
          <div className="flex items-center gap-5">
            <span className="text-btwawi-blue font-aeonik text-2xl font-normal leading-[27px] tracking-[-1.2px]">
              Next article
            </span>
            <svg
              width="13"
              height="8"
              viewBox="0 0 13 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5259 4.35849C12.7239 4.1605 12.7239 3.8395 12.5259 3.64151L9.29955 0.415132C9.10156 0.217145 8.78056 0.217145 8.58257 0.415132C8.38459 0.613119 8.38459 0.934119 8.58257 1.13211L11.4505 4L8.58258 6.86789C8.38459 7.06588 8.38459 7.38688 8.58258 7.58487C8.78056 7.78285 9.10156 7.78285 9.29955 7.58487L12.5259 4.35849ZM0 4L4.43213e-08 4.50698L12.1674 4.50698L12.1674 4L12.1674 3.49302L-4.43213e-08 3.49302L0 4Z"
                fill="#002D62"
              />
            </svg>
          </div>
        </div>

        {/* Related Articles */}
        <div className="flex justify-between mb-[110px]">
          {/* Previous Article Card */}
          <div className="w-[400px] h-[173px] bg-[#FFF6E7] relative">
            <div className="p-[37px]">
              <h3 className="text-btwawi-blue font-aeonik text-2xl font-normal leading-[27px] tracking-[-1.2px] mb-[19px] w-[305px]">
                Navigating Certification: Halal Standards Explained
              </h3>
              <button className="flex items-center gap-[5.07px] px-[36.5px] py-[13.7px] border border-btwawi-blue rounded-[32.4px] hover:bg-btwawi-blue hover:text-white transition-colors duration-200 group">
                <span className="text-btwawi-blue group-hover:text-white font-aeonik text-[10.14px] font-bold leading-[16.4px] tracking-[-0.4px]">
                  Read
                </span>
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.9771 4.54684C13.1751 4.34885 13.1751 4.02785 12.9771 3.82987L9.75072 0.603486C9.55273 0.4055 9.23173 0.4055 9.03375 0.603487C8.83576 0.801473 8.83576 1.12247 9.03375 1.32046L11.9016 4.18835L9.03375 7.05625C8.83576 7.25423 8.83576 7.57523 9.03375 7.77322C9.23173 7.97121 9.55273 7.97121 9.75072 7.77322L12.9771 4.54684ZM0.451172 4.18835L0.451172 4.69533L12.6186 4.69533L12.6186 4.18835L12.6186 3.68138L0.451172 3.68138L0.451172 4.18835Z"
                    className="fill-btwawi-blue group-hover:fill-white"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Next Article Card */}
          <div className="w-[400px] h-[173px] bg-[#FFF6E7] relative">
            <div className="p-[37px]">
              <h3 className="text-btwawi-blue font-aeonik text-2xl font-normal leading-[27px] tracking-[-1.2px] mb-[19px] w-[305px]">
                Women Entrepreneurs Leading the Halal Revolution
              </h3>
              <button className="flex items-center gap-[5.07px] px-[36.5px] py-[13.7px] border border-btwawi-blue rounded-[32.4px] hover:bg-btwawi-blue hover:text-white transition-colors duration-200 group">
                <span className="text-btwawi-blue group-hover:text-white font-aeonik text-[10.14px] font-bold leading-[16.4px] tracking-[-0.4px]">
                  Read
                </span>
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.9771 4.54684C13.1751 4.34885 13.1751 4.02785 12.9771 3.82987L9.75072 0.603486C9.55273 0.4055 9.23173 0.4055 9.03375 0.603487C8.83576 0.801473 8.83576 1.12247 9.03375 1.32046L11.9016 4.18835L9.03375 7.05625C8.83576 7.25423 8.83576 7.57523 9.03375 7.77322C9.23173 7.97121 9.55273 7.97121 9.75072 7.77322L12.9771 4.54684ZM0.451172 4.18835L0.451172 4.69533L12.6186 4.69533L12.6186 4.18835L12.6186 3.68138L0.451172 3.68138L0.451172 4.18835Z"
                    className="fill-btwawi-blue group-hover:fill-white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-[287px]">
          <h2 className="text-btwawi-blue font-aeonik text-[32px] font-medium leading-[49px] tracking-[-1.6px] mb-[59px]">
            Leave a Reply
          </h2>

          <p className="text-btwawi-blue font-aeonik text-2xl font-normal leading-[27px] tracking-[-1.2px] mb-[88px]">
            Your email address will not be published. Required fields are marked
            *
          </p>

          <form onSubmit={handleSubmit}>
            {/* Comment Field */}
            <div className="mb-[139px]">
              <label className="block text-[#0D141C] font-wixmadefor text-base font-medium leading-6 mb-2">
                Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter here"
                className="w-[1235px] h-[188px] p-[15px] border border-[#CFDBE8] rounded-lg bg-white text-[#C6C6C6] font-wixmadefor text-base font-normal leading-6 placeholder-[#C6C6C6] resize-none"
                required
              />
            </div>

            {/* Name and Email Fields */}
            <div className="flex gap-[292px] mb-[87px]">
              <div className="w-[448px]">
                <label className="block text-[#0D141C] font-wixmadefor text-base font-medium leading-6 mb-2">
                  Name*
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter here"
                  className="w-full h-14 px-[15px] border border-[#CFDBE8] rounded-lg bg-white text-[#C6C6C6] font-wixmadefor text-base font-normal leading-6 placeholder-[#C6C6C6]"
                  required
                />
              </div>

              <div className="w-[448px]">
                <label className="block text-[#0D141C] font-wixmadefor text-base font-medium leading-6 mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter here"
                  className="w-full h-14 px-[15px] border border-[#CFDBE8] rounded-lg bg-white text-[#C6C6C6] font-wixmadefor text-base font-normal leading-6 placeholder-[#C6C6C6]"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center gap-[10px] px-[72px] py-[27px] bg-btwawi-yellow rounded-[64px] hover:opacity-90 transition-opacity duration-200"
            >
              <span className="text-btwawi-blue font-aeonik text-xl font-bold leading-[32.4px] tracking-[-0.8px]">
                Post comment
              </span>
              <svg
                width="25"
                height="15"
                viewBox="0 0 25 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.7071 8.2071C25.0976 7.81658 25.0976 7.18342 24.7071 6.79289L18.3431 0.428931C17.9526 0.0384062 17.3195 0.0384063 16.9289 0.428931C16.5384 0.819455 16.5384 1.45262 16.9289 1.84314L22.5858 7.5L16.9289 13.1569C16.5384 13.5474 16.5384 14.1805 16.9289 14.5711C17.3195 14.9616 17.9526 14.9616 18.3431 14.5711L24.7071 8.2071ZM0 7.5L8.74228e-08 8.5L24 8.5L24 7.5L24 6.5L-8.74228e-08 6.5L0 7.5Z"
                  fill="#002D62"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
