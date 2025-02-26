import WorkerDashboard from "../components/WorkerDashboard";
import OnBoardWorkers from "../components/OnBoardWorkers";
import OffBoardWorkers from "../components/OffBoardWorkers";
import Workers from "../components/Worker";

import { useState } from "react";

export default function LaborManagement() {
  const [activeTab, setActiveTab] = useState<string>("dashboard"); // ✅ Worker Dashboard is Default

  const tabs = [
    { id: "dashboard", label: "Worker Dashboard" },
    { id: "workers", label: "Workers" },
    { id: "onboard", label: "On-board Workers" },
    { id: "offboard", label: "Off-board Workers" },
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
        {activeTab === "dashboard" && <WorkerDashboard />}
        {activeTab === "workers" && <Workers />}
        {activeTab === "onboard" && <OnBoardWorkers />}
        {activeTab === "offboard" && <OffBoardWorkers />}
      </div>
    </div>
  );
}
