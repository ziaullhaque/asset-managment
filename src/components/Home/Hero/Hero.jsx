import React, { useEffect, useState } from 'react';
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const Hero = () => {
     const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Modern Asset Management for Smart Companies",
      subtitle: "A complete solution to track, assign and monitor assets",
      description:
        "Boost productivity, eliminate manual errors, and manage all your business assets from a unified smart dashboard.",
      image: "https://i.ibb.co.com/jvTj83XD/banner1.jpg",
    },
    {
      title: "Real-Time Monitoring & Instant Insights",
      subtitle: "Stay in control—anytime, anywhere",
      description:
        "Track asset availability, usage, employee assignments and maintenance logs in real-time with powerful analytics.",
      image: "https://i.ibb.co.com/JRWNpPJs/banner2.jpg",
    },
    {
      title: "Scale Your Workflow With Automation",
      subtitle: "Designed for fast-growing organizations",
      description:
        "Automate routine tasks, reduce workload, and improve operational efficiency with an intelligent management system.",
      image: "https://i.ibb.co.com/934ZQPN8/banner3.png",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (i) => setCurrentSlide(i);
    return (
      <div className="pt-22">
        <section className="relative flex items-center justify-center overflow-hidden rounded-xl mb-5 text-center">
          {/* Background Slides */}
          <div className="absolute inset-0">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black/55"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-28">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-white"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                {slides[currentSlide].title}
              </h1>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-teal-200 mb-4">
                {slides[currentSlide].subtitle}
              </h2>

              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                {slides[currentSlide].description}
              </p>

              {/* Button — Contact style color */}
              <a
                className="inline-flex items-center justify-center gap-2 text-lg px-10 py-4 rounded-xl font-semibold shadow-xl transition 
            bg-white text-[#006d6f] hover:bg-gray-100"
                href="#"
              >
                Start Free Trial <FiArrowRight />
              </a>
            </motion.div>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </section>
      </div>
    );
};

export default Hero;