import React from "react";
import {
  FaNetworkWired,
  FaSyncAlt,
  FaShieldAlt,
  FaChartPie,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaNetworkWired className="text-4xl text-primary" />,
    title: "Centralized Asset Control",
    description:
      "Get complete visibility of all assets across teams, departments, and locations from a single unified dashboard.",
  },
  {
    icon: <FaSyncAlt className="text-4xl text-blue-500" />,
    title: "Automated Lifecycle Management",
    description:
      "From procurement to disposal—automate every step to reduce manual workload and increase operational efficiency.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-green-500" />,
    title: "Compliance & Security First",
    description:
      "Stay audit-ready with robust tracking, secure records, and compliance-focused asset documentation.",
  },
  {
    icon: <FaChartPie className="text-4xl text-purple-500" />,
    title: "Data-Driven Cost Optimization",
    description:
      "Identify underused assets, reduce wastage, and maximize ROI through intelligent analytics and insights.",
  },
];

const About = () => {
  return (
    <section className="py-20 md:py-40  transition-colors duration-300">
      {/* bg-gradient-to-b from-base-100 to-base-200 */}
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 ">
            Why Companies Trust <span className="text-primary">AssetManagement</span>
          </h2>
          <p className="mt-3 text-gray-600  max-w-2xl mx-auto text-lg">
            A modern asset management platform designed to help enterprises stay
            efficient, secure, and scalable.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl 
                border border-gray-200  hover:-translate-y-2 
                transition-all duration-300 text-center backdrop-blur-md"
            >
              <div className="mb-5 flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-bold text-gray-900  mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600  leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default About;
