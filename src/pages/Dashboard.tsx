import { useState } from "react";
import {
  Users,
  Factory,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Clock,
  UserCheck,
  Calendar,
  Target,
  Award,
  TrendingDown,
  Activity,
  Zap,
  Shield,
  Bell,
  Filter,
} from "lucide-react";
import DataTable from "../components/DataTable";
import { workers, factories, invoices, alerts } from "../lib/data";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("week");
  const recentAlerts = alerts.slice(0, 5);

  // Calculate attendance statistics
  const totalWorkers = workers.length;
  const presentWorkers = Math.floor(workers.length * 0.85);
  const onLeave = Math.floor(workers.length * 0.15);

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

  const barData = {
    labels: ["Factory A", "Factory B", "Factory C", "Factory D"],
    datasets: [
      {
        label: "Efficiency (%)",
        data: [85, 92, 78, 88],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#F44336"],
      },
    ],
  };

  const pieData = {
    labels: ["Present", "On Leave"],
    datasets: [
      {
        data: [presentWorkers, onLeave],
        backgroundColor: ["#4CAF50", "#FF9800"],
      },
    ],
  };

  const productivityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "This Week",
        data: [88, 92, 85, 89, 90, 85, 87],
        borderColor: "#4CAF50",
        tension: 0.4,
        fill: false,
      },
      {
        label: "Last Week",
        data: [82, 87, 83, 86, 84, 80, 82],
        borderColor: "#9E9E9E",
        tension: 0.4,
        fill: false,
        borderDash: [5, 5],
      },
    ],
  };

  const qualityMetricsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Defect Rate (%)",
        data: [2.1, 1.8, 1.5, 1.7, 1.3, 1.1],
        borderColor: "#F44336",
        backgroundColor: "rgba(244, 67, 54, 0.1)",
        fill: true,
      },
      {
        label: "Quality Score",
        data: [92, 93, 94, 93, 95, 96],
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.1)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Page Title and Actions */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 text-sm">
            Welcome to your dashboard overview
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Bell size={20} />
            Notifications
          </button>
          <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-lg">
        <div className="flex gap-4">
          {["day", "week", "month", "quarter"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg ${
                timeRange === range
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition-colors`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
          <Users className="w-10 h-10 mb-4 text-blue-600" />
          <h3 className="text-blue-900 text-sm font-medium">Total Workers</h3>
          <p className="text-3xl font-bold mt-2">{workers.length}</p>
          <p className="text-xs text-green-700 mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-purple-100 p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
          <Factory className="w-10 h-10 mb-4 text-purple-600" />
          <h3 className="text-purple-900 text-sm font-medium">
            Active Factories
          </h3>
          <p className="text-3xl font-bold mt-2">
            {factories.filter((f) => f.status === "active").length}
          </p>
          <p className="text-xs text-green-700 mt-2">↑ 2 new this month</p>
        </div>

        <div className="bg-green-100 p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
          <DollarSign className="w-10 h-10 mb-4 text-green-600" />
          <h3 className="text-green-900 text-sm font-medium">
            Monthly Payroll
          </h3>
          <p className="text-3xl font-bold mt-2">$234,500</p>
          <p className="text-xs text-green-700 mt-2">On track</p>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
          <AlertTriangle className="w-10 h-10 mb-4 text-yellow-600" />
          <h3 className="text-yellow-900 text-sm font-medium">Active Alerts</h3>
          <p className="text-3xl font-bold mt-2">
            {alerts.filter((a) => a.status === "new").length}
          </p>
          <p className="text-xs text-red-700 mt-2">↑ 5 new alerts</p>
        </div>

        <div className="bg-emerald-100 p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
          <UserCheck className="w-10 h-10 mb-4 text-emerald-600" />
          <h3 className="text-emerald-900 text-sm font-medium">
            Present Today
          </h3>
          <p className="text-3xl font-bold mt-2">
            {presentPercentage.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600">({presentWorkers} workers)</p>
        </div>

        <div className="bg-orange-100 p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
          <Calendar className="w-10 h-10 mb-4 text-orange-600" />
          <h3 className="text-orange-900 text-sm font-medium">On Leave</h3>
          <p className="text-3xl font-bold mt-2">
            {leavePercentage.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600">({onLeave} workers)</p>
        </div>
      </div>

      {/* Additional KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-indigo-100 p-6 rounded-lg shadow-lg">
          <Target className="w-8 h-8 text-indigo-600 mb-4" />
          <h3 className="text-indigo-900 text-sm font-medium">
            Production Target
          </h3>
          <p className="text-2xl font-bold mt-2">94.5%</p>
          <div className="w-full bg-indigo-200 rounded-full h-2 mt-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: "94.5%" }}
            ></div>
          </div>
        </div>

        <div className="bg-pink-100 p-6 rounded-lg shadow-lg">
          <Award className="w-8 h-8 text-pink-600 mb-4" />
          <h3 className="text-pink-900 text-sm font-medium">Quality Score</h3>
          <p className="text-2xl font-bold mt-2">96.8%</p>
          <div className="w-full bg-pink-200 rounded-full h-2 mt-2">
            <div
              className="bg-pink-600 h-2 rounded-full"
              style={{ width: "96.8%" }}
            ></div>
          </div>
        </div>

        <div className="bg-cyan-100 p-6 rounded-lg shadow-lg">
          <TrendingDown className="w-8 h-8 text-cyan-600 mb-4" />
          <h3 className="text-cyan-900 text-sm font-medium">Defect Rate</h3>
          <p className="text-2xl font-bold mt-2">1.2%</p>
          <p className="text-xs text-green-700 mt-2">↓ 0.3% from last month</p>
        </div>

        <div className="bg-amber-100 p-6 rounded-lg shadow-lg">
          <Zap className="w-8 h-8 text-amber-600 mb-4" />
          <h3 className="text-amber-900 text-sm font-medium">
            Energy Efficiency
          </h3>
          <p className="text-2xl font-bold mt-2">89.3%</p>
          <p className="text-xs text-green-700 mt-2">↑ 2.1% improvement</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-700">
              Factory Efficiency
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                Export
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                Details
              </button>
            </div>
          </div>
          <Chart type="bar" data={barData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-700">
              Attendance Overview
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                Export
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                Details
              </button>
            </div>
          </div>
          <Chart type="pie" data={pieData} />
        </div>
      </div>

      {/* New Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-700">
              Productivity Trends
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                Export
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                Details
              </button>
            </div>
          </div>
          <Chart type="line" data={productivityData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-700">Quality Metrics</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                Export
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                Details
              </button>
            </div>
          </div>
          <Chart type="line" data={qualityMetricsData} />
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
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
                className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
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

        <div className="bg-white p-6 rounded-lg shadow-lg">
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
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-700">Recent Alerts</h2>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              5 New
            </span>
          </div>
          <button
            onClick={() => (window.location.href = "/alerts")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All
          </button>
        </div>
        <DataTable columns={alertColumns} data={recentAlerts} />
      </div>

      {/* Safety Metrics */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Shield className="text-green-600 w-6 h-6" />
            <h2 className="text-lg font-bold text-gray-700">Safety Metrics</h2>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Details
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600">
              Days Without Incidents
            </h3>
            <p className="text-3xl font-bold text-green-700 mt-2">145</p>
            <p className="text-xs text-green-600 mt-1">
              ↑ Best record this year
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600">
              Safety Compliance
            </h3>
            <p className="text-3xl font-bold text-blue-700 mt-2">98.5%</p>
            <p className="text-xs text-blue-600 mt-1">↑ 2.1% from last month</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600">
              Safety Training
            </h3>
            <p className="text-3xl font-bold text-purple-700 mt-2">96.8%</p>
            <p className="text-xs text-purple-600 mt-1">
              Workers fully certified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
