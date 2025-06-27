"use client";
import React, { useRef, useState } from "react";

const CategoriesSection = () => {
  const categoriesRef = useRef(null);
  const categories = [
    "Geometry",
    "Notebooks",
    "Pens/Pencil",
    "Charts",
    "Stickers",
    "Posters",
    "Art Supplies",
    "Calculators",
  ];
  const [activeCategory, setActiveCategory] = useState(null);

  const scroll = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 120;
      categoriesRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between ">
        <h3 className="text-base font-medium">Categories</h3>
        <div
          ref={categoriesRef}
          className="flex space-x-2 ml-2 overflow-x-auto scrollbar-hide py-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <span
              key={category}
              className={`flex-shrink-0 px-3 py-0.5 rounded-[10px] text-sm border cursor-pointer ${
                activeCategory === category
                  ? "bg-[#5d3d72] text-white border-[#5d3d72]"
                  : "bg-[#f0eef6] text-[#5d3d72] border-[#5d3d72]"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="relative ">
        <div className="flex space-x-2 justify-end">
          <button
            onClick={() => scroll("left")}
            className="text-[#5d3d72] p-1 rounded-full hover:bg-[#f0eef6]"
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="text-[#5d3d72] p-1 rounded-full hover:bg-[#f0eef6]"
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
