import React from "react";
import { FaUserPlus, FaClipboardCheck, FaLaptop } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaUserPlus className="text-4xl text-primary" />,
    title: "Register & Setup",
    desc: "HR creates company profile & employees join instantly.",
  },
  {
    icon: <FaClipboardCheck className="text-4xl text-blue-500" />,
    title: "Manage Assets",
    desc: "Add, track & approve employee requests smoothly.",
  },
  {
    icon: <FaLaptop className="text-4xl text-green-500" />,
    title: "Assign & Monitor",
    desc: "Track assignments, returns, & asset lifecycle in real-time.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-base-200 rounded-xl">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold">How It Works</h2>
          <p className="text-gray-500 mt-2">
            A simple 3-step process to manage everything smoothly
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="text-center p-8 bg-white  rounded-xl shadow-lg border border-gray-300"
            >
              <div className="flex justify-center mb-5">{s.icon}</div>
              <h3 className="font-bold text-xl mb-3">{s.title}</h3>
              <p className="text-gray-600 ">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
