import React from "react";

const FooterContent: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-t from-slate-100 to-white p-6 lg:p-16 overflow-hidden">
      {/* Background accent circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>

      <div className="relative flex flex-col lg:flex-row justify-between items-end gap-10">
        {/* Testimonial Block */}
        <div className="max-w-md mb-8 lg:mb-0 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-500">
          <blockquote className="text-2xl font-light italic leading-relaxed text-gray-700 relative pl-6">
            <span className="absolute top-0 left-0 text-6xl font-serif text-gray-300">“</span>
            <p>
              TrendZone's styles are fresh, bold, and exactly what I needed to upgrade my wardrobe. Loved the quality and vibe!
            </p>
          </blockquote>
          <div className="mt-4 text-right text-xl font-serif italic text-gray-900">
            — Rafi H.
          </div>
        </div>

        {/* Lifestyle Block */}
        <div className="text-right flex flex-col items-end">
          <p className="text-6xl font-extrabold leading-none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
            01
          </p>
          <p className="text-lg font-medium tracking-widest text-gray-500 uppercase mt-1">
            Lifestyle
          </p>
          <h2 className="text-3xl lg:text-4xl text-gray-400 font-bold mt-4 max-w-xs leading-snug">
            Set Up Your Fashion With The Latest Trends
          </h2>
          <a
            href="#"
            className="flex items-center justify-end text-black font-semibold mt-6 hover:text-gray-700 transition-colors group"
          >
            <span className="mr-2 group-hover:underline">Explore</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FooterContent;
