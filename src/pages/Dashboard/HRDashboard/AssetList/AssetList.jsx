import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
// import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Upload, Package, Hash, Layers } from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { imageUpload } from "../../../../utils";


const AssetList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    isPending,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (assetData) =>
      await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/assets`,
        assetData
      ),

    onSuccess: () => {
      Swal.fire({
        title: "Asset Added Successfully!",
        icon: "success",
        confirmButtonColor: "#006d6f",
      });
      mutationReset();
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Asset",
        confirmButtonColor: "#006d6f",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const imageURL = await imageUpload(data.productImage[0]);

      const assetData = {
        productName: data.productName,
        productImage: imageURL,
        productType: data.productType,
        productQuantity: Number(data.productQuantity),
        availableQuantity: Number(data.productQuantity),
        dateAdded: new Date(),
        hrEmail: user?.email,
        companyName: user?.companyName || "Unknown",
      };

      await mutateAsync(assetData);
      reset();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        confirmButtonColor: "#006d6f",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-[#006d6f] pb-2 mb-8 flex items-center gap-2 border-b-2 border-[#006d6f]/20">
        <Package size={22} /> Add New Asset
      </h2>

      <div className="bg-white rounded-xl shadow-md border border-[#006d6f]/20 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <Hash size={18} /> Product Name{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full py-2 border-b border-gray-300 focus:border-[#006d6f] focus:outline-none"
              placeholder="Enter product name"
              {...register("productName", {
                required: "Product Name is required",
              })}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productName.message}
              </p>
            )}
          </div>

          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <Upload size={18} /> Product Image{" "}
              <span className="text-red-500">*</span>
            </label>

            <label
              htmlFor="product-image"
              className="flex items-center border-b h-12 cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4 px-2">
                <Upload size={20} className="text-gray-400" />
                <span className="text-sm text-gray-500">Choose file</span>
              </div>

              <input
                id="product-image"
                type="file"
                className="hidden"
                accept="image/*"
                {...register("productImage", {
                  required: "Product Image is required",
                })}
              />
            </label>

            {errors.productImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productImage.message}
              </p>
            )}
          </div>

          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <Layers size={18} /> Product Type{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:border-[#006d6f] focus:outline-none"
              {...register("productType", {
                required: "Product Type is required",
              })}
            >
              <option value="">Select type</option>
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-returnable</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter quantity"
              className="w-full py-2 border-b border-gray-300 focus:border-[#006d6f] focus:outline-none"
              {...register("productQuantity", {
                required: "Product Quantity is required",
                min: { value: 1, message: "Minimum quantity is 1" },
              })}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#006d6f] text-white rounded-md font-medium shadow hover:bg-[#005b5c] transition active:scale-95"
          >
            {loading || isPending ? (
              <ImSpinner9 className="animate-spin mx-auto" />
            ) : (
              "Add Asset"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssetList;
