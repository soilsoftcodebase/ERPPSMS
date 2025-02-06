import React, { useState } from "react";
import { Share2, Download, Eye } from "lucide-react";

type Contract = {
  id: string;
  name: string;
  file: File | null;
  fileUrl: string;
};

// Default static contract object referencing a PDF in the public folder
const staticContract: Contract = {
  id: "static1",
  name: "Sample Contract.pdf",
  file: null,
  fileUrl: "/sample.pdf", // Ensure sample.pdf exists in your public folder
};

export default function ContractAgreementsPage() {
  // State to store the current contract; initially set to the static contract
  const [contract, setContract] = useState<Contract>(staticContract);

  // Handle file upload via the hidden file input (only accepts PDF files)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type !== "application/pdf") {
        alert("Please upload a PDF document.");
        return;
      }
      // Create a new contract object using the uploaded file and generate an object URL
      const newContract: Contract = {
        id: Date.now().toString(),
        name: file.name,
        file,
        fileUrl: URL.createObjectURL(file),
      };
      setContract(newContract);
    }
  };

  // Trigger download by creating a temporary anchor element
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = contract.fileUrl;
    link.download = contract.name;
    link.click();
  };

  // Open the PDF in a new tab for viewing
  const handleView = () => {
    window.open(contract.fileUrl, "_blank");
  };

  // Share the PDF using the Web Share API if available; otherwise, show an alert
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: contract.name,
          text: "Please check out this contract document.",
          url: contract.fileUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Share functionality is not supported in this browser.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Contract & Agreements</h1>
        <div>
          {/* Upload Document button styled as a label that triggers a hidden file input */}
          <label className="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors">
            Upload Document
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </header>

      {/* Contract Display Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">{contract.name}</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleDownload}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors"
          >
            <Download size={18} className="mr-2" /> Download
          </button>
          <button
            onClick={handleShare}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            <Share2 size={18} className="mr-2" /> Share
          </button>
          <button
            onClick={handleView}
            className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition-colors"
          >
            <Eye size={18} className="mr-2" /> View
          </button>
        </div>
      </div>
    </div>
  );
}
