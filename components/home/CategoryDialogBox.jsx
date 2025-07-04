// components/CategoryDialogBox.js
import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import React from "react";

const CategoryDialogBox = ({
  dialogOpen,
  setDialogOpen,
  categoryImage,
  imagePreview,
  clearImage,
  handleImageUpload,
  quantity,
  setQuantity,
  handleAddToCart,
  selectedImage,
}) => {
  if (!dialogOpen) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50 backdrop-brightness-50 px-3">
      <div className="absolute top-[20%] bg-[#f4f4f4] rounded-2xl py-3 w-[335px]  px-8 mx-3">
        <button
          onClick={() => setDialogOpen(false)}
          className="absolute top-2 right-2 bg-[#5d3d72] p-0.5 rounded-full text-gray-100 hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image Preview Section */}
        <div className="mb-6 mt-1">
          <div className="rounded-lg flex flex-col items-center justify-center">
            {imagePreview ? (
              <div className="relative w-full">
                <img
                  src={imagePreview}
                  alt="Uploaded preview"
                  className="w-full h-48 object-contain"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </div>
            ) : (
              <div className="text-center py-0">
                {categoryImage && (
                  <Image
                    src={categoryImage}
                    alt="Category"
                    width={300}
                    height={100}
                    className="w-full h-40 object-fit rounded-xl"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* File Upload Field */}
        <div className="mb-6 p-1">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              id="design-upload"
            />
            <label
              htmlFor="design-upload"
              className="flex justify-center flex-col items-center w-full px-4 py-3 border-2 border-green-700 rounded-xl text-sm text-green-700 font-semibold hover:bg-green-50 cursor-pointer text-center transition-colors"
            >
                <Image src="/upload.png" alt="Upload" width={50} height={50} />
              <p className="mt-2 w-20">Upload your Design</p>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="relative flex-1">
            <select
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="appearance-none border border-[#5d3d72] w-full px-4 py-2.5 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5d3d72] focus:border-[#5d3d72] transition-all cursor-pointer"
            >
              <option value="" disabled className="text-gray-400">
                Select Quantity
              </option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num} className="text-gray-700">
                  {num} {num === 1 ? "item" : "items"}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedImage || !quantity}
            className={`w-22 px-2 py-0.5 rounded-lg font-semibold text-white transition-all bg-green-700 hover:bg-green-800`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDialogBox;
