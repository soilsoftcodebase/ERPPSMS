import { useState } from "react";
import HRMEmployee from "../../../components/HRMEmployee";
import HRMDashboard from "../../../components/HrmDashBoard";

export default function LaborManagement() {
  const [activeTab, setActiveTab] = useState<string>("hrmdashboard"); // ✅ Worker Dashboard is Default

  const tabs = [
    { id: "hrmdashboard", label: "HRM Dashboard" },
    { id: "employees", label: "Employees" },
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
      <div className="p-4 bg-white shadow-md rounded-lg">
        {activeTab === "hrmdashboard" && <HRMDashboard />}
        {activeTab === "employees" && <HRMEmployee />}
      </div>
    </div>
  );
}
