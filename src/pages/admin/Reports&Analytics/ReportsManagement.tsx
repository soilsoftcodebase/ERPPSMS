import ReportsDashboard from "../Reports&Analytics/ReportsDashboard";

import { useState } from "react";

export default function ReportsManagement() {
  const [activeTab, setActiveTab] = useState<string>("dashboard"); // ✅ Worker Dashboard is Default

  const tabs = [
    { id: "dashboard", label: "Reports & Analytics Dashboard" },
    // { id: "clientmanagement", label: "Client Management" },
    // { id: "contract", label: "Contracts & Agreements" },
    // { id: "complaints", label: "Complaints & Disputes" },
  ];

  return (
    <div className="p-6 w-full">
      {/* ✅ Modern Navigation Tabs */}
      <div className="flex justify-start gap-4 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 shadow-md ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ✅ Tab Content */}
      <div className="p-6 bg-white shadow-lg rounded-xl">
        {activeTab === "dashboard" && <ReportsDashboard />}
        {/* {activeTab === "clientmanagement" && <ClientManagement />}
        {activeTab === "contract" && <ContractAgrements />}
        {activeTab === "complaints" && <Complaints />} */}
      </div>
    </div>
  );
}
