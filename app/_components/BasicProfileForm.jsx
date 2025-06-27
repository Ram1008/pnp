'use client';
import React, { useState } from "react";
import { Upload, X } from "lucide-react";

const BasicProfileForm = ({ data, onSubmit, userType }) => {
  const [formData, setFormData] = useState({
    name: data.name || "",
    email: data.email || "",
    phone: data.phone || "",
    bio: data.bio || "",
    website: data.website || "",
    company: data.company || "",
    department: data.department || "",
    avatar: data.avatar || null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setFormData((prev) => ({ ...prev, avatar: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, avatar: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar Upload */}
      <div className="flex items-center gap-6">
        <div className="relative">
          {previewImage ? (
            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 bg-[#00B1B3] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {formData.name.charAt(0) || "U"}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="avatar" className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4" />
              Upload Photo
            </div>
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 5MB</p>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B1B3] focus:ring-[#00B1B3] sm:text-sm border p-2"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B1B3] focus:ring-[#00B1B3] sm:text-sm border p-2"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B1B3] focus:ring-[#00B1B3] sm:text-sm border p-2"
          />
        </div>

        {/* Conditional fields based on user type */}
        {userType === "vendor" && (
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B1B3] focus:ring-[#00B1B3] sm:text-sm border p-2"
            />
          </div>
        )}

        {userType === "admin" && (
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <input
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B1B3] focus:ring-[#00B1B3] sm:text-sm border p-2"
            />
          </div>
        )}

        {(userType === "vendor" || userType === "user") && (
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700"
            >
              Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B1B3] focus:ring-[#00B1B3] sm:text-sm border p-2"
              placeholder="https://example.com"
            />
          </div>
        )}
      </div>

      {/* Bio */}
      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700"
        >
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B1B3] focus:ring-[#00B1B3] sm:text-sm border p-2"
          rows={4}
          placeholder="Tell us about yourself..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <button
          type="submit"
          className="px-8 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#00B1B3] hover:bg-[#00B1B3]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B1B3] cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default BasicProfileForm;
