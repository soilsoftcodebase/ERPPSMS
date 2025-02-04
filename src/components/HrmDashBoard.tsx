import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, UserMinus, Calendar, Clock, Award, DollarSign } from 'lucide-react';

const employeeData = [
  { name: 'Jan', count: 150 },
  { name: 'Feb', count: 180 },
  { name: 'Mar', count: 200 },
  { name: 'Apr', count: 220 },
  { name: 'May', count: 250 },
];

const attendanceData = [
  { name: 'Present', value: 85 },
  { name: 'Absent', value: 15 },
];

const performanceData = [
  { name: 'Excellent', value: 30 },
  { name: 'Good', value: 45 },
  { name: 'Average', value: 20 },
  { name: 'Poor', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function StatCard({ icon: Icon, title, value, color }: { icon: any, title: string, value: string, color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
    </motion.div>
  );
}

function HRMDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">HR Management Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Users} title="Total Employees" value="1,234" color="border-blue-500" />
          <StatCard icon={UserCheck} title="Active Employees" value="1,180" color="border-green-500" />
          <StatCard icon={UserMinus} title="Inactive Employees" value="54" color="border-red-500" />
          <StatCard icon={Calendar} title="New Hires" value="23" color="border-purple-500" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Employee Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Employee Growth Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={employeeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Attendance Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Attendance Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Performance Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Performance Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8">
                  {performanceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 rounded-lg flex items-center gap-2 hover:bg-blue-100 transition-colors">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-medium">Manage Leave</span>
              </button>
              <button className="p-4 bg-green-50 rounded-lg flex items-center gap-2 hover:bg-green-100 transition-colors">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">Time Tracking</span>
              </button>
              <button className="p-4 bg-purple-50 rounded-lg flex items-center gap-2 hover:bg-purple-100 transition-colors">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-purple-600 font-medium">Performance</span>
              </button>
              <button className="p-4 bg-orange-50 rounded-lg flex items-center gap-2 hover:bg-orange-100 transition-colors">
                <DollarSign className="w-5 h-5 text-orange-600" />
                <span className="text-orange-600 font-medium">Payroll</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HRMDashboard;