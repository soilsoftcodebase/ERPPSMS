import { useState } from "react";
import { AlertCircle, AlertOctagon } from "lucide-react";

// Define a type for compliance records
type ComplianceRecord = {
  id: string;
  type: string;
  compliancePercentage: number;
  pendingIssues: number;
  lastAuditDate: string;
  nextDueDate: string;
};

// Dummy compliance data
const complianceData: ComplianceRecord[] = [
  {
    id: "1",
    type: "PF Compliance",
    compliancePercentage: 92,
    pendingIssues: 5,
    lastAuditDate: "10/1/25",
    nextDueDate: "10/2/25",
  },
  {
    id: "2",
    type: "ESI Compliance",
    compliancePercentage: 88,
    pendingIssues: 3,
    lastAuditDate: "09/15/25",
    nextDueDate: "10/15/25",
  },
  {
    id: "3",
    type: "Tax Compliance",
    compliancePercentage: 95,
    pendingIssues: 0,
    lastAuditDate: "09/10/25",
    nextDueDate: "10/10/25",
  },
  {
    id: "4",
    type: "Labor Law Compliance",
    compliancePercentage: 90,
    pendingIssues: 2,
    lastAuditDate: "09/20/25",
    nextDueDate: "10/20/25",
  },
  {
    id: "5",
    type: "Health & Safety Compliance",
    compliancePercentage: 85,
    pendingIssues: 4,
    lastAuditDate: "09/25/25",
    nextDueDate: "10/25/25",
  },
];

// Define a type for emergency alerts
type EmergencyAlert = {
  id: string;
  message: string;
  timestamp: string;
  severity: string; // e.g., "Critical", "High"
};

// Dummy emergency alerts (simulate real-time alerts)
const initialEmergencyAlerts: EmergencyAlert[] = [
  {
    id: "e1",
    message: "PF Compliance below threshold!",
    timestamp: "10/01/2025 14:30",
    severity: "Critical",
  },
  {
    id: "e2",
    message: "ESI Compliance issue detected!",
    timestamp: "10/01/2025 14:45",
    severity: "High",
  },
];

export default function ComplianceDashboard() {
  // State for emergency alerts
  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>(initialEmergencyAlerts);

  // Handle emergency alert acknowledgement (simulate emergency action)
  const handleAcknowledgeAlert = (id: string) => {
    setEmergencyAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Main Header */}
      <header className="flex items-center mb-6">
        <AlertCircle size={32} className="text-red-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">
          Compliance Dashboard & Alerts
        </h1>
      </header>

      {/* Emergency Alerts Section */}
      {emergencyAlerts.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            Emergency Alerts
          </h2>
          <div className="space-y-4">
            {emergencyAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white rounded-lg shadow border border-red-200"
              >
                <div className="flex items-center space-x-4">
                  <AlertOctagon size={24} className="text-red-600" />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {alert.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      {alert.timestamp} &bull; Severity: {alert.severity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleAcknowledgeAlert(alert.id)}
                  className="mt-2 md:mt-0 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-colors"
                >
                  Acknowledge
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Compliance Table Section */}
      <section className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Compliance Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Compliance %
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Pending Issues
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Last Audit Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Next Due Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {complianceData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-800">{record.type}</td>
                <td className="px-6 py-4 text-gray-800">
                  {record.compliancePercentage}%
                </td>
                <td className="px-6 py-4 text-gray-800">{record.pendingIssues}</td>
                <td className="px-6 py-4 text-gray-800">{record.lastAuditDate}</td>
                <td className="px-6 py-4 text-gray-800">{record.nextDueDate}</td>
              </tr>
            ))}
            {complianceData.length === 0 && (
              <tr>
                <td className="px-6 py-4 text-center" colSpan={5}>
                  No compliance data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
