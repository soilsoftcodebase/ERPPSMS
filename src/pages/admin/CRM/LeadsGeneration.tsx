import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Define the shape of a lead object
interface Lead {
  id: number;
  title: string;
  description: string;
  requiredCount: number;
  skills: string;
  date: string;
}

// Sample data for the leads table
const leads: Lead[] = [
  {
    id: 1,
    title: "Need 100 Laborers for Factory Shift",
    description:
      "Looking for 100 experienced laborers to operate assembly lines and machinery in a high-volume factory. Must be reliable and punctual.",
    requiredCount: 100,
    skills: "Assembly Line, Machinery Operation",
    date: "2025-03-01",
  },
  {
    id: 2,
    title: "20 Skilled Welders Required",
    description:
      "Urgent requirement for 20 welders specialized in heavy fabrication work. Experience in metal fabrication and welding safety is a must.",
    requiredCount: 20,
    skills: "Welding, Fabrication",
    date: "2025-03-05",
  },
  {
    id: 3,
    title: "50 Quality Inspectors Needed",
    description:
      "We require 50 quality inspectors to ensure products meet the company’s high-quality standards. Prior experience in quality control is preferred.",
    requiredCount: 50,
    skills: "Quality Control, Inspection",
    date: "2025-03-10",
  },
  {
    id: 4,
    title: "30 Packaging Experts",
    description:
      "Looking for 30 experts in packaging and logistics. The role involves efficient packaging of finished products and coordination with the shipping department.",
    requiredCount: 30,
    skills: "Packaging, Logistics",
    date: "2025-03-12",
  },
];

// Sample data for market trends (in-demand skills)
const marketTrendsData = [
  { name: "Machinery Operation", value: 400 },
  { name: "Welding", value: 300 },
  { name: "Assembly Line", value: 300 },
  { name: "Quality Control", value: 200 },
  { name: "Packaging", value: 100 },
];

// Colors for each slice in the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF"];

const LeadGeneration: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">AI-Enhanced Lead Generation</h1>
      <p className="mb-6">
        Explore current leads for factory work and view market trends that help
        suppliers understand which skills are in demand.
      </p>

      {/* Leads Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Leads Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Description</th>
                <th className="py-2 px-4 border-b text-left">Required Count</th>
                <th className="py-2 px-4 border-b text-left">Skills</th>
                <th className="py-2 px-4 border-b text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{lead.id}</td>
                  <td className="py-2 px-4 border-b">{lead.title}</td>
                  <td className="py-2 px-4 border-b">{lead.description}</td>
                  <td className="py-2 px-4 border-b">{lead.requiredCount}</td>
                  <td className="py-2 px-4 border-b">{lead.skills}</td>
                  <td className="py-2 px-4 border-b">{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Market Trends Pie Chart */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Market Trends</h2>
        <p className="mb-4">
          The pie chart below illustrates current market demands based on
          in-demand skills.
        </p>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={marketTrendsData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {marketTrendsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default LeadGeneration;
