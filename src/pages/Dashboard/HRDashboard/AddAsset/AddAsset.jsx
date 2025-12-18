import React from "react";
import { useForm } from "react-hook-form";
import { FaHashtag, FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../../utils";
import { Hash, Package, Upload, Mail, Boxes, Layers } from "lucide-react";

const AddAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { data: userData = {} } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    try {
      const imageFile = data.productImage[0];
      const imgURL = await imageUpload(imageFile);

      const asset = {
        productName: data.productName,
        companyName: userData?.companyName,
        productImage: imgURL,
        availableQuantity: parseInt(data.availableQuantity),
        productQuantity: parseInt(data.productQuantity),
        productType: data.productType,
        hrEmail: data.hrEmail,
        dateAdded: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/assets", asset);

      if (res.data.insertedId) {
        await Swal.fire({
          title: "Success!",
          text: `${data.productName} has been added successfully.`,
          icon: "success",
          confirmButtonColor: "#006d6f",
          customClass: {
            popup: "rounded-2xl",
            confirmButton: "rounded-lg",
          },
        });
        reset();
      }
    } catch (error) {
      console.error("Error asset:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add asset. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6">
        <div className="w-10 h-10 bg-[#006d6f] rounded-lg flex items-center justify-center">
          <Package size={24} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-[#006d6f] border-b-2 border-[#006d6f]/30 pb-1">
          Add New Asset
        </h1>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Product Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <Hash size={16} /> Product Name{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              {...register("productName", {
                required: "Product Name is required",
              })}
              className={`w-full px-2 py-2 border-b focus:outline-none focus:border-[#006d6f] ${
                errors.productName && "border-red-500"
              }`}
            />
            {errors.productName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.productName.message}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <Layers size={16} /> Company Name
            </label>
            <input
              value={userData?.companyName || ""}
              disabled
              className="w-full px-2 py-2 border-b bg-gray-50"
            />
          </div>

          {/* Product Image */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <Upload size={16} /> Product Image{" "}
              <span className="text-red-500">*</span>
            </label>

            <label
              htmlFor="product-image"
              className={`flex items-center h-12 border-b cursor-pointer hover:bg-gray-50 transition ${
                errors.productImage ? "border-red-500" : "border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3 px-2 text-gray-500">
                <Upload size={18} />
                <span className="text-sm">Choose image file</span>
              </div>

              <input
                id="product-image"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("productImage", {
                  required: "Product Image is required",
                })}
              />
            </label>

            {errors.productImage && (
              <p className="text-red-500 text-xs mt-1">
                {errors.productImage.message}
              </p>
            )}
          </div>

          {/* Available Quantity */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <Boxes size={16} /> Available Quantity
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              {...register("availableQuantity", {
                required: "Available quantity is required",
                min: { value: 0, message: "Minimum 0" },
              })}
              className={`w-full px-2 py-2 border-b focus:outline-none focus:border-[#006d6f] ${
                errors.availableQuantity && "border-red-500"
              }`}
            />
            {errors.availableQuantity && (
              <p className="text-red-500 text-xs mt-1">
                {errors.availableQuantity.message}
              </p>
            )}
          </div>

          {/* Total Quantity */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <FaHashtag /> Total Quantity
            </label>
            <input
              type="number"
              min="1"
              placeholder="0"
              {...register("productQuantity", {
                required: "Total quantity is required",
                min: { value: 1, message: "Minimum 1" },
              })}
              className={`w-full px-2 py-2 border-b focus:outline-none focus:border-[#006d6f] ${
                errors.productQuantity && "border-red-500"
              }`}
            />
            {errors.productQuantity && (
              <p className="text-red-500 text-xs mt-1">
                {errors.productQuantity.message}
              </p>
            )}
          </div>

          {/* Product Type */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <Package size={16} /> Product Type
            </label>
            <select
              {...register("productType", {
                required: "Product type is required",
              })}
              className={`w-full px-2 py-2 border-b focus:outline-none focus:border-[#006d6f] ${
                errors.productType && "border-red-500"
              }`}
            >
              <option value="">Select type</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-Returnable">Non-Returnable</option>
            </select>
            {errors.productType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.productType.message}
              </p>
            )}
          </div>

          {/* HR Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <Mail size={16} /> HR Email
            </label>
            <input
              value={user?.email || ""}
              readOnly
              {...register("hrEmail", { required: true })}
              className="w-full px-2 py-2 border-b bg-gray-50"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-[#006d6f] hover:bg-[#006d6f]/90 text-white rounded-xl flex items-center justify-center gap-2 text-lg transition disabled:bg-gray-400"
            >
              {isSubmitting ? (
                "Adding Asset..."
              ) : (
                <>
                  <FaPlusCircle /> Add Asset
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
