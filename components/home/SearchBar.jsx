import React from "react";
import { Search } from "lucide-react";


const SearchBar = ({
  placeholder = "Search events by name or game title",
  onSearch,
}) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-[#00B1B3]" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
