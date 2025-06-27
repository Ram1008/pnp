"use client";
import { createContext, use, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/app/utils/fetchApi";
import {
  vendors as initialVendor,
  stationeryCategories,
  customPrintCategories as cc,
  orders as oo,
} from "@/constants/home"; // Assuming you have a vendors constant file
import { dummyCartData } from "@/constants/cart";
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("Home");
  const [orders, setOrders] = useState(oo);
  const [notifications, setNotifications] = useState([]);
  const [allCategories, setAllCategories] = useState(stationeryCategories);
  const [customPrintCategories, setCustomPrintCategories] = useState(cc);
  const [tab, setTab] = useState("stationery");
  const [vendors, setVendors] = useState(initialVendor);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedVendorDetails, setSelectedVendorDetails] = useState(null);
  const [vendorCategories, setVendorCategories] = useState(null);
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState(dummyCartData);

  // Add this function to handle successful payments
  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: orderData.id || `order_${Date.now()}`,
      date: new Date().toISOString(),
      status: "Processing",
      isDummy: false,
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  // useEffect(() => {
  //   fetchVendors();
  //   fetchCategories();
  //   fetchUserProfile();
  //   fetchCustomPrintCategories();
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     fetchOrders();
  //     fetchNotifications();
  //     fetchCart();
  //   }
  // }, [user]);

  // useEffect(() => {
  //   fetchVendorDetails(selectedVendor);
  // }, [selectedVendor])

  const fetchUserProfile = async () => {
    try {
      const response = await fetchApi("/user/profile");
      setUser(response);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      setUser(null);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await fetchApi("/vendors");
      setVendors(response);
    } catch (err) {
      console.error("Failed to fetch vendors:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetchApi("/categories");
      setAllCategories(response);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetchApi("/user/orders");
      // Filter out dummy orders when fetching from API
      const validOrders = response.filter((order) => !order.isDummy);
      setOrders(validOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetchApi("/user/notifications");
      setNotifications(response);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setNotifications([]);
    }
  };

  const fetchCustomPrintCategories = async () => {
    try {
      const response = await fetchApi("/custom-print-categories");
      setCustomPrintCategories(response);
    } catch (err) {
      console.error("Failed to fetch custom print categories:", err);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetchApi("/user/cart");
      setCart(response);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  const fetchVendorDetails = async (vendorId) => {
    if (!vendorId) {
      setVendorCategories(null);
      return;
    }
    try {
      const response = await fetchApi(`/vendor/${vendorId}`);
      setSelectedVendorDetails(response);
    } catch (err) {
      console.error("Failed to fetch vendor details:", err);
    }
  };

  const filteredVendorCategories = selectedVendorDetails
    ? selectedVendorDetails.categories.filter(
        (category) =>
          category.name &&
          category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allCategories.filter(
        (category) =>
          category.name &&
          category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const filteredCustomPrintCategories = customPrintCategories.filter(
    (category) =>
      category.name &&
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count total items in cart (files + products)
  const cartItemCount =
    (cart?.files?.length || 0) + (cart?.products?.length || 0);

  const prepareCart = (isAdding, files) => {
    let updatedCart = { ...cart };
    if (isAdding && files) {
      updatedCart.files = [...updatedCart.files, ...files];
      // Update totalItems and totalAmount
      updatedCart.totalItems = (updatedCart.totalItems || 0) + files.length;
      updatedCart.totalAmount =
        (updatedCart.totalAmount || 0) +
        files.reduce((sum, file) => sum + (file.price || 0), 0);
    } else {
      // Remove files from cart
      const fileIdsToRemove = files.map((file) => file.id);
      const removedFiles = updatedCart.files.filter((file) =>
        fileIdsToRemove.includes(file.id)
      );
      updatedCart.files = updatedCart.files.filter(
        (file) => !fileIdsToRemove.includes(file.id)
      );
      // Update totalItems and totalAmount
      updatedCart.totalItems = Math.max(
        (updatedCart.totalItems || 0) - removedFiles.length,
        0
      );
      updatedCart.totalAmount = Math.max(
        (updatedCart.totalAmount || 0) -
          removedFiles.reduce((sum, file) => sum + (file.price || 0), 0),
        0
      );
    }
    setCart(updatedCart);
  };

  // // Authentication methods
  // const signup = async (userData) => {
  //   try {
  //     const data = await makeRequest("post", "/signup", userData);
  //     setUser(data.user);
  //     router.push(
  //       data.user.role === "admin" ? "/admin/dashboard" : "/dashboard"
  //     );
  //     return data;
  //   } catch (err) {
  //     throw err;
  //   }
  // };

  // const login = async (credentials) => {
  //   try {
  //     const data = await makeRequest("post", "/login", credentials);
  //     setUser(data.user);
  //     router.push(
  //       data.user.role === "admin" ? "/admin/dashboard" : "/dashboard"
  //     );
  //     return data;
  //   } catch (err) {
  //     throw err;
  //   }
  // };

  // // OTP methods

  // const sendPhoneOtp = async (mobile) => {
  //   try {
  //     const res = await axios.post(`${API_BASE}/send-phone-otp`, { mobile });
  //     return res.data;
  //   } catch (err) {
  //     throw err.response?.data?.message || "Failed to send OTP";
  //   }
  // };

  // const sendEmailOtp = async (email) => {
  //   try {
  //     const res = await axios.post(`${API_BASE}/send-email-otp`, { email });
  //     return res.data;
  //   } catch (err) {
  //     throw err.response?.data?.message || "Failed to send OTP";
  //   }
  // };

  // const verifyOtp = async (identifier, otp, type) => {
  //   try {
  //     const res = await axios.post(`${API_BASE}/verify-otp`, {
  //       identifier,
  //       otp,
  //       type,
  //     });
  //     return res.data;
  //   } catch (err) {
  //     throw err.response?.data?.message || "OTP verification failed";
  //   }
  // };

  // const forgotPassword = async (mobile) => {
  //   try {
  //     const res = await axios.post(`${API_BASE}/forgot-password`, { mobile });
  //     return res.data;
  //   } catch (err) {
  //     throw err.response?.data?.message || "Password reset failed";
  //   }
  // };

  // const resetPassword = async (mobile, otp, newPassword) => {
  //   try {
  //     const res = await axios.post(`${API_BASE}/reset-password`, {
  //       mobile,
  //       otp,
  //       newPassword,
  //     });
  //     return res.data;
  //   } catch (err) {
  //     throw err.response?.data?.message || "Password reset failed";
  //   }
  // };

  // const logout = async () => {
  //   try {
  //     await axios.post(`${API_BASE}/logout`, {}, { withCredentials: true });
  //   } catch {}
  //   setUser(null);
  //   router.push("/login");
  // };

  return (
    <GlobalContext.Provider
      value={{
        user,
        currentPage,
        setCurrentPage,
        orders,
        setOrders,
        addOrder, // Add this to the context value
        notifications,
        setNotifications,
        allCategories,
        setAllCategories,
        setUser,
        loading,
        error,
        setLoading,
        setUser,
        notifications,
        allCategories,
        tab,
        setTab,
        vendors,
        setVendors,
        selectedVendor,
        setSelectedVendor,
        vendorCategories,
        setVendorCategories,
        files,
        setFiles,
        searchQuery,
        setSearchQuery,
        fetchUserProfile,
        fetchVendors,
        fetchCategories,
        fetchOrders,
        fetchNotifications,
        fetchCart,
        prepareCart,
        cart,
        filteredVendorCategories,
        filteredCustomPrintCategories,
        cartItemCount,
        // Authentication methods
        // signup,
        // login,
        // logout,
        // sendPhoneOtp,
        // sendEmailOtp,
        // verifyOtp,
        // forgotPassword,
        // resetPassword,
        setError, // Allow manual error setting if needed
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
