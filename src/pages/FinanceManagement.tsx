import { useState } from "react";
import FinanceDashboard from "./admin/Finance/FinanceDashboard";

export default function FinanceManagement() {
  const [activeTab, setActiveTab] = useState<string>("finance");

  const tabs = [
    { id: "financedashboard", label: "Finance" },
    { id: "clientfinance", label: "Client Finance" },
    { id: "HouseFinance", label: "In House Finance" },
  ];

  return (
    <div className="p-4 w-full">
      {/* ✅ Navigation Tabs */}
      <div className="flex border-b mb-6 space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ✅ Tab Content */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        {activeTab === "financedashboard" && <FinanceDashboard />}
        {activeTab === "clientfinance" && <FinanceDashboard />}
        {activeTab === "HouseFinance" && <FinanceDashboard />}
      </div>
    </div>
  );
}
