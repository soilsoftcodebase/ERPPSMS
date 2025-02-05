import { motion } from 'framer-motion';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Activity, CreditCard, Wallet } from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 65000 },
  { month: 'Feb', revenue: 72000 },
  { month: 'Mar', revenue: 68000 },
  { month: 'Apr', revenue: 85000 },
  { month: 'May', revenue: 92000 },
  { month: 'Jun', revenue: 88000 },
];

const expenseCategories = [
  { name: 'Salaries', value: 45000, color: '#FF6B6B' },
  { name: 'Rent', value: 15000, color: '#4ECDC4' },
  { name: 'Utilities', value: 8000, color: '#45B7D1' },
  { name: 'Marketing', value: 12000, color: '#96CEB4' },
];

const cashFlowData = [
  { month: 'Jan', inflow: 70000, outflow: 55000 },
  { month: 'Feb', inflow: 75000, outflow: 58000 },
  { month: 'Mar', inflow: 72000, outflow: 62000 },
  { month: 'Apr', inflow: 88000, outflow: 65000 },
  { month: 'May', inflow: 95000, outflow: 70000 },
  { month: 'Jun', inflow: 92000, outflow: 68000 },
];

function StatCard({ title, value, icon: Icon, trend }: { title: string; value: string; icon: any; trend?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="ml-1 text-sm">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
      </div>
    </motion.div>
  );
}

function FinanceDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Financial Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Revenue" value="$486,000" icon={DollarSign} trend={12} />
          <StatCard title="Total Expenses" value="$378,000" icon={CreditCard} trend={-8} />
          <StatCard title="Net Profit" value="$108,000" icon={TrendingUp} trend={15} />
          <StatCard title="Cash Flow" value="$92,000" icon={Wallet} trend={5} />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
            <LineChart width={500} height={300} data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </motion.div>

          {/* Expense Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
            <PieChart width={500} height={300}>
              <Pie
                data={expenseCategories}
                cx={250}
                cy={150}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {expenseCategories.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </motion.div>

          {/* Cash Flow Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2"
          >
            <h2 className="text-xl font-semibold mb-4">Cash Flow Analysis</h2>
            <BarChart width={1000} height={300} data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="inflow" fill="#4CAF50" name="Cash Inflow" />
              <Bar dataKey="outflow" fill="#FF5252" name="Cash Outflow" />
            </BarChart>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default FinanceDashboard;