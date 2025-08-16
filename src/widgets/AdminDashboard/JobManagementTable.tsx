import { Button } from '../../shared/ui/Button/Button';
import { PlusCircle, Filter, Eye, Edit, Trash2 } from 'lucide-react';

type JobStatus = 'Active' | 'Pending' | 'Cancelled';

interface Job {
  id: string;
  size: string;
  from: string;
  to: string;
  date: string;
  payout: string;
  status: JobStatus;
}

const jobs: Job[] = [
  { id: '#J84501', size: '1 bedroom', from: 'New York', to: 'Boston', date: 'Jun 25, 2023', payout: '$2,400', status: 'Active' },
  { id: '#J84502', size: '1 bedroom', from: 'Chicago', to: 'Detroit', date: 'Jun 28, 2023', payout: '$1,800', status: 'Active' },
  { id: '#J84503', size: '3 bedrooms', from: 'Los Angeles', to: 'San Francisco', date: 'Jul 5, 2023', payout: '$3,200', status: 'Pending' },
  { id: '#J84504', size: '1 bedroom', from: 'Miami', to: 'Orlando', date: 'Jun 30, 2023', payout: '$950', status: 'Active' },
  { id: '#J84505', size: '1 bedroom', from: 'Dallas', to: 'Houston', date: 'Jul 3, 2023', payout: '$1,500', status: 'Cancelled' },
];

const statusColors: Record<JobStatus, string> = {
  'Active': 'bg-blue-100 text-blue-700',
  'Pending': 'bg-yellow-100 text-yellow-700',
  'Cancelled': 'bg-red-100 text-red-700',
};

export const JobManagementTable = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Job Management</h2>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter size={16} />
            Filters
          </Button>
          <Button size="sm">
            <PlusCircle size={16} />
            Create Job
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payout</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.size}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.from}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.to}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.payout}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[job.status]}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Eye size={18} className="hover:text-blue-500 cursor-pointer" />
                    <Edit size={18} className="hover:text-green-500 cursor-pointer" />
                    <Trash2 size={18} className="hover:text-red-500 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};