import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Search, Filter, Inbox, Check, X } from "lucide-react";
import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const LIMIT = 10;

const AllRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const skip = (page - 1) * LIMIT;

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-assetRequests", user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/asset-requests/${user?.email}?limit=${LIMIT}&skip=${skip}`
      );
      return res.data;
    },
  });

  const { requests = [], total = 0 } = data;
  const totalPages = Math.ceil(total / LIMIT);

  const filteredRequests = requests.filter((r) => {
    const matchSearch =
      r.requesterName?.toLowerCase().includes(search.toLowerCase()) ||
      r.assetName?.toLowerCase().includes(search.toLowerCase()) ||
      r.assetType?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "all" || r.requestStatus === status;
    return matchSearch && matchStatus;
  });

  const pending = requests.filter((r) => r.requestStatus === "pending").length;
  const approved = requests.filter(
    (r) => r.requestStatus === "approved"
  ).length;
  const rejected = requests.filter(
    (r) => r.requestStatus === "rejected"
  ).length;

  const confirmAction = async (req, nextStatus) => {
    const ok = await Swal.fire({
      title: `Confirm ${nextStatus}?`,
      html: `<b>${req.requesterName}</b> → <b>${req.assetName}</b>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: nextStatus === "approved" ? "#16a34a" : "#dc2626",
    });

    if (!ok.isConfirmed) return;

    const url =
      nextStatus === "approved"
        ? `/approve-employee-requests/${req._id}`
        : `/reject-employee-requests/${req._id}`;

    const body =
      nextStatus === "approved"
        ? { requestStatus: "approved", assetId: req.assetId }
        : { requestStatus: "rejected" };

    await axiosSecure.patch(url, body);
    Swal.fire("Success", `Request ${nextStatus}`, "success");
    refetch();
  };

  const statusBadge = (s) => {
    const base = "px-3 py-1 rounded-full text-xs font-medium";
    if (s === "pending")
      return (
        <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>
      );
    if (s === "approved")
      return (
        <span className={`${base} bg-[#006d6f]/20 text-[#006d6f]`}>
          Approved
        </span>
      );
    return <span className={`${base} bg-red-100 text-red-700`}>Rejected</span>;
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#006d6f] rounded-lg flex items-center justify-center">
          <FaClipboardList className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-[#006d6f] border-b-2 border-[#006d6f]/30 pb-1">
          All Requests
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat icon={<FaClock />} label="Pending" value={pending} />
        <Stat icon={<FaCheckCircle />} label="Approved" value={approved} />
        <Stat icon={<FaTimesCircle />} label="Rejected" value={rejected} />
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by employee / asset..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-[#006d6f]/30 rounded-lg focus:ring-2 focus:ring-[#006d6f]/40 outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg w-full bg-gray-50 border border-[#006d6f]/30 focus:ring-2 focus:ring-[#006d6f]/40 outline-none text-gray-500"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#006d6f]/20 shadow-md rounded-xl overflow-hidden">
        <table className="table table-zebra">
          <thead className="bg-[#006d6f] text-white">
            <tr>
              {["Employee", "Asset", "Type", "Date", "Status", "Actions"].map(
                (h) => (
                  <th key={h} className="px-6 py-3 text-xs uppercase text-left">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {filteredRequests.length ? (
              filteredRequests.map((req) => (
                <tr key={req._id} className="border-t">
                  <td className="px-6 py-3">{req.requesterName}</td>
                  <td className="px-6 py-3">{req.assetName}</td>
                  <td className="px-6 py-3">{req.assetType}</td>
                  <td className="px-6 py-3">
                    {new Date(req.requestDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    {statusBadge(req.requestStatus)}
                  </td>
                  <td className="px-6 py-3">
                    {req.requestStatus === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => confirmAction(req, "approved")}
                          className="btn btn-xs bg-[#006d6f] text-white"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => confirmAction(req, "rejected")}
                          className="btn btn-xs bg-red-500 text-white"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs italic text-gray-400">Done</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <Inbox className="w-14 h-14 mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">No requests found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end gap-2 p-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ icon, label, value }) => (
  <div className="rounded-xl p-4 border bg-[#006d6f]/10 border-[#006d6f]/30 flex items-center gap-3">
    <div className="w-9 h-9 bg-[#006d6f] rounded-lg flex items-center justify-center text-white">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default AllRequest;