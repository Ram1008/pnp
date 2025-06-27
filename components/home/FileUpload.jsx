"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  File,
  X,
  Upload,
  Image as ImageIcon,
  Plus,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Uploading from "../Uploading";
import FilesPreview from "../FilesPreview";

const FileUpload = ({
  onPreviewStateChange,
  files,
  setFiles,
  currentFileIndex,
  setCurrentFileIndex,
  printSettings,
  setPrintSettings,
}) => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (files.length > 0 && onPreviewStateChange) {
      onPreviewStateChange(true);
    }

    return () => {
      if (files.length > 0 && onPreviewStateChange) {
        onPreviewStateChange(false);
      }
    };
  }, [files]);

  useEffect(() => {
    // First check if we have files in printCart (coming back from cart page)
    const savedCart = localStorage.getItem("printCart");
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      if (cartData.files && cartData.files.length > 0) {
        setFiles(cartData.files);
        if (cartData.files[0].printSettings) {
          setPrintSettings(cartData.files[0].printSettings);
        }
        return;
      }
    }

    // Otherwise load from uploadedFiles as before
    const savedFiles = localStorage.getItem("uploadedFiles");
    if (savedFiles) {
      const parsedFiles = JSON.parse(savedFiles);
      const processedFiles = parsedFiles.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: file.type,
        size: file.size,
        pages: getEstimatedPages(file.type, file.size),
        preview: getFilePreview(file.type, file.name),
        printSettings: { ...printSettings },
        price: calculatePrintPrice(
          getEstimatedPages(file.type, file.size),
          printSettings
        ),
      }));
      setFiles(processedFiles);
    }
  }, []);

  const getEstimatedPages = (fileType, fileSize) => {
    if (fileType?.includes("pdf")) {
      return Math.max(1, Math.ceil(fileSize / 100000));
    } else if (fileType?.includes("image")) {
      return 1;
    } else if (fileType?.includes("doc")) {
      return Math.max(1, Math.ceil(fileSize / 50000));
    }
    return 2;
  };

  const getFilePreview = (fileType, fileName) => {
    if (fileType?.includes("pdf")) {
      return {
        type: "pdf",
        content: `PDF file uploaded. Preview not supported inline.`,
      };
    } else if (fileType?.includes("image")) {
      return {
        type: "image",
        content:
          "Image Preview\n\nThis image will be printed according to your settings.",
      };
    } else if (fileType?.includes("doc")) {
      return {
        type: "document",
        content:
          "Document Preview\n\nThis document contains formatted text that will be printed.",
      };
    }
    return {
      type: "unknown",
      content: "File Preview\n\nThis file will be processed and printed.",
    };
  };

  const calculatePrintPrice = (pages, settings) => {
    const pricePerPage = settings.colorMode === "Color" ? 10 : 3;
    let price = pages * pricePerPage * settings.copies;

    if (settings.printSide === "Double Sided") {
      price *= 0.8;
    }

    return Math.round(price);
  };

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setSelectedFiles(uploadedFiles);
    startFileUpload(uploadedFiles);
  };

  const startFileUpload = (uploadedFiles) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            processUploadedFiles(uploadedFiles);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 50);
  };

  // In FileUpload.jsx
  const processUploadedFiles = (uploadedFiles) => {
  const processedFiles = uploadedFiles.map((file, index) => {
    const pages = getEstimatedPages(file.type, file.size);
    let preview;
    if (file.type?.includes("image")) {
      preview = {
        type: "image",
        content: URL.createObjectURL(file), // <-- This is the fix!
      };
    } else {
      preview = getFilePreview(file.type, file.name);
    }
    return {
      id: Date.now() + index,
      name: file.name,
      type: file.type,
      size: file.size,
      pages,
      preview,
      printSettings: { ...printSettings },
      price: calculatePrintPrice(pages, printSettings),
    };
  });

  setFiles(processedFiles);

  // Save to both uploadedFiles and printCart
  localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));

  const cartData = {
    files: processedFiles,
    products: [],
    totalAmount: calculateTotal(processedFiles),
  };
  localStorage.setItem("printCart", JSON.stringify(cartData));
};

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
    if (currentFileIndex >= files.length - 1) {
      setCurrentFileIndex(Math.max(0, files.length - 2));
    }
  };

  const handleSettingChange = (setting, value) => {
    const newSettings = {
      ...printSettings,
      [setting]: value,
    };
    setPrintSettings(newSettings);

    setFiles((prevFiles) =>
      prevFiles.map((file) => ({
        ...file,
        printSettings: { ...newSettings },
        price: calculatePrintPrice(file.pages, newSettings),
      }))
    );
  };

  const calculateTotal = () => {
    return files.reduce((sum, file) => sum + file.price, 0);
  };

  const addToCart = () => {
    const cartData = {
      files: files.map((file) => ({
        ...file,
        printSettings: { ...printSettings },
        price: calculatePrintPrice(file.pages, printSettings),
      })),
      products: [],
      totalAmount: calculateTotal(),
    };

    // Save to localStorage before navigating
    localStorage.setItem("printCart", JSON.stringify(cartData));
    router.push("/cart");
  };

  const currentFile = files[currentFileIndex];
  const totalPages = files.reduce((sum, file) => sum + file.pages, 0);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (files.length > 0) {
    return (
      <FilesPreview files={files}  handleFileChange={handleFileChange} printSettings={printSettings} handleSettingChange={handleSettingChange}/>
    );
  }else{
    return (
    <div className="border-[#5d3d72] rounded-lg p-0 text-center bg-[#f0eef6]">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />

      {isUploading ? (
        <Uploading uploadProgress={uploadProgress} />
      ) : selectedFiles.length > 0 ? (
        <div className="mt-4 mx-5 p-3 border border-gray-300 rounded-lg">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-2 last:mb-0"
            >
              <div className="flex items-center">
                <File className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700 truncate max-w-[180px]">
                  {file.name}
                </span>
              </div>
              <button
                onClick={() => {
                  const newFiles = [...selectedFiles];
                  newFiles.splice(index, 1);
                  setSelectedFiles(newFiles);
                }}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={triggerFileInput}
            className="mt-2 w-full bg-[#5d3d72] text-white px-4 py-2 rounded-md text-sm flex items-center justify-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            Add More Files
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={triggerFileInput}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Upload Your Files
          </button>
          <p className="text-[11px] text-gray-400 mt-1">
            Maximum upload file size: 50 MB • Maximum files: 15
          </p>
        </>
      )}
    </div>
  );
  }
};

export default FileUpload;
