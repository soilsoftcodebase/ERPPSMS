import { useState } from 'react';
import DataTable from '../components/DataTable';
import { alerts as initialAlerts } from '../lib/data';
import type { Alert } from '../lib/types';

export default function AlertManagement() {
  // State for alerts and selection
  const [alertsList, setAlertsList] = useState<Alert[]>(initialAlerts);
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // State for additional sections
  const [showRoles, setShowRoles] = useState(false);
  const [showSystemSetup, setShowSystemSetup] = useState(false);

  // State for dropdown selections in the roles section
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');

  // Dummy data for employees and roles
  const employees = [
    { id: 'emp1', name: 'Alice Johnson' },
    { id: 'emp2', name: 'Bob Smith' },
    { id: 'emp3', name: 'Charlie Davis' },
  ];
  const availableRoles = [
    { id: 'role1', name: 'Manager' },
    { id: 'role2', name: 'Supervisor' },
    { id: 'role3', name: 'Operator' },
  ];

  // Toggle selection for an alert
  const handleSelectAlert = (alertId: string) => {
    setSelectedAlerts(prev =>
      prev.includes(alertId)
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  // Simulate acknowledging selected alerts
  const handleAcknowledgeSelected = async () => {
    if (selectedAlerts.length === 0) return;
    setIsProcessing(true);
    try {
      setAlertsList(prev =>
        prev.map(alert =>
          selectedAlerts.includes(alert.id)
            ? { ...alert, status: 'acknowledged' }
            : alert
        )
      );
      setSelectedAlerts([]);
    } catch (error) {
      console.error('Error acknowledging alerts:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Simulate resolving selected alerts
  const handleResolveSelected = async () => {
    if (selectedAlerts.length === 0) return;
    setIsProcessing(true);
    try {
      setAlertsList(prev =>
        prev.map(alert =>
          selectedAlerts.includes(alert.id)
            ? { ...alert, status: 'resolved' }
            : alert
        )
      );
      setSelectedAlerts([]);
    } catch (error) {
      console.error('Error resolving alerts:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Stub functions for role management
  const handleAddRole = () => {
    // Replace with actual logic (e.g., an API call)
    console.log('Assign role to employee:', selectedEmployee);
  };

  const handleRevokeRole = () => {
    // Replace with actual logic (e.g., an API call)
    console.log('Revoke role:', selectedRole);
  };

  // Define DataTable columns with custom renderers
  const columns = [
    {
      key: 'select',
      label: '',
      render: (_: any, alert: Alert) => (
        <input
          type="checkbox"
          checked={selectedAlerts.includes(alert.id)}
          onChange={() => handleSelectAlert(alert.id)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          disabled={alert.status === 'resolved'}
        />
      )
    },
    { key: 'type', label: 'Type' },
    { key: 'message', label: 'Message' },
    {
      key: 'severity',
      label: 'Severity',
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === 'low'
              ? 'bg-blue-100 text-blue-800'
              : value === 'medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value}
        </span>
      )
    },
    { key: 'factory', label: 'Factory' },
    {
      key: 'createdAt',
      label: 'Created At',
      render: (value: string) => new Date(value).toLocaleString()
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === 'new'
              ? 'bg-red-100 text-red-800'
              : value === 'acknowledged'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {value}
        </span>
      )
    }
  ];

  // Summary counts for alerts
  const newAlertsCount = alertsList.filter(a => a.status === 'new').length;
  const acknowledgedAlertsCount = alertsList.filter(a => a.status === 'acknowledged').length;
  const resolvedAlertsCount = alertsList.filter(a => a.status === 'resolved').length;

  // Determine counts for selected alerts by status
  const selectedNewAlerts = selectedAlerts.filter(
    id => alertsList.find(a => a.id === id)?.status === 'new'
  ).length;
  const selectedAcknowledgedAlerts = selectedAlerts.filter(
    id => alertsList.find(a => a.id === id)?.status === 'acknowledged'
  ).length;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Alert Management
        </h1>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <button
            onClick={handleAcknowledgeSelected}
            disabled={isProcessing || selectedNewAlerts === 0}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isProcessing || selectedNewAlerts === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-yellow-600 text-white hover:bg-yellow-700'
            }`}
          >
            {isProcessing
              ? 'Processing...'
              : `Acknowledge Selected (${selectedNewAlerts})`}
          </button>
          <button
            onClick={handleResolveSelected}
            disabled={isProcessing || selectedAcknowledgedAlerts === 0}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isProcessing || selectedAcknowledgedAlerts === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isProcessing
              ? 'Processing...'
              : `Resolve Selected (${selectedAcknowledgedAlerts})`}
          </button>
        </div>
      </header>

      {/* Roles & System Setup Section at the Top */}
      <div className="border-t border-b border-gray-300 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <button
            onClick={() => setShowRoles(prev => !prev)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Roles
          </button>
          <button
            onClick={() => setShowSystemSetup(prev => !prev)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            System Setup
          </button>
        </div>

        {showRoles && (
          <div className="mb-4 p-4 bg-white rounded-lg shadow transition-all">
            <div className="flex flex-col md:flex-row md:justify-around gap-4">
              {/* Add Role Section */}
              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Select Employee to Add Role:
                </label>
                <select
                  value={selectedEmployee}
                  onChange={e => setSelectedEmployee(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select an employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddRole}
                  className="mt-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                  disabled={!selectedEmployee}
                >
                  Confirm Add Role
                </button>
              </div>

              {/* Revoke Role Section */}
              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Select Role to Revoke:
                </label>
                <select
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a role</option>
                  {availableRoles.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleRevokeRole}
                  className="mt-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                  disabled={!selectedRole}
                >
                  Confirm Revoke Role
                </button>
              </div>
            </div>
            <p className="mt-4 text-gray-600">Manage user roles and permissions.</p>
          </div>
        )}

        {showSystemSetup && (
          <div className="mb-4 p-4 bg-white rounded-lg shadow transition-all">
            <p className="text-gray-600">
              System setup configuration options go here.
            </p>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">New Alerts</h3>
          <p className="text-2xl font-semibold mt-2">{newAlertsCount}</p>
          {newAlertsCount > 0 && (
            <p className="text-sm text-red-600 mt-1">Requires attention</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Acknowledged</h3>
          <p className="text-2xl font-semibold mt-2">{acknowledgedAlertsCount}</p>
          {acknowledgedAlertsCount > 0 && (
            <p className="text-sm text-yellow-600 mt-1">In progress</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Resolved Today</h3>
          <p className="text-2xl font-semibold mt-2">{resolvedAlertsCount}</p>
          {resolvedAlertsCount > 0 && (
            <p className="text-sm text-green-600 mt-1">Completed</p>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <DataTable columns={columns} data={alertsList} />
      </div>
    </div>
  );
}
