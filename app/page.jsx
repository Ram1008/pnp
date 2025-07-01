"use client";
import React, { useState } from "react";
import Header from "@/components/home/Header";
import FileUpload from "@/components/home/FileUpload";
import Image from "next/image";
import Stationary from "@/components/home/Stationary";
import { ChevronRight, Search, Printer, Settings } from "lucide-react";
import Link from "next/link";
import CustomPrint from "@/components/home/CustomPrint";
import CategoriesSection from "@/components/home/CategoriesSection";
import StationaryCategoriesSection from "@/components/home/StationaryCategorySection";

const Page = () => {
  const [activeTab, setActiveTab] = useState("stationary");
  const [filesPresent, setFilesPresent] = useState(false);
  const [files, setFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [printSettings, setPrintSettings] = useState({
    copies: 1,
    colorMode: "B&W",
    orientation: "Portrait",
    paperSize: "A4",
    printSide: "Single Sided",
    pageRange: "",
    collate: false,
    stapling: false,
    holePunch: false,
    bindingType: "none",
    quality: "standard",
  });

  const calculateTotal = () => {
    return files.reduce((sum, file) => sum + file.price, 0);
  };

  return (
    <div className="h-full bg-white relative">
      <Header />

      <div className="max-w-screen-lg mx-auto px-1.5 py-2">
        <section className="flex flex-col justify-center items-center bg-[#f0eef6] rounded-xl shadow-md border border-gray-200 p-3 mx-4">
          {!filesPresent && (
            <>
              <div>
                <Image
                  src="/UploadIcon.png"
                  alt="upload_logo"
                  width={120}
                  height={120}
                  className="mx-auto drop-shadow-xl drop-shadow-[#87a1c5]"
                />
              </div>
              <h2 className="text-center text-[1.30rem] font-bold text-black">
                Upload your files to print
              </h2>
              <p className="w-[75%] text-center text-gray-400 mb-2 text-[11px]">
                We support all popular formats like PDF, JPG, PNG, JPEG etc.
              </p>
            </>
          )}
          <FileUpload
            onPreviewStateChange={setFilesPresent}
            files={files}
            setFiles={setFiles}
            currentFileIndex={currentFileIndex}
            setCurrentFileIndex={setCurrentFileIndex}
            printSettings={printSettings}
            setPrintSettings={setPrintSettings}
          />
        </section>

        <section className="p-3 mt-2 mx-2">
          <div className="flex flex-col justify-between items-center mb-2">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("stationary")}
                className={`text-md font-semibold p-4 border border-gray-300 rounded-xl ${
                  activeTab === "stationary"
                    ? "bg-[#5d3d72] text-white"
                    : "text-[#5d3d72]"
                }`}
              >
                <div className="flex items-center gap-2 text-sm">
                  Stationary
                </div>
              </button>
              <button
                onClick={() => setActiveTab("customPrint")}
                className={`text-md font-semibold px-2 border border-gray-300 rounded-xl ${
                  activeTab === "customPrint"
                    ? "bg-[#5d3d72] text-white"
                    : "text-[#5d3d72]"
                }`}
              >
                <div className="flex items-center gap-2 w-[80px] text-sm">
                  {/* <Settings className="h-5 w-5" /> */}
                  Custom Print
                </div>
              </button>
            </div>
          </div>

          {activeTab === "stationary" && (
            <>
              <div className="relative w-full mt-3 flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Search events by name or game title"
                  className="w-full bg-gray-100 border border-gray-300 rounded-md pl-9 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5d3d72] focus:border-[#5d3d72] placeholder:text-gray-400"
                />
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              </div>

              <StationaryCategoriesSection />
            </>
          )}

          {activeTab === "customPrint" && (
            <>
              <div className="relative w-full mt-3 flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Search events by name or game title"
                  className="w-full bg-gray-100 border border-gray-300 rounded-md pl-9 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5d3d72] focus:border-[#5d3d72] placeholder:text-gray-400"
                />
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              </div>

              <CategoriesSection />
            </>
          )}

          {activeTab === "stationary" ? (
            <Stationary />
          ) : (
            <CustomPrint
              filesPresent={filesPresent}
              files={files}
              setFiles={setFiles}
              currentFileIndex={currentFileIndex}
              setCurrentFileIndex={setCurrentFileIndex}
              printSettings={printSettings}
              setPrintSettings={setPrintSettings}
            />
          )}
        </section>

        <div className="flex flex-col justify-center fixed bottom-4 left-[50%] translate-x-[-50%]">
          <Link
            href={"/cart"}
            onClick={() => {
              const cartData = {
                files: files,
                products: [],
                totalAmount: calculateTotal(),
              };
              localStorage.setItem("printCart", JSON.stringify(cartData));
            }}
          >
            <button
              className={`flex justify-between gap-2 items-center rounded-full font-bold text-lg shadow-md hover:scale-105 transition-all duration-300 bg-green-600 text-white hover:bg-green-700 pl-4 py-1`}
            >
              <div className="flex flex-col">
                View cart
                <div className="flex gap-1 text-xs font-medium">
                  {files.length > 0 ? (
                    <>
                      <p>Files: {files.length}</p>
                      <p>Price: ₹{calculateTotal()}</p>
                    </>
                  ) : (
                    <p className="text-gray-300 text-xs">Your cart is empty</p>
                  )}
                </div>
              </div>
              <span
                className={` w-12 h-12 flex items-center justify-center rounded-full bg-green-700`}
                style={{ alignSelf: "center" }}
              >
                <ChevronRight className="w-5 h-5 inline-block" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
