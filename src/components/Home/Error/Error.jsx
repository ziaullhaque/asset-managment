import { useNavigate } from "react-router";
import { FaArrowLeft, FaExclamationCircle } from "react-icons/fa";

const Error = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="relative w-full  max-w-6xl mx-auto group">
        {/* Glow Border */}
        <div className="absolute -inset-1 bg-linear-to-r from-[#006d6f] to-[#009396] rounded-2xl blur-lg opacity-30 group-hover:opacity-70 transition duration-700"></div>

        {/* Card */}
        <div className="relative bg-white rounded-2xl shadow-xl p-10 text-center border border-[#006d6f]/20">
          {/* Icon */}
          <div className="mx-auto mb-5 w-16 h-16 flex items-center justify-center rounded-full bg-[#006d6f]/10 text-[#006d6f]">
            <FaExclamationCircle className="text-3xl" />
          </div>

          <h1 className="text-6xl font-extrabold text-[#006d6f] mb-3">
            404
          </h1>

          <h1 className="text-3xl font-bold text-[#03373d] mb-3">
            Something Went Wrong!
          </h1>
          <p className="text-gray-600 mb-6">
            Don't worry! Here are some helpful options to get you back on track.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-white border border-[#006d6f] text-[#006d6f] font-semibold px-5 py-2 rounded-lg hover:bg-[#f0fefe] transition"
            >
              <FaArrowLeft /> Go Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="bg-[#006d6f] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#005759] transition shadow-lg"
            >
              Take Me Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
