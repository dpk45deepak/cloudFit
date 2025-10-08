// ShopPage.tsx
import React from "react";
import { motion } from "framer-motion";

// Example product data
const products = [
  {
    id: 1,
    name: "Orange Summer Dress",
    price: "$49",
    image:
      "https://images.unsplash.com/photo-1618354693586-72e029e84713?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Green Casual Coat",
    price: "$79",
    image:
      "https://images.unsplash.com/photo-1520975911203-6dfb91d0905b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Blue Denim Jacket",
    price: "$59",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Pink Evening Dress",
    price: "$89",
    image:
      "https://images.unsplash.com/photo-1589187159188-c0f5e77e5f92?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Yellow Summer Top",
    price: "$39",
    image:
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Purple Formal Dress",
    price: "$99",
    image:
      "https://images.unsplash.com/photo-1600185365958-1f528b2d312d?auto=format&fit=crop&w=800&q=80",
  },
];

const ShopPage: React.FC = () => {
  return (
    <section className="bg-slate-50 min-h-screen py-12 px-4 lg:px-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
        TrendZone Shop
      </h1>
      <p className="text-center text-gray-600 mt-2 mb-12">
        Discover your perfect outfit from our curated collection.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 cursor-pointer flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-full h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-500 mt-1">{product.price}</p>
              <button className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold hover:scale-105 transition-transform duration-300">
                Buy Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ShopPage;
