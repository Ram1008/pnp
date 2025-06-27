"use client";
import React, { useState } from "react";
import { Plus, Edit, Smartphone, Trash2, X } from "lucide-react";

const UpiDetails = () => {
  const [upiAccounts, setUpiAccounts] = useState([
    {
      id: 1,
      upiId: "john.doe@paytm",
      provider: "Paytm",
      isDefault: true,
    },
    {
      id: 2,
      upiId: "jane.smith@phonepe",
      provider: "PhonePe",
      isDefault: false,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUpi, setEditingUpi] = useState(null);
  const [formData, setFormData] = useState({
    upiId: "",
    provider: "paytm",
  });

  const upiProviders = [
    { value: "paytm", label: "Paytm", domain: "@paytm" },
    { value: "gpay", label: "Google Pay", domain: "@okaxis" },
    { value: "phonepe", label: "PhonePe", domain: "@ybl" },
    { value: "bhim", label: "BHIM", domain: "@upi" },
    { value: "amazon", label: "Amazon Pay", domain: "@apl" },
    { value: "other", label: "Other", domain: "" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProviderChange = (e) => {
    const provider = e.target.value;
    const providerData = upiProviders.find((p) => p.value === provider);
    setFormData((prev) => ({
      ...prev,
      provider,
      upiId: prev.upiId.split("@")[0] + (providerData?.domain || ""),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const providerData = upiProviders.find(
      (p) => p.value === formData.provider
    );

    if (editingUpi) {
      setUpiAccounts((prev) =>
        prev.map((upi) =>
          upi.id === editingUpi.id
            ? {
                ...upi,
                upiId: formData.upiId,
                provider: providerData?.label || "Other",
              }
            : upi
        )
      );
    } else {
      const newUpi = {
        id: Date.now(),
        upiId: formData.upiId,
        provider: providerData?.label || "Other",
        isDefault: upiAccounts.length === 0,
      };
      setUpiAccounts((prev) => [...prev, newUpi]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      upiId: "",
      provider: "paytm",
    });
    setEditingUpi(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (upi) => {
    const provider = upiProviders.find((p) => p.label === upi.provider);
    setFormData({
      upiId: upi.upiId,
      provider: provider?.value || "other",
    });
    setEditingUpi(upi);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setUpiAccounts((prev) => prev.filter((upi) => upi.id !== id));
  };

  const setAsDefault = (id) => {
    setUpiAccounts((prev) =>
      prev.map((upi) => ({
        ...upi,
        isDefault: upi.id === id,
      }))
    );
  };

  return (
    <div className="shadow-lg border-0 bg-white/80 border-gray-300">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold">
            <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
            UPI Details
          </h2>
          <button
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-[#00B1B3] text-white rounded-md text-sm sm:text-base"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Add UPI</span>
            <span className="xs:hidden">Add</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {upiAccounts.map((upi) => (
            <div
              key={upi.id}
              className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base break-all">
                      {upi.upiId}
                    </h3>
                    {upi.isDefault && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full whitespace-nowrap">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Provider: {upi.provider}
                  </p>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap sm:flex-nowrap">
                  {!upi.isDefault && (
                    <button
                      className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm whitespace-nowrap"
                      onClick={() => setAsDefault(upi.id)}
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    className="p-1.5 sm:p-2 border border-gray-300 rounded-md"
                    onClick={() => handleEdit(upi)}
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    className="p-1.5 sm:p-2 border border-gray-300 rounded-md text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(upi.id)}
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {upiAccounts.length === 0 && (
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm sm:text-base">No UPI accounts added yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit UPI Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base sm:text-lg font-bold">
                {editingUpi ? "Edit UPI ID" : "Add UPI ID"}
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setIsDialogOpen(false)}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="provider"
                  className="block mb-1 text-sm sm:text-base"
                >
                  UPI Provider
                </label>
                <select
                  id="provider"
                  name="provider"
                  value={formData.provider}
                  onChange={handleProviderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base"
                >
                  {upiProviders.map((provider) => (
                    <option key={provider.value} value={provider.value}>
                      {provider.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="upiId"
                  className="block mb-1 text-sm sm:text-base"
                >
                  UPI ID *
                </label>
                <input
                  id="upiId"
                  name="upiId"
                  type="text"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  placeholder="example@paytm"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base"
                />
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Enter your complete UPI ID (e.g., yourname@paytm)
                </p>
              </div>
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
                <button
                  type="button"
                  className="w-full sm:w-auto px-4 py-1.5 border border-gray-300 rounded-md text-sm sm:text-base"
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="w-full sm:w-auto px-4 py-1.5 bg-[#00B1B3] text-white rounded-md text-sm sm:text-base"
                  onClick={handleSubmit}
                >
                  {editingUpi ? "Update" : "Add"} UPI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpiDetails;
