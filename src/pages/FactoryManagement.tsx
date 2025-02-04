import { useState } from 'react';
import Workers from '../components/Worker';
import HRMDashboard from '../components/HrmDashBoard';

export default function LaborManagement() {
  const [activeTab, setActiveTab] = useState<string>('hrmdashboard'); // ✅ Worker Dashboard is Default

  const tabs = [
    { id: 'hrmdashboard', label: 'HRM Dashboard' },
    { id: 'workers', label: 'Employees' },
  ];

  return (
    <div className="p-4 w-full">
      {/* ✅ Navigation Tabs */}
      <div className="flex border-b mb-6 space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-gray-600 hover:text-blue-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ✅ Tab Content */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        {activeTab === 'hrmdashboard' && <HRMDashboard />}
        {activeTab === 'workers' && <Workers />}
      </div>
    </div>
  );
}

