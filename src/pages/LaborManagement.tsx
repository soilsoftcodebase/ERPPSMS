import React, { useState } from 'react';
import Modal from '../components/Modal';
import WorkerDashboard from '../components/WorkerDashboard';
import OnBoardWorkers from '../components/OnBoardWorkers';
import OffBoardWorkers from '../components/OffBoardWorkers';
import type { Worker } from '../lib/types';

export default function LaborManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard'); // ✅ Worker Dashboard is Default

  const tabs = [
    { id: 'dashboard', label: 'Worker Dashboard' },
    { id: 'workers', label: 'Workers' },
    { id: 'onboard', label: 'On-board Workers' },
    { id: 'offboard', label: 'Off-board Workers' },
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
        {activeTab === 'dashboard' && <WorkerDashboard />}
        {activeTab === 'workers' && (
          <div className="text-gray-600">
            <h2 className="text-xl font-semibold mb-4">List of Workers</h2>
            <p>Worker data goes here...</p>
          </div>
        )}
        {activeTab === 'onboard' && <OnBoardWorkers />}
        {activeTab === 'offboard' && <OffBoardWorkers />}
      </div>

      {/* ✅ Add Worker Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {
            setEditingWorker(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          + Add Worker
        </button>
      </div>

      {/* ✅ Add Worker Modal */}
    </div>
  );
}
