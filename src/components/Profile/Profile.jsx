import { useRef } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaEdit,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  Building2,
  Calendar,
  Camera,
  CheckCircle,
  Mail,
  User,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { role, isRoleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);

  const { data: myCompanyNames = [] } = useQuery({
    enabled: !!user?.email && role === "employee",
    queryKey: ["my-companies", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-companies/${user?.email}`);
      return res.data;
    },
  });

  const { data: userData = {} } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  console.log(userData);

  if (isRoleLoading) return <LoadingSpinner />;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;

    try {
      await updateUserProfile(name, photoURL);
      await axiosSecure.patch("/user", { name });
      toast.success("Profile updated successfully 🎉");

      // Close modal programmatically
      if (modalRef.current) {
        modalRef.current.close();
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={fade}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="shadow-xl p-8 bg-[#f5fefe] border border-[#006d6f]/20 rounded-xl mb-6"
        variants={fadeUp}
        transition={{ duration: 0.6 }}
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={
                user?.photoURL ||
                "https://i.ibb.co.com/k2WMVyqq/pngtree-portrait-of-attractive-male-doctor-png-image-14354532.png"
              }
              className="w-28 h-28 rounded-full border-4 border-[#006d6f]/20 shadow-md object-cover"
              alt="avatar"
            />
            <span className="absolute bottom-1 right-1 bg-[#006d6f] text-white p-1 rounded-full shadow">
              <Camera size={16} />
            </span>
          </div>

          <h2 className="text-2xl font-bold text-[#006d6f] mt-4 flex items-center ">
            {" "}
            {user?.displayName || "User"}
            <p className="mt-2 text-sm font-medium bg-[#006d6f]/10 text-[#006d6f] px-3 py-1 rounded-full capitalize mx-2">
              {role}
            </p>
          </h2>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          variants={fadeUp}
          transition={{ staggerChildren: 0.15 }}
        >
          <div className="bg-gray-50 p-4 rounded-lg border flex items-center gap-3">
            <FaEnvelope className="text-[#006d6f] w-5 h-5" />
            <div className="text-sm">
              <span className="font-semibold">Email :</span>{" "}
              <span className="text-gray-600">{user?.email}</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border flex items-center gap-3">
            <FaIdCard className="text-[#006d6f] w-5 h-5" />
            <div className="text-sm">
              <span className="font-semibold">User ID:</span>{" "}
              <span className="text-gray-600">
                {user?.uid?.slice(0, 20)}...
              </span>
            </div>
          </div>
        </motion.div>

        {/* Info Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          variants={fadeUp}
        >
          <div className="bg-gray-50 p-4 rounded-lg border flex items-center gap-3">
            <Calendar className="text-[#006d6f] w-5 h-5" />
            <div className="text-sm">
              <span className="font-semibold">Joined:</span>{" "}
              {/* <span className="text-gray-600">
                {user?.createdAt
                  ? new Date(user?.createdAt).toLocaleDateString()
                  : "N/A"}
              </span> */}
              <span className="text-gray-600">
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString("en-GB")
                  : "N/A"}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border flex items-center gap-3">
            <User className="text-[#006d6f] w-5 h-5" />
            <div className="text-sm">
              <span className="font-semibold">Date of Birth:</span>{" "}
              {/* <span className="text-gray-600">
                {user?.dateOfBirth || "N/A"}
              </span> */}
              <span className="text-gray-600">
                {userData?.dateOfBirth
                  ? new Date(userData.dateOfBirth).toLocaleDateString("en-GB")
                  : "N/A"}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
      {/* HR Company Information */}
      {role === "hr" && userData?.companyLogo && (
        <motion.div
          className="shadow-xl p-8 bg-[#f5fefe] border border-[#006d6f]/20 rounded-xl mb-6"
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl text-lg font-bold text-[#006d6f] mb-4">
              Company Information
            </h2>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <img
              src={
                userData?.companyLogo ||
                "https://i.ibb.co.com/k2WMVyqq/pngtree-portrait-of-attractive-male-doctor-png-image-14354532.png"
              }
              className="w-16 h-16 rounded-lg border border-[#006d6f]/20 object-cover"
              alt="company"
            />
            <div>
              {" "}
              <p className="font-semibold text-gray-700 flex items-center">
                <FaBuilding className="text-[#006d6f] " />
                <span className="font-bold px-1">Company Name : </span>{" "}
                {userData?.companyName || "Not specified"}
              </p>
              <p className=" flex items-center">
                <FaBriefcase className="text-[#006d6f] " />
                <span className="font-bold px-1">
                  Subscription Plan :{" "}
                </span>{" "}
                <span className="text-gray-500 text-sm">
                  {userData?.subscription || "Basic"}
                </span>
              </p>
              <p className=" flex items-center">
                <FaUser className="text-[#006d6f] " />
                <span className="font-bold px-1">Employee Limit : </span>{" "}
                <span className="font-bold text-sm text-gray-600">
                  {userData?.currentEmployees || 0} /{" "}
                </span>{" "}
                <span className="font-bold text-sm text-gray-600">
                  {" "}
                  {userData?.packageLimit || 5}
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Employee Company Affiliations */}
      {role === "employee" && myCompanyNames.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-5 border border-indigo-100">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-xl flex items-center justify-center shadow-md">
              <Building2 className="text-white w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Company Affiliations
            </h2>
          </div>

          {/* Company List */}
          <div className="grid grid-cols-1 gap-4">
            {myCompanyNames.map((company, index) => (
              <div
                key={index}
                className="group bg-gradient-to-r from-indigo-50 to-sky-50
                     rounded-xl p-4 border border-indigo-100
                     hover:border-indigo-400 hover:shadow-lg
                     transition-all duration-300 flex items-center gap-4"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-lg bg-indigo-500
                       flex items-center justify-center
                       group-hover:scale-110 transition"
                >
                  <Building2 className="text-white w-5 h-5" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {company.companyName}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                    <CheckCircle className="w-4 h-4" />
                    Active
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => modalRef.current?.showModal()}
        className="btn w-full text-center text-[#006d6f] border-2 border-[#006d6f]/40
                 bg-[#006d6f]/5 hover:bg-[#006d6f] hover:text-white  border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
      >
        <FaEdit />
        Update Profile
      </button>

      {/* Update Profile Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-md bg-white rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-bold text-[#006d6f]">
              Update Profile
            </h3>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-5">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                  <FaUser className="text-[#006d6f] " />
                  Full Name
                </span>
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                className="input input-bordered w-full focus:border-[#006d6f]/10 focus:outline-none focus:ring-2 focus:ring-[#006d6f] transition-all"
                name="name"
                required
              />
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                  <FaUser className="text-[#006d6f] " />
                  Photo URL
                </span>
              </label>
              <input
                type="text"
                defaultValue={user?.photoURL}
                className="input input-bordered w-full focus:border-[#006d6f]/10 focus:outline-none focus:ring-2 focus:ring-[#006d6f] transition-all"
                name="photoURL"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="btn flex-1  bg-[#006d6f]/90 hover:bg-[#006d6f] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => modalRef.current?.close()}
                className="btn flex-1 btn-outline border-2 text-[#006d6f] border-2 border-[#006d6f]/40
                 bg-[#006d6f]/5 hover:text-white hover:bg-[#006d6f]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </motion.div>
  );
};

export default Profile;
