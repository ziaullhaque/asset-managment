import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Box, FilePenLine, PackageX, Trash2, UserPlus } from "lucide-react";
import { MdEventAvailable } from "react-icons/md";

const AssetList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Assets
  const { data: allAssets = [], refetch } = useQuery({
    queryKey: ["all-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/company-assets/${user?.email}`);
      return res.data;
    },
  });

  // Employees (used in assign modal)
  const { data: myEmployees = [] } = useQuery({
    queryKey: ["my-employees", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-employees/${user?.email}`);
      return res.data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [openEditId, setOpenEditId] = useState(null);
  const [openAssignId, setOpenAssignId] = useState(null);

  const filteredAsset = allAssets.filter(
    (asset) =>
      asset.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats
  const totalAssets = allAssets.reduce(
    (sum, asset) => sum + asset.productQuantity,
    0
  );
  const availableAssets = allAssets.reduce(
    (sum, asset) => sum + asset.availableQuantity,
    0
  );

  // Handle Edit Submit
  const handleEditSubmit = async (data, asset) => {
    const assetData = {
      productName: data.productName,
      productImage: data.productImage,
      availableQuantity: data.availableQuantity,
      productQuantity: data.productQuantity,
      productType: data.productType,
    };

    try {
      const res = await axiosSecure.patch(`/assets/${asset._id}`, assetData);
      if (res.data.modifiedCount) {
        await Swal.fire({
          title: "Updated!",
          text: `${data.productName} has been updated successfully.`,
          icon: "success",
          confirmButtonColor: "#006d6f",
          customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg" },
        });
        refetch();
        setOpenEditId(null);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update asset. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg" },
      });
    }
  };

  // Handle Delete
  const handleDeleteAsset = async (asset) => {
    const result = await Swal.fire({
      title: "Delete Asset?",
      html: `Are you sure you want to delete <strong>${asset.productName}</strong>?<br><br><small class="text-red-600">This action cannot be undone.</small>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-lg",
        cancelButton: "rounded-lg",
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/asset/${asset._id}`);
        if (res.data.deletedCount) {
          await Swal.fire({
            title: "Deleted!",
            text: `${asset.productName} has been deleted.`,
            icon: "success",
            confirmButtonColor: "#006d6f",
            customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg" },
          });
          refetch();
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete asset. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
          customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg" },
        });
      }
    }
  };

  // Handle Assign
  const handleAssignToEmployee = async (asset, employee) => {
    try {
      const assignmentData = {
        assetId: asset._id,
        assetName: asset.productName,
        assetImage: asset.productImage,
        assetType: asset.productType,
        employeeEmail: employee.email,
        employeeName: employee.name,
        hrEmail: user?.email,
        companyName: asset.companyName,
        assignmentDate: new Date().toISOString(),
        returnDate: null,
        status: "assigned",
      };

      const updatedAsset = { availableQuantity: asset.availableQuantity - 1 };
      await axiosSecure.patch(`/assign-asset/${asset._id}`, updatedAsset);
      await axiosSecure.post("/assigned-assets", assignmentData);

      await Swal.fire({
        title: "Assigned!",
        text: `${asset.productName} has been assigned to ${employee.name} successfully.`,
        icon: "success",
        confirmButtonColor: "#006d6f",
        customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg" },
      });

      refetch();
      setOpenAssignId(null);
    } catch (error) {
      console.error("Assignment error:", error.response?.data?.message);
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to assign asset. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg" },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header + Stats + Search */}
      <div className="bg-[#f7fbfb] rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#006d6f] rounded-lg flex items-center justify-center">
              <Box className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl text-[#006d6f]  font-bold border-b-2 border-[#006d6f]/30 pb-1">
                Asset List
              </h1>
              <p className="text-gray-600">Manage your company assets</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#006d6f]/10 rounded-xl p-4 border-2 border-[#006d6f]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#006d6f] rounded-lg flex items-center justify-center">
                <MdEventAvailable className="text-white text-2xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  {availableAssets}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                <Box className="text-white" />
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
        </div>

        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product or company name..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#006d6f]/10 focus:outline-none focus:ring-2 focus:ring-[#006d6f] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Asset Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-[#006d6f] text-white">
              <tr>
                <th className="text-white">Product</th>
                <th className="text-white">Type</th>
                <th className="text-white">Quantity</th>
                <th className="text-white">HR Email</th>
                <th className="text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAsset.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <PackageX className="w-10 h-10  text-4xl text-gray-400" />
                      <p className="text-gray-600 font-semibold">
                        {searchTerm ? "No assets found" : "No assets yet"}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {searchTerm
                          ? "Try adjusting your search terms"
                          : "Add assets to see them here"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAsset.map((asset) => (
                  <tr key={asset._id}>
                    {/* Product */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="rounded-md h-12 w-12">
                            <img
                              src={asset.productImage}
                              alt={asset.productName}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{asset.productName}</div>
                          <div className="text-sm opacity-50">
                            Company: {asset.companyName}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* Type */}
                    <td>
                      <span
                        className={`text-xs opacity-70 badge badge-outline ${
                          asset.productType === "Returnable"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {asset.productType}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td>
                      <span className="p-1 rounded-md bg-[#006d6f]/20 border border-[#006d6f]/40">
                        {asset.availableQuantity} / {asset.productQuantity}
                      </span>
                    </td>

                    {/* HR Email */}
                    <td>
                      <span className="text-sm">{asset.hrEmail}</span>
                      <br />
                      <span className="text-xs opacity-50">
                        Added: {new Date(asset.dateAdded).toLocaleDateString()}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex gap-2">
                        {/* Edit */}
                        <button
                          onClick={() => setOpenEditId(asset._id)}
                          className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-0"
                          title="Edit Asset"
                        >
                          <FilePenLine size={16} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteAsset(asset)}
                          className="btn btn-sm bg-rose-500 hover:bg-rose-600 text-white border-0"
                          title="Delete Asset"
                        >
                          <Trash2 size={16} />
                        </button>

                        {/* Assign */}
                        <button
                          onClick={() => setOpenAssignId(asset._id)}
                          className="btn btn-sm bg-emerald-500 hover:bg-emerald-600 text-white border-0"
                          title="Assign to Employee"
                        >
                          <UserPlus size={16} />
                        </button>
                      </div>
                    </td>

                    {/* Edit Modal */}
                    {openEditId === asset._id && (
                      <EditAssetModal
                        asset={asset}
                        closeModal={() => setOpenEditId(null)}
                        handleSubmit={handleEditSubmit}
                      />
                    )}

                    {/* Assign Modal */}
                    {openAssignId === asset._id && (
                      <AssignAssetModal
                        asset={asset}
                        employees={myEmployees}
                        closeModal={() => setOpenAssignId(null)}
                        handleAssign={handleAssignToEmployee}
                      />
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Edit Asset Modal Component
const EditAssetModal = ({ asset, closeModal, handleSubmit }) => {
  const {
    register,
    handleSubmit: formSubmit,
    reset,
  } = useForm({ defaultValues: asset });

  useEffect(() => {
    reset(asset);
  }, [asset, reset]);

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-xl bg-white rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#006d6f] rounded-lg flex items-center justify-center">
            <FilePenLine size={16} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Edit Asset</h3>
        </div>

        <form
          onSubmit={formSubmit((data) => handleSubmit(data, asset))}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Product Name
              </span>
            </label>
            <input
              {...register("productName", { required: true })}
              className="input input-bordered w-full focus:border-[#006d6f] focus:ring-[#006d6f]/30 focus:outline-none focus:ring-2  transition-all"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Company
              </span>
            </label>
            <input
              readOnly
              {...register("companyName", { required: true })}
              className="input input-bordered w-full bg-gray-50"
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Image URL
              </span>
            </label>
            <input
              {...register("productImage")}
              className="input input-bordered w-full focus:border-[#006d6f] focus:ring-[#006d6f]/30 focus:outline-none focus:ring-2  transition-all"
              type="url"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Available Quantity
              </span>
            </label>
            <input
              {...register("availableQuantity", { valueAsNumber: true })}
              className="input input-bordered w-full focus:border-[#006d6f] focus:ring-[#006d6f]/30 focus:outline-none focus:ring-2  transition-all"
              type="number"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Total Quantity
              </span>
            </label>
            <input
              {...register("productQuantity", { valueAsNumber: true })}
              className="input input-bordered w-full focus:border-[#006d6f] focus:ring-[#006d6f]/30 focus:outline-none focus:ring-2  transition-all"
              type="number"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Type
              </span>
            </label>
            <select
              {...register("productType")}
              className="select select-bordered w-full focus:border-[#006d6f] focus:ring-[#006d6f]/30 focus:outline-none focus:ring-2  transition-all"
            >
              <option value="Returnable">Returnable</option>
              <option value="Non-Returnable">Non-Returnable</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                HR Email
              </span>
            </label>
            <input
              readOnly
              {...register("hrEmail")}
              className="input input-bordered w-full bg-gray-50"
              type="email"
            />
          </div>

          <div className="md:col-span-2 flex gap-3 pt-4">
            <button
              type="submit"
              className="btn flex-1 bg-[#006d6f] hover:bg-[#006d6f]/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="btn flex-1 btn-outline border-2 border-gray-300 hover:border-[#006d6f]/30 hover:bg-[#006d6f]/5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

// Assign Asset Modal Component
const AssignAssetModal = ({ asset, employees, closeModal, handleAssign }) => {
  return (
    <dialog open className="modal">
      <div className="modal-box max-w-2xl bg-white rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#006d6f] rounded-lg flex items-center justify-center">
            <UserPlus size={16} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Assign "{asset.productName}" to Employee
          </h3>
        </div>

        {employees.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No employees found in your company
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="bg-[#006d6f] text-white">
                <tr>
                  <th className="text-white">#</th>
                  <th className="text-white">Name</th>
                  <th className="text-white">Email</th>
                  <th className="text-white">Current Assets</th>
                  <th className="text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={employee.email}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-10 w-10">
                            <img
                              src={
                                employee.image ||
                                "https://via.placeholder.com/40"
                              }
                              alt={employee.name}
                            />
                          </div>
                        </div>
                        <span className="font-bold">{employee.name}</span>
                      </div>
                    </td>
                    <td>{employee.email}</td>
                    <td>
                      <span className="badge badge-sm">
                        {employee.assetCount || 0}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleAssign(asset, employee)}
                        className="btn btn-sm bg-[#006d6f]/90 hover:bg-[#006d6f] text-white border-0"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={closeModal}
            className="btn btn-outline border-2 border-gray-300 hover:border-[#006d6f]/30 hover:bg-[#006d6f]/5"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AssetList;
