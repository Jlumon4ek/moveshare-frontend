import { Button } from '../../shared/ui/Button/Button';
import { PlusCircle, Eye, Edit, Trash2 } from 'lucide-react';

type UserStatus = 'Approved' | 'Pending' | 'Rejected';

interface User {
  id: string;
  company: string;
  email: string;
  trucks: number;
  status: UserStatus;
  joined: string;
}

const users: User[] = [
  { id: 'MU#001', company: 'Relocation Pro LLC', email: 'contact@relocationpro.com', trucks: 8, status: 'Approved', joined: 'Jun 13, 2023' },
  { id: 'MU#002', company: 'City Movers Inc', email: 'info@citymovers.com', trucks: 12, status: 'Approved', joined: 'May 28, 2023' },
  { id: 'MU#003', company: 'Fast Delivery Services', email: 'admin@fastdelivery.com', trucks: 5, status: 'Pending', joined: 'Jun 15, 2023' },
  { id: 'MU#004', company: 'Nationwide Logistics', email: 'support@nationwidelogistics.com', trucks: 15, status: 'Approved', joined: 'Apr 30, 2023' },
  { id: 'MU#005', company: 'Quick Move Solutions', email: 'contact@quickmove.com', trucks: 6, status: 'Rejected', joined: 'Jun 10, 2023' },
];

const statusColors: Record<UserStatus, string> = {
  'Approved': 'bg-green-100 text-green-700',
  'Pending': 'bg-yellow-100 text-yellow-700',
  'Rejected': 'bg-red-100 text-red-700',
};

export const UserManagementTable = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">User Management</h2>
        <Button size="sm">
          <PlusCircle size={16} />
          Add User
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trucks</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.trucks}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
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