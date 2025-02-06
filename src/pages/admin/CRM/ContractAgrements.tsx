import React, { useState } from "react";
import { Share2, Download, Eye } from "lucide-react";

type Contract = {
  id: string;
  name: string;
  file: File | null;
  fileUrl: string;
};

// Default static contracts referencing PDFs in the public folder
const staticContracts: Contract[] = [
  {
    id: "static1",
    name: "Contract Agreement.pdf",
    file: null,
    fileUrl: "/contractagreement.pdf",
  },
  {
    id: "static2",
    name: "Legal Agreement.pdf",
    file: null,
    fileUrl: "/legalagreement.pdf",
  },
  {
    id: "static3",
    name: "Company Contract.pdf",
    file: null,
    fileUrl: "/companycontract.pdf",
  },
  // Ensure these PDFs exist in your public folder
];

export default function ContractAgreementsPage() {
  // State to store the current contract; initially set to the first static contract
  const [contract, setContract] = useState<Contract>(staticContracts[0]);
  const [error, setError] = useState<string | null>(null);

  // Handle file upload via the hidden file input (only accepts PDF files)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type !== "application/pdf") {
        setError("Please upload a PDF document.");
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
      setError(null);
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

      {/* Error Message */}
      {error && <div className="mb-4 text-red-600">{error}</div>}

      {/* Contract Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Select a Contract</h2>
        <div className="flex space-x-4">
          {staticContracts.map((c) => (
            <button
              key={c.id}
              onClick={() => setContract(c)}
              className={`px-4 py-2 rounded-lg shadow transition-colors ${
                contract.id === c.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

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
