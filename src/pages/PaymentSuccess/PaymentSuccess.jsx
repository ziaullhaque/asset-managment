import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import { FaCheckCircle, FaCopy, FaCheck, FaTimesCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState("loading"); 
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await axiosSecure.post("/payment-success", { sessionId });
        if (res.data?.transactionId) {
          setTransactionId(res.data.transactionId);
          setStatus("success");
          toast.success("Payment verified successfully!");
        } else {
          setStatus("error");
          toast.error("Payment verification failed");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        toast.error("Payment verification failed");
      }
    };

    verifyPayment();
  }, [axiosSecure, sessionId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(transactionId);
    setCopied(true);
    toast.success("Transaction ID copied");
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === "loading") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <span className="loading loading-spinner loading-lg text-[#006d6f]" />
        <p className="text-gray-600 font-semibold">
          Confirming your payment...
        </p>
      </div>
    );
  }

  // if (status === "error") {
  //   return (
  //     <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center">
  //       <FaTimesCircle className="w-16 h-16 text-red-500" />
  //       <h2 className="text-2xl font-bold">Payment Failed</h2>
  //       <p className="text-gray-500">
  //         We couldn’t verify your payment. Please try again.
  //       </p>
  //       <Link
  //         to="/dashboard/upgrade-package"
  //         className="btn bg-[#006d6f] text-white"
  //       >
  //         Try Again
  //       </Link>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
      <FaCheckCircle className="w-20 h-20 text-green-500" />
      <h2 className="text-3xl font-bold">Payment Successful </h2>
      <p className="text-gray-600">
        Your subscription has been activated successfully.
      </p>

      {transactionId && (
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded">
          <code className="text-sm">{transactionId}</code>
          <button onClick={handleCopy}>
            {copied ? (
              <FaCheck className="text-green-600" />
            ) : (
              <FaCopy className="text-gray-600 hover:text-[#006d6f]" />
            )}
          </button>
        </div>
      )}

      <div className="flex gap-4 mt-6 flex-wrap justify-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-outline"
        >
          Dashboard
        </button>
        <Link
          to="/dashboard/upgrade-package"
          className="btn bg-[#006d6f] text-white"
        >
          Packages
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;

// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate, Link } from "react-router";
// import { FaCheckCircle, FaCopy, FaCheck, FaTimesCircle } from "react-icons/fa";
// import toast from "react-hot-toast";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();
//   const sessionId = searchParams.get("session_id");

//   const [status, setStatus] = useState("loading"); // loading | success | error
//   const [transactionId, setTransactionId] = useState("");
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     if (!sessionId) {
//       setStatus("error");
//       return;
//     }

//     const verifyPayment = async () => {
//       try {
//         const res = await axiosSecure.post("/payment-success", { sessionId });
//         if (res.data?.transactionId) {
//           setTransactionId(res.data.transactionId);
//           setStatus("success");
//           toast.success("Payment verified successfully!");
//         } else {
//           setStatus("error");
//           toast.error("Payment verification failed");
//         }
//       } catch (err) {
//         console.error(err);
//         setStatus("error");
//         toast.error("Payment verification failed");
//       }
//     };

//     verifyPayment();
//   }, [axiosSecure, sessionId]);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(transactionId);
//     setCopied(true);
//     toast.success("Transaction ID copied");
//     setTimeout(() => setCopied(false), 2000);
//   };

//   if (status === "loading") {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
//         <span className="loading loading-spinner loading-lg text-[#006d6f]" />
//         <p className="text-gray-600 font-semibold">
//           Confirming your payment...
//         </p>
//       </div>
//     );
//   }

//   if (status === "error") {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center">
//         <FaTimesCircle className="w-16 h-16 text-red-500" />
//         <h2 className="text-2xl font-bold">Payment Failed</h2>
//         <p className="text-gray-500">
//           We couldn’t verify your payment. Please try again.
//         </p>
//         <Link
//           to="/dashboard/upgrade-package"
//           className="btn bg-[#006d6f] text-white"
//         >
//           Try Again
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
//       <FaCheckCircle className="w-20 h-20 text-green-500" />
//       <h2 className="text-3xl font-bold">Payment Successful 🎉</h2>
//       <p className="text-gray-600">
//         Your subscription has been activated successfully.
//       </p>

//       {transactionId && (
//         <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded">
//           <code className="text-sm">{transactionId}</code>
//           <button onClick={handleCopy}>
//             {copied ? (
//               <FaCheck className="text-green-600" />
//             ) : (
//               <FaCopy className="text-gray-600 hover:text-[#006d6f]" />
//             )}
//           </button>
//         </div>
//       )}

//       <div className="flex gap-4 mt-6 flex-wrap justify-center">
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="btn btn-outline"
//         >
//           Dashboard
//         </button>
//         <Link
//           to="/dashboard/upgrade-package"
//           className="btn bg-[#006d6f] text-white"
//         >
//           Packages
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;