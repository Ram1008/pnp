"use client";
import React, { useState } from "react";
import { Printer, ChevronDown, Star, MapPin, Clock, Check } from "lucide-react";
import { useGlobal } from "@/context/GlobalContext";

const VendorSelector = () => {
  const { vendors, selectedVendor, setSelectedVendor } = useGlobal();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (vendor) => {
    setSelectedVendor(vendor);
    setIsOpen(false);
  };

  const statusClasses =
    selectedVendor?.status === "Available"
      ? "bg-green-100 text-green-800"
      : selectedVendor?.status === "Occupied"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="relative w-full">
      <div
        className="rounded-lg border-1 border-gray-300 transition-all duration-200 cursor-pointer active:shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute inset-0 opacity-0 active:opacity-100 transition-opacity duration-200" />

        <div className="relative flex items-center justify-between px-3 py-2 sm:p-4">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <div className="relative flex-shrink-0">
              <div
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: "#00B1B3" }}
              >
                <Printer className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              {selectedVendor?.verified && (
                <div
                  className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center"
                  style={{ background: "#00B1B3" }}
                >
                  <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              {!selectedVendor && <span className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                Select a vendor
              </span>}
              {selectedVendor && (
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-800 text-sm sm:text-base truncate flex-1">
                      {selectedVendor.name}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full font-medium ${statusClasses}`}
                    >
                      {selectedVendor.status}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1" />
                      <span className="truncate">{selectedVendor.address}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <ChevronDown
            className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-all duration-300 flex-shrink-0 ml-2 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            style={isOpen ? { color: "#00B1B3" } : {}}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute z-30 mt-1 sm:mt-2 w-full bg-white/95 backdrop-blur-lg border rounded-xl sm:rounded-2xl shadow-2xl max-h-72 sm:max-h-80 overflow-y-auto animate-in slide-in-from-top-2 duration-200"
          style={{ borderColor: "#00B1B320" }}
        >
          <div className="p-1 sm:p-2">
            {/* Inside the dropdown menu, replace the inner content of each mapped vendor item with: */}
            {vendors.map((vendor, index) => {
              // Determine badge color based on vendor.status
              const statusClasses =
                vendor.status === "Available"
                  ? "bg-green-100 text-green-800"
                  : vendor.status === "Occupied"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"; // for "Busy"

              return (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-lg sm:rounded-xl p-3 sm:p-4 cursor-pointer transition-all duration-200 border border-transparent active:scale-98 ${
                    selectedVendor?.name === vendor.name
                      ? "border-opacity-30"
                      : ""
                  }`}
                  onClick={() => handleSelect(vendor)}
                  style={{
                    background:
                      selectedVendor?.name === vendor.name
                        ? "#00B1B308"
                        : "transparent",
                    borderColor:
                      selectedVendor?.name === vendor.name
                        ? "#00B1B320"
                        : "transparent",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <div
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md"
                          style={{ background: "#00B1B3" }}
                        >
                          <span className="text-white font-bold text-xs sm:text-sm">
                            {vendor.name.charAt(0)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-800 text-sm sm:text-base truncate flex-1">
                            {vendor.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full font-medium ${statusClasses}`}
                          >
                            {vendor.status}
                          </span>
                        </div>

                        <div className="flex flex-col space-y-1 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1" />
                            <span className="truncate">{vendor.address}</span>
                          </div>
                          
                        </div>
                      </div>
                    </div>

                    {selectedVendor?.name === vendor.name && (
                      <div
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-2"
                        style={{ background: "#00B1B3" }}
                      >
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t border-gray-100 p-2 sm:p-3 bg-gray-50/50 rounded-b-xl sm:rounded-b-2xl">
            <p className="text-xs text-gray-500 text-center">
              Choose the best vendor for your printing needs
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorSelector;
