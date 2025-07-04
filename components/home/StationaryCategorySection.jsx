"use client";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const StationaryCategoriesSection = () => {
  const categoriesRef = useRef(null);
  const router = useRouter();

  // Stationary-specific categories in simple string format
  const stationaryCategories = [
    "Notebooks",
    "Letterheads",
    "Envelopes",
    "Diaries",
    "Writing Pads",
    "Certificates",
    "ID Cards",
    "Mouse Pads",
  ];

  const scroll = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 120;
      categoriesRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleOpenCategory = (category) => {
    router.push(
      `/category?type=stationary&category=${encodeURIComponent(category)}`
    );
  };

  return (
    <div className="pt-2 relative">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Categories</h3>
        <div
          ref={categoriesRef}
          className="flex space-x-2 ml-2 overflow-x-auto scrollbar-hide py-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {stationaryCategories.map((category) => (
            <span
              key={category}
              className={`flex-shrink-0 px-3 py-0.5 rounded-[10px] text-[10px] border cursor-pointer bg-[#f0eef6] text-[#5d3d72] border-[#5d3d72] hover:bg-[#5d3d72] hover:text-white transition-colors`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute top-[4px] -right-8">
        <div className="flex space-x-2 justify-end">
          <button
            onClick={() => scroll("right")}
            className="text-[#5d3d72] p-1 rounded-full"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StationaryCategoriesSection;
