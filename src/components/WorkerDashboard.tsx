import React, { useState } from 'react';
import { workers, factories, invoices, alerts } from '../lib/data';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Pie Chart components
ChartJS.register(ArcElement, Tooltip, Legend);

// Sample attendance data
const attendanceData = [
  { date: '2024-02-01', present: 80, absent: 20 },
  { date: '2024-02-02', present: 85, absent: 15 },
  { date: '2024-02-03', present: 90, absent: 10 },
  { date: '2024-02-04', present: 78, absent: 22 },
  { date: '2024-02-05', present: 82, absent: 18 },
  { date: '2024-03-01', present: 88, absent: 12 },
  { date: '2024-03-02', present: 92, absent: 8 },
  { date: '2024-03-03', present: 87, absent: 13 },
];

// Sample performance data
const performanceData = [
  { date: '2024-02-01', efficiency: 75, productivity: 85, quality: 90 },
  { date: '2024-02-02', efficiency: 80, productivity: 88, quality: 92 },
  { date: '2024-02-03', efficiency: 78, productivity: 82, quality: 88 },
  { date: '2024-02-04', efficiency: 85, productivity: 90, quality: 94 },
  { date: '2024-02-05', efficiency: 82, productivity: 87, quality: 91 },
  { date: '2024-03-01', efficiency: 79, productivity: 84, quality: 89 },
  { date: '2024-03-02', efficiency: 83, productivity: 86, quality: 93 },
  { date: '2024-03-03', efficiency: 81, productivity: 85, quality: 90 },
];

export default function Dashboard() {
  const [filterType, setFilterType] = useState('month');
  const [selectedValue, setSelectedValue] = useState('2024-02');

  // Filter attendance data based on selected date/month/year
  const filteredAttendance = attendanceData.filter((entry) => {
    if (filterType === 'date') return entry.date === selectedValue;
    if (filterType === 'month') return entry.date.startsWith(selectedValue);
    if (filterType === 'year') return entry.date.startsWith(selectedValue);
    return true;
  });

  // Filter performance data based on selected date/month/year
  const filteredPerformance = performanceData.filter((entry) => {
    if (filterType === 'date') return entry.date === selectedValue;
    if (filterType === 'month') return entry.date.startsWith(selectedValue);
    if (filterType === 'year') return entry.date.startsWith(selectedValue);
    return true;
  });

  // Calculate totals for attendance
  const totalPresent = filteredAttendance.reduce(
    (acc, entry) => acc + entry.present,
    0
  );
  const totalAbsent = filteredAttendance.reduce(
    (acc, entry) => acc + entry.absent,
    0
  );

  // Calculate averages for performance metrics
  const avgEfficiency =
    filteredPerformance.reduce((acc, entry) => acc + entry.efficiency, 0) /
    (filteredPerformance.length || 1);
  const avgProductivity =
    filteredPerformance.reduce((acc, entry) => acc + entry.productivity, 0) /
    (filteredPerformance.length || 1);
  const avgQuality =
    filteredPerformance.reduce((acc, entry) => acc + entry.quality, 0) /
    (filteredPerformance.length || 1);

  // Pie Chart Data for Attendance
  const attendanceChartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'Attendance',
        data: [totalPresent, totalAbsent],
        backgroundColor: ['#34D399', '#EF4444'], // Green & Red
        hoverOffset: 4,
      },
    ],
  };

  // Pie Chart Data for Performance Metrics
  const performanceChartData = {
    labels: ['Efficiency', 'Productivity', 'Quality'],
    datasets: [
      {
        label: 'Performance',
        data: [avgEfficiency, avgProductivity, avgQuality],
        backgroundColor: ['#3B82F6', '#FBBF24', '#10B981'], // Blue, Yellow, Green
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-bold mb-6">
        Workers Dashboard Overview
      </h1>

      {/* Filter Options (Used for Both Attendance & Performance) */}
      <div className="mb-4 flex space-x-4 justify-center">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="date">Filter by Date</option>
          <option value="month">Filter by Month</option>
          <option value="year">Filter by Year</option>
        </select>

        {filterType === 'date' && (
          <input
            type="date"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="border p-2 rounded"
          />
        )}

        {filterType === 'month' && (
          <input
            type="month"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="border p-2 rounded"
          />
        )}

        {filterType === 'year' && (
          <input
            type="number"
            value={selectedValue}
            min="2020"
            max="2030"
            onChange={(e) => setSelectedValue(e.target.value)}
            className="border p-2 rounded w-20"
          />
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Labor Attendance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Labor Attendance</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            {filteredAttendance.length > 0 ? (
              <Pie data={attendanceChartData} />
            ) : (
              <p className="text-gray-500">
                No data available for this filter.
              </p>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            {filteredPerformance.length > 0 ? (
              <Pie data={performanceChartData} />
            ) : (
              <p className="text-gray-500">
                No data available for this filter.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
