// "use client";
// import React, {memo} from "react";
// import { Home, ShoppingBag, Bell, Share2 } from "lucide-react";
// import { useGlobal } from "@/context/GlobalContext";
// import UserOrders from "./UserOrders";
// import UserNotifications from "./UserNotifications";
// import ReferNEarn from "./ReferNEarn";
// import TopDrawer from "./TopDrawer";

// const Header = () => {
//   const { currentPage, setCurrentPage } = useGlobal();

//   const provideTopDrawer = () =>{
//     if(currentPage === 'Orders') return <UserOrders />
//     if(currentPage === 'Notifications') <UserNotifications/>
//     if(currentPage === 'Refer & Earn') <ReferNEarn/>
//   }

//   return (
//     <header className="sticky top-0 z-10 bg-white border-b border-gray-200 md:border-0">
//       <nav className="flex justify-around items-center p-1 sm:p-2 max-w-screen-lg mx-auto mb-1 mt-4 relative">
//         {/* Home Link */}
//         <div
//           onClick={() => setCurrentPage("Home")}
//           className="flex flex-col items-center px-1 sm:px-2 text-[10px] sm:text-xs cursor-pointer"
//         >
//           <div
//             className={`w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 flex items-center justify-center ${
//               currentPage === "Home"
//                 ? "text-[#5d3d72] fill-[#5d3d72]"
//                 : "text-gray-300"
//             }`}
//           >
//             <Home className="w-4 h-4 sm:w-5 sm:h-5 " />
//           </div>
//           <span
//             className={`text-[9px] sm:text-[10px] ${
//               currentPage === "Home"
//                 ? "text-[#5d3d72] font-medium"
//                 : "text-gray-300"
//             }`}
//           >
//             Home
//           </span>
//         </div>

//         {/* Orders Link */}
//         <div
//           onClick={() => setCurrentPage("Orders")}
//           className="flex flex-col items-center px-1 sm:px-2 text-[10px] sm:text-xs cursor-pointer"
//         >
//           <div
//             className={`w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 flex items-center justify-center ${
//               currentPage === "Orders" ? "text-[#5d3d72]" : "text-gray-500"
//             }`}
//           >
//             <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
//           </div>
//           <span
//             className={`text-[9px] sm:text-[10px] ${
//               currentPage === "Orders"
//                 ? "text-[#5d3d72] font-medium"
//                 : "text-gray-500"
//             }`}
//           >
//             Orders
//           </span>
//         </div>

//         {/* Notifications Link */}
//         <div
//           onClick={() => setCurrentPage("Notifications")}
//           className="flex flex-col items-center px-1 sm:px-2 text-[10px] sm:text-xs cursor-pointer"
//         >
//           <div
//             className={`w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 flex items-center justify-center ${
//               currentPage === "Notifications"
//                 ? "text-[#5d3d72]"
//                 : "text-gray-500"
//             }`}
//           >
//             <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
//           </div>
//           <span
//             className={`text-[9px] sm:text-[10px] ${
//               currentPage === "Notifications"
//                 ? "text-[#5d3d72] font-medium"
//                 : "text-gray-500"
//             }`}
//           >
//             Notifications
//           </span>
//         </div>

//         {/* Refer & Earn Link */}
//         <div
//           onClick={() => setCurrentPage("Refer & Earn")}
//           className="flex flex-col items-center px-1 sm:px-2 text-[10px] sm:text-xs cursor-pointer"
//         >
//           <div
//             className={`w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 flex items-center justify-center ${
//               currentPage === "Refer & Earn" ? "text-[#5d3d72]" : "text-gray-500"
//             }`}
//           >
//             <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
//           </div>
//           <span
//             className={`text-[9px] sm:text-[10px] ${
//               currentPage === "Refer & Earn"
//                 ? "text-[#5d3d72] font-medium"
//                 : "text-gray-500"
//             }`}
//           >
//             Refer &amp; Earn
//           </span>
//         </div>
//       </nav>
//       <TopDrawer
//         className=""
//         isOpen={currentPage !== "Home"}
//         onClose={() => setCurrentPage("Home")}
//       >
//         {provideTopDrawer()}
//       </TopDrawer>
//     </header>
//   );
// };

// export default memo(Header);

// Header.jsx
"use client";
import React, { memo } from "react";
import { Home, ShoppingBag, Bell, Share2, User } from "lucide-react";
import { useGlobal } from "@/context/GlobalContext";
import UserOrders from "./UserOrders";
import UserNotifications from "./UserNotifications";
import ReferNEarn from "./ReferNEarn";
import TopDrawer from "./TopDrawer";

const Header = () => {
  const { currentPage, setCurrentPage } = useGlobal();

  const provideTopDrawer = () => {
    if (currentPage === 'Orders') return <UserOrders />;
    if (currentPage === 'Notifications') return <UserNotifications />;
    if (currentPage === 'Refer & Earn') return <ReferNEarn />;
  };

  const navItems = [
    { id: 'login/signup', icon: User, label: 'Login/Signup' },
    { id: 'Orders', icon: ShoppingBag, label: 'Orders' },
    { id: 'Notifications', icon: Bell, label: 'Notifications' },
    { id: 'Refer & Earn', icon: Share2, label: 'Refer & Earn' },
  ];

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <nav className="flex justify-around items-center p-3 max-w-screen-lg mx-auto">
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className="flex flex-col items-center px-2 cursor-pointer"
          >
            <div
              className={`w-6 h-6 mb-1 mt-2 flex items-center justify-center ${
                currentPage === item.id
                  ? "border border-[#5d3d72] bg-[#5d3d72] text-white rounded-full"
                  : "text-gray-500"
              }`}
            >
              <item.icon className="w-5 h-5 " />
            </div>
            <span
              className={`text-xs ${
                currentPage === item.id
                  ? "text-[#5d3d72] font-medium"
                  : "text-gray-500"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      <TopDrawer
        isOpen={currentPage !== "Home"}
        onClose={() => setCurrentPage("Home")}
      >
        {provideTopDrawer()}
      </TopDrawer>
    </header>
  );
};

export default memo(Header);