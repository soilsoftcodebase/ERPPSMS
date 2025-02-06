import React, { useState } from "react";
import { Share2, FileText, Mail, Phone } from "lucide-react";

type Client = {
  id: string;
  factoryName: string;
  industryType: string;
  location: string;
  email: string;
  phone: string;
};

const initialClients: Client[] = [
  {
    id: "cli1",
    factoryName: "Alpha Industries",
    industryType: "Manufacturing",
    location: "New York, USA",
    email: "contact@alpha.com",
    phone: "1234567890",
  },
  {
    id: "cli2",
    factoryName: "Beta Corp",
    industryType: "Automotive",
    location: "Detroit, USA",
    email: "info@beta.com",
    phone: "0987654321",
  },
  {
    id: "cli3",
    factoryName: "Gamma LLC",
    industryType: "Electronics",
    location: "San Francisco, USA",
    email: "support@gamma.com",
    phone: "5551234567",
  },
];

export default function ClientManagement() {
  // Clients state
  const [clients, setClients] = useState<Client[]>(initialClients);
  // Form toggle and editing state
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // Form field states
  const [factoryName, setFactoryName] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Reset form values
  const resetForm = () => {
    setFactoryName("");
    setIndustryType("");
    setLocation("");
    setEmail("");
    setPhone("");
    setEditingClient(null);
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      // Update existing client
      setClients((prev) =>
        prev.map((client) =>
          client.id === editingClient.id
            ? { ...client, factoryName, industryType, location, email, phone }
            : client
        )
      );
    } else {
      // Create new client (generate new id using length)
      const newClient: Client = {
        id: `cli${clients.length + 1}`,
        factoryName,
        industryType,
        location,
        email,
        phone,
      };
      setClients((prev) => [...prev, newClient]);
    }
    resetForm();
    setShowForm(false);
  };

  // Handle edit action
  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFactoryName(client.factoryName);
    setIndustryType(client.industryType);
    setLocation(client.location);
    setEmail(client.email);
    setPhone(client.phone);
    setShowForm(true);
  };

  // Handle deletion of a client
  const handleDelete = (clientId: string) => {
    setClients(clients.filter((client) => client.id !== clientId));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-6">
        {/* Left: Add Client button and title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Add Client
          </button>
          <h1 className="text-3xl font-extrabold text-gray-800">Client Management</h1>
        </div>
        {/* Right: Share and Export as PDF */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors">
            <Share2 size={18} className="mr-2" />
            Share
          </button>
          <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors">
            <FileText size={18} className="mr-2" />
            Export as PDF
          </button>
        </div>
      </header>

      {/* Inline Add/Edit Form */}
      {showForm && (
        <div className="mb-6 p-6 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {editingClient ? "Edit Client" : "Add Client"}
          </h2>
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">Factory Name</label>
              <input
                type="text"
                value={factoryName}
                onChange={(e) => setFactoryName(e.target.value)}
                placeholder="Enter factory name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Industry Type</label>
              <input
                type="text"
                value={industryType}
                onChange={(e) => setIndustryType(e.target.value)}
                placeholder="Enter industry type"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2 flex space-x-4 mt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
              >
                {editingClient ? "Update Client" : "Add Client"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Clients Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Factory Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Industry Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Communication</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{client.factoryName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{client.industryType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{client.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-3">
                    <a href={`mailto:${client.email}`} title="Email" className="text-blue-600 hover:text-blue-800">
                      <Mail size={18} />
                    </a>
                    <a href={`tel:${client.phone}`} title="Call" className="text-green-600 hover:text-green-800">
                      <Phone size={18} />
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEdit(client)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td className="px-6 py-4 text-center" colSpan={5}>
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
