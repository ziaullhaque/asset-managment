import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const ContactHero = () => {
  return (
    <section className="py-20 px-4">
      <div className="relative w-full mx-auto group">
        {/* 🔹 Glow Gradient Border (Teal Color) */}
        <div className="absolute -inset-1 bg-linear-to-r from-[#006d6f] to-[#009396] rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-700"></div>

        {/* 🔹 Main Card */}
        <div className="relative bg-[#006d6f] rounded-3xl p-10 md:p-16 text-center overflow-hidden shadow-xl">
          {/* Curved SVG Decoration */}
          <div className="absolute inset-0 opacity-15">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Transform Your Asset Workflow Effectively
            </h2>

            <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto font-medium">
              Boost efficiency, reduce manual errors and automate your entire
              asset management process with precision and speed.
            </p>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-[#006d6f] font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition flex items-center gap-2 mx-auto"
            >
              Get Started Today <FaArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
