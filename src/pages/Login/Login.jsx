import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import Swal from "sweetalert2";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [show, setShow] = useState(false);
  const { signIn, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  if (user) return <Navigate to={from} replace={true} />;
  if (loading) return <div>Loading...</div>;

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      Swal.fire({ title: "Login Successful", icon: "success" });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({ title: "Login Failed", text: err?.message, icon: "error" });
    }
  };

  return (
    <div>
      <main className="flex-grow min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white">
        {/* Glow BG */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[55%] h-[55%] bg-[#006d6f]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-[#006d6f]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#006d6f] mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500">Sign in to continue</p>
          </div>

          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute inset-y-0 left-3 top-4 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border bg-gray-100 focus:border-[#006d6f] focus:ring-2 focus:ring-[#006d6f]/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Password *
                </label>
                <div className="relative">
                  <FaLock className="absolute inset-y-0 left-3 top-4 text-gray-400" />

                  <input
                    type={show ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: 6,
                    })}
                    autoComplete="current-password"
                    id="password"
                    placeholder="•••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-lg border bg-gray-100 focus:border-[#006d6f] focus:ring-2 focus:ring-[#006d6f]/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute inset-y-0 right-3 top-2 text-gray-500"
                  >
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>

                <div className="flex justify-end mt-2">
                  <a
                    className="text-sm text-[#006d6f] hover:underline"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#006d6f] hover:bg-[#005355] text-white font-bold py-3 rounded-lg shadow-lg"
              >
                {loading ? (
                  <ImSpinner9 className="animate-spin m-auto" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-6 text-gray-500">OR</div>

            {/* Register Links */}
            <div className="space-y-3">
              <p className="text-center text-gray-600 text-sm">
                Don't have an account?
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* Join as HR */}
                <Link
                  to="/join-hr"
                  className="text-center py-3 rounded-lg font-semibold text-[#006d6f] border-2 border-[#006d6f]/40
                 bg-[#006d6f]/5 hover:bg-[#006d6f] hover:text-white    hover:shadow-lg  transition-all duration-300"
                >
                  Join as HR
                </Link>

                {/* Join as Employee */}
                <Link
                  to="/join-employee"
                  className="text-center py-3 rounded-lg font-semibold text-[#006d6f]
      border-2 border-[#006d6f]/40
      bg-[#006d6f]/5
      hover:bg-[#006d6f]
      hover:text-white
      hover:shadow-lg
      transition-all duration-300"
                >
                  Join as Employee
                </Link>
              </div>

              {/* <div className="mt-8 pt-6 border-t text-center">
                <p className="text-sm text-gray-500">
                  Don't have an account?
                  <Link
                    to="/signup"
                    className="text-[#006d6f] font-bold hover:underline ml-1"
                  >
                    Sign Up
                  </Link>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
