"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartItems } from "@/components/cart/CartItems";

const CartPage = () => {
  const router = useRouter();
  const [cart, setCart] = useState({
    files: [],
    products: [],
    totalAmount: 0,
  });
  const [customizeFile, setCustomizeFile] = useState(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    const loadCart = () => {
      const savedCart = localStorage.getItem("printCart");
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart);

          if (!cartData.files || cartData.files.length === 0) {
            const uploadedFiles = localStorage.getItem("uploadedFiles");
            if (uploadedFiles) {
              const parsedFiles = JSON.parse(uploadedFiles);
              cartData.files = parsedFiles.map((file, index) => ({
                id: Date.now() + index,
                name: file.name,
                type: file.type,
                size: file.size,
                pages: getEstimatedPages(file.type, file.size),
                preview: getFilePreview(file.type, file.name),
                printSettings: {
                  copies: 1,
                  colorMode: "B&W",
                  orientation: "Portrait",
                  paperSize: "A4",
                  printSide: "Single Sided",
                },
                price: calculatePrintPrice(
                  getEstimatedPages(file.type, file.size),
                  {
                    copies: 1,
                    colorMode: "B&W",
                    orientation: "Portrait",
                    paperSize: "A4",
                    printSide: "Single Sided",
                  }
                ),
              }));
            }
          }

          // Ensure products have proper structure
          const validatedProducts = (cartData.products || []).map(
            (product) => ({
              ...product,
              id: product.id || Date.now() + Math.random(),
              price: product.price || 100, // default price if not set
              quantity: product.quantity || 1,
              preview: product.preview || {
                type: "image",
                content: "Product Image",
              },
            })
          );

          setCart({
            files: cartData.files || [],
            products: validatedProducts,
            totalAmount:
              cartData.totalAmount ||
              calculateTotalAmount(cartData.files || [], validatedProducts),
          });
        } catch (error) {
          console.error("Error parsing cart data:", error);
        }
      }
    };
    loadCart();

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getEstimatedPages = (fileType, fileSize) => {
    if (fileType?.includes("pdf"))
      return Math.max(1, Math.ceil(fileSize / 100000));
    if (fileType?.includes("image")) return 1;
    if (fileType?.includes("doc"))
      return Math.max(1, Math.ceil(fileSize / 50000));
    return 2;
  };

  const getFilePreview = (fileType, fileName) => {
    if (fileType?.includes("pdf"))
      return { type: "pdf", content: "PDF file uploaded." };
    if (fileType?.includes("image"))
      return { type: "image", content: "Image Preview" };
    if (fileType?.includes("doc"))
      return { type: "document", content: "Document Preview" };
    return { type: "unknown", content: "File Preview" };
  };

  const calculatePrintPrice = (pages, settings) => {
    const pricePerPage = settings.colorMode === "Color" ? 10 : 3;
    let price = pages * pricePerPage * settings.copies;
    if (settings.printSide === "Double Sided") price *= 0.8;
    return Math.round(price);
  };

  const calculateTotalAmount = (files, products) => {
    return (
      files.reduce((sum, file) => sum + file.price, 0) +
      products.reduce(
        (sum, product) => sum + product.price * (product.quantity || 1),
        0
      )
    );
  };

  const updateFileInCart = (fileId, updatedFile) => {
    setCart((prevCart) => {
      const updatedFiles = prevCart.files.map((file) =>
        file.id === fileId ? updatedFile : file
      );
      const totalAmount = calculateTotalAmount(updatedFiles, prevCart.products);
      const updatedCart = { ...prevCart, files: updatedFiles, totalAmount };
      localStorage.setItem("printCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleIncrementQuantity = (fileId) => {
    setCart((prevCart) => {
      const updatedFiles = prevCart.files.map((file) => {
        if (file.id === fileId) {
          const newCopies = file.printSettings.copies + 1;
          return {
            ...file,
            printSettings: { ...file.printSettings, copies: newCopies },
            price: calculatePrintPrice(file.pages, {
              ...file.printSettings,
              copies: newCopies,
            }),
          };
        }
        return file;
      });
      const updatedCart = {
        ...prevCart,
        files: updatedFiles,
        totalAmount: calculateTotalAmount(updatedFiles, prevCart.products),
      };
      localStorage.setItem("printCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleProductIncrementQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedProducts = prevCart.products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: (product.quantity || 1) + 1,
          };
        }
        return product;
      });
      const updatedCart = {
        ...prevCart,
        products: updatedProducts,
        totalAmount: calculateTotalAmount(prevCart.files, updatedProducts),
      };
      localStorage.setItem("printCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleDecrementQuantity = (fileId) => {
    setCart((prevCart) => {
      const updatedFiles = prevCart.files.map((file) => {
        if (file.id === fileId && file.printSettings.copies > 1) {
          const newCopies = file.printSettings.copies - 1;
          return {
            ...file,
            printSettings: { ...file.printSettings, copies: newCopies },
            price: calculatePrintPrice(file.pages, {
              ...file.printSettings,
              copies: newCopies,
            }),
          };
        }
        return file;
      });
      const updatedCart = {
        ...prevCart,
        files: updatedFiles,
        totalAmount: calculateTotalAmount(updatedFiles, prevCart.products),
      };
      localStorage.setItem("printCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleProductDecrementQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedProducts = prevCart.products.map((product) => {
        if (product.id === productId && (product.quantity || 1) > 1) {
          return {
            ...product,
            quantity: (product.quantity || 1) - 1,
          };
        }
        return product;
      });
      const updatedCart = {
        ...prevCart,
        products: updatedProducts,
        totalAmount: calculateTotalAmount(prevCart.files, updatedProducts),
      };
      localStorage.setItem("printCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveItem = (id, type) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        files:
          type === "file"
            ? prevCart.files.filter((file) => file.id !== id)
            : prevCart.files,
        products:
          type === "product"
            ? prevCart.products.filter((product) => product.id !== id)
            : prevCart.products,
      };
      updatedCart.totalAmount = calculateTotalAmount(
        updatedCart.files,
        updatedCart.products
      );
      localStorage.setItem("printCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRazorpayPayment = () => {
    if (!razorpayLoaded || paymentLoading) return;
    setPaymentLoading(true);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "rzp_test_YOUR_TEST_KEY",
      amount: (cart.totalAmount + 40) * 100,
      currency: "INR",
      name: "Print N Parcel",
      description: `Order for ${cart.files.length} files and ${cart.products.length} products`,
      image: "/logo.png",
      handler: (response) => {
        alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
        localStorage.removeItem("printCart");
        router.push("/order-success");
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9876543210",
      },
      notes: { orderType: "print_order" },
      theme: { color: "#5d3d72" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      setPaymentLoading(false);
      alert(`Payment failed: ${response.error.description}`);
      console.error("Payment error:", response.error);
    });
    rzp.open();
  };

  const renderEmptyCart = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="border border-gray-200 rounded-full w-20 h-20 text-gray-400 mb-4 flex items-center justify-center">
        <ShoppingBag className="w-8 h-8" />
      </div>
      <p className="text-gray-600 mb-4">Your cart is empty</p>
      <Link
        href="/"
        className="bg-[#5d3d72] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#4a2f5a] transition-colors"
      >
        Upload Files
      </Link>
    </div>
  );

  if (!cart?.files?.length && !cart?.products?.length) {
    return (
      <div className="pb-16 max-w-screen-lg mx-auto">
        <div className="sticky top-0 bg-[#5d3d72] border-b border-gray-400 z-10 px-4 py-3 flex items-center">
          <Link href={"/"} className="mr-3">
            <ArrowLeft className="h-5 w-5 text-white" />
          </Link>
          <h1 className="text-lg font-medium text-white">Your Cart</h1>
        </div>
        <div className="p-4">{renderEmptyCart()}</div>
      </div>
    );
  }

  return (
    <div className="pb-16 max-w-screen-lg mx-auto">
      <div className="sticky top-0 bg-[#5d3d72] border-b border-gray-400 z-10 px-4 py-3 flex items-center">
        <Link href={"/"} className="mr-3">
          <ArrowLeft className="h-5 w-5 text-white" />
        </Link>
        <h1 className="text-lg font-medium text-white">Your Cart</h1>
      </div>

      <div className="p-4">
        <CartItems
          cart={cart}
          customizeFile={customizeFile}
          setCustomizeFile={setCustomizeFile}
          onIncrement={handleIncrementQuantity}
          onDecrement={handleDecrementQuantity}
          onProductIncrement={handleProductIncrementQuantity}
          onProductDecrement={handleProductDecrementQuantity}
          onRemove={handleRemoveItem}
          onUpdateFile={updateFileInCart}
        />

        <div className="bg-white border border-gray-300 rounded-lg p-4 mt-4">
          <h3 className="font-medium mb-3">Order Summary</h3>
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Files ({cart.files?.length || 0})
              </span>
              <span>
                ₹
                {cart.files?.reduce(
                  (total, file) => total + (file.price || 0),
                  0
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Products ({cart.products?.length || 0})
              </span>
              <span>
                ₹
                {cart.products?.reduce(
                  (total, item) => total + item.price * (item.quantity || 1),
                  0
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span>₹ 40</span>
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹ {cart.totalAmount + 40}</span>
            </div>
          </div>

          <button
            onClick={handleRazorpayPayment}
            disabled={!razorpayLoaded || paymentLoading}
            className={`w-full ${
              paymentLoading ? "bg-blue-500" : "bg-green-500 hover:bg-green-600"
            } text-white rounded-lg py-3 font-medium mt-4 transition-colors flex items-center justify-center gap-2`}
          >
            {paymentLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Processing Payment...
              </>
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
