"use client";
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Stationary = () => {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

    

  const stationaryItems = [
    {
      title: "Notebooks",
      pages: "172-200 pages",
      image: "/notebook.png",
    },
    {
      title: "Letterheads",
      pages: "1 page",
      image: "/notebook.png",
    },
    {
      title: "Envelopes",
      pages: "N/A",
      image: "/spiral-notebook.png",
    },
    {
      title: "Diaries",
      pages: "250-300 pages",
      image: "/spiral-notebook.png",
    },
    {
      title: "Writing Pads",
      pages: "50-100 pages",
      image: "/spiral-notebook.png",
    },
    {
      title: "Certificates",
      pages: "1 page",
      image: "/notebook.png",
    },
    {
      title: "ID Cards",
      pages: "1 card",
      image: "/notebook.png",
    },
    {
      title: "Mouse Pads",
      pages: "1 pad",
      image: "/spiral-notebook.png",
    },
    {
      title: "Address Books",
      pages: "100-150 pages",
      image: "/spiral-notebook.png",
    },
    {
      title: "Diaries",
      pages: "250-300 pages",
      image: "/spiral-notebook.png",
    },
    {
      title: "Business Cards",
      pages: "1 card",
      image: "/spiral-notebook.png",
    },
  ];


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
        className="flex overflow-x-auto scrollbar-hide space-x-4 pt-2 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {stationaryItems.slice(0, 6).map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{
              width: isMobile ? "calc(25% - 12px)" : "calc(16.666% - 16px)",
              minWidth: isMobile ? "calc(25% - 12px)" : "calc(16.666% - 16px)",
            }}
          >
            <div className="h-[120px] w-full bg-white rounded-lg overflow-hidden ">
              <div className=" flex justify-center bg-[#C4BADF]">
                <img src={item.image} alt="" className="h-[60px] object-contain" />
              </div>
              <div className="pt-1 ">
                <h4 className=" text-[10px] text-black text-center leading-3.5">
                  {item.title}
                </h4>
                <p className="text-[10px] text-gray-500 text-center mt-1 leading-2">
                  {item.pages}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row */}
      <div
        ref={scrollRef2}
        className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {stationaryItems.slice(6, 12).map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{
              width: isMobile ? "calc(25% - 12px)" : "calc(16.666% - 16px)",
              minWidth: isMobile ? "calc(25% - 12px)" : "calc(16.666% - 16px)",
            }}
          >
            <div className="h-[120px] w-full bg-white rounded-lg overflow-hidden ">
              <div className="px-1 flex justify-center bg-[#C4BADF]">
                <img src={item.image} alt="" className="h-[60px] object-contain" />
              </div>
              <div className="p-1 border-t border-gray-100">
                <h4 className="font-medium text-[10px] text-black text-center">
                  {item.title}
                </h4>
                <p className="text-[10px] text-gray-500 text-center">
                  {item.pages}
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

export default Stationary;
