"use client";
import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Download,
  Plus,
  X,
} from "lucide-react";

const DocumentUpload = ({ verificationStatus }) => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Business License",
      type: "business_license",
      fileName: "business-license.pdf",
      status: "verified",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Tax Certificate",
      type: "tax_certificate",
      fileName: "tax-cert.pdf",
      status: "pending",
      uploadDate: "2024-01-20",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "Identity Proof",
      type: "identity_proof",
      fileName: "id-proof.pdf",
      status: "rejected",
      uploadDate: "2024-01-10",
      size: "1.2 MB",
      rejectionReason:
        "Document is not clear. Please upload a high-quality scan.",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState("business_license");

  const documentTypes = [
    { value: "business_license", label: "Business License" },
    { value: "tax_certificate", label: "Tax Certificate" },
    { value: "identity_proof", label: "Identity Proof" },
    { value: "address_proof", label: "Address Proof" },
    { value: "bank_statement", label: "Bank Statement" },
    { value: "other", label: "Other" },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      verified: {
        icon: CheckCircle,
        text: "Verified",
        className: "bg-green-100 text-green-800",
      },
      pending: {
        icon: Clock,
        text: "Pending Review",
        className: "bg-yellow-100 text-yellow-800",
      },
      rejected: {
        icon: AlertCircle,
        text: "Rejected",
        className: "bg-red-100 text-red-800",
      },
    };
    const config = variants[status] || variants.pending;
    const Icon = config.icon;

    return (
      <span
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${config.className}`}
      >
        <Icon className="w-3 h-3" />
        <span className="hidden xs:inline">{config.text}</span>
        <span className="xs:hidden">{config.text.split(" ")[0]}</span>
      </span>
    );
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      const maxSize = 10 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        alert("Please upload a PDF, JPEG, or PNG file");
        return;
      }

      if (file.size > maxSize) {
        alert("File size must be less than 10MB");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const typeLabel =
      documentTypes.find((type) => type.value === documentType)?.label ||
      "Document";

    const newDocument = {
      id: Date.now(),
      name: typeLabel,
      type: documentType,
      fileName: selectedFile.name,
      status: "pending",
      uploadDate: new Date().toISOString().split("T")[0],
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
    };

    setDocuments((prev) => [...prev, newDocument]);
    setSelectedFile(null);
    setIsDialogOpen(false);
  };

  const handleReupload = (docId) => {
    setDocumentType(
      documents.find((doc) => doc.id === docId)?.type || "business_license"
    );
    setIsDialogOpen(true);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i]);
  };

  return (
    <div className="shadow-lg border-0 bg-white/80">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="flex-1 min-w-0">
            <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              Document Verification
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Upload required documents for account verification
            </p>
          </div>
          <button
            className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 bg-[#00B1B3] text-white rounded-md text-sm sm:text-base w-full sm:w-auto cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Upload Document</span>
            <span className="xs:hidden">Upload</span>
          </button>
          {/* Upload Dialog */}
          {isDialogOpen && (
            <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base sm:text-lg font-bold">
                    Upload Document
                  </h3>
                  <button
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="documentType"
                      className="block mb-1 text-sm sm:text-base"
                    >
                      Document Type
                    </label>
                    <select
                      id="documentType"
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base"
                    >
                      {documentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="file"
                      className="block mb-1 text-sm sm:text-base"
                    >
                      Select File
                    </label>
                    <div>
                      <label
                        htmlFor="file"
                        className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <div className="flex flex-col items-center justify-center pt-3 pb-3 sm:pt-5 sm:pb-6">
                          <Upload className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-4 text-gray-500" />
                          <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-gray-500 text-center px-2">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            <span className="hidden xs:inline">
                              or drag and drop
                            </span>
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, PNG, JPG (MAX. 10MB)
                          </p>
                        </div>
                        <input
                          id="file"
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileSelect}
                        />
                      </label>
                      {selectedFile && (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          <p className="text-xs sm:text-sm font-medium break-all">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(selectedFile.size)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
                    <button
                      className="w-full sm:w-auto px-4 py-2 border rounded-md text-sm sm:text-base"
                      onClick={() => {
                        setIsDialogOpen(false);
                        setSelectedFile(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-full sm:w-auto px-4 py-2 bg-[#00B1B3] text-white rounded-md disabled:bg-gray-400 text-sm sm:text-base"
                      onClick={handleUpload}
                      disabled={!selectedFile}
                    >
                      Upload Document
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 mb-2">
                    <div className="flex items-center gap-2 xs:gap-3 flex-1 min-w-0">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                          {doc.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 break-all">
                          {doc.fileName}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-28 px-3">
                      {getStatusBadge(doc.status)}
                    </div>
                  </div>

                  <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-xs sm:text-sm text-gray-500 ml-0 xs:ml-6 sm:ml-8">
                    <span>Size: {doc.size}</span>
                    <span>Uploaded: {doc.uploadDate}</span>
                  </div>

                  {doc.status === "rejected" && doc.rejectionReason && (
                    <div className="mt-2 ml-0 xs:ml-6 sm:ml-8 p-2 bg-red-50 border border-red-200 rounded text-xs sm:text-sm text-red-700">
                      <strong>Rejection Reason:</strong> {doc.rejectionReason}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 sm:gap-2 flex-wrap sm:flex-nowrap">
                  <button className="p-1.5 sm:p-2 border border-gray-300 rounded-md">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button className="p-1.5 sm:p-2 border border-gray-300 rounded-md">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  {doc.status === "rejected" && (
                    <button
                      className="px-2 sm:px-3 py-1.5 bg-[#00B1B3] text-white rounded-md text-xs sm:text-sm whitespace-nowrap"
                      onClick={() => handleReupload(doc.id)}
                    >
                      Re-upload
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {documents.length === 0 && (
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <FileText className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-gray-300" />
              <p className="mb-2 text-sm sm:text-base">
                No documents uploaded yet
              </p>
              <p className="text-xs sm:text-sm">
                Upload your documents to complete verification
              </p>
            </div>
          )}
        </div>

        {/* Verification Progress */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">
            Verification Progress
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-blue-800">
                Documents Submitted
              </span>
              <span className="text-xs sm:text-sm font-medium text-blue-900">
                {documents.length}/3
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-[#00B1B3] h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((documents.length / 3) * 100, 100)}%`,
                }}
              />
            </div>
            <p className="text-xs text-blue-700">
              Upload business license, tax certificate, and identity proof to
              complete verification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
