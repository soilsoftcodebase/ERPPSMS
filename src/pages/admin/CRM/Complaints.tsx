import React, { useState } from "react";

type Complaint = {
  id: string;
  issue: string;
  client: string;
  issueDate: string;
  issueType: string;
  status: string;
  issueOn: string;
  supervisor: string;
  assigne: string;
};

const initialComplaints: Complaint[] = [
  {
    id: "cmp1",
    issue: "Attendance is not proper",
    client: "Tata Motors",
    issueDate: "05/02/2025",
    issueType: "Attendance",
    status: "Inprogress",
    issueOn: "worker",
    supervisor: "Santosh",
    assigne: "-",
  },
];

export default function ComplaintsDisputesPage() {
  // State for complaints and search/filter
  const [complaints] = useState<Complaint[]>(initialComplaints);
  const [selectedComplaints, setSelectedComplaints] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle "Select All" checkbox in the header
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedComplaints(complaints.map((cmp) => cmp.id));
    } else {
      setSelectedComplaints([]);
    }
  };

  // Handle individual row checkbox changes
  const handleCheckboxChange = (id: string) => {
    setSelectedComplaints((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter complaints based on search query (by issue, client, issue type, or status)
  const filteredComplaints = complaints.filter((cmp) => {
    const query = searchQuery.toLowerCase();
    return (
      cmp.issue.toLowerCase().includes(query) ||
      cmp.client.toLowerCase().includes(query) ||
      cmp.issueType.toLowerCase().includes(query) ||
      cmp.status.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Complaints & Disputes
        </h1>
        <div className="max-w-sm">
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </header>

      {/* Complaints Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedComplaints.length === complaints.length &&
                    complaints.length > 0
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Issue
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Client (Factory)
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Issue Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Issue Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Issue On
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Supervisor
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Assigne
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((cmp) => (
                <tr key={cmp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedComplaints.includes(cmp.id)}
                      onChange={() => handleCheckboxChange(cmp.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-800">{cmp.issue}</td>
                  <td className="px-4 py-3 text-gray-800">{cmp.client}</td>
                  <td className="px-4 py-3 text-gray-800">{cmp.issueDate}</td>
                  <td className="px-4 py-3 text-gray-800">{cmp.issueType}</td>
                  <td className="px-4 py-3 text-gray-800">{cmp.status}</td>
                  <td className="px-4 py-3 text-gray-800">{cmp.issueOn}</td>
                  <td className="px-4 py-3 text-gray-800">{cmp.supervisor}</td>
                  <td className="px-4 py-3 text-gray-800">{cmp.assigne}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-3 text-center" colSpan={9}>
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
