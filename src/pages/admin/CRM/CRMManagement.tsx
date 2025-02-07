import CRMDashboard from "../CRM/CRMDashboard";
import ClientManagement from "../CRM/ClientManagement";
import ContractAgrements from "../CRM/ContractAgrements";
import Complaints from "../CRM/Complaints";
import LeadsGeneration from "../CRM/LeadsGeneration";
import { useState } from "react";

export default function CRMManagement() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const tabs = [
    { id: "dashboard", label: "CRM Dashboard" },
    { id: "clientmanagement", label: "Client Management" },
    { id: "contract", label: "Contracts & Agreements" },
    { id: "complaints", label: "Complaints & Disputes" },
    { id: "requests", label: "Requests" },
    { id: "leadsai", label: "Leads Generation" },
  ];

  return (
    <div className="p-6 w-full">
      {/* Navigation Tabs */}
      <div className="flex justify-start gap-4 mb-6 flex-wrap">
        {tabs.map((tab) => {
          const baseStyle =
            "px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 shadow-md";
          let activeStyle = "";
          let inactiveStyle = "";

          if (tab.id === "leadsai") {
            // AI-powered Leads Generation tab: bold, futuristic styling
            activeStyle =
              "bg-gradient-to-r from-pink-600 to-purple-900 text-white shadow-2xl scale-110 ring-2 ring-pink-300";
            inactiveStyle =
              "bg-gradient-to-r from-pink-400 to-purple-600 text-white hover:from-pink-500 hover:to-purple-700";
          } else {
            activeStyle = "bg-blue-600 text-white shadow-lg scale-105";
            inactiveStyle =
              "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white";
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${baseStyle} ${
                activeTab === tab.id ? activeStyle : inactiveStyle
              }`}
            >
              {tab.label}
              {/* Display the AI badge only on the Leads Generation tab */}
              {tab.id === "leadsai" && (
                <span className="ml-2 text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white animate-pulse">
                  AI
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6 bg-white shadow-lg rounded-xl">
        {activeTab === "dashboard" && <CRMDashboard />}
        {activeTab === "clientmanagement" && <ClientManagement />}
        {activeTab === "contract" && <ContractAgrements />}
        {activeTab === "complaints" && <Complaints />}
        {activeTab === "leadsai" && (
          // <div>
          //   <h2 className="text-2xl font-bold mb-4">
          //     AI-Enhanced Leads Generation
          //   </h2>
          //   <p>
          //     Experience the transformative power of artificial intelligence in
          //     driving high-quality leads to your business. Our AI solutions
          //     optimize every stage of the lead generation process, delivering
          //     insights and performance that go beyond traditional methods.
          //   </p>
          // </div>
          <LeadsGeneration />
        )}
      </div>
    </div>
  );
}
