// "use client"
// import React from "react";

// const TopDrawer = ({ children, isOpen, onClose }) => {
//   return (
//     <>
//       {isOpen && <div className="fixed inset-0 z-20" onClick={onClose} />}
//       <div
//         className={`absolute top-0 mt-4 left-0 sm:left-1/2 sm:transform sm:-translate-x-1/2
//           w-full  bg-[#5d3d72] text-white border border-gray-200 rounded-b-lg shadow-lg
//            z-30 h-[36vh] md:h-[42vh] overflow-y-auto transition-transform duration-300 ease-in-out
//           ${isOpen ? "translate-y-12" : "-translate-y-full"}`}
//       >
//         <div className="p-2 sm:p-3">{children}</div>
//       </div>
//     </>
//   );
// };

// export default TopDrawer;

"use client";
import React from "react";

const TopDrawer = ({ children, isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="fixed inset-0 z-20" onClick={onClose} />}
      <div
        className={`absolute top-0 mt-4 left-0 sm:left-1/2 sm:transform sm:-translate-x-1/2 
          w-full text-white border border-gray-200 rounded-b-lg shadow-lg 
           z-30 h-[36vh] md:h-[42vh] overflow-y-auto transition-transform duration-300 ease-in-out
          ${
            isOpen
              ? "translate-y-12 bg-white"
              : "-translate-y-full bg-[#5d3d72]"
          }`}
      >
        <div className="p-2 sm:p-3">{children}</div>
      </div>
    </>
  );
};

export default TopDrawer;