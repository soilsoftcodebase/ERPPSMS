import React, { useState } from "react";
import { Plus, ExternalLink } from "lucide-react";

// Define the Integration type
type Integration = {
  id: string;
  serviceName: string;
  link: string;
};

// Initial integration cards data
const initialIntegrations: Integration[] = [
  { id: "1", serviceName: "Income Tax", link: "https://www.incometax.gov.in" },
  { id: "2", serviceName: "Whatsapp", link: "https://www.whatsapp.com" },
  { id: "3", serviceName: "Ministry of Labor & Employment Portal", link: "https://labour.gov.in" },
  { id: "4", serviceName: "Company Portal", link: "https://companyportal.example.com" },
  { id: "5", serviceName: "PF Compliance", link: "https://pfcompliance.gov.in" },
  { id: "6", serviceName: "ESI Portal", link: "https://esi.gov.in" },
];

const IntegrationDashboard: React.FC = () => {
  // State to store integration links
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for the new integration form
  const [newServiceName, setNewServiceName] = useState("");
  const [newLink, setNewLink] = useState("");

  // Handler to add a new integration
  const handleAddIntegration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim() || !newLink.trim()) return;
    const newIntegration: Integration = {
      id: Date.now().toString(),
      serviceName: newServiceName.trim(),
      link: newLink.trim(),
    };
    setIntegrations([...integrations, newIntegration]);
    setNewServiceName("");
    setNewLink("");
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Integration Dashboard</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} className="mr-2" /> Add Link
        </button>
      </header>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {integration.serviceName}
            </h2>
            <p className="text-gray-600 mb-4 break-all">{integration.link}</p>
            <a
              href={integration.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ExternalLink size={16} className="mr-1" /> Open Link
            </a>
          </div>
        ))}
      </div>

      {/* Modal for Adding Integration */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-96 p-6">
            <h2 className="text-2xl font-bold mb-4">Add Integration</h2>
            <form onSubmit={handleAddIntegration} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service/Portal Name
                </label>
                <input
                  type="text"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="Enter service name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Integration Link
                </label>
                <input
                  type="url"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  placeholder="Enter URL"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationDashboard;
