"use client";
import { Minus, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const CustomizePanel = ({ isOpen, onClose, file, onUpdate }) => {
  const [settings, setSettings] = useState({
    copies: 1,
    colorMode: "B&W",
    orientation: "Portrait",
    paperSize: "A4",
    printSide: "Single Sided",
    paperType: "Normal",
    binding: "None",
    collate: false,
    stapling: false,
    holePunch: false,
    pageRange: "",
  });

  useEffect(() => {
    if (file?.printSettings) {
      setSettings(file.printSettings);
    }
  }, [file]);

  const updateSettings = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (file) {
      const updatedFile = {
        ...file,
        printSettings: settings,
        price: calculatePrintPrice(file, settings),
      };
      onUpdate(file.id, updatedFile);
    }
    onClose();
  };

  const calculatePrintPrice = (file, settings) => {
    const pricePerPage = settings.colorMode === "Color" ? 10 : 3;
    let totalPages = file.pages;

    if (settings.pageRange) {
      const ranges = settings.pageRange.split(",");
      let count = 0;
      ranges.forEach((range) => {
        if (range.includes("-")) {
          const [start, end] = range.split("-").map(Number);
          count += end - start + 1;
        } else {
          count += 1;
        }
      });
      totalPages = Math.min(count, file.pages);
    }

    let price = totalPages * pricePerPage * settings.copies;

    if (settings.printSide === "Double Sided") price *= 0.8;
    if (settings.binding === "Spiral") price += 30;
    if (settings.binding === "Staple") price += 5;
    if (settings.binding === "Hard Cover") price += 100;

    return Math.round(price);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-xs backdrop-brightness-50 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Customize Print Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* <div className="border-b border-b-gray-200 py-4">
              <h2 className="text-lg font-semibold">Print settings</h2>
              <p className="text-xs text-gray-500">
                These settings will apply to this file
              </p>
            </div> */}

            <div className="space-y-6">
              {/* Copies */}
              <div className="flex justify-between border-b border-b-gray-200 py-6">
                <div>
                  <h3 className="font-semibold text-sm">
                    Choose number of copies
                  </h3>
                  <p className="text-xs text-gray-600 w-[100%]">
                    Copies of this file you want to print
                  </p>
                </div>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-9">
                  <button
                    onClick={() =>
                      updateSettings("copies", Math.max(1, settings.copies - 1))
                    }
                    className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="px-4 py-2 bg-white font-medium">
                    {settings.copies}
                  </span>
                  <button
                    onClick={() =>
                      updateSettings("copies", settings.copies + 1)
                    }
                    className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Color Mode */}
              <div className="flex border-b border-b-gray-200 pb-4">
                <div>
                  <h3 className="font-semibold text-sm">Choose print colour</h3>
                  <p className="text-xs text-gray-600 w-[90%]">
                    Save money with black & white or get color printouts
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {["B&W", "Color"].map((mode) => (
                    <div key={mode} className="flex flex-col items-center">
                      <button
                        onClick={() => updateSettings("colorMode", mode)}
                        className={`p-2 h-11 rounded-lg border-2 text-center ${
                          settings.colorMode === mode
                            ? "border-[#5d3d72] bg-green-50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="w-6 h-6 mx-auto mb-2 rounded-full bg-white border-2 border-gray-400 relative">
                          {mode === "B&W" ? (
                            <div className="absolute inset-1 rounded-full bg-black"></div>
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 rounded-full"></div>
                          )}
                        </div>
                      </button>
                      <div className="text-xs mt-1 text-gray-500">{mode}</div>
                      <div className="text-xs text-gray-500">
                        ₹{mode === "Color" ? "10" : "3"}/page
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Orientation */}
              <div className="flex justify-between border-b border-b-gray-200 py-2 mb-8">
                <div>
                  <h3 className="font-semibold text-sm">
                    Choose print orientation
                  </h3>
                  <p className="text-xs text-gray-500">
                    Direction in which a document is displayed or printed
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {["Portrait", "Landscape"].map((orientation) => (
                    <div key={orientation} className="flex flex-col items-center">
                      <button
                        onClick={() => updateSettings("orientation", orientation)}
                        className={`flex justify-center items-center p-2 rounded-lg border-2 text-center ${
                          settings.orientation === orientation
                            ? "border-[#5d3d72] bg-green-50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <div
                          className={`mx-auto border-2 border-gray-400 rounded ${
                            orientation === "Portrait"
                              ? "w-6 h-10 "
                              : "w-10 h-6 my-2"
                          }`}
                        ></div>
                      </button>
                      <div
                        className={`text-gray-500 text-xs mt-1 ${
                          settings.orientation === orientation
                            ? "text-green-600"
                            : ""
                        }`}
                      >
                        {orientation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Print Side */}
              <div className="flex justify-between gap-8 border-b border-b-gray-200 py-4">
                <div>
                  <h3 className="font-semibold text-sm">Print Side</h3>
                  <p className="text-xs text-gray-500">
                    Choose single or double sided printing
                  </p>
                </div>
                <div className="flex gap-1">
                  {["Single Sided", "Double Sided"].map((side) => (
                    <div key={side} className="text-center flex flex-col justify-between items-center">
                      <button
                        onClick={() => updateSettings("printSide", side)}
                        className={`p-1.5 w-12 h-16 gap-4 rounded-lg border-2 text-sm transition-all ${
                          settings.printSide === side
                            ? "border-[#5d3d72] bg-green-50 text-[#5d3d72]"
                            : "border-gray-300 text-gray-600"
                        }`}
                      >
                        <Image
                          src={
                            side === "Single Sided"
                              ? "/text-format-single.png"
                              : "/text-format-double.png"
                          }
                          width={40}
                          height={40}
                          alt={`${side} Icon`}
                        />
                      </button>
                      <p className="mt-1 text-xs text-gray-500">{side}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paper Size */}
              <div className="flex justify-between border-b border-b-gray-200 py-4">
                <div>
                  <h3 className="font-semibold text-sm">Paper Size</h3>
                  <p className="text-xs text-gray-500">
                    Select the paper size for your print
                  </p>
                </div>
                <div className="flex gap-2">
                  {["A4", "A5", "Letter", "Legal"].map((size) => (
                    <button
                      key={size}
                      onClick={() => updateSettings("paperSize", size)}
                      className={`px-3 py-1 rounded border text-sm ${
                        settings.paperSize === size
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
              <div className="border-b border-b-gray-200 py-4">
                <h3 className="font-semibold text-sm mb-2">Page Range</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Specify which pages to print (e.g., 1-3,5,7-9)
                </p>
                <input
                  type="text"
                  placeholder="All pages"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={settings.pageRange}
                  onChange={(e) => updateSettings("pageRange", e.target.value)}
                />
              </div>

              {/* Additional Options */}
              <div className="space-y-3 pb-6">
                <h3 className="font-semibold text-sm">Additional Options</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="collate"
                    className="mr-2"
                    checked={settings.collate}
                    onChange={(e) => updateSettings("collate", e.target.checked)}
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
                    checked={settings.stapling}
                    onChange={(e) => updateSettings("stapling", e.target.checked)}
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
                    checked={settings.holePunch}
                    onChange={(e) => updateSettings("holePunch", e.target.checked)}
                  />
                  <label htmlFor="holePunch" className="text-sm">
                    Hole Punch
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <button
              onClick={handleSave}
              className="w-full bg-green-500 text-white rounded-lg py-3 font-medium hover:bg-green-600"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizePanel;