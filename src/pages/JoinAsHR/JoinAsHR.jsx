import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { FaEye, FaEyeSlash, FaBuilding } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils";
import useAxios from "../../hooks/useAxios";
import { Building } from "lucide-react";

const JoinHR = () => {
  const { createUser, updateUserProfile, loading } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const companyLogoFile = data.companyLogo?.[0];
    const profileImageFile = data.profileImage?.[0];

    try {
      // Upload Images
      const companyLogoURL = await imageUpload(companyLogoFile);
      const profileImageURL = await imageUpload(profileImageFile);

      // Create Firebase User
      const result = await createUser(data.email, data.password);
      console.log("HR =>", result);

      // Update Firebase Profile
      await updateUserProfile(data.name, profileImageURL);

      const payload = {
        name: data.name,
        companyName: data.companyName,
        profileImage: profileImageURL,
        companyLogo: companyLogoURL,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        role: "hr",
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
      };

      await axiosInstance.post("/users", payload);

      await Swal.fire({
        icon: "success",
        title: "Signup Successful",
        text: "HR account has been created successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Signup error:", error);

      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Email Already Exists",
          text: "This email is already registered. Please log in instead.",
        });
      } else if (error.code === "auth/weak-password") {
        Swal.fire({
          icon: "warning",
          title: "Weak Password",
          text: "Password must be at least 6 characters long.",
        });
      } else if (error.code === "auth/invalid-email") {
        Swal.fire({
          icon: "error",
          title: "Invalid Email",
          text: "Please enter a valid email address.",
        });
      } else if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text:
            error.response.data?.message || "Something went wrong on server",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: error.message || "Something went wrong, please try again",
        });
      }
    }
  };

  return (
    <main className="flex-grow min-h-screen flex flex-col justify-center py-30 px-4 sm:px-6 lg:px-8 relative">
      {/* Glow BG */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[55%] h-[55%] bg-[#006d6f]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-[#006d6f]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[550px]">
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10 border border-gray-100">
          <div className="text-center mb-6">
            <Building className="mx-auto text-4xl h-10 w-10 text-[#006d6f]" />
            <h2 className="text-3xl font-extrabold text-[#006d6f] mt-2">
              Join as HR Manager
            </h2>
            <p className="text-sm text-gray-600">
              Create your company & manage assets
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="w-full pl-3 py-2.5 border rounded-md bg-gray-100"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Profile Image *
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("profileImage", {
                  required: "Profile Image is required",
                })}
                className="w-full bg-gray-100 border border-dashed border-[#006d6f] rounded-md p-2"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                {...register("dateOfBirth", {
                  required: "Date of birth is required",
                })}
                className="w-full pl-3 py-2.5 border rounded-md bg-gray-100"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Company Name *
              </label>
              <input
                type="text"
                {...register("companyName", {
                  required: "Company name is required",
                })}
                placeholder="Company Name"
                className="w-full pl-3 py-2.5 border rounded-md bg-gray-100"
              />
            </div>

            {/* Company Logo */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Company Logo *
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("companyLogo", {
                  required: "Company logo is required",
                })}
                className="w-full bg-gray-100 border border-dashed border-[#006d6f] rounded-md p-2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold mb-2">Email *</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-3 py-2.5 border rounded-md bg-gray-100"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold mb-2">Password *</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                  placeholder="*******"
                  className="w-full pl-3 pr-10 py-2.5 border rounded-md bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#006d6f] hover:bg-[#005355] text-white py-3 rounded-md font-bold shadow"
            >
              {loading ? (
                <ImSpinner9 className="animate-spin m-auto" />
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-[#006d6f] font-semibold">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default JoinHR;
