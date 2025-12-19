import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCheck, FaCreditCard, FaCheckCircle, FaCrown } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";

const UpgradePackage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Packages
  const { data: packages = [], isLoading: packagesLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  // User info
  const { data: userData, isLoading: userLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Payment history
  const { data: paymentHistory = [], isLoading: paymentLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  if (packagesLoading || userLoading || paymentLoading) {
    return <LoadingSpinner />;
  }

  // Stripe Checkout (same as before)
  const handlePayment = async (pkg) => {
    try {
      const paymentInfo = {
        packageId: pkg._id,
        name: pkg.name,
        employeeLimit: pkg.employeeLimit,
        price: pkg.price,
        customer: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      window.location.href = res.data.url;
    } catch (err) {
      Swal.fire("Error", "Failed to start payment", "error");
    }
  };

  // Popular package (highest employee limit)
  const maxLimit = Math.max(...packages.map((p) => p.employeeLimit));
  const popularPackage = packages.find((p) => p.employeeLimit === maxLimit);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Packages Section */}
        <div>
          <h2 className="text-3xl font-bold text-[#006d6f] mb-2">
            Upgrade Your Package
          </h2>
          <p className="text-gray-600 mb-8">
            Choose a plan that fits your company
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const isCurrent = pkg.name === userData?.subscription;
              const isPopular = pkg._id === popularPackage?._id;

              return (
                <div
                  key={pkg._id}
                  className={`relative rounded-2xl p-6 shadow-lg border transition
                    ${
                      isPopular
                        ? "border-[#006d6f] bg-[#e0f2f1]"
                        : "bg-white border-gray-200"
                    }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#006d6f] text-white px-4 py-1 rounded-full text-sm flex items-center gap-2">
                      <FaCrown /> Most Popular
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>

                  <p className="text-4xl font-extrabold text-[#006d6f]">
                    ${pkg.price}
                    <span className="text-base text-gray-500"> /month</span>
                  </p>

                  <p className="mt-2 text-gray-600">
                    Up to {pkg.employeeLimit} employees
                  </p>

                  <ul className="mt-4 space-y-2">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <FaCheck className="text-[#006d6f]" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <button disabled className="btn btn-outline w-full mt-6">
                      Current Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePayment(pkg)}
                      className="btn bg-[#006d6f] hover:bg-[#005b5c] text-white w-full mt-6"
                    >
                      Upgrade to {pkg.name}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment History Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#006d6f] mb-6">
            Payment History
          </h2>

          <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-[#006d6f] text-white">
                <tr>
                  <th>#</th>
                  <th>Transaction</th>
                  <th>Package</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((p, i) => (
                  <tr key={p._id}>
                    <td>{i + 1}</td>
                    <td>
                      <code className="bg-gray-100 px-2 py-1 rounded">
                        {p.transitionId || "N/A"}
                      </code>
                    </td>
                    <td className="flex items-center gap-2">
                      <FaCreditCard className="text-[#006d6f]" />
                      {p.packageName}
                    </td>
                    <td>
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded">
                        <FaCheckCircle /> Completed
                      </span>
                    </td>
                  </tr>
                ))}

                {paymentHistory.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 py-6">
                      No payments yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePackage;
