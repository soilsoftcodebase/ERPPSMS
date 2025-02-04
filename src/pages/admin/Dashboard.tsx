import React from "react";
import {
  Users,
  Factory,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  FileText,
  Clock,
  UserCheck,
  Calendar,
} from "lucide-react";
import DataTable from "../../components/DataTable";
import { workers, factories, alerts } from "../../lib/data";

export default function AdminDashboard() {
  const recentAlerts = alerts.slice(0, 5);

  // Calculate attendance statistics
  const totalWorkers = workers.length;
  const presentWorkers = Math.floor(workers.length * 0.85); // 85% present
  const onLeave = Math.floor(workers.length * 0.15); // 15% on leave

  const presentPercentage = (presentWorkers / totalWorkers) * 100;
  const leavePercentage = (onLeave / totalWorkers) * 100;

  const alertColumns = [
    { key: "type", label: "Type" },
    { key: "factory", label: "Factory" },
    {
      key: "severity",
      label: "Severity",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === "low"
              ? "bg-blue-200 text-blue-900"
              : value === "medium"
              ? "bg-yellow-200 text-yellow-900"
              : "bg-red-200 text-red-900"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === "new"
              ? "bg-red-200 text-red-900"
              : value === "acknowledged"
              ? "bg-yellow-200 text-yellow-900"
              : "bg-green-200 text-green-900"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Overview of all operations and metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <Users className="w-10 h-10 mb-4 text-blue-600" />
          <h3 className="text-blue-900 text-sm font-medium">Total Workers</h3>
          <p className="text-3xl font-bold mt-2">{workers.length}</p>
          <p className="text-xs text-green-700 mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-purple-100 p-6 rounded-lg shadow-md">
          <Factory className="w-10 h-10 mb-4 text-purple-600" />
          <h3 className="text-purple-900 text-sm font-medium">
            Active Factories
          </h3>
          <p className="text-3xl font-bold mt-2">
            {factories.filter((f) => f.status === "active").length}
          </p>
          <p className="text-xs text-green-700 mt-2">↑ 2 new this month</p>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
          <AlertTriangle className="w-10 h-10 mb-4 text-yellow-600" />
          <h3 className="text-yellow-900 text-sm font-medium">Active Alerts</h3>
          <p className="text-3xl font-bold mt-2">
            {alerts.filter((a) => a.status === "new").length}
          </p>
          <p className="text-xs text-red-700 mt-2">↑ 5 new alerts</p>
        </div>

        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <DollarSign className="w-10 h-10 mb-4 text-green-600" />
          <h3 className="text-green-900 text-sm font-medium">
            Monthly Payroll
          </h3>
          <p className="text-3xl font-bold mt-2">$234,500</p>
          <p className="text-xs text-green-700 mt-2">On track</p>
        </div>

        <div className="bg-emerald-100 p-6 rounded-lg shadow-md">
          <UserCheck className="w-10 h-10 mb-4 text-emerald-600" />
          <h3 className="text-emerald-900 text-sm font-medium">
            Present Today
          </h3>
          <p className="text-3xl font-bold mt-2">
            {presentPercentage.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600">({presentWorkers} workers)</p>
        </div>

        <div className="bg-orange-100 p-6 rounded-lg shadow-md">
          <Calendar className="w-10 h-10 mb-4 text-orange-600" />
          <h3 className="text-orange-900 text-sm font-medium">On Leave</h3>
          <p className="text-3xl font-bold mt-2">
            {leavePercentage.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600">({onLeave} workers)</p>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-700">
              Factory Performance
            </h2>
            <TrendingUp className="text-green-600" />
          </div>
          <div className="space-y-4">
            {factories.map((factory) => (
              <div
                key={factory.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-gray-800">{factory.name}</p>
                  <p className="text-sm text-gray-500">
                    {factory.workers} workers
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-green-700">92%</p>
                    <p className="text-sm text-gray-500">Efficiency</p>
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-700">
              Today's Overview
            </h2>
            <Clock className="text-blue-600" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-4xl font-bold text-green-700">
                {presentPercentage.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600">
                Present ({presentWorkers} workers)
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-4xl font-bold text-orange-700">
                {leavePercentage.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600">
                On Leave ({onLeave} workers)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-700">Recent Alerts</h2>
          <button
            onClick={() => (window.location.href = "/alerts")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All
          </button>
        </div>
        <DataTable columns={alertColumns} data={recentAlerts} />
      </div>
    </div>
  );
}
