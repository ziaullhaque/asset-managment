import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaFilter, FaPrint, FaUndo } from "react-icons/fa";
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

  //  DATA FETCH
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

  //  RETURN ASSET
  const handleReturn = async (id) => {
    const result = await Swal.fire({
      title: "Return Asset?",
      text: "Are you sure you want to return this asset?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#006d6f",
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
  //  PRINT
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `My_Assets_${user?.displayName || "Report"}`,
  });

  if (isLoading) return <LoadingSpinner />;

  //  FILTER
  const filteredAssets = assets.filter((asset) => {
    const matchSearch = asset.assetName
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    const matchType =
      assetType === "all" ? true : asset.assetType === assetType;

    return matchSearch && matchType;
  });

  //  STATS
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
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[#006d6f]/30 rounded-lg focus:ring-2 focus:ring-[#006d6f]/40 bg-white"
            >
              <option value="all">All Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-Returnable">Non-Returnable</option>
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
                        className="btn btn-sm bg-[#006d6f] hover:bg-[#006d6f]/90 text-white"
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
