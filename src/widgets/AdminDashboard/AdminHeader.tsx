import { User, LogOut } from 'lucide-react';
import { Button } from '../../shared/ui/Button/Button';

export const AdminHeader = () => {
  return (
    <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Control Panel</h1>
        <p className="text-sm text-gray-500 mt-1">Manage all aspects of the MoveShare platform</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <User size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Tolebi Baitassov</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="hidden sm:flex">
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </div>
  );
};