// // import React from 'react';

// // const EmployeeList = () => {
// //     return (
// //         <div>
// //             EmployeeList
// //         </div>
// //     );
// // };

// // export default EmployeeList;
// import React from "react";
// import { Users, Plus } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import useAuth from "../../../../hooks/useAuth";

// const EmployeeList = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   // 🔹 Fetch employees
//     const { data: myEmployees = [],isLoading, refetch } = useQuery({
//       queryKey: ["my-employees", user?.email],
//       queryFn: async () => {
//         const res = await axiosSecure.get(`/my-employees/${user?.email}`);
//         return res.data;
//       },
//     });

//   // 🔹 Remove employee
//   const handleRemove = (id) => {
//     Swal.fire({
//       title: "Remove employee?",
//       text: "This employee will be removed from your team.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#006d6f",
//       confirmButtonText: "Yes, remove",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         await axiosSecure.delete(`/my-employee/${id}`);
//         refetch();
//         Swal.fire("Removed!", "Employee removed successfully.", "success");
//       }
//     });
//   };

//   if (isLoading) return <p className="text-center">Loading...</p>;

//   return (
//     <div className="max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-2xl font-bold text-[#006d6f] border-b-2 border-[#006d6f]/20 pb-1">
//           Employee List
//         </h2>

//         <div className="bg-[#006d6f] text-white px-4 py-2 rounded-md shadow text-sm">
//           {myEmployees?.currentEmployees} / {myEmployees?.packageLimit}{" "}
//           employees used
//         </div>
//       </div>

//       {/* Empty State */}
//       {myEmployees?.employees?.length === 0 ? (
//         <div className="bg-white rounded-xl shadow-lg border border-[#006d6f]/20 min-h-[400px] flex items-center justify-center p-8">
//           <div className="text-center">
//             <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
//               <Users className="w-14 h-14 text-gray-300" />
//             </div>

//             <h3 className="text-lg font-semibold text-gray-800">
//               No employees found
//             </h3>

//             <p className="text-gray-500 text-sm mt-1">
//               Add employees to manage your organization.
//             </p>

//             <button className="mt-6 bg-[#006d6f] mx-auto hover:bg-[#005b5c] text-white px-5 py-2 rounded-md flex items-center gap-2 shadow active:scale-95 transition">
//               <Plus className="w-4 h-4" />
//               Add Employee
//             </button>
//           </div>
//         </div>
//       ) : (
//         // 🔹 Employee List (same page, UI minimal add)
//         <div className="space-y-4">
//           {myEmployees.employees.map((emp) => (
//             <div
//               key={emp._id}
//               className="flex items-center justify-between bg-white p-4 rounded-lg shadow border"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={emp.profileImage}
//                   alt={emp.employeeName}
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//                 <div>
//                   <h4 className="font-semibold text-gray-800">
//                     {emp.employeeName}
//                   </h4>
//                   <p className="text-sm text-gray-500">{emp.employeeEmail}</p>
//                   <p className="text-xs text-gray-400">
//                     Joined: {new Date(emp.affiliationDate).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-6">
//                 <span className="text-sm font-medium text-[#006d6f]">
//                   Assets: {emp.assetCount}
//                 </span>

//                 <button
//                   onClick={() => handleRemove(emp._id)}
//                   className="text-red-500 hover:text-red-600 text-sm"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeList;
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUsers,
  FaSearch,
  FaEnvelope,
  FaBox,
  FaTrash,
  FaUserTie,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Plus, Trash, Trash2, Users } from "lucide-react";

const EmployeeList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: myEmployees = [], refetch } = useQuery({
    queryKey: ["my-employees", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-employees/${user?.email}`);
      return res.data;
    },
  });

  // Filter employees based on search
  const filteredEmployees = myEmployees.filter(
    (employee) =>
      employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveEmployee = async (employee) => {
    const result = await Swal.fire({
      title: "Remove Employee?",
      html: `Are you sure you want to remove <strong>${employee.name}</strong> from your team?<br><br><small class="text-red-600"> This action cannot be undone. The employee will lose access to all assigned assets.</small>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-lg",
        cancelButton: "rounded-lg",
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/my-employees/${employee.email}`);
        if (res.data.deletedCount) {
          await Swal.fire({
            title: "Removed!",
            text: `${employee.name} has been removed from your team.`,
            icon: "success",
            confirmButtonColor: "#84cc16",
            customClass: {
              popup: "rounded-2xl",
              confirmButton: "rounded-lg",
            },
          });
          refetch();
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to remove employee. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
          customClass: {
            popup: "rounded-2xl",
            confirmButton: "rounded-lg",
          },
        });
        console.error(error);
      }
    }
  };

  // Calculate total assets
  const totalAssets = myEmployees.reduce(
    (sum, emp) => sum + (emp.assetCount || 0),
    0
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#006d6f] border-b-2 border-[#006d6f]/20 pb-1">
            Employee List
          </h2>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#006d6f]/10 rounded-xl p-4 border-2 border-[#006d6f]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#006d6f] rounded-lg flex items-center justify-center">
                  <FaUsers className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    Total Employees
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myEmployees.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FaBox className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    Total Assets
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalAssets}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <FaUserTie className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    Avg Assets/Employee
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myEmployees.length > 0
                      ? (totalAssets / myEmployees.length).toFixed(1)
                      : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-[#006d6f]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006d6f]/40 outline-none transition-all"
            />
            {/* w-full  pl-10 pr-4 py-2 bg-gray-50 border border-[#006d6f]/30 rounded-lg focus:ring-2 focus:ring-[#006d6f]/40 outline-none */}
          </div>
        </div>

        {/* Employee Grid */}
        {filteredEmployees.length === 0 ? (
          <div>
            <div className="bg-white rounded-xl shadow-lg border border-[#006d6f]/20 min-h-[400px] flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Users className="w-14 h-14 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {searchTerm ? "No employees found" : "No employees yet"}
                </h3>
                <p className="text-gray-600">
                  {searchTerm
                    ? "Add employees to manage your organization."
                    : "Add employees to your team to see them here"}
                </p>

                <button className="mt-6 bg-[#006d6f] mx-auto hover:bg-[#005b5c] text-white px-5 py-2 rounded-md flex items-center gap-2 shadow active:scale-95 transition">
                  <Plus className="w-4 h-4" />
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1  gap-6">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee._id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow border border-[#006d6f]/30 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden hover:border-[#006d6f]/40 "
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        employee.image ||
                        "https://i.ibb.co.com/N2N3hH1k/icons8-user-48.png"
                      }
                      alt={employee.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {employee.name}
                      </h4>
                      <p className="text-sm text-gray-500">{employee.email}</p>
                      {/* <p className="text-xs text-gray-400">
                        Joined:{" "}
                        {new Date(
                          employee.affiliationDate
                        ).toLocaleDateString()}
                      </p> */}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-sm font-medium text-[#006d6f]">
                      Assets: {employee.assetCount || 0}
                    </span>

                    <button
                      //   onClick={() => handleRemoveEmployee(employee._id)}
                      onClick={() => handleRemoveEmployee(employee)}
                      className="btn bg-white flex cursor-pointer items-center text-red-500 hover:text-red-600 text-sm"
                    >
                      <Trash2 />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
