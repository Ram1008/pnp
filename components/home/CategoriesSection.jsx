"use client";
import { ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import CategoryDialogBox from "./CategoryDialogBox";

const CategoriesSection = () => {
  const categoriesRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [quantity, setQuantity] = useState("");

  const categories = [
    {
      name: "Visiting Cards",
      image: "/categories/visiting-cards.png",
    },
    {
      name: "Signs & Posters",
      image: "/categories/Sign-poster.png",
    },
    {
      name: "Stationary",
      image: "/categories/stationary-letterheads.png",
    },
    {
      name: "Labels & Stickers",
      image: "/categories/labels-stickers-packaging.png",
    },
    {
      name: "Stamps & Ink",
      image: "/categories/stamp-ink.png",
    },
    {
      name: "Clothing & Bags",
      image: "/categories/clothing-caps-bags.png",
    },
    {
      name: "Personalised Pens",
      image: "/categories/personalised-pens.png",
    },
    {
      name: "Calendars",
      image: "/categories/calendars.png",
    },
    {
      name: "Invitations",
      image: "/categories/invitations-announcement.png",
    },
    {
      name: "Weddings",
      image: "/categories/weddings.png",
    },
    {
      name: "Passport Photos",
      image: "/categories/passport-photos.png",
    },
  ];

  const scroll = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 120;
      categoriesRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleOpenCategory = (category) => {
    setActiveCategory(category);
    setDialogOpen(true);
  };

  const handleAddToCart = () => {
    if (!selectedImage) {
      console.error("Please upload an image first");
      return;
    }
    if (!quantity) {
      console.error("Please select a quantity");
      return;
    }

    console.log("Added to cart:", {
      image: selectedImage,
      category: activeCategory,
      quantity: quantity,
    });

    setDialogOpen(false);
    setSelectedImage(null);
    setImagePreview(null);
    setQuantity("");
  };

  const getCategoryImage = () => {
    const category = categories.find((cat) => cat.name === activeCategory);
    return category?.image || "/images/placeholder.png";
  };

  return (
    <div className="pt-2 relative">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Categories</h3>
        <div
          ref={categoriesRef}
          className="flex space-x-2 ml-2 overflow-x-auto scrollbar-hide py-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <span
              key={category.name}
              className={`flex-shrink-0 px-3 py-0.5 rounded-[10px] text-[10px] border cursor-pointer ${
                activeCategory === category.name
                  ? "bg-[#5d3d72] text-white border-[#5d3d72]"
                  : "bg-[#f0eef6] text-[#5d3d72] border-[#5d3d72]"
              }`}
              onClick={() => handleOpenCategory(category.name)}
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute top-[4px] -right-8">
        <div className="flex space-x-2 justify-end">
          <button
            onClick={() => scroll("right")}
            className="text-[#5d3d72] p-1 rounded-full"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      </div>

      <CategoryDialogBox
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        categoryImage={getCategoryImage()}
        imagePreview={imagePreview}
        clearImage={clearImage}
        handleImageUpload={handleImageUpload}
        quantity={quantity}
        setQuantity={setQuantity}
        handleAddToCart={handleAddToCart}
        selectedImage={selectedImage}
      />
    </div>
  );
};

export default CategoriesSection;
