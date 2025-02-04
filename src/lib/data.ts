import {
  Worker,
  Factory,
  User,
  Invoice,
  Alert,
  AdminAction,
  WageUpdate,
  Performance,
} from './types';

// Generate mock data for 800 workers with Marathi names
const marathiWorkerNames = [
  'Ramesh Patil',
  'Suresh Jadhav',
  'Mangesh Kulkarni',
  'Ganesh Pawar',
  'Vikas Joshi',
  'Rajesh Shinde',
  'Prakash More',
  'Sachin Bhosale',
  'Sunil Deshmukh',
  'Anil Chavan',
];

export const workers: Worker[] = Array.from({ length: 800 }, (_, i) => ({
  id: (i + 1).toString(),
  name: marathiWorkerNames[i % marathiWorkerNames.length],
  email: `worker${i + 1}@example.com`,
  phone: `555-0${1000 + i}`,
  factory: `Factory ${(i % 5) + 1}`,
  role: 'Worker',
  status: i % 2 === 0 ? 'On-board' : 'Off-board',
  statusColor: i % 2 === 0 ? 'green' : 'red',
  supervisor: `Supervisor ${(i % 80) + 1}`,
  hourlyRate: 1200 + (i % 500),
  startDate: `2023-01-${(i % 30) + 1}`,
  department: ['Production', 'Assembly', 'Quality Control'][i % 3],
  shiftTimings:
    i % 3 === 0
      ? '06:00 - 14:00'
      : i % 3 === 1
      ? '14:00 - 22:00'
      : '22:00 - 06:00',
}));

// Generate mock data for 80 supervisors with Marathi names
const marathiSupervisorNames = [
  'Shivaji Pawar',
  'Vishal Deshmukh',
  'Mahesh Shinde',
  'Dinesh Kulkarni',
  'Satish Jadhav',
];

export const users: User[] = Array.from({ length: 80 }, (_, i) => ({
  id: (i + 1).toString(),
  name: marathiSupervisorNames[i % marathiSupervisorNames.length],
  email: `supervisor${i + 1}@example.com`,
  role: 'supervisor',
  status: 'active',
  factory: `Factory ${(i % 5) + 1}`,
}));

// Mock data for factories
export const factories: Factory[] = [
  {
    id: '1',
    name: 'Factory A',
    location: '123 Industrial Ave, Manufacturing District',
    supervisor: 'Shivaji Pawar',
    workers: 160,
    status: 'active',
    capacity: 200,
    operatingHours: {
      start: '08:00',
      end: '17:00',
    },
    departments: ['Production', 'Assembly', 'Quality Control'],
    contactDetails: {
      phone: '555-0100',
      email: 'factory.a@example.com',
      address:
        '123 Industrial Ave, Manufacturing District, Industrial City, 12345',
    },
    facilities: [
      'Main Production Hall',
      'Assembly Line A',
      'Assembly Line B',
      'Quality Control Lab',
      'Worker Break Room',
      'Storage Warehouse',
    ],
    equipmentCount: 75,
    safetyRating: 95,
    certifications: [
      'ISO 9001:2015',
      'OHSAS 18001',
      'Environmental Management ISO 14001',
    ],
    monthlyCapacity: 10000,
    yearEstablished: 2020,
  },
];

// Mock data for invoices
export const invoices: Invoice[] = Array.from({ length: 800 }, (_, i) => ({
  id: (i + 1).toString(),
  factory: `Factory ${(i % 5) + 1}`,
  amount: 4000000 + i * 5000,
  status: i % 3 === 0 ? 'pending' : 'paid',
  dueDate: `2024-03-${(i % 30) + 1}`,
  createdAt: `2024-02-${(i % 28) + 1}`,
  paymentMethod: i % 2 === 0 ? 'bank_transfer' : 'cash',
}));

// Mock data for alerts
export const alerts: Alert[] = Array.from({ length: 800 }, (_, i) => ({
  id: (i + 1).toString(),
  type: 'Late Check-in',
  message: `Worker ${i + 1} reported late at Factory ${(i % 5) + 1}`,
  severity: i % 4 === 0 ? 'high' : 'medium',
  factory: `Factory ${(i % 5) + 1}`,
  createdAt: `2024-03-20T08:${i % 60}:00`,
  status: i % 2 === 0 ? 'new' : 'acknowledged',
}));

// Mock data for wage updates
export const wageUpdates: WageUpdate[] = workers.map((worker) => ({
  id: worker.id,
  workerId: worker.id,
  oldRate: worker.hourlyRate - 100,
  newRate: worker.hourlyRate,
  effectiveDate: '2024-03-01',
  approvedBy: worker.supervisor,
}));

// Mock data for performance records
export const performance: Performance[] = workers.map((worker) => ({
  id: worker.id,
  workerId: worker.id,
  date: '2024-03-01',
  rating: (Math.random() * 5).toFixed(1),
  comments: 'Performance reviewed and satisfactory',
  submittedBy: worker.supervisor,
}));
