"use client";
import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const DesignTemplateDialog = ({ templates, onClose, onSelect }) => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const updateMaxScroll = () => {
      if (scrollRef.current) {
        setMaxScroll(
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        );
      }
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.8;
      const newPosition =
        direction === "left"
          ? Math.max(0, scrollPosition - scrollAmount)
          : Math.min(maxScroll, scrollPosition + scrollAmount);

      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleScroll("right");
    } else if (touchEnd - touchStart > 50) {
      handleScroll("left");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs backdrop-brightness-50 z-50 flex items-center justify-center p-2 md:p-4">
      {/* Fixed width for desktop - 1024px max width */}
      <div className="bg-white rounded-lg w-full max-w-[1024px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Dialog Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[#5d3d72]">
              Choose a Design Template
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Select from our professionally designed templates
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 md:p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
          </button>
        </div>

        {/* Templates Carousel */}
        <div className="relative flex-1 p-2 md:p-4">
          {/* Left Navigation Button */}
          {scrollPosition > 0 && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-1 md:p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#5d3d72]" />
            </button>
          )}

          {/* Templates Container */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex space-x-3 md:space-x-4 pb-2 md:pb-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="flex-shrink-0 w-[calc(100vw-3rem)] md:w-72 snap-start bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => onSelect(template)}
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                    <div className="absolute top-1 md:top-2 right-1 md:right-2 border border-white bg-black bg-opacity-50 text-white text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg">
                      {template.category}
                    </div>
                  </div>
                  <div className="p-2 md:p-4">
                    <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1">
                      {template.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Click to customize this design
                    </p>
                    <button className="mt-2 md:mt-3 w-full bg-[#5d3d72] text-white py-1 md:py-2 px-2 md:px-4 rounded text-xs md:text-sm hover:bg-[#5d3d72]/90 transition-colors">
                      Use This Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Navigation Button */}
          {scrollPosition < maxScroll && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-1 md:p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#5d3d72]" />
            </button>
          )}
        </div>

        {/* Dialog Footer */}
        <div className="border-t p-3 md:p-4 bg-gray-50 sticky bottom-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="text-xs md:text-sm text-gray-600">
              Need a custom design?{" "}
              <button className="text-blue-600 underline cursor-pointer">
                Contact our design team
              </button>
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs md:text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignTemplateDialog;
