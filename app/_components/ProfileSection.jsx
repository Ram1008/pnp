"use client";
import React, { useState } from "react";
import {
  Edit,
  User,
  MapPin,
  CreditCard,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Menu,
  X,
} from "lucide-react";
import BasicProfileForm from "./BasicProfileForm";
import AddressManagement from "./AddressManagement";
import BankDetails from "./BankDetails";
import UpiDetails from "./UpiDetails";
import DocumentUpload from "./DocumentUpload";
import { useVendor } from "@/context/VendorContext";

const ProfileSection = ({ userType: propUserType }) => {
  const {
    userType,
    isEditing,
    activeTab,
    isMobileMenuOpen,
    profileData,
    setIsEditing,
    setActiveTab,
    setIsMobileMenuOpen,
    setProfileData,
  } = useVendor();

  const getVerificationBadge = (status) => {
    const variants = {
      verified: {
        variant: "default",
        icon: CheckCircle,
        text: "Verified",
        className: "bg-green-100 text-green-800",
      },
      pending: {
        variant: "secondary",
        icon: Clock,
        text: "Pending",
        className: "bg-yellow-100 text-yellow-800",
      },
      rejected: {
        variant: "destructive",
        icon: AlertCircle,
        text: "Rejected",
        className: "bg-red-100 text-red-800",
      },
    };
    const config = variants[status] || variants.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${config.className}`}
      >
        <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">{config.text}</span>
      </span>
    );
  };

  const handleProfileUpdate = (newData) => {
    setProfileData({ ...profileData, ...newData });
    setIsEditing(false);
  };

  const tabs = [
    {
      id: "personal",
      label: "Personal",
      icon: User,
      show: true,
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: MapPin,
      show: userType === "user" || userType === "vendor",
    },
    {
      id: "payment",
      label: "Payment",
      icon: CreditCard,
      show: userType === "user" || userType === "vendor",
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      show: userType === "vendor",
    },
  ].filter((tab) => tab.show);

  const TabButton = ({ tab, isActive, onClick }) => {
    const Icon = tab.icon;
    return (
      <button
        onClick={onClick}
        className={`flex items-center px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
          isActive
            ? "border-b-2 border-[#00B1B3] text-[#00B1B3] bg-indigo-50"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">{tab.label}</span>
        <span className="sm:hidden">{tab.label.slice(0, 4)}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 px-3 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                  Profile
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Manage your account settings
                </p>
              </div>
              <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4">
                {userType === "vendor" &&
                  getVerificationBadge(profileData.verificationStatus)}
              </div>
            </div>
          </div>

          {/* Profile Overview */}
          <div className="px-3 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                <div className="flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-indigo-100 flex items-center justify-center text-[#00B1B3] text-lg sm:text-2xl font-bold">
                  {profileData.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                    {profileData.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {profileData.email}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {profileData.phone}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex-shrink-0 inline-flex items-center px-3 sm:px-4 py-1.5 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B1B3] transition-colors duration-200"
              >
                <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">
                  {isEditing ? "Cancel" : "Edit Profile"}
                </span>
                <span className="sm:hidden">
                  {isEditing ? "Cancel" : "Edit"}
                </span>
              </button>
            </div>
          </div>

          {/* Profile Forms */}
          {isEditing ? (
            <div className="border-t border-gray-200 px-3 sm:px-6 py-4">
              <div className="mb-6">
                <h2 className="text-base sm:text-lg font-medium text-gray-900 flex items-center">
                  <User className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  Edit Profile
                </h2>
              </div>
              <div className="space-y-6">
                <BasicProfileForm
                  data={profileData}
                  onSubmit={handleProfileUpdate}
                  userType={userType}
                />
              </div>
            </div>
          ) : (
            <div className="border-t border-gray-200">
              {/* Mobile Tab Menu */}
              <div className="sm:hidden">
                <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {tabs.find((tab) => tab.id === activeTab)?.label}
                  </h3>
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded-md hover:bg-gray-100"
                  >
                    <div className="relative w-5 h-5">
                      <Menu
                        className={`absolute w-5 h-5 transition-all duration-300 ${
                          isMobileMenuOpen
                            ? "opacity-0 rotate-90 scale-75"
                            : "opacity-100 rotate-0 scale-100"
                        }`}
                      />
                      <X
                        className={`absolute w-5 h-5 transition-all duration-300 ${
                          isMobileMenuOpen
                            ? "opacity-100 rotate-0 scale-100"
                            : "opacity-0 rotate-90 scale-75"
                        }`}
                      />
                    </div>
                  </button>
                </div>

                {/* Animated Mobile Menu */}
                <div
                  className={`overflow-hidden bg-gray-50 border-b border-gray-200 transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="py-1">
                    {tabs.map((tab, index) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 transform ${
                          activeTab === tab.id
                            ? "bg-indigo-50 text-[#00B1B3] border-r-2 border-[#00B1B3] translate-x-1"
                            : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
                        }`}
                        style={{
                          transitionDelay: isMobileMenuOpen
                            ? `${index * 50}ms`
                            : "0ms",
                        }}
                      >
                        <tab.icon className="w-5 h-5 mr-3 transition-transform duration-200" />
                        <span className="transition-all duration-200">
                          {tab.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop Tab Navigation */}
              <div className="hidden sm:flex border-b border-gray-200 overflow-x-auto">
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    tab={tab}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </div>

              {/* Tab Content */}
              <div className="px-3 sm:px-6 py-4">
                {activeTab === "personal" && (
                  <div className="space-y-6">
                    <h2 className="text-base sm:text-lg font-medium text-gray-900">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <p className="mt-1 text-sm sm:text-base text-gray-900 break-words">
                          {profileData.name}
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <p className="mt-1 text-sm sm:text-base text-gray-900 break-all">
                          {profileData.email}
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <p className="mt-1 text-sm sm:text-base text-gray-900">
                          {profileData.phone}
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">
                          Role
                        </label>
                        <p className="mt-1 text-sm sm:text-base text-gray-900 capitalize">
                          {userType}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "addresses" &&
                  (userType === "user" || userType === "vendor") && (
                    <AddressManagement />
                  )}

                {activeTab === "payment" &&
                  (userType === "user" || userType === "vendor") && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <BankDetails />
                        <UpiDetails />
                      </div>
                    </div>
                  )}

                {activeTab === "documents" && userType === "vendor" && (
                  <DocumentUpload
                    verificationStatus={profileData.verificationStatus}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
