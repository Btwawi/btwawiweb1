import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const blogArticles = [
  {
    id: 1,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/de9f3093056679c8f24a507647549422f06f5f34?width=800",
    title: "Unlocking Global Opportunities in Halal Markets",
    description:
      "Explore how the booming halal industry is opening doors for entrepreneurs worldwide. Learn about emerging trends, key markets, and how your business can tap into this growing sector.",
    readTime: "3mins read",
    tags: ["halal", "markets", "global", "opportunities", "business"],
  },
  {
    id: 2,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/cf76e4ca6258062b1201748b1d69b36bdc37a5fd?width=800",
    title: "Navigating Certification: Halal Standards Explained",
    description:
      "Confused about halal certification? Get clarity on global standards, the certification process, and how it impacts your business's credibility and reach.",
    readTime: "3mins read",
    tags: ["certification", "halal", "standards", "compliance", "business"],
  },
  {
    id: 3,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/c68088ae3629098821988b9aa086aca4a4575c96?width=800",
    title: "Women Entrepreneurs Leading the Halal Revolution",
    description:
      "Discover inspiring stories of women breaking barriers and driving innovation in the halal business landscape.",
    readTime: "3mins read",
    tags: ["women", "entrepreneurs", "leadership", "innovation", "inspiration"],
  },
  {
    id: 4,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/62d2361729c5285cb9737d2b779b64f0418fdd4c?width=800",
    title: "Tech and Tradition: Digital Transformation in Halal Industries",
    description:
      "See how technology is reshaping halal businesses—from e-commerce to blockchain—while honoring tradition and values.",
    readTime: "3mins read",
    tags: [
      "technology",
      "digital",
      "transformation",
      "tradition",
      "innovation",
    ],
  },
  {
    id: 5,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/38237886408a9703ea5f0f14b60083d70090c3c3?width=800",
    title: "Sustainable Halal Business Practices",
    description:
      "Learn how to build sustainable business practices that align with Islamic values while contributing to environmental and social responsibility.",
    readTime: "4mins read",
    tags: [
      "sustainability",
      "halal",
      "environment",
      "ethics",
      "responsibility",
    ],
  },
  {
    id: 6,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/c68088ae3629098821988b9aa086aca4a4575c96?width=800",
    title: "Building Islamic Financial Literacy",
    description:
      "Master the fundamentals of Islamic finance and learn how to make shariah-compliant investment decisions for your business growth.",
    readTime: "5mins read",
    tags: ["finance", "islamic", "investment", "shariah", "literacy"],
  },
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredArticles = useMemo(() => {
    if (!searchTerm.trim()) return blogArticles;

    const searchLower = searchTerm.toLowerCase();
    return blogArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchLower) ||
        article.description.toLowerCase().includes(searchLower) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }, [searchTerm]);

  const handleReadMore = (articleId: number) => {
    if (articleId === 1) {
      // Navigate to the detailed article page for "Unlocking Global Opportunities in Halal Markets"
      navigate("/blog/unlocking-global-opportunities-in-halal-markets");
    } else {
      // For other articles, show placeholder behavior
      console.log(`Reading article ${articleId}`);
      alert(
        `Opening article: ${
          blogArticles.find((a) => a.id === articleId)?.title
        }`
      );
    }
  };

  return (
    <div className="pt-[141px]">
      {/* Hero Section */}
      <section className="w-full">
        <div className="max-w-[1440px] mx-auto relative">
          {/* Blue Background Container */}
          <div className="w-[1240px] h-[290px] bg-[#F2F8FF] mx-auto relative">
            {/* Welcome Text */}
            <div className="absolute left-1/2 top-[77px] transform -translate-x-1/2">
              <h1 className="text-btwawi-blue font-aeonik text-5xl font-medium leading-[49px] tracking-[-2.4px] text-center mb-6">
                Welcome to Our Blog
              </h1>
              <p className="text-btwawi-blue font-aeonik text-2xl font-normal leading-[117%] tracking-[-0.48px] text-center w-[547px]">
                Discover insights, stories, and tips on topics that matter to
                you. Dive into our latest articles and join the conversation!
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="absolute left-1/2 top-[375px] transform -translate-x-1/2 z-10">
            <div className="flex items-center w-[786px] h-14 px-4 gap-6 border border-[#CFDBE8] rounded-lg bg-white">
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.9636 21.5017L13.8218 15.3595C13.0878 15.9849 12.2436 16.4688 11.2894 16.8114C10.3351 17.1539 9.37601 17.3252 8.41198 17.3252C6.06113 17.3252 4.07142 16.5114 2.44285 14.8838C0.814284 13.2562 0 11.267 0 8.91615C0 6.5653 0.813305 4.5751 2.43991 2.94555C4.06652 1.316 6.05526 0.500252 8.40611 0.498295C10.757 0.496337 12.7477 1.31062 14.3782 2.94115C16.0087 4.57167 16.824 6.56187 16.824 8.91175C16.824 9.93156 16.6434 10.9186 16.2823 11.8728C15.9211 12.8271 15.4464 13.6433 14.8582 14.3215L21 20.4623L19.9636 21.5017ZM8.41345 15.8557C10.3611 15.8557 12.0053 15.1853 13.3461 13.8444C14.687 12.5036 15.3574 10.8589 15.3574 8.91028C15.3574 6.96167 14.687 5.31745 13.3461 3.9776C12.0053 2.63775 10.3611 1.96733 8.41345 1.96635C6.46582 1.96538 4.82111 2.63579 3.4793 3.9776C2.13749 5.3194 1.46708 6.96363 1.46806 8.91028C1.46904 10.8569 2.13945 12.5012 3.4793 13.843C4.81915 15.1848 6.46485 15.8566 8.41345 15.8557Z"
                  fill="#EDC645"
                />
              </svg>
              <input
                type="text"
                placeholder="Search topics here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 font-wixmadefor text-base text-gray-700 placeholder-[#C6C6C6] bg-transparent border-none outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="w-full pt-[200px] pb-20">
        <div className="max-w-[1440px] mx-auto px-[100px]">
          {searchTerm && (
            <div className="mb-8">
              <p className="text-btwawi-blue font-aeonik text-xl">
                {filteredArticles.length} article
                {filteredArticles.length !== 1 ? "s" : ""} found for "
                {searchTerm}"
              </p>
            </div>
          )}

          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 font-aeonik text-xl mb-4">
                No articles found matching your search.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="text-btwawi-blue font-aeonik text-lg underline hover:opacity-80 transition-opacity"
              >
                View all articles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="w-full max-w-[400px] h-[573px] bg-[#FFF6E7] relative mx-auto"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-[276px] object-cover"
                  />
                  <div className="px-[37px] pt-[26px] pb-[48px]">
                    <h3 className="text-btwawi-blue font-aeonik text-2xl font-normal leading-[27px] tracking-[-1.2px] mb-[18px] w-[305px]">
                      {article.title}
                    </h3>
                    <p className="text-[#636363] font-aeonik text-base font-normal leading-5 tracking-[-0.8px] mb-[52px] w-[327px]">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#636363] font-aeonik text-base font-normal leading-5 tracking-[-0.8px]">
                        {article.readTime}
                      </span>
                      <button
                        onClick={() => handleReadMore(article.id)}
                        className="flex items-center gap-[5.07px] px-[36.5px] py-[13.7px] border border-btwawi-blue rounded-[32.4px] hover:bg-btwawi-blue hover:text-white transition-colors duration-200 group"
                      >
                        <span className="text-btwawi-blue group-hover:text-white font-aeonik text-[10.14px] font-bold leading-[16.4px] tracking-[-0.4px]">
                          Read more
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
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
