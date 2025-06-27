"use client";

import React from "react";
import { useGlobal } from "@/context/GlobalContext";
import Link from "next/link";

const Footer = () => {
  const { tab, setTab, cartItemCount } = useGlobal();
  return (
    <footer className="max-w-screen-lg mx-auto fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300">
      <div className="flex max-w-screen-lg mx-auto">
        <button
          className={`flex-1 py-4 text-center text-sm font-medium ${
            tab === "stationery"
              ? "text-white bg-teal-500 rounded-t-lg"
              : "text-teal-500"
          }`}
          onClick={() => setTab("stationery")}
        >
          Stationery
        </button>
        <button
          className={`flex-1 py-4 text-center text-sm font-medium ${
            tab === "custom"
              ? "text-white bg-teal-500 rounded-t-lg"
              : "text-teal-500"
          }`}
          onClick={() => setTab("custom")}
        >
          Custom Prints
        </button>
        <Link
          href={"/cart"}
          // to="/cart"
          className="relative flex-1 py-4 text-center text-sm font-medium text-teal-500"
        >
          {cartItemCount > 0 &&<div>
          <span className="absolute top-1 right-1 md:right-7 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m1-13h2a2 2 0 012 2v2a2 2 0 01-2 2h-2.5"
              />
            </svg>
            </div>}

          View Cart
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
