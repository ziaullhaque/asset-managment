import React from "react";
import {
  FaLaptopCode,
  FaUsersCog,
  FaChartBar,
  FaSync,
  FaShieldAlt,
  FaTools,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaLaptopCode className="text-4xl text-primary" />,
    title: "Smart Asset Tracking",
    desc: "Track all company assets in real-time with full visibility & control.",
  },
  {
    icon: <FaUsersCog className="text-4xl text-blue-500" />,
    title: "Employee Management",
    desc: "Manage teams, asset assignments, and multi-company affiliations easily.",
  },
  {
    icon: <FaChartBar className="text-4xl text-purple-500" />,
    title: "Advanced Analytics",
    desc: "Gain insights on asset usage, cost, and performance metrics.",
  },
  {
    icon: <FaSync className="text-4xl text-teal-500" />,
    title: "Automated Workflow",
    desc: "Assign, approve & return assets using a fully automated workflow.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-green-500" />,
    title: "Secure Platform",
    desc: "Enterprise-grade data protection with role-based access control.",
  },
  {
    icon: <FaTools className="text-4xl text-orange-500" />,
    title: "Lifecycle Management",
    desc: "Track asset lifecycle from procurement to retirement smoothly.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold">
            Key Features of{" "}
            <span className="text-[#006d6f]">AssetManagement</span>
          </h2>
          <p className="text-gray-400 mt-2">
            A powerful suite of tools for HR & enterprises
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-300 hover:shadow-xl hover:-translate-y-2 transition-all"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 ">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
