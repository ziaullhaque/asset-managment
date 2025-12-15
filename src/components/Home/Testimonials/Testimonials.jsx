import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      userName: "Michael Thompson",
      role: "Operations Manager",
      user_photoURL: "https://randomuser.me/api/portraits/men/12.jpg",
      review:
        "AssetManagement completely transformed how we track and manage assets. The automation features saved us hours every week!",
    },
    {
      id: 2,
      userName: "Sarah Williams",
      role: "HR Coordinator",
      user_photoURL: "https://randomuser.me/api/portraits/women/22.jpg",
      review:
        "Our team productivity improved significantly after switching. Managing employee assets has never been this smooth!",
    },
    {
      id: 3,
      userName: "Jonathan Lee",
      role: "IT Supervisor",
      user_photoURL: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "The real-time tracking system is unbelievably accurate. We no longer lose track of equipment across departments.",
    },
    {
      id: 4,
      userName: "Emily Carter",
      role: "Finance Analyst",
      user_photoURL: "https://randomuser.me/api/portraits/women/48.jpg",
      review:
        "The reporting features helped us reduce unnecessary purchases by 30%. Best investment we made this year!",
    },
    {
      id: 5,
      userName: "Daniel Rodriguez",
      role: "Procurement Lead",
      user_photoURL: "https://randomuser.me/api/portraits/men/56.jpg",
      review:
        "Extremely user friendly. Our procurement flow is now fully optimized thanks to AssetManagement.",
    },
    {
      id: 6,
      userName: "Olivia Martinez",
      role: "Corporate Trainer",
      user_photoURL: "https://randomuser.me/api/portraits/women/64.jpg",
      review:
        "Training new team members became so easy. The interface is clean, fast, and built for real work.",
    },
    {
      id: 7,
      userName: "James Parker",
      role: "Admin Officer",
      user_photoURL: "https://randomuser.me/api/portraits/men/71.jpg",
      review:
        "Finally a system that works flawlessly. Our asset audit time dropped dramatically!",
    },
    {
      id: 8,
      userName: "Sophia Turner",
      role: "Project Coordinator",
      user_photoURL: "https://randomuser.me/api/portraits/women/75.jpg",
      review:
        "Super smooth experience! The automation and reminders help us stay organized during big projects.",
    },
  ];

  return (
    <section className="py-16 rounded-xl">
      {/* Header */}
      <div className="text-center px-5 md:px-20 pb-10 space-y-3">
        <h3 className="text-3xl font-bold text-[#03373d]">
          What Our Customers Are Saying
        </h3>

        <p className="text-[#606060] max-w-2xl mx-auto">
          Trusted by thousands — here’s how AssetManagement is helping
          organizations grow faster.
        </p>
      </div>

      {/* Swiper Slider */}
      <Swiper
        loop
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={1.15}
        breakpoints={{
          640: { slidesPerView: 1.4 },
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
        }}
        coverflowEffect={{
          rotate: 25,
          stretch: 100,
          depth: 180,
          modifier: 1,
          scale: 0.9,
          slideShadows: false,
        }}
        autoplay={{ delay: 2500 }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="pb-12"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="py-8">
            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 mx-auto hover:shadow-2xl transition duration-300 max-w-sm">
              <FaQuoteLeft className="text-[#03373d] text-2xl mb-4" />

              <p className="text-gray-700 leading-relaxed mb-4">
                {review.review}
              </p>

              <div className="border-t border-dashed my-4"></div>

              <div className="flex items-center gap-4">
                <img
                  src={review.user_photoURL}
                  className="w-12 h-12 rounded-full object-cover border"
                  alt={review.userName}
                />

                <div>
                  <h3 className="font-bold text-gray-900">{review.userName}</h3>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
