// // import React from 'react';

// // const UpgradePackage = () => {
// //     return (
// //         <div>
// //             UpgradePackage
// // UpgradePackage
// //         </div>
// //     );
// // };

// // export default UpgradePackage;
// import React from "react";
// import { Crown, Star, CheckCircle } from "lucide-react";

// const packages = [
//   {
//     name: "Basic",
//     price: 0,
//     limit: 5,
//     features: ["5 Employees", "Standard Dashboard", "Basic Support"],
//     highlighted: false,
//   },
//   {
//     name: "Pro",
//     price: 29,
//     limit: 20,
//     features: ["20 Employees", "Advanced Asset Tracking", "Priority Support"],
//     highlighted: true,
//   },
//   {
//     name: "Enterprise",
//     price: 79,
//     limit: 100,
//     features: [
//       "100 Employees",
//       "Full Automation",
//       "24/7 Premium Support",
//       "Custom Integrations",
//     ],
//     highlighted: false,
//   },
// ];

// const UpgradePackage = () => {
//   return (
//     <div className="max-w-7xl mx-auto py-16 px-6">
//       {/* Title */}
//       <div className="text-center mb-14">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-[#006d6f]">
//           Upgrade Your Package
//         </h2>
//         <p className="text-gray-600 mt-2 text-lg">
//           Scale your team and unlock more power with premium plans.
//         </p>
//       </div>

//       {/* Packages Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {packages.map((pkg, i) => (
//           <div
//             key={i}
//             className={`border rounded-2xl shadow-md p-8 transition hover:-translate-y-2 hover:shadow-xl
//               ${
//                 pkg.highlighted
//                   ? "border-[#006d6f] bg-[#006d6f]/5"
//                   : "border-gray-300"
//               }
//             `}
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between">
//               <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
//               {pkg.highlighted && <Crown className="text-[#006d6f] w-8 h-8" />}
//             </div>

//             {/* Price */}
//             <p className="text-4xl font-extrabold text-[#006d6f] mt-4">
//               ${pkg.price}
//               <span className="text-sm text-gray-500 font-medium"> /month</span>
//             </p>

//             {/* Limit */}
//             <p className="text-gray-600 mt-1">{pkg.limit} Employees Limit</p>

//             {/* Features */}
//             <ul className="mt-6 space-y-3">
//               {pkg.features.map((f, idx) => (
//                 <li key={idx} className="flex items-center gap-2 text-gray-700">
//                   <CheckCircle className="text-[#006d6f] w-5 h-5" />
//                   {f}
//                 </li>
//               ))}
//             </ul>

//             {/* Button */}
//             <button
//               className={`mt-8 w-full py-3 rounded-lg font-semibold shadow
//                 ${
//                   pkg.highlighted
//                     ? "bg-[#006d6f] text-white hover:bg-[#005b5c]"
//                     : "bg-white border border-[#006d6f] text-[#006d6f] hover:bg-[#006d6f] hover:text-white"
//                 }
//                 transition
//               `}
//             >
//               Choose {pkg.name}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UpgradePackage;
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaCheck, FaCrown } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Container from "../../../../components/Shared/Container/Container";

const UpgradePackage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  const handlePayment = async (p) => {
    const paymentInfo = {
      packageId: p._id,
      name: p.name,
      employeeLimit: p.employeeLimit,
      price: p.price,
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };
    const { data } = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );
    console.log(data.url);
    // eslint-disable-next-line react-hooks/immutability
    window.location.href = data.url;
  };

  // Determine if package is popular (middle one or highest employee limit)
  const getPopularIndex = () => {
    if (packages.length === 0) return -1;
    // Find package with highest employee limit
    const maxLimit = Math.max(...packages.map((p) => p.employeeLimit));
    return packages.findIndex((p) => p.employeeLimit === maxLimit);
  };

  const popularIndex = getPopularIndex();

  return (
    <div className="min-h-screen py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-lime-100 text-lime-700 rounded-full font-bold text-sm mb-4">
            Pricing Plans
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Choose Your{" "}
            <span className="bg-linear-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Upgrade your account to unlock more features and manage larger teams
            efficiently.
          </p>
        </div>

        {/* Pricing Cards */}
        <Container className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((p, index) => {
            const isPopular = index === popularIndex;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                  isPopular
                    ? "border-lime-500 scale-105"
                    : "border-gray-200 hover:border-lime-300"
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-linear-to-r from-lime-500 to-green-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                      <FaCrown className="text-yellow-300" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Package Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {p.name}
                  </h3>

                  {/* Employee Limit Badge */}
                  <div className="inline-block px-3 py-1 bg-lime-100 text-lime-700 rounded-full text-sm font-semibold mb-6">
                    Up to {p.employeeLimit} Employees
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-gray-900">
                        ${p.price}
                      </span>
                      <span className="text-gray-600">/month</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {p.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 bg-lime-100 rounded-full flex items-center justify-center mt-0.5">
                          <FaCheck className="text-lime-600 text-xs" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePayment(p)}
                    className={`btn btn-lg w-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isPopular
                        ? "bg-linear-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white"
                        : "bg-gray-100 hover:bg-lime-500 text-gray-900 hover:text-white"
                    }`}
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
            );
          })}
        </Container>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            All plans include 24/7 support and a 30-day money-back guarantee
          </p>
          <p className="text-sm text-gray-500">
            Need a custom plan?{" "}
            <a
              href="mailto:devsajid56@gmail.com"
              className="text-lime-600 hover:text-lime-700 font-semibold"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradePackage;
