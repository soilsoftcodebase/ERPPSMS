import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { Share2, FileText } from "lucide-react";

// Define an Employee type
type Employee = {
  id: string;
  name: string;
  mobile: string;
  department: string;
  experience: number; // in years
};

// Dummy employee data
const initialEmployees: Employee[] = [
  {
    id: "emp1",
    name: "John Doe",
    mobile: "1234567890",
    department: "Sales",
    experience: 5,
  },
  {
    id: "emp2",
    name: "Jane Smith",
    mobile: "9876543210",
    department: "HR",
    experience: 3,
  },
  {
    id: "emp3",
    name: "Mike Johnson",
    mobile: "5551234567",
    department: "Engineering",
    experience: 7,
  },
  {
    id: "emp4",
    name: "Alice Brown",
    mobile: "1112223333",
    department: "Marketing",
    experience: 4,
  },
];

// Dummy department options
const departments = ["Sales", "HR", "Engineering", "Marketing"];

// Employee form validation schema using zod
const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile: z.string().min(1, "Mobile is required"),
  department: z.string().min(1, "Department is required"),
  experience: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(0, "Experience must be non-negative")
  ),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

export default function HRMEmployee() {
  // State for employees list
  const [employeesList, setEmployeesList] =
    useState<Employee[]>(initialEmployees);

  // States for filtering
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // React Hook Form setup for adding a new employee
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  // Columns for the DataTable
  const columns = [
    { key: "name", label: "Name" },
    { key: "mobile", label: "Mobile" },
    { key: "department", label: "Department" },
    {
      key: "experience",
      label: "Experience",
      render: (value: number) => `${value} years`,
    },
    {
      key: "actions",
      label: "Action",
      render: (_: any, employee: Employee) => (
        <button className="text-blue-600 hover:text-blue-800">Edit</button>
      ),
    },
  ];

  // Filter the employees list based on select box choices
  const filteredData = employeesList.filter((emp) => {
    return (
      (selectedDepartment === "" || emp.department === selectedDepartment) &&
      (selectedEmployee === "" || emp.id === selectedEmployee)
    );
  });

  // Handle form submission for adding a new employee
  const onSubmit = (data: EmployeeFormData) => {
    // Generate a new unique ID (simple approach)
    const newId = `emp${employeesList.length + 1}`;
    const newEmployee: Employee = { id: newId, ...data };
    setEmployeesList((prev) => [...prev, newEmployee]);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Title */}
        <h1 className="text-xl font-bold">Employees</h1>

        {/* Right side: Share and Export as PDF */}
        <div className="flex space-x-4">
          <button className="flex items-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
            <Share2 size={16} className="mr-2" />
            Share
          </button>
          <button className="flex items-center bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
            <FileText size={16} className="mr-2" />
            Export as PDF
          </button>
        </div>
      </div>

      {/* Add Employee Button */}
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-4 flex space-x-4">
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Select Employee</option>
          {employeesList.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <DataTable columns={columns} data={filteredData} />
      </div>

      {/* Modal for Adding Employee */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          reset();
        }}
        title="Add Employee"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Employee Name"
              className="mt-1 block w-full p-2 border rounded-md"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile
            </label>
            <input
              type="text"
              {...register("mobile")}
              placeholder="Mobile Number"
              className="mt-1 block w-full p-2 border rounded-md"
            />
            {errors.mobile && (
              <p className="mt-1 text-sm text-red-600">
                {errors.mobile.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              {...register("department")}
              className="mt-1 block w-full p-2 border rounded-md"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1 text-sm text-red-600">
                {errors.department.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <input
              type="number"
              step="0.1"
              {...register("experience")}
              placeholder="Years of Experience"
              className="mt-1 block w-full p-2 border rounded-md"
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-600">
                {errors.experience.message}
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Employee
            </button>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                reset();
              }}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
