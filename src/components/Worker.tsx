import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { workers, factories, users } from "../lib/data";
import type { Worker } from "../lib/types";
import { Phone, MessageSquare } from "lucide-react";

// ✅ Worker form validation schema
const workerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().min(1, "Phone number is required"),
  emergencyContact: z.string().min(1, "Emergency Contact is required"),
  aadhar: z.any().optional(),
  pan: z.any().optional(),
  rationCard: z.any().optional(),
  factory: z.string().min(1, "Factory is required"),
  supervisor: z.string().min(1, "Supervisor is required"),
  shift: z.string().min(1, "Shift is required"),
  bankAccountName: z.string().min(1, "Bank Account Name is required"),
  bankAccountNumber: z.string().min(1, "Bank Account Number is required"),
  bankName: z.string().min(1, "Bank Name is required"),
  status: z.enum(["On-boarding", "Off-boarding"]),
  hourlyRate: z.number().min(0, "Hourly rate must be positive"),
});

type WorkerFormData = z.infer<typeof workerSchema>;

export default function Workers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkerFormData>({
    resolver: zodResolver(workerSchema),
  });

  const handleEdit = (worker: Worker) => {
    setEditingWorker(worker);
    reset(worker);
    setIsModalOpen(true);
  };

  const onSubmit = async (data: WorkerFormData) => {
    console.log(editingWorker ? "Updating worker:" : "Creating worker:", data);
    setIsModalOpen(false);
    reset();
  };

  const columns = [
    { key: "name", label: "Name", className: "w-32 md:w-48" },
    { key: "phone", label: "Phone", className: "w-32 md:w-48" },
    { key: "factory", label: "Factory", className: "w-32 md:w-48" },
    { key: "supervisor", label: "Supervisor", className: "w-32 md:w-48" },
    { key: "shift", label: "Shift", className: "w-32 md:w-48" },
    {
      key: "status",
      label: "Status",
      className: "w-24 text-center",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
            value === "On-board"
              ? "bg-green-500 text-white" // ✅ Green for On-board
              : value === "Off-board"
              ? "bg-red-500 text-white" // ✅ Red for Off-board
              : "bg-gray-300 text-gray-800" // Default gray for any other status
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "hourlyRate",
      label: "Hourly Wage",
      className: "w-32 md:w-48",
      render: (value: number) => `₹${value.toFixed(2)}`,
    },
    {
      key: "actions",
      label: "Actions",
      className: "w-32 text-center",
      render: (_: any, worker: Worker) => (
        <div className="flex space-x-2 justify-center">
          <button
            onClick={() => handleEdit(worker)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => (window.location.href = `tel:${worker.phone}`)}
            className="text-green-600 hover:text-green-800"
          >
            <Phone size={16} />
          </button>
          <button
            onClick={() => (window.location.href = `sms:${worker.phone}`)}
            className="text-purple-600 hover:text-purple-800"
          >
            <MessageSquare size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Workers</h1>
        <button
          onClick={() => {
            setEditingWorker(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Worker
        </button>
      </div>

      {/* ✅ Responsive Table with Horizontal Scroll for Small Screens */}
      <div className="overflow-x-auto">
        <DataTable columns={columns} data={workers} />
      </div>

      {/* ✅ Full-Screen Add/Edit Worker Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          reset();
        }}
        title={editingWorker ? "Edit Worker" : "Add Worker"}
        fullScreen={true} // ✅ Full-Screen Modal
      >
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Data */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600">
                    Name (as per Aadhaar)
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Full Name"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Email Address"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Phone</label>
                  <input
                    type="text"
                    {...register("phone")}
                    placeholder="Phone Number"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Address</label>
                  <input
                    type="text"
                    {...register("address")}
                    placeholder="Residential Address"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* KYC Details */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                KYC Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600">Aadhaar</label>
                  <input
                    type="file"
                    {...register("aadhar")}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">PAN</label>
                  <input
                    type="file"
                    {...register("pan")}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Ration Card</label>
                  <input
                    type="file"
                    {...register("rationCard")}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Bank Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    {...register("bankAccount")}
                    placeholder="Bank Account Number"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">IFSC Code</label>
                  <input
                    type="text"
                    {...register("ifscCode")}
                    placeholder="IFSC Code"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Factory Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Factory Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600">Factory</label>
                  <select
                    {...register("factory")}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Factory</option>
                    {factories.map((factory) => (
                      <option key={factory.id} value={factory.name}>
                        {factory.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600">Supervisor</label>
                  <select
                    {...register("supervisor")}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Supervisor</option>
                    {users
                      .filter((user) => user.role === "supervisor")
                      .map((supervisor) => (
                        <option key={supervisor.id} value={supervisor.name}>
                          {supervisor.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600">Shift</label>
                  <input
                    type="text"
                    {...register("shift")}
                    placeholder="Morning / Evening"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {editingWorker ? "Update" : "Add"} Worker
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
