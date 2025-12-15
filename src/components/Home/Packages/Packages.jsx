import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Packages = () => {
  const plans = [
    {
      name: "Basic",
      price: 5,
      employees: "Up to 5 employees",
      features: ["Asset Tracking", "Employee Management", "Basic Support"],
      highlight: false,
    },
    {
      name: "Standard",
      price: 8,
      employees: "Up to 10 employees",
      features: [
        "All Basic Features",
        "Advanced Analytics",
        "Priority Support",
      ],
      highlight: true,
    },
    {
      name: "Premium",
      price: 15,
      employees: "Up to 20 employees",
      features: ["All Standard Features", "Custom Branding", "24/7 Support"],
      highlight: false,
    },
  ];

  return (
    <section className="py-20 px-4">
      {/* Title */}
      <div className="text-center space-y-3 mb-14">
        <h2 className="text-4xl font-bold text-[#006d6f]">
          Choose Your Package
        </h2>
        <p className="text-gray-500">
          Flexible pricing plans to suit businesses of all sizes
        </p>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className={`relative p-8 rounded-2xl border border-gray-300 shadow-md transition hover:border-[#009396] shadow-teal-500/20 bg-white
            `}
          >
            {/* Name */}
            <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">
              {plan.name}
            </h3>

            {/* Price */}
            <div className="flex justify-center items-baseline mb-3">
              <span className="text-4xl font-bold text-[#006d6f]">
                ${plan.price}
              </span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>

            {/* Employee Count */}
            <p className="text-sm text-gray-500 mb-6 text-center">
              {plan.employees}
            </p>

            {/* Features */}
            <ul className="space-y-4 text-sm mb-8">
              {plan.features.map((f, i) => (
                <li className="flex items-center gap-3" key={i}>
                  <Check size={14} className="text-[#009396]" />
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              className={`w-full py-3 font-semibold rounded-lg flex items-center justify-center gap-2 transition bg-[#006d6f] text-white hover:bg-[#005a5c]
                
              `}
            >
              Get Started <ArrowRight size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
