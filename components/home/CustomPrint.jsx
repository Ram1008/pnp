"use client";
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import productData from "@/constants/productData";

const CustomPrint = () => {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Get all items from all categories
  const allItems = productData.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      category: category.category,
      image: `/custom-print/${item.name
        .toLowerCase()
        .replace(/\s+/g, "-")}.png`, // Example image path
    }))
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      checkArrows();
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (direction) => {
    const scrollAmount = isMobile
      ? scrollRef1.current.offsetWidth / 3
      : scrollRef1.current.offsetWidth / 6;

    [scrollRef1.current, scrollRef2.current].forEach((ref) => {
      if (ref) {
        ref.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    });

    setTimeout(() => {
      checkArrows();
    }, 300);
  };

  const checkArrows = () => {
    if (scrollRef1.current) {
      const container = scrollRef1.current;
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.offsetWidth
      );
    }
  };

  return (
    <div className="relative">
      {/* Left Arrow - Only show on mobile */}
      {isMobile && showLeftArrow && (
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5 text-[#5d3d72]" />
        </button>
      )}

      {/* First Row */}
      <div
        ref={scrollRef1}
        onScroll={checkArrows}
        className="flex overflow-x-auto scrollbar-hide space-x-4 py-2 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {allItems.slice(0, 6).map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{
              width: isMobile ? "calc(25% - 12px)" : "calc(16.666% - 16px)",
              minWidth: isMobile ? "calc(25% - 12px)" : "calc(16.666% - 16px)",
            }}
          >
            <div className="h-[120px] w-full bg-white rounded-lg overflow-hidden">
              <div className="flex justify-center bg-[#C4BADF]">
                <img
                  src={item.image || "/custom-print/default.png"}
                  alt={""}
                  className="h-[68px] object-contain"
                  onError={(e) => {
                    e.target.src = "/custom-print/default.png"; // Fallback image
                  }}
                />
              </div>
              <div className="pt-1">
                <h4 className="text-[10px] text-black text-center leading-3.5">
                  {item.name}
                </h4>
                <p className="text-[10px] text-gray-500 text-center mt-1 leading-2">
                  {item.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row */}
      <div
        ref={scrollRef2}
        className="flex overflow-x-auto scrollbar-hide space-x-4 py-2 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {allItems.slice(6, 12).map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{
              width: isMobile ? "calc(25% - 12px)" : "calc(16.666% - 16px)",
              minWidth: isMobile ? "calc(25% - 12px)" : "calc(16.666% - 16px)",
            }}
          >
            <div className="h-[120px] w-full bg-white rounded-lg overflow-hidden">
              <div className="px-1 flex justify-center bg-[#C4BADF]">
                <img
                  src={item.image}
                  alt={""}
                  className="h-[68px] object-contain"
                  onError={(e) => {
                    e.target.src = "/custom-print/default.png"; // Fallback image
                  }}
                />
              </div>
              <div className="p-1 border-t border-gray-100">
                <h4 className="font-medium text-[10px] text-black text-center">
                  {item.name}
                </h4>
                <p className="text-[10px] text-gray-500 text-center">
                  {item.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow - Only show on mobile */}
      {isMobile && showRightArrow && (
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-100"
        >
          <ChevronRight className="w-5 h-5 text-[#5d3d72]" />
        </button>
      )}
    </div>
  );
};

export default CustomPrint;
