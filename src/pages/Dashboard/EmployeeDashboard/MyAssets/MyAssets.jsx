// ✅ FINAL MERGED & REPLACED PAGE (MyAssets)
// This file replaces the previous MyAsset/MyAssets pages completely

import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBox, FaSearch, FaFilter, FaPrint, FaUndo } from "react-icons/fa";
import { MdOutlineSearchOff } from "react-icons/md";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";
import { Search } from "lucide-react";

const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const printRef = useRef();

  const [searchText, setSearchText] = useState("");
  const [assetType, setAssetType] = useState("all");

  // 🔹 DATA FETCH
  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-assets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-assets/${user?.email}`);
      return res.data;
    },
  });

  // 🔹 RETURN ASSET
  const handleReturn = async (id) => {
    const result = await Swal.fire({
      title: "Return Asset?",
      text: "Are you sure you want to return this asset?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, return",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(`/assigned-assets/${id}/return`);
      if (res.data?.success) {
        Swal.fire("Returned!", "Asset returned successfully.", "success");
        refetch();
      }
    }
  };
  // 🔹 PRINT
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `My_Assets_${user?.displayName || "Report"}`,
  });

  if (isLoading) return <LoadingSpinner />;

  // 🔹 FILTER
  const filteredAssets = assets.filter((asset) => {
    const matchSearch = asset.assetName
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    const matchType =
      assetType === "all" ? true : asset.assetType === assetType;

    return matchSearch && matchType;
  });

  // 🔹 STATS
  const totalAssets = assets.length;
  const assignedAssets = assets.filter((a) => a.status === "assigned").length;

  return (
    <div className=" max-w-7xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-[#006d6f] border-b-2 border-[#006d6f]/40 inline-block">
            My Assets
          </h2>
        </div>

        <button
          onClick={handlePrint}
          className="btn bg-[#006d6f] text-white border-0"
        >
          <FaPrint className="mr-2" /> Print
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow p-6">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-[#006d6f]/20">
            <p className="text-sm text-gray-500">Total Assets</p>
            <p className="text-2xl font-bold">{totalAssets}</p>
          </div>
          <div className="bg-[#006d6f]/5 p-4 rounded-xl border border-[#006d6f]/20">
            <p className="text-sm text-gray-500">Assigned</p>
            <p className="text-2xl font-bold text-[#006d6f]">
              {assignedAssets}
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search assets..."
              className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-[#006d6f]/30 rounded-lg focus:ring-2 focus:ring-[#006d6f]/40 outline-none"
            />
            <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-500" />
          </div>

          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              // value={filterType}
              // onChange={(e) => setFilterType(e.target.value)}
              //  value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[#006d6f]/30 rounded-lg focus:ring-2 focus:ring-[#006d6f]/40 bg-white"
            >
              <option value="All">All Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="table">
          <thead className="bg-[#006d6f] text-white">
            <tr>
              <th>Image</th>
              <th>Asset</th>
              <th>Type</th>
              <th>Company</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.map((asset) => (
              <tr key={asset._id} className="hover">
                <td>
                  <img
                    src={asset.assetImage}
                    alt={asset.assetName}
                    className="w-14 h-14 rounded object-cover"
                  />
                </td>
                <td className="font-semibold">{asset.assetName}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      asset.assetType === "Returnable"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {asset.assetType}
                  </span>
                </td>
                <td>{asset.companyName}</td>
                <td>{new Date(asset.assignmentDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      asset.status === "assigned"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {asset.status}
                  </span>
                </td>
                <td className="text-center">
                  {asset.status === "assigned" &&
                    asset.assetType === "Returnable" && (
                      <button
                        onClick={() => handleReturn(asset._id)}
                        className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                      >
                        <FaUndo className="mr-1" /> Return
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY */}
        {filteredAssets.length === 0 && (
          <div className="flex flex-col items-center py-20 text-gray-500">
            <MdOutlineSearchOff className="text-5xl mb-3" />
            <p>No assets found</p>
          </div>
        )}
      </div>

      {/* PRINT */}
      <div className="hidden">
        <div ref={printRef} className="p-8">
          <h1 className="text-2xl font-bold mb-4">My Asset Report</h1>
          <p>Name: {user?.displayName}</p>
          <p>Email: {user?.email}</p>
          <hr className="my-4" />
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Asset</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Company</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a._id}>
                  <td className="border p-2">{a.assetName}</td>
                  <td className="border p-2">{a.assetType}</td>
                  <td className="border p-2">{a.companyName}</td>
                  <td className="border p-2">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAssets;

// // import React from "react";

// // const MyAssets = () => {
// //   return <div>MyAssets MyAssets</div>;
// // };

// // export default MyAssets;
// import React, { useState, useRef } from "react";
// import { useQuery } from "@tanstack/react-query";
// import {
//   FaBox,
//   FaSearch,
//   FaFilter,
//   FaPrint,
//   FaUndo,
//   FaCheckCircle,
// } from "react-icons/fa";
// import { useReactToPrint } from "react-to-print";
// import useAuth from "../../../../hooks/useAuth";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";

// const MyAssets = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("All");
//   const printRef = useRef();

//   const { data: myAssets = [], isLoading } = useQuery({
//     queryKey: ["my-assets", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/my-assets/${user?.email}`);
//       return res.data;
//     },
//   });

//   // Filter assets based on search and type
//   const filteredAssets = myAssets.filter((asset) => {
//     const matchesSearch = asset.assetName
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesType = filterType === "All" || asset.assetType === filterType;
//     return matchesSearch && matchesType;
//   });

//   // Calculate stats
//   const totalAssets = myAssets.length;
//   const assignedAssets = myAssets.filter((a) => a.status === "assigned").length;

