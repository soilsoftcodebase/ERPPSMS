import { useState } from "react";
import { Share2, FileText, Download, Eye } from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ----- Dummy Data & Types -----

// Billing & Invoicing Data
type Invoice = {
  id: string;
  factoryName: string;
  invoiceFileName: string;
  invoiceFileUrl: string;
  status: string;
  invoiceAmount: string;
};

const billingData: Invoice[] = [
  {
    id: "inv1",
    factoryName: "Tata Motors",
    invoiceFileName: "Tata_Motors_Invoice_Jan_25.pdf",
    invoiceFileUrl: "/Tata_Motors_Invoice_Jan_25.pdf", // Ensure this PDF exists in your public folder
    status: "Invoice Submitted",
    invoiceAmount: "2,65,000",
  },
  {
    id: "inv2",
    factoryName: "Mahindra",
    invoiceFileName: "Mahindra_Invoice_Jan_28.pdf",
    invoiceFileUrl: "/Mahindra_Invoice_Jan_28.pdf", // Ensure this PDF exists in your public folder
    status: "Payment Recieved",
    invoiceAmount: "3,46,000",
  },
];

// Revenue & Profit Analysis Data
type RevenueData = {
  factory: string;
  revenue: number;
  profitMargin: number; // in percentage
  projectedRevenue: number;
  actualRevenue: number;
  unpaidRevenueLoss: number;
};

const revenueData: RevenueData[] = [
  {
    factory: "Factory A",
    revenue: 50000,
    profitMargin: 20,
    projectedRevenue: 52000,
    actualRevenue: 50000,
    unpaidRevenueLoss: 5000,
  },
  {
    factory: "Factory B",
    revenue: 75000,
    profitMargin: 25,
    projectedRevenue: 75000,
    actualRevenue: 75000,
    unpaidRevenueLoss: 8000,
  },
];

// ----- Main Component -----

