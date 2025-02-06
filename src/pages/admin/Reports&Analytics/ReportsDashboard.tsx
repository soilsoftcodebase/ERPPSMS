import { Share2, Download, Eye, FileText } from "lucide-react";

// Define a Report type
type Report = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  category: string; // e.g., "Invoice", "Contract", "Agreement", "Contact", "Analytics", etc.
};

// Dummy data for reports
const reportsData: Report[] = [
  {
    id: "r1",
    title: "Invoice Report - January",
    description: "All invoices generated in January.",
    fileUrl: "/reports/invoice_january.pdf", // Ensure this file exists in your public folder
    fileName: "Invoice_January.pdf",
    category: "Invoice",
  },
  {
    id: "r2",
    title: "Contract Agreements",
    description: "Overview of all contracts and agreements.",
    fileUrl: "/reports/contract_agreements.pdf",
    fileName: "Contract_Agreements.pdf",
    category: "Contract",
  },
  {
    id: "r3",
    title: "Client Contacts",
    description: "Detailed list of client contacts.",
    fileUrl: "/reports/client_contacts.pdf",
    fileName: "Client_Contacts.pdf",
    category: "Contact",
  },
  {
    id: "r4",
    title: "Monthly Analytics",
    description: "Key analytics and performance reports for the month.",
    fileUrl: "/reports/monthly_analytics.pdf",
    fileName: "Monthly_Analytics.pdf",
    category: "Analytics",
  },
];

export default function ReportsAnalyticsPage() {
  // Handler to download a report PDF
  const handleDownload = (report: Report) => {
    const link = document.createElement("a");
    link.href = report.fileUrl;
    link.download = report.fileName;
    link.click();
  };

  // Handler to open a report PDF in a new tab
  const handleView = (report: Report) => {
    window.open(report.fileUrl, "_blank");
  };

  // Handler to share a report using the Web Share API (if available)
  const handleShare = async (report: Report) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: report.title,
          text: report.description,
          url: report.fileUrl,
        });
      } catch (error) {
        console.error("Error sharing report:", error);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Reports & Analytics</h1>
      </header>

      {/* Reports Grid */}
      {reportsData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportsData.map((report) => (
            <div
              key={report.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-2 mb-4">
                <FileText size={24} className="text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  {report.title}
                </h2>
              </div>
              <p className="text-gray-600 mb-4">{report.description}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleView(report)}
                  title="View"
                  className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <Eye size={18} className="mr-1" /> View
                </button>
                <button
                  onClick={() => handleShare(report)}
                  title="Share"
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Share2 size={18} className="mr-1" /> Share
                </button>
                <button
                  onClick={() => handleDownload(report)}
                  title="Download"
                  className="flex items-center text-green-600 hover:text-green-800 transition-colors"
                >
                  <Download size={18} className="mr-1" /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No reports found.</div>
      )}
    </div>
  );
}
