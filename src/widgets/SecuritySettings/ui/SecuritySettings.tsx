import { Link } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button/Button';
import { ToggleSwitch } from '../../../shared/ui/ToggleSwitch/ui/ToggleSwitch';

export const SecuritySettings = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Security Settings
      </h2>

      <div className="divide-y divide-gray-200">
        <div className="flex justify-between items-center py-4">
          <div>
            <p className="font-medium text-gray-800">Password</p>
            <p className="text-sm text-gray-500">Last changed: 3 months ago</p>
          </div>
          <Link to="/reset-password">
            <Button variant="outline" size="sm">Change Password</Button>
          </Link>
        </div>

        <div className="flex justify-between items-center py-4">
          <div>
            <p className="font-medium text-gray-800">Two-Factor Authentication</p>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
          </div>
          <ToggleSwitch initialChecked={true} />
        </div>

        <div className="flex justify-between items-center py-4">
          <div>
            <p className="font-medium text-gray-800">Active Sessions</p>
            <p className="text-sm text-gray-500">Current session: Chrome on Windows (Chicago, IL)</p>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </div>
    </div>
  );
};