import { Outlet } from 'react-router-dom';
import { ProfileSidebar } from '../../widgets/ProfileSidebar/ui/ProfileSidebar';


export const ProfilePage = () => {
  return (
    <div className="h-full flex flex-col">
      <header className="flex justify-between items-center flex-shrink-0">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-right">
            <div>
              <p className="font-semibold text-gray-800">Tolebi Baitassov</p>
              <p className="text-sm text-gray-500">Carrier</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200" />
          </div>
        </div>
      </header>

      {/* Divider Line */}
      <hr className="my-4 border-gray-200 flex-shrink-0" />

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        <ProfileSidebar />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};