import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Package, Loader2, SearchX } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { FaFilter } from "react-icons/fa";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Fetch assets
  // const {
  //   data: assets = [],
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["request-assets", search],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/assets?search=${search}`);
  //     return res.data;
  //   },
  // });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["request-assets", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets?search=${debouncedSearch}`);
      return res.data;
    },
  });

  // Filter assets
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.productName.toLowerCase().includes(search.toLowerCase()) ||
      asset.companyName.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      filterType === "All" || asset.productType === filterType;

    return matchesSearch && matchesType && asset.availableQuantity > 0;
  });

  // Stats
  const totalAvailable = assets.filter((a) => a.availableQuantity > 0).length;
  const returnableCount = assets.filter(
    (a) => a.availableQuantity > 0 && a.productType === "Returnable"
  ).length;
  const nonReturnableCount = assets.filter(
    (a) => a.availableQuantity > 0 && a.productType === "Non-Returnable"
  ).length;

  // Request handler
  const handleRequest = async (asset) => {
    const { value: note } = await Swal.fire({
      title: "Request Asset",
      html: `
        <p class="text-left mb-2"><strong>Asset:</strong> ${asset.productName}</p>
        <p class="text-left mb-2"><strong>Company:</strong> ${asset.companyName}</p>
        <p class="text-left mb-4"><strong>Type:</strong> ${asset.productType}</p>
      `,
      input: "textarea",
      inputPlaceholder: "Write your reason for requesting this asset...",
      showCancelButton: true,
      confirmButtonColor: "#006d6f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Submit Request",
      inputValidator: (value) => {
        if (!value) return "Request note is required";
      },
    });

    if (!note) return;

    try {
      await axiosSecure.post("/asset-requests", {
        assetId: asset._id,
        assetName: asset.productName,
        assetType: asset.productType,
        companyName: asset.companyName,
        hrEmail: asset.hrEmail,
        requesterName: user?.displayName,
        requesterEmail: user?.email,
        note,
        processedBy: asset.hrEmail,
      });

      toast.success("Asset request submitted successfully");
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit request");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Title */}
      <h2 className="text-2xl font-bold text-[#006d6f] border-b-2 border-[#006d6f]/40 inline-block">
        Request Asset
      </h2>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <StatCard title="Available Assets" value={totalAvailable} />
          <StatCard title="Returnable" value={returnableCount} color="blue" />
          <StatCard
            title="Non-Returnable"
            value={nonReturnableCount}
            color="purple"
          />
        </div>

        {/* Search & Filter */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets..."
              className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-[#006d6f]/30 rounded-lg focus:ring-2 focus:ring-[#006d6f]/40 outline-none"
            />
            <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-500" />
          </div>

          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[#006d6f]/30 rounded-lg focus:ring-2 focus:ring-[#006d6f]/40 bg-white"
            >
              <option value="All">All Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-Returnable">Non-Returnable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#006d6f]" />
        </div>
      )}

      {/* Empty */}
      {!isLoading && filteredAssets.length === 0 && (
        <div className="text-center py-24">
          <SearchX className="mx-auto w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600">No available assets found</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset._id}
            className="p-5 bg-white border border-[#006d6f]/20 rounded-xl shadow-sm hover:shadow-md"
          >
            <img
              src={asset.productImage}
              onError={(e) =>
                (e.target.src = "https://i.ibb.co.com/zT4dW396/asset.webp")
              }
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <h3 className="font-bold">{asset.productName}</h3>
            <p className="text-sm text-gray-500">{asset.companyName}</p>
            <p className="text-xs text-gray-400 mb-3">
              {asset.productType} • {asset.availableQuantity} available
            </p>

            <button
              onClick={() => handleRequest(asset)}
              className="w-full bg-[#006d6f] hover:bg-[#005457] text-white py-2.5 rounded-lg flex justify-center gap-2"
            >
              <Package size={16} /> Request Asset
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color = "gray" }) => (
  <div className={`bg-${color}-50 p-4 rounded-xl border`}>
    <p className="text-sm text-gray-600">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default RequestAsset;
