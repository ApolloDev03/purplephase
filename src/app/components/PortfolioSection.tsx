"use client";

import { motion } from 'framer-motion';
import PortfolioItem from '../assets/Work-1.jpeg';
import GitaImage from '../assets/Work-2.jpg';
import DyneImage from '../assets/Work-3.jpeg';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';

// --- Dynamic Data ---
const portfolioItems = [
  {
    id: 1,
    title: "VANRAS MASALA",
    image: PortfolioItem.src, // Replace with your image asset path
  },
  {
    id: 2,
    title: "GITA SAMOSA CENTER",
    image: GitaImage.src, // Replace with your image asset path
  },
  {
    id: 3,
    title: "DYNE CHEMICALS LLP",
    image: DyneImage.src, // Replace with your image asset path
  }
];

// Specific filters visible in the screenshot
const filters = ["Brand Identity", "Packaging", "Branding & Advertising", "Digital & Social", "Digital Film"];

const PortfolioSection = () => {
  return (
    <section className="w-full max-w-full mx-auto px-6 lg:px-16 py-20 bg-white">
      {/* 1. Header with precise 'Work That Works' font style */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <h2 className="text-5xl  text-gray-800 tracking-tight">
          Work That Works
        </h2>
      </motion.div>

      {/* 2. Grid of Portfolios with Glassmorphism Overlays */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.7 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative h-[570px] rounded-lg overflow-hidden border border-gray-100 shadow-sm cursor-pointer"
          >
            {/* The Image (set to fill the container) */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* 3. The precise Glassmorphism Text Overlay */}
            {/* Place at bottom, blur background slightly, transparent bg */}
            <div className="absolute bottom-0 left-0 right-0 h-28 p-6 flex items-end">
              <span className="text-xl font-bold text-white tracking-wide uppercase">
                {item.title}
              </span>
            </div>

            {/* Optional: Subtle gradient overlay for better text contrast if images are too light */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/10 transition-colors pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* 4. Filter Navigation (Matches specific style in Figma) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        {/* Special 'Wow Me' Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#A62666] text-white px-6 py-2 rounded-md  font-medium flex items-center gap-2"
        >
          Wow Me <HiOutlineArrowUpRight size={14} />
        </motion.button>

        {/* Gray-Purple Filter Labels */}
        <div className="flex flex-wrap justify-end gap-x-8 gap-y-3">
          {filters.map((filter, index) => (
            <motion.a
              key={filter}
              href="#"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="text-xl xl:2xl text-[#A62666] transition-colors"
            >
              {filter}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PortfolioSection;