"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Eye,
  Upload,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import productData from "@/constants/productData";
import Image from "next/image";
import Link from "next/link";
import DesignTemplateDialog from "@/components/home/DesignTemplateDialog";

const Page = ({ category = "Visiting Cards" }) => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(100);
  const [selectedCorner, setSelectedCorner] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [showMoreQuantities, setShowMoreQuantities] = useState(false);
  const [showDesignDialog, setShowDesignDialog] = useState(false);

  useEffect(() => {
    const found = productData.find((c) => c.category === category);
    const selectedCategory = found || productData[0];
    setCurrentCategory(selectedCategory);
    setSelectedItem("");
    setSelectedCorner("");
    setShowMoreQuantities(false);
  }, [category]);

  if (!currentCategory)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-[#5d3d72] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-600">Loading Item...</p>
        </div>
      </div>
    );

  // Sample design templates - replace with your actual template images
  const designTemplates = [
    {
      id: 1,
      name: "Professional Blue",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop",
      category: "Business",
    },
    {
      id: 2,
      name: "Modern Minimalist",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
      category: "Minimal",
    },
    {
      id: 3,
      name: "Creative Gradient",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop",
      category: "Creative",
    },
    {
      id: 4,
      name: "Elegant Gold",
      image:
        "https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=300&h=200&fit=crop",
      category: "Luxury",
    },
    {
      id: 5,
      name: "Corporate Style",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      category: "Corporate",
    },
    {
      id: 6,
      name: "Artistic Design",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
      category: "Artistic",
    },
  ];

  const selectedPricing =
    currentCategory.pricing?.find((p) => p.qty === selectedQuantity) ||
    currentCategory.pricing?.[0];

  return (
    <div className="max-w-9xl">
      {/* top header */}
      <div className="flex items-center mb-2 px-3 py-2 bg-[#5d3d72]">
        <Link href={"/"} className="flex items-center gap-3 text-white">
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
          <h2>Category</h2>
        </Link>
      </div>

      <div className="mx-auto px-4 py-2">
        {/* Title & Subtitle */}
        <h1 className="text-2xl font-bold text-[#5d3d72] mb-2">
          {currentCategory.category}
        </h1>
        <p className="text-gray-600 mb-4">{currentCategory.description}</p>

        {/* Select Item Dropdown */}
        <div className="mb-4">
          <div className="relative">
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white appearance-none cursor-pointer"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
            >
              <option value="">Select an item...</option>
              {currentCategory.items?.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-1 text-sm text-gray-700 mb-4">
          {currentCategory.features?.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="text-sm text-gray-600 mb-2">
          Need help in designing? You can avail of our{" "}
          <span className="text-blue-600 underline cursor-pointer">
            Design Services
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Note: Please do not print designs belonging to Government/Quasi
          Government bodies
        </div>

        {/* WhatsApp Share */}
        <div className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg mb-4 w-fit">
          <Image
            src={"/whatsapp-logo.png"}
            alt="whatsapp"
            width={40}
            height={40}
          />
          <div>
            <div className="font-medium">Share design on WhatsApp</div>
            <div className="text-xs">
              Get design support to place your order
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-2">
          Cash on Delivery available
        </div>
        <div className="text-sm text-gray-600 mb-4">
          Price below is MRP (Inclusive of all taxes)
        </div>

        <button className="text-blue-600 text-sm underline mb-4">
          See Details
        </button>

        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Eye className="w-4 h-4 mr-2" />
          <span className="underline cursor-pointer">
            View Specs & Templates
          </span>
          <span className="ml-1">to create your print-ready file.</span>
        </div>

        {/* Corners Selection */}
        {currentCategory.corners && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Corners
            </label>
            <div className="relative">
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white appearance-none cursor-pointer"
                value={selectedCorner}
                onChange={(e) => setSelectedCorner(e.target.value)}
              >
                <option value="">Select...</option>
                {currentCategory.corners.map((corner, index) => (
                  <option key={index} value={corner}>
                    {corner}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Quantity Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="space-y-2">
            {currentCategory.pricing
              ?.slice(0, showMoreQuantities ? undefined : 3)
              .map((item, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedQuantity === item.qty
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedQuantity(item.qty)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="font-medium text-lg">{item.qty}</span>
                      {item.recommended && (
                        <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        ₹{item.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        ₹{item.unit.toFixed(2)} / unit
                      </div>
                      {item.savings && (
                        <div className="text-sm text-green-600">
                          {item.savings}% savings
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* See more quantities button */}
          {!showMoreQuantities && currentCategory.pricing?.length > 3 && (
            <button
              className="mt-3 text-blue-600 text-sm underline hover:text-blue-800 transition-colors"
              onClick={() => {
                console.log("See more quantities clicked");
                setShowMoreQuantities(true);
              }}
            >
              See more quantities ({currentCategory.pricing.length - 3} more)
            </button>
          )}

          {/* Show less button when expanded */}
          {showMoreQuantities && currentCategory.pricing?.length > 3 && (
            <button
              className="mt-3 text-blue-600 text-sm underline hover:text-blue-800 transition-colors"
              onClick={() => {
                console.log("Show less quantities clicked");
                setShowMoreQuantities(false);
              }}
            >
              Show less quantities
            </button>
          )}
        </div>

        {/* Price Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold">
            {selectedQuantity} starting at ₹
            {selectedPricing?.price.toFixed(2) || "0.00"}
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <button
            className="w-full bg-[#5d3d72] text-white py-4 px-6 text-sm rounded-lg font-medium hover:bg-[#5d3d72]/90 transition-colors flex items-center justify-center"
            onClick={() => setShowDesignDialog(true)}
          >
            <Eye className="w-5 h-5 mr-2" />
            Browse designs
            <div className="ml-2 text-xs">Choose one of our templates</div>
          </button>
          <button className="w-full bg-yellow-500 text-black py-4 px-6 text-sm rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center">
            <Upload className="w-5 h-5 mr-2" />
            Upload design
            <div className="ml-2 text-xs">
              Have a design? Upload and edit it
            </div>
          </button>
        </div>

        {/* Design Templates Dialog */}
        {showDesignDialog && (
          <DesignTemplateDialog
            templates={designTemplates}
            onClose={() => setShowDesignDialog(false)}
            onSelect={(template) => {
              console.log(`Selected template: ${template.name}`);
              setShowDesignDialog(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
