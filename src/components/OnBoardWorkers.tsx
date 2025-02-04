import React from "react";
import { useForm } from "react-hook-form";

const OnBoardWorkers: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const factories = [
    { id: 1, name: "Factory A" },
    { id: 2, name: "Factory B" },
  ];

  const users = [
    { id: 1, name: "Supervisor A", role: "supervisor" },
    { id: 2, name: "Supervisor B", role: "supervisor" },
  ];

  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-3 mt-5">
        On-Board Workers
      </h2>
      <p className="mb-4 text-center text-gray-600">
        List of onboarded workers will be displayed here.
      </p>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full">
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
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email Address"
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-600">Phone</label>
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="Phone Number"
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-600">Address</label>
                <input
                  type="text"
                  {...register("address")}
                  placeholder="Residential Address"
                  className="w-full p-3 border rounded-md"
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
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-600">PAN</label>
                <input
                  type="file"
                  {...register("pan")}
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-600">Ration Card</label>
                <input
                  type="file"
                  {...register("rationCard")}
                  className="w-full p-3 border rounded-md"
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
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-600">IFSC Code</label>
                <input
                  type="text"
                  {...register("ifscCode")}
                  placeholder="IFSC Code"
                  className="w-full p-3 border rounded-md"
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
                  className="w-full p-3 border rounded-md"
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
                  className="w-full p-3 border rounded-md"
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
                  className="w-full p-3 border rounded-md"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add Worker
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnBoardWorkers;
