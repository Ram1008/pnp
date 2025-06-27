"use client";
import { ChevronLeft, ChevronRight, Plus, ShieldCheck, X } from "lucide-react";
import React, { useRef, useState } from "react";

const FilesPreview = ({
  files,
  handleFileChange,
  handleSettingChange,
  printSettings,
  removeFile,
}) => {
  const fileInputRef = useRef(null);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  const currentFile = files[currentFileIndex];
  console.log(files);

  return (
    <div className="relative">
      <button
        onClick={() => setCurrentFileIndex((prev) => Math.max(0, prev - 1))}
        disabled={currentFileIndex === 0}
        className={`absolute left-0 top-25 z-10`}
      >
        <ChevronLeft className="h-8 w-8  text-gray-500" />
      </button>
      <div className="pt-4 px-2 mx-4 relative bg-[#f0eef6] flex items-center justify-between min-h-[200px]">
        {/* Current file preview */}
        <div className="p-1 h-40 relative w-full flex">
          <div className="flex-1 flex items-center justify-center">
            
            <div className="relative h-full bg-white border border-gray-200 rounded-lg p-4 overflow-hidden flex items-center justify-center">
              <button
              onClick={() => removeFile(currentFile.id)}
              className="absolute top-1 right-1 z-10 bg-gray-100 rounded-full p-1 shadow-lg hover:bg-gray-50"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
              {currentFile?.preview.type === "image" ? (
                <img
                  src={currentFile?.preview.content}
                  alt="Preview"
                  className="max-h-full w-auto mx-auto"
                />
              ) : (
                <div className="text-xs text-gray-800 whitespace-pre-line leading-relaxed h-full overflow-y-auto flex items-center justify-center text-center w-full">
                  {currentFile?.name}
                  <br />
                  {currentFile?.pages && `Pages: ${currentFile?.pages}`}
                </div>
              )}
            </div>
          </div>
          {/* File input trigger styled as a page */}
          <div
            onClick={triggerFileInput}
            className=" flex-shrink-0 flex items-center justify-center cursor-pointer"
            style={{ height: "100%", display: "flex", alignItems: "center" }}
          >
            <div className="w-20 h-38 bg-white border border-dashed border-gray-300 rounded-lg flex items-center justify-center shadow-sm hover:border-[#5d3d72] transition-all">
              <div className="flex flex-col w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                <Plus className="h-3 w-3 text-white" />
                {/* <div className="text-xs text-green-600">Add Files</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() =>
          setCurrentFileIndex((prev) => Math.min(files.length - 1, prev + 1))
        }
        disabled={currentFileIndex === files.length - 1}
        className={`absolute right-0 top-25 `}
      >
        <ChevronRight className="h-8 w-8 text-gray-500" />
      </button>

      {/* Print Settings Section */}
      <div className="">
        <div className="flex justify-center items-end gap-2">
          {/* Copies */}
          <div className="flex flex-col items-center min-w-[60px]">
            <span className="text-[10px] font-medium text-gray-600 mb-0.5">
              Copies
            </span>
            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden h-6 shadow-sm">
              <button
                onClick={() =>
                  handleSettingChange(
                    "copies",
                    Math.max(1, printSettings.copies - 1)
                  )
                }
                className="px-1 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 text-xs"
              >
                -
              </button>
              <span className="px-2 py-1 bg-white font-medium text-center text-xs">
                {printSettings.copies}
              </span>
              <button
                onClick={() =>
                  handleSettingChange("copies", printSettings.copies + 1)
                }
                className="px-1 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 text-xs"
              >
                +
              </button>
            </div>
          </div>

          {/* Color Mode */}
          <div className="flex flex-col items-center min-w-[70px]">
            <span className="text-[10px] font-medium text-gray-600 mb-0.5">
              Color
            </span>
            <div className="flex gap-1">
              {["B&W", "Color"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleSettingChange("colorMode", mode)}
                  className={`w-7 h-7 rounded-md border-2 transition-all flex items-center justify-center ${
                    printSettings.colorMode === mode
                      ? "border-[#5d3d72] bg-green-50"
                      : "border-gray-200 shadow-sm bg-white hover:border-gray-300"
                  }`}
                  title={mode}
                >
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-400 relative">
                    {mode === "B&W" ? (
                      <div className="absolute inset-0.5 rounded-full bg-black"></div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Orientation */}
          <div className="flex flex-col items-center min-w-[70px]">
            <span className="text-[10px] font-medium text-gray-600 mb-0.5">
              Orientation
            </span>
            <div className="flex gap-1">
              {["Portrait", "Landscape"].map((orientation) => (
                <button
                  key={orientation}
                  onClick={() =>
                    handleSettingChange("orientation", orientation)
                  }
                  className={`p-1 rounded-md border-2 transition-all flex flex-col items-center ${
                    printSettings.orientation === orientation
                      ? "border-[#5d3d72] bg-green-50"
                      : "border-gray-200 shadow-sm bg-white hover:border-gray-300"
                  }`}
                  title={orientation}
                >
                  <div
                    className={`border-2 border-gray-400 rounded ${
                      orientation === "Portrait" ? "w-3 h-5" : "w-5 h-3"
                    }`}
                  ></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Security Notice */}
      <div className="px-4">
        <div className="bg-blue-100 border border-blue-400 rounded-lg px-3 py-2 mt-2 flex items-center justify-center">
          <ShieldCheck className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
          <p className="text-xs text-blue-400">
            We will delete your files once delivered
          </p>
        </div>
      </div>

      {/* Hidden file input for adding more files */}
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        ref={fileInputRef}
      />
    </div>
  );
};

export default FilesPreview;
