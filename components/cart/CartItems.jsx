"use client";
import { Minus, Plus, Settings, Trash2, FileText, File } from "lucide-react";
import CustomizePanel from "@/components/cart/Customize";

export const CartItems = ({
  cart,
  customizeFile,
  setCustomizeFile,
  onIncrement,
  onDecrement,
  onRemove,
  onUpdateFile,
}) => {
  return (
    <div className="space-y-4 mb-6">
      {cart.files?.length > 0 && (
        <div className="space-y-4 relative">
          <h2 className="font-medium text-gray-700 text-lg md:text-base">
            Print Files
          </h2>
          {cart.files.map((file) => (
            <div
              key={file.id}
              className="bg-white border border-gray-200 shadow-md rounded-lg p-3 flex flex-col sm:flex-row"
            >
              <div className="w-full sm:w-20 h-40 sm:h-28 bg-[#f0eef6] flex items-center justify-center mb-3 sm:mb-0 sm:mr-3 rounded-lg overflow-hidden">
                {file.type?.includes("image") ? (
                  <img
                    src={file.preview?.content}
                    alt="Preview"
                    className="max-h-full object-contain"
                  />
                ) : file.type?.includes("pdf") ? (
                  <div className="text-center p-2">
                    <FileText className="h-8 w-8 text-red-600 mx-auto" />
                    <span className="text-xs text-gray-500">PDF</span>
                  </div>
                ) : file.type?.includes("doc") ? (
                  <div className="text-center p-2">
                    <FileText className="h-8 w-8 text-blue-600 mx-auto" />
                    <span className="text-xs text-gray-500">DOC</span>
                  </div>
                ) : (
                  <File className="h-8 w-8 text-[#5d3d72]" />
                )}
              </div>

              <div className="flex-1 relative">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 break-words">
                      {file.name || "abc.pdf"}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {file.pages} pages • {file.printSettings.paperSize}
                    </p>
                    <p className="text-xs text-gray-500">
                      {file.printSettings.colorMode} •{" "}
                      {file.printSettings.orientation} •{" "}
                      {file.printSettings.printSide}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between sm:items-center mt-3 sm:mt-4 gap-2 sm:gap-0">
                  <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden h-8 w-fit">
                    <button
                      onClick={() => onDecrement(file.id)}
                      className="px-2 py-2.5 bg-gray-200 text-gray-600 hover:bg-gray-200"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-2 min-w-[24px] text-center text-sm">
                      {file.printSettings.copies}
                    </span>
                    <button
                      onClick={() => onIncrement(file.id)}
                      className="px-2 py-2.5 bg-gray-200 text-gray-600 hover:bg-gray-200"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onRemove(file.id, "file")}
                      className="text-[#5d3d72] hover:text-gray-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCustomizeFile(file)}
                      className="text-[#5d3d72] text-sm font-medium hover:text-[#4a2f5a] flex items-center gap-1"
                    >
                      <Settings className="h-5 w-5" />
                      <span className="hidden sm:inline">Customize Print</span>
                    </button>
                  </div>
                </div>

                <p className="font-bold text-base mt-3 sm:mt-4">
                  Amount: ₹{file.price}
                </p>
              </div>
            </div>
          ))}
          <CustomizePanel
            isOpen={!!customizeFile}
            onClose={() => setCustomizeFile(null)}
            file={customizeFile}
            onUpdate={onUpdateFile}
          />
        </div>
      )}

      {cart.products?.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-medium text-gray-700">Products</h2>
          {cart.products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-300 rounded-lg p-3 flex"
            >
              <div className="w-20 h-16 bg-[#f0eef6] flex items-center justify-center mr-3 rounded-lg">
                <img
                  src={product.imageUrl}
                  alt={""}
                  className="max-h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>
                  <button
                    onClick={() => onRemove(product.id, "product")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold">₹ {product.price}</p>
                  <div className="flex items-center border border-gray-400 rounded">
                    <button
                      onClick={() => onDecrement(product.id)}
                      className="px-2 py-1 text-gray-500"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-2 min-w-[24px] text-center text-sm">
                      {product.quantity || 1}
                    </span>
                    <button
                      onClick={() => onIncrement(product.id)}
                      className="px-2 py-1 text-gray-500"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
