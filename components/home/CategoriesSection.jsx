"use client";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsLeftIcon, ChevronsRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const CategoriesSection = () => {
  const categoriesRef = useRef(null);
  const categories = [
    "Visiting Cards",
    "Signs & Posters",
    "Stationary",
    "Labels & Stickers",
    "Stamps & Ink",
    "Clothing & Bags",
    "Personalised Pens",
    "Calendars",
    "Invitations",
    "Weddings",
    "Passport Photos",
  ];
  const [activeCategory, setActiveCategory] = useState(null);
  const router = useRouter();

  const scroll = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 120;
      categoriesRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleOpenCategory = () => {
    router.push("/category")
  }

  return (
    <div className="pt-2 relative">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Categories</h3>
        <div
          ref={categoriesRef}
          className="flex space-x-2 ml-2 overflow-x-auto scrollbar-hide py-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <span
              key={category}
              className={`flex-shrink-0 px-3 py-0.5 rounded-[10px] text-[10px] border cursor-pointer ${
                activeCategory === category
                  ? "bg-[#5d3d72] text-white border-[#5d3d72]"
                  : "bg-[#f0eef6] text-[#5d3d72] border-[#5d3d72]"
              }`}
              onClick={handleOpenCategory}

              // onClick={() => setActiveCategory(category)}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute top-[4px] -right-8">
        <div className="flex space-x-2 justify-end">
          {/* <button
            onClick={() => scroll("left")}
            className="text-[#5d3d72] p-1 rounded-full hover:bg-[#f0eef6]"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button> */}
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

export default CategoriesSection;