export default function ClientFinance() {
  // State to toggle between "billing" and "revenue" views
  const [activeView, setActiveView] = useState<"billing" | "revenue">("billing");
  // For Billing view: track selected invoice IDs
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  // ----- Billing & Invoicing Action Handlers -----

  // Download a single invoice
  const handleDownloadInvoice = (fileUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  // Open a single invoice in a new tab (View)
  const handleViewInvoice = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  // Share a single invoice using the Web Share API
  const handleShareInvoice = async (fileUrl: string, fileName: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: fileName,
          text: "Please check out this invoice document.",
          url: fileUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Share functionality is not supported in this browser.");
    }
  };

  // Bulk Action Handlers for Billing view
  const handleDownloadAll = () => {
    billingData.forEach((invoice) =>
      handleDownloadInvoice(invoice.invoiceFileUrl, invoice.invoiceFileName)
    );
  };

  const handleSubmitAll = () => {
    alert("All selected invoices have been submitted.");
  };

  // ----- Render -----

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Header with View Tabs */}
      <header className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Client Finance</h1>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button
            onClick={() => setActiveView("billing")}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeView === "billing"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Billing & Invoicing
          </button>
          <button
            onClick={() => setActiveView("revenue")}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeView === "revenue"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Revenue & Profit Analysis
          </button>
        </div>
      </header>

      {/* Billing & Invoicing View */}
      {activeView === "billing" && (
        <div>
          {/* Bulk Action Buttons */}
          <div className="flex justify-end space-x-4 mb-4">
            <button
              onClick={handleDownloadAll}
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors"
            >
              <Download size={18} className="mr-2" />
              Download All Invoice
            </button>
            <button
              onClick={handleSubmitAll}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              Submit All Invoices
            </button>
          </div>

          {/* Billing Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Select
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Factory Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Invoice Generated
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Invoice Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {billingData.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedInvoices.includes(invoice.id)}
                        onChange={() =>
                          setSelectedInvoices((prev) =>
                            prev.includes(invoice.id)
                              ? prev.filter((id) => id !== invoice.id)
                              : [...prev, invoice.id]
                          )
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      {invoice.factoryName}
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {invoice.invoiceFileName}
                        </span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() =>
                              handleViewInvoice(invoice.invoiceFileUrl)
                            }
                            title="View"
                            className="text-purple-600 hover:text-purple-800 transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleShareInvoice(
                                invoice.invoiceFileUrl,
                                invoice.invoiceFileName
                              )
                            }
                            title="Share"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Share2 size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleDownloadInvoice(
                                invoice.invoiceFileUrl,
                                invoice.invoiceFileName
                              )
                            }
                            title="Download"
                            className="text-green-600 hover:text-green-800 transition-colors"
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      {invoice.status}
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      {invoice.invoiceAmount}
                    </td>
                  </tr>
                ))}
                {billingData.length === 0 && (
                  <tr>
                    <td className="px-4 py-3 text-center" colSpan={5}>
                      No invoice data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Revenue & Profit Analysis View */}
      {activeView === "revenue" && (
        <div className="space-y-8">
          {/* Revenue Data Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Factory
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Revenue
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Profit Margin (%)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Projected Revenue
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Actual Revenue
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Unpaid Revenue Loss
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {revenueData.map((item) => (
                  <tr key={item.factory} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-800">{item.factory}</td>
                    <td className="px-4 py-3 text-gray-800">{item.revenue}</td>
                    <td className="px-4 py-3 text-gray-800">{item.profitMargin}</td>
                    <td className="px-4 py-3 text-gray-800">{item.projectedRevenue}</td>
                    <td className="px-4 py-3 text-gray-800">{item.actualRevenue}</td>
                    <td className="px-4 py-3 text-gray-800">{item.unpaidRevenueLoss}</td>
                  </tr>
                ))}
                {revenueData.length === 0 && (
                  <tr>
                    <td className="px-4 py-3 text-center" colSpan={6}>
                      No revenue data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Bar Chart for Profit Margins on Labor Supply */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Profit Margins on Labor Supply</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="factory" />
                <YAxis unit="%" />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Bar dataKey="profitMargin" fill="#8884d8" name="Labor Profit Margin (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart for Projected vs Actual Revenue */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Projected vs Actual Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="factory" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="projectedRevenue" fill="#82ca9d" name="Projected Revenue" />
                <Bar dataKey="actualRevenue" fill="#ffc658" name="Actual Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>


          {/* Bar Chart: Revenue Comparison */}
           <div className="bg-white p-6 rounded-lg shadow mb-6">
             <h2 className="text-xl font-bold mb-4">Revenue Comparison</h2>
             <ResponsiveContainer width="100%" height={300}>
               <BarChart data={revenueData}>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="factory" />
                 <YAxis />
                 <Tooltip />
                 <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                 <Bar dataKey="projectedRevenue" fill="#82ca9d" name="Projected Revenue" />
                 <Bar dataKey="actualRevenue" fill="#ffc658" name="Actual Revenue" />
               </BarChart>
             </ResponsiveContainer>
           </div>

           {/* Bar Chart: Unpaid Revenue Loss */}
           <div className="bg-white p-6 rounded-lg shadow">
             <h2 className="text-xl font-bold mb-4">Unpaid Revenue Loss</h2>
             <ResponsiveContainer width="100%" height={300}>
               <BarChart data={revenueData}>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="factory" />
                 <YAxis />
                 <Tooltip />
                 <Bar dataKey="unpaidRevenueLoss" fill="#ff7300" name="Unpaid Revenue Loss" />
               </BarChart>
             </ResponsiveContainer>
            </div>          
        </div>
      )}

      {/* Optional Footer Action Buttons */}
      {/* <div className="mt-6 flex justify-end space-x-4">
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors">
          <Share2 size={18} className="mr-2" />
          Share
        </button>
        <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors">
          <FileText size={18} className="mr-2" />
          Export as PDF
        </button>
      </div> */}

    </div>
  );
}
