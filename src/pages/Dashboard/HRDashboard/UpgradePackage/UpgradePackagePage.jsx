// import { useQuery } from "@tanstack/react-query";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import Swal from "sweetalert2";
// import { FaCheck } from "react-icons/fa";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// const UpgradePackagePage = () => {
//   const axiosSecure = useAxiosSecure();
//   const [selectedPackage, setSelectedPackage] = useState(null);

//   const { data: packages = [], isLoading } = useQuery({
//     queryKey: ["packages"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/packages");
//       return res.data;
//     },
//   });

//   const { data: userData } = useQuery({
//     queryKey: ["user"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users/me");
//       return res.data;
//     },
//   });

//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold text-gradient">Upgrade Package</h1>

//       <div className="bg-base-100 p-6 rounded-xl shadow-lg mb-6">
//         <h2 className="text-xl font-semibold mb-2">Current Package</h2>
//         <p className="text-lg">
//           <span className="font-semibold">Package:</span>{" "}
//           {userData?.subscription || "Basic"}
//         </p>
//         <p className="text-lg">
//           <span className="font-semibold">Employee Limit:</span>{" "}
//           {userData?.packageLimit || 5}
//         </p>
//         <p className="text-lg">
//           <span className="font-semibold">Current Employees:</span>{" "}
//           {userData?.currentEmployees || 0}
//         </p>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6">
//         {packages.map((pkg) => (
//           <div
//             key={pkg._id}
//             className={`bg-base-100 p-6 rounded-xl shadow-lg ${
//               pkg.name === userData?.subscription
//                 ? "border-2 border-primary"
//                 : ""
//             }`}
//           >
//             <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
//             <div className="text-3xl font-bold text-gradient mb-4">
//               ${pkg.price}
//               <span className="text-lg text-base-content/70">/month</span>
//             </div>
//             <p className="text-base-content/70 mb-4">
//               Up to {pkg.employeeLimit} employees
//             </p>

//             <ul className="space-y-2 mb-6">
//               {pkg.features?.map((feature, idx) => (
//                 <li key={idx} className="flex items-center gap-2">
//                   <FaCheck className="text-primary" />
//                   <span className="text-sm">{feature}</span>
//                 </li>
//               ))}
//             </ul>

//             {pkg.name === userData?.subscription ? (
//               <button className="btn btn-outline w-full" disabled>
//                 Current Package
//               </button>
//             ) : (
//               <button
//                 onClick={() => setSelectedPackage(pkg)}
//                 className="btn btn-gradient text-white w-full"
//               >
//                 Upgrade to {pkg.name}
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {selectedPackage && (
//         <PaymentForm
//           package={selectedPackage}
//           onClose={() => setSelectedPackage(null)}
//           onSuccess={() => {
//             setSelectedPackage(null);
//             window.location.reload();
//           }}
//         />
//       )}
//     </div>
//   );
// };

// const PaymentForm = ({ package: pkg, onClose, onSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure = useAxiosSecure();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);
//     try {
//       // Create payment intent
//       const { data } = await axiosSecure.post("/create-payment-intent", {
//         packageName: pkg.name,
//       });

//       // Confirm payment
//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         data.clientSecret,
//         {
//           payment_method: {
//             card: elements.getElement(CardElement),
//           },
//         }
//       );

//       if (error) {
//         Swal.fire("Error", error.message, "error");
//       } else if (paymentIntent.status === "succeeded") {
//         // Record payment
//         await axiosSecure.post("/payments", {
//           packageName: pkg.name,
//           transactionId: paymentIntent.id,
//           paymentIntentId: paymentIntent.id,
//         });

//         Swal.fire("Success", "Package upgraded successfully!", "success");
//         onSuccess();
//       }
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || "Payment failed",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-base-100 p-8 rounded-2xl max-w-md w-full mx-4">
//         <h2 className="text-2xl font-bold mb-4">Upgrade to {pkg.name}</h2>
//         <p className="text-lg font-semibold mb-6">Total: ${pkg.price}</p>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <CardElement
//               options={{
//                 style: {
//                   base: {
//                     fontSize: "16px",
//                     color: "#424770",
//                     "::placeholder": {
//                       color: "#aab7c4",
//                     },
//                   },
//                 },
//               }}
//             />
//           </div>

//           <div className="flex gap-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="btn btn-outline flex-1"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn btn-gradient text-white flex-1"
//               disabled={loading || !stripe}
//             >
//               {loading ? "Processing..." : `Pay $${pkg.price}`}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const UpgradePackageWithStripe = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <UpgradePackage />
//     </Elements>
//   );
// };

// export default UpgradePackageWithStripe;
