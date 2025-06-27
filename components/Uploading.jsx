import React from "react";

const Uploading = ({uploadProgress}) => {
  return (
    <div className="fixed inset-0 backdrop-blur-xs backdrop-brightness-50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white h-64 w-full md:w-96 rounded-t-2xl md:rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          File Upload In Progress
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Please wait while your files are being uploaded. Do not close the
          window or refresh the page.
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            className="bg-green-600 h-2.5 rounded-full transition-all duration-75 ease-out"
            style={{ width: `${Math.min(uploadProgress, 100)}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Upload Progress:{" "}
          <span className="font-medium">
            {Math.round(Math.min(uploadProgress, 100))}%
          </span>
        </p>

        <div className="text-xs text-gray-400">
          Tip: Large files may take a bit longer. Sit tight!
        </div>
      </div>
    </div>
  );
};

export default Uploading;
