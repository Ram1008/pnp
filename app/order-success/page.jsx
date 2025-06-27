"use client";
import { CheckCircle, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  // Clear any residual cart data on success page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("printCart");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-lg mx-auto pb-16">
        {/* Header */}
        <div className="sticky top-0 bg-[#5d3d72] border-b border-gray-400 z-10 px-4 py-3 flex items-center">
          <Link href="/" className="mr-3">
            <ArrowLeft className="h-5 w-5 text-white" />
          </Link>
          <h1 className="text-lg font-medium text-white">Order Confirmation</h1>
        </div>

        {/* Main Content */}
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Order Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-medium text-gray-700 mb-2">
                What happens next?
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>You'll receive an order confirmation email shortly</li>
                <li>Our team is preparing your items</li>
                <li>We'll notify you when your order ships</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="bg-[#5d3d72] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#4a2f5a] transition-colors text-center"
              >
                View My Orders
              </Link>
              <Link
                href="/"
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Help Section */}
          <div className="mt-8 bg-green-100 border border-green-300 rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Need help with your order?
            </h3>
            <p className="text-gray-600 mb-4">
              Contact our customer support team for assistance.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span>{" "}
                support@printnparcel.com
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Phone:</span> +91 98765 43210
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Hours:</span> Mon-Sat, 9AM-6PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;