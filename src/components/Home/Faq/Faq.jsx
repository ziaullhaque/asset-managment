import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    q: "What is AssetManagement?",
    a: "AssetManagement is a modern asset management system that helps companies track equipment, automate workflows, and improve operational efficiency.",
  },
  {
    q: "Can employees request assets?",
    a: "Yes, employees can easily request assets. HR or Admin can approve, reject, or assign items instantly.",
  },
  {
    q: "How does auto-affiliation work?",
    a: "When an HR approves the employee’s first asset request, the system automatically affiliates them with the company.",
  },
  {
    q: "IsAssetManagement suitable for large organizations?",
    a: "Absolutely! AssetManagement is designed to scale effortlessly—from startups to enterprise-level businesses.",
  },
];

const Faq = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-20 bg-gray-50 rounded-xl mb-10">
      <div className="max-w-4xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#006d6f] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Got a question? We’ve got answers tailored for you.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-[#006d6f]/20 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-[#03373d] text-lg">
                  {faq.q}
                </span>
                <FaChevronDown
                  className={`text-[#006d6f] transition duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === i && (
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
