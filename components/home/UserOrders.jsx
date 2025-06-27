"use client"
import React from "react";
import { useGlobal } from "@/context/GlobalContext";
import Link from "next/link";

const UserOrders = () => {
  const { orders } = useGlobal();
  console.log("a : ",orders);

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className="border-b border-b-gray-300 px-2 py-3 sm:pb-2 last:border-0 text-black">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="font-medium text-sm truncate max-w-[120px] sm:max-w-none">
              {order.product}
            </span>
            <span
              className={`text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 rounded-full ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.status}
            </span>
          </div>
          <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
            {order.date || "20-06-2025"}
          </div>
          <Link
            href={`/orders/${order.id}`}
            className="text-xs text-[#5d3d72] mt-0.5 sm:mt-1 block hover:underline"
            // onClick={closeDropdown}
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
