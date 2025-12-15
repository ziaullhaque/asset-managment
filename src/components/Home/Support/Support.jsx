import React from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaHeadset,
  FaQuestionCircle,
} from "react-icons/fa";

const supportOptions = [
  {
    icon: <FaHeadset className="text-4xl text-[#006d6f]" />,
    title: "Live Support",
    text: "Get real-time help from our dedicated support team anytime.",
  },
  {
    icon: <FaPhoneAlt className="text-4xl text-[#006d6f]" />,
    title: "Call Us",
    text: "+880 1700-000000 — Talk directly with our support experts.",
  },
  {
    icon: <FaEnvelope className="text-4xl text-[#006d6f]" />,
    title: "Email Support",
    text: "support@assetmanagement.com — We respond within 12 hours.",
  },
];

const faqs = [
  {
    q: "How can I reset my account password?",
    a: "Go to the login page and click on 'Forgot Password' to reset securely.",
  },
  {
    q: "Can I upgrade my asset package anytime?",
    a: "Yes! You can upgrade instantly from the Upgrade Package section.",
  },
  {
    q: "Do you provide technical support?",
    a: "Absolutely! Our technical team is available 24/7.",
  },
  {
    q: "How do I add new team members?",
    a: "HR managers can add employees from the Team Management dashboard.",
  },
];

const Support = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            We're Here to <span className="text-[#006d6f]">Help You</span>
          </h2>
          <p className="mt-3 text-gray-600 text-lg max-w-2xl mx-auto">
            Our support team is available 24/7 to ensure your experience stays
            smooth.
          </p>
        </motion.div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {supportOptions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="p-8 bg-white text-center rounded-2xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all"
            >
              <div className="mb-5 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex items-center gap-3 mb-6">
            <FaQuestionCircle className="text-3xl text-[#006d6f]" />
            <h3 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-6">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-5 border border-gray-200 rounded-xl hover:border-[#006d6f] transition"
              >
                <h4 className="font-bold text-lg text-gray-900">{f.q}</h4>
                <p className="text-gray-600 mt-2">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto bg-white p-10 rounded-2xl border shadow-xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Send Us a Message
          </h3>

          <form className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-2 px-4 py-3 border rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 px-4 py-3 border rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full mt-2 px-4 py-3 border rounded-lg bg-gray-100"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#006d6f] text-white font-bold rounded-lg hover:bg-[#005458] transition"
            >
              Submit Request
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Support;
