"use client";
import React, { useState } from "react";
import { Plus, Edit, CreditCard, Eye, EyeOff, X } from "lucide-react";

const BankDetails = () => {
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      bankName: "SBI Bank",
      accountNumber: "****1234",
      routingNumber: "****5678",
      accountType: "Checking",
      accountHolderName: "John Doe",
      isDefault: true,
    },
    {
      id: 2,
      bankName: "HDFC Bank",
      accountNumber: "****4321",
      routingNumber: "****8765",
      accountType: "Savings",
      accountHolderName: "Jane Smith",
      isDefault: false,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "checking",
    accountHolderName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAccount) {
      setBankAccounts((prev) =>
        prev.map((acc) =>
          acc.id === editingAccount.id
            ? {
                ...acc,
                ...formData,
                accountNumber: `****${formData.accountNumber.slice(-4)}`,
                routingNumber: `****${formData.routingNumber.slice(-4)}`,
              }
            : acc
        )
      );
    } else {
      const newAccount = {
        id: Date.now(),
        ...formData,
        accountNumber: `****${formData.accountNumber.slice(-4)}`,
        routingNumber: `****${formData.routingNumber.slice(-4)}`,
        isDefault: bankAccounts.length === 0,
      };
      setBankAccounts((prev) => [...prev, newAccount]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      bankName: "",
      accountNumber: "",
      routingNumber: "",
      accountType: "checking",
      accountHolderName: "",
    });
    setEditingAccount(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (account) => {
    setFormData({
      bankName: account.bankName,
      accountNumber: "",
      routingNumber: "",
      accountType: account.accountType.toLowerCase(),
      accountHolderName: account.accountHolderName,
    });
    setEditingAccount(account);
    setIsDialogOpen(true);
  };

  const setAsDefault = (id) => {
    setBankAccounts((prev) =>
      prev.map((acc) => ({
        ...acc,
        isDefault: acc.id === id,
      }))
    );
  };

  return (
    <div className="shadow-lg border-0 bg-white/80 rounded-lg border-gray-200 mx-2 sm:mx-0">
      <div className="p-3 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
            Bank Details
          </h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 bg-[#00B1B3] text-white rounded-lg hover:bg-[#00B1B3]/80 transition-colors text-sm sm:text-base w-full sm:w-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Bank
          </button>
        </div>
      </div>
      <div className="p-3 sm:p-6">
        {isDialogOpen && (
          <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center z-50 p-2 sm:p-0">
            <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
              <div className="mb-3 sm:mb-4 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold">
                  {editingAccount ? "Edit Bank Account" : "Add Bank Account"}
                </h3>
                <X
                  onClick={() => setIsDialogOpen(false)}
                  className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700 flex-shrink-0"
                />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label
                    htmlFor="accountHolderName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Account Holder Name *
                  </label>
                  <input
                    id="accountHolderName"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base border p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="bankName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bank Name *
                  </label>
                  <input
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base border p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="accountType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Account Type
                  </label>
                  <select
                    id="accountType"
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base border p-2"
                  >
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="accountNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Account Number *
                  </label>
                  <div className="relative">
                    <input
                      id="accountNumber"
                      name="accountNumber"
                      type={showAccountNumber ? "text" : "password"}
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base border p-2 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAccountNumber(!showAccountNumber)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                    >
                      {showAccountNumber ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="routingNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Routing Number *
                  </label>
                  <input
                    id="routingNumber"
                    name="routingNumber"
                    value={formData.routingNumber}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base border p-2"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-3 py-1.5 sm:px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base order-1 sm:order-1 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-3 py-1.5 sm:px-4 bg-[#00B1B3] text-white rounded-lg hover:bg-[#00B1B3]/80 transition-colors text-sm sm:text-base order-2 sm:order-2 cursor-pointer"
                  >
                    {editingAccount ? "Update" : "Add"} Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">
          {bankAccounts.map((account) => (
            <div
              key={account.id}
              className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-0">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {account.bankName}
                    </h3>
                    <span className="text-xs sm:text-sm text-gray-500 capitalize">
                      ({account.accountType})
                    </span>
                    {account.isDefault && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Account: {account.accountNumber}
                    <br />
                    Routing: {account.routingNumber}
                    <br />
                    Holder: {account.accountHolderName}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                  {!account.isDefault && (
                    <button
                      onClick={() => setAsDefault(account.id)}
                      className="px-3 py-1.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(account)}
                    className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center w-full sm:w-auto"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {bankAccounts.length === 0 && (
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <CreditCard className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
              <p className="text-sm sm:text-base">No bank accounts added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
