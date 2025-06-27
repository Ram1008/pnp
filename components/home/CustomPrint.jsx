"use client";
import React from "react";
import { useRouter } from "next/navigation";

const CustomPrint = ({
  filesPresent,
  files,
  setFiles,
  currentFileIndex,
  setCurrentFileIndex,
  printSettings,
  setPrintSettings,
}) => {
  const router = useRouter();

  const handleSettingChange = (setting, value) => {
    const newSettings = {
      ...printSettings,
      [setting]: value,
    };
    setPrintSettings(newSettings);

    setFiles((prevFiles) =>
      prevFiles.map((file) => ({
        ...file,
        printSettings: { ...newSettings },
        price: calculatePrintPrice(file.pages, newSettings),
      }))
    );
  };

  const calculatePrintPrice = (pages, settings) => {
    const pricePerPage = settings.colorMode === "Color" ? 10 : 3;
    let price = pages * pricePerPage * settings.copies;

    if (settings.printSide === "Double Sided") {
      price *= 0.8;
    }

    return Math.round(price);
  };

  if (!filesPresent) {
    return (
      <div className="h-[140px] flex justify-center items-center py-4 border border-gray-200 rounded-xl shadow-sm">
        Please Upload files to see custom options
      </div>
    );
  }

  return (
    <div className="py-4 mb-2 border border-gray-200 shadow-sm px-2 rounded-xl">
      <div className="space-y-6">
        {/* Paper Size */}
        <div className="flex justify-between items-center border-b border-b-gray-200 py-4">
          <div>
            <h3 className="font-semibold text-sm">Paper Size</h3>
          </div>
          <div className="flex gap-2">
            {["A4", "A5", "Letter", "Legal"].map((size) => (
              <button
                key={size}
                onClick={() => handleSettingChange("paperSize", size)}
                className={`px-3 py-1 rounded border text-sm ${
                  printSettings.paperSize === size
                    ? "border-[#5d3d72] bg-green-50 text-[#5d3d72]"
                    : "border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Page Range */}
        <div className="flex  border-b border-b-gray-200 py-4">
          <h3 className="font-semibold text-sm mb-0">Page Range</h3>
          <input
            type="text"
            placeholder="All pages"
            value={printSettings.pageRange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            onChange={(e) => handleSettingChange("pageRange", e.target.value)}
          />
        </div>

        {/* Binding Type */}
        <div className="flex justify-between border-b border-b-gray-200 py-4">
          <div>
            <h3 className="font-semibold text-sm">Binding Type</h3>
          </div>
          <div className="flex gap-2">
            {["Stapling", "Spiral", "Perfect"].map((type) => (
              <button
                key={type}
                onClick={() =>
                  handleSettingChange("bindingType", type.toLowerCase())
                }
                className={`px-3 py-1 rounded border text-sm ${
                  printSettings.bindingType === type.toLowerCase()
                    ? "border-[#5d3d72] bg-green-50 text-[#5d3d72]"
                    : "border-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Print Quality */}
        <div className="flex justify-between border-b border-b-gray-200 py-4">
          <div>
            <h3 className="font-semibold text-sm">Print Quality</h3>
          </div>
          <div className="flex gap-2">
            {["Standard", "High", "Premium"].map((quality) => (
              <button
                key={quality}
                onClick={() =>
                  handleSettingChange("quality", quality.toLowerCase())
                }
                className={`px-3 py-1 rounded border text-sm ${
                  printSettings.quality === quality.toLowerCase()
                    ? "border-[#5d3d72] bg-green-50 text-[#5d3d72]"
                    : "border-gray-300"
                }`}
              >
                {quality}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Additional Options</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="collate"
              className="mr-2"
              checked={printSettings.collate}
              onChange={(e) => handleSettingChange("collate", e.target.checked)}
            />
            <label htmlFor="collate" className="text-sm">
              Collate copies
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="stapling"
              className="mr-2"
              checked={printSettings.stapling}
              onChange={(e) =>
                handleSettingChange("stapling", e.target.checked)
              }
            />
            <label htmlFor="stapling" className="text-sm">
              Stapling
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="holePunch"
              className="mr-2"
              checked={printSettings.holePunch}
              onChange={(e) =>
                handleSettingChange("holePunch", e.target.checked)
              }
            />
            <label htmlFor="holePunch" className="text-sm">
              Hole Punch
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPrint;
