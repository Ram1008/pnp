"use client";
import React, { useState } from "react";
import { Plus, Edit, Trash2, MapPin } from "lucide-react";

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "home",
      name: "Home Address",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      isDefault: true,
    },
    {
      id: 2,
      type: "work",
      name: "Work Address",
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "USA",
      isDefault: false,
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: "home",
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    const newAddress = {
      id: Date.now(),
      ...formData,
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, newAddress]);
    setIsAdding(false);
    setFormData({
      type: "home",
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
    });
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address.id);
  };

  const handleUpdate = () => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === editingId
          ? { ...formData, id: editingId, isDefault: addr.isDefault }
          : addr
      )
    );
    setEditingId(null);
    setFormData({
      type: "home",
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
    });
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const setAsDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <div className="shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg border-gray-200 mx-2 sm:mx-0">
      <div className="p-3 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            Address Management
          </h2>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 bg-[#00B1B3] text-white rounded-lg hover:bg-[#00B1B3]/90 transition-colors text-sm sm:text-base w-full sm:w-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Address
          </button>
        </div>
      </div>
      <div className="p-3 sm:p-6">
        {/* Address Form */}
        {(isAdding || editingId) && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              {isAdding ? "Add New Address" : "Edit Address"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1B3] focus:border-[#00B1B3] text-sm sm:text-base"
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Home, Office"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B1B3] focus:ring-[#00B1B3] text-sm sm:text-base border p-2"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street Address
                </label>
                <input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B1B3] focus:ring-[#00B1B3] text-sm sm:text-base border p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B1B3] focus:ring-[#00B1B3] text-sm sm:text-base border p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State/Province
                </label>
                <input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="NY"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B1B3] focus:ring-[#00B1B3] text-sm sm:text-base border p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP/Postal Code
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B1B3] focus:ring-[#00B1B3] text-sm sm:text-base border p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="USA"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B1B3] focus:ring-[#00B1B3] text-sm sm:text-base border p-2"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4">
              <button
                onClick={isAdding ? handleAdd : handleUpdate}
                className="px-3 py-2 sm:px-4 bg-[#00B1B3] text-white rounded-lg hover:bg-[#00B1B3]/80 transition-colors text-sm sm:text-base order-2 sm:order-1 cursor-pointer"
              >
                {isAdding ? "Add Address" : "Update Address"}
              </button>
              <button
                className="px-3 py-2 sm:px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base order-1 sm:order-2"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  setFormData({
                    type: "home",
                    name: "",
                    street: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    country: "USA",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Address List */}
        <div className="space-y-3 sm:space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="p-3 sm:p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-0">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {address.name}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium ${
                        address.type === "home"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {address.type}
                    </span>
                    {address.isDefault && (
                      <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {address.street}
                    <br />
                    {address.city}, {address.state} {address.zipCode}
                    <br />
                    {address.country}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  {!address.isDefault && (
                    <button
                      className="px-3 py-1.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
                      onClick={() => setAsDefault(address.id)}
                    >
                      Set as Default
                    </button>
                  )}
                  <div className="flex gap-2">
                    <button
                      className="flex-1 sm:flex-none p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                      onClick={() => handleEdit(address)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="flex-1 sm:flex-none p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                      onClick={() => handleDelete(address.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressManagement;
