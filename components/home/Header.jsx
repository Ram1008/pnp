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
    <header className="sticky top-0 z-20 bg-white shadow-sm">
      <nav className="h-16 flex justify-around items-center p-3 max-w-screen-lg mx-auto">
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className="flex flex-col items-center px-2 cursor-pointer"
          >
            <div
              className={`w-6 h-6 mt-4 flex items-center justify-center ${
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