//   // Print handler
//   const handlePrint = useReactToPrint({
//     contentRef: printRef,
//     documentTitle: `My_Assets_${user?.displayName || "Report"}`,
//   });

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header Section */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center">
//               <FaBox className="text-white text-xl" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">My Assets</h1>
//               <p className="text-gray-600">View and manage your assets</p>
//             </div>
//           </div>
//           <button
//             onClick={handlePrint}
//             className="btn bg-linear-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white border-0"
//           >
//             <FaPrint className="mr-2" />
//             Print Report
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
//                 <FaBox className="text-white" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 font-semibold">
//                   Total Assets
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {totalAssets}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
//                 <FaCheckCircle className="text-white" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 font-semibold">Assigned</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {assignedAssets}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filter */}
//         <div className="grid md:grid-cols-2 gap-4">
//           <div className="relative">
//             <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by asset name..."
//               className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="relative">
//             <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <select
//               className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all appearance-none bg-white"
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//             >
//               <option value="All">All Types</option>
//               <option value="Returnable">Returnable</option>
//               <option value="Non-returnable">Non-returnable</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="table table-zebra">
//             <thead className="bg-lime-500 text-white">
//               <tr>
//                 <th className="text-white">Asset Image</th>
//                 <th className="text-white">Asset Name</th>
//                 <th className="text-white">Type</th>
//                 <th className="text-white">Company</th>
//                 <th className="text-white">Request Date</th>
//                 <th className="text-white">Approval Date</th>
//                 <th className="text-white">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredAssets.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="text-center py-12">
//                     <div className="flex flex-col items-center gap-3">
//                       <FaBox className="text-gray-400 text-4xl" />
//                       <p className="text-gray-600 font-semibold">
//                         {searchTerm || filterType !== "All"
//                           ? "No assets found"
//                           : "No assets assigned yet"}
//                       </p>
//                       <p className="text-gray-500 text-sm">
//                         {searchTerm || filterType !== "All"
//                           ? "Try adjusting your search or filter"
//                           : "Request assets to see them here"}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredAssets.map((asset) => (
//                   <tr key={asset._id}>
//                     <td>
//                       <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
//                         <img
//                           src={asset.assetImage}
//                           alt={asset.assetName}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.src =
//                               "https://i.ibb.co.com/zWDrGvkn/a7ae73fd-a6cc-463f-91a6-49ed7ed143be.jpg";
//                           }}
//                         />
//                       </div>
//                     </td>
//                     <td>
//                       <p className="font-semibold text-gray-900">
//                         {asset.assetName}
//                       </p>
//                     </td>
//                     <td>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           asset.assetType === "Returnable"
//                             ? "bg-blue-100 text-blue-700"
//                             : "bg-purple-100 text-purple-700"
//                         }`}
//                       >
//                         {asset.assetType}
//                       </span>
//                     </td>
//                     <td>
//                       <p className="text-gray-700">{asset.companyName}</p>
//                     </td>
//                     <td>
//                       <p className="text-gray-600">
//                         {formatDate(asset.assignmentDate)}
//                       </p>
//                     </td>
//                     <td>
//                       <p className="text-gray-600">
//                         {formatDate(asset.assignmentDate)}
//                       </p>
//                     </td>
//                     <td>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           asset.status === "assigned"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-gray-100 text-gray-700"
//                         }`}
//                       >
//                         {asset.status === "assigned" ? "Assigned" : "Returned"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Hidden Print Component */}
//       <div className="hidden">
//         <div ref={printRef} className="p-8 bg-white">
//           {/* Print Header */}
//           <div className="text-center mb-8 border-b-2 border-lime-500 pb-6">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Asset Report
//             </h1>
//             <p className="text-lg text-gray-700">
//               Employee: {user?.displayName || "N/A"}
//             </p>
//             <p className="text-sm text-gray-600">
//               Email: {user?.email || "N/A"}
//             </p>
//             <p className="text-sm text-gray-600">
//               Report Generated: {new Date().toLocaleDateString()}
//             </p>
//           </div>

//           {/* Print Stats */}
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <div className="text-center p-4 bg-gray-50 rounded-lg">
//               <p className="text-sm text-gray-600 font-semibold">
//                 Total Assets
//               </p>
//               <p className="text-2xl font-bold text-gray-900">{totalAssets}</p>
//             </div>
//             <div className="text-center p-4 bg-green-50 rounded-lg">
//               <p className="text-sm text-gray-600 font-semibold">Assigned</p>
//               <p className="text-2xl font-bold text-green-700">
//                 {assignedAssets}
//               </p>
//             </div>
//           </div>

//           {/* Print Table */}
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-lime-500 text-white">
//                 <th className="border border-gray-300 p-2 text-left">
//                   Asset Name
//                 </th>
//                 <th className="border border-gray-300 p-2 text-left">Type</th>
//                 <th className="border border-gray-300 p-2 text-left">
//                   Company
//                 </th>
//                 <th className="border border-gray-300 p-2 text-left">
//                   Approval Date
//                 </th>
//                 <th className="border border-gray-300 p-2 text-left">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {myAssets.map((asset, index) => (
//                 <tr
//                   key={asset._id}
//                   className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                 >
//                   <td className="border border-gray-300 p-2">
//                     {asset.assetName}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     {asset.assetType}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     {asset.companyName}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     {formatDate(asset.assignmentDate)}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     {asset.status === "assigned" ? "Assigned" : "Returned"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Print Footer */}
//           <div className="mt-8 pt-6 border-t-2 border-gray-300 text-center text-sm text-gray-600">
//             <p>This is an official asset report generated by AssetVerse</p>
//             <p className="mt-2">
//               © {new Date().getFullYear()} AssetVerse. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyAssets;
