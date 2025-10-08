import React from "react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const headlineVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const tileVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, type: "spring", stiffness: 100 },
    }),
  };

  // Example clothes images (Unsplash URLs)
  const tiles = [
    { src: "https://clothsvilla.com/cdn/shop/products/OrangeColorTrendyGeorgetteFloralPrintWomen_sGown_2_1024x1024.jpg?v=1661683085", alt: "Orange Dress" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT12eaenYPkygb49tA-wHcdY6DPAOpy4f-eZw&s", alt: "Green Coat" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEoOD6GK2k1vDhV1vqtwinARD4kEdGDY1wMg&s", alt: "Blue Jacket" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS28wyZqKD2okH3MATznLm5cjnEboieTcr-w&s", alt: "Pink Dress" },
  ];

  return (
    <section className="relative p-6 lg:p-16 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-purple-100 via-transparent to-pink-100 blur-3xl opacity-40"></div>

      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight my-10 max-w-4xl 
                   bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-transparent bg-clip-text"
        variants={headlineVariants}
        initial="hidden"
        animate="visible"
      >
        Elevate Your Style With <br />
        <span className="bg-gradient-to-r from-black via-gray-700 to-gray-900 bg-clip-text text-transparent">
          Bold Fashion
        </span>
      </motion.h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6 mt-10">
        {tiles.map((tile, i) => (
          <motion.div
            key={i}
            className={`rounded-2xl overflow-hidden min-h-[200px] flex items-center justify-center shadow-xl 
                        hover:scale-105 hover:shadow-2xl transition-all duration-500 
                        ${i === 0 ? "lg:row-span-2 bg-gradient-to-br from-orange-400 to-red-500 min-h-[300px]" : ""}
                        ${i === 1 ? "lg:row-span-3 bg-gradient-to-br from-green-500 to-emerald-700 min-h-[450px]" : ""}
                        ${i === 2 ? "bg-gradient-to-br from-blue-400 to-indigo-600 min-h-[200px]" : ""}
                        ${i === 3 ? "bg-gradient-to-br from-pink-400 to-rose-600 min-h-[200px]" : ""}`}
            custom={i}
            // variants={tileVariants}
            initial="hidden"
            animate="visible"
          >
            <img
              src={tile.src}
              alt={tile.alt}
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
