import { Share2, FileText } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Define the metric data for the table
const metricsData = [
  { metric: "Factories", value: 60 },
  { metric: "Active Contracts", value: 65 },
  { metric: "Pending Requests", value: 12 },
  { metric: "Total Deployed Workers", value: 1000 },
  { metric: "Upcoming Contract Expiry", value: 8 },
  { metric: "Client Satisfaction Score", value: 98365124 },
];

// Dummy data for the bar chart (for example, active contracts over a few months)
const barChartData = [
  { name: "Jan", activeContracts: 10 },
  { name: "Feb", activeContracts: 20 },
  { name: "Mar", activeContracts: 30 },
  { name: "Apr", activeContracts: 40 },
  { name: "May", activeContracts: 50 },
  { name: "Jun", activeContracts: 65 },
];

// Dummy data for the pie chart (for example, distribution among a few metrics)
const pieChartData = [
  { name: "Factories", value: 60 },
  { name: "Active Contracts", value: 65 },
  { name: "Pending Requests", value: 12 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function CRMDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">CRM Dashboard</h1>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Share2 size={16} className="mr-2" />
            Share
          </button>
          <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            <FileText size={16} className="mr-2" />
            Export as PDF
          </button>
        </div>
      </header>

      {/* Metrics Table */}
      <section className="mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b font-medium text-gray-700 text-left">Metric</th>
                <th className="px-4 py-2 border-b font-medium text-gray-700 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {metricsData.map((item) => (
                <tr key={item.metric} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{item.metric}</td>
                  <td className="px-4 py-2 border-b">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Active Contracts Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="activeContracts" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Metrics Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
