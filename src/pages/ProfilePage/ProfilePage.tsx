import { Outlet } from 'react-router-dom';
import { ProfileSidebar } from '../../widgets/ProfileSidebar/ui/ProfileSidebar';


export const ProfilePage = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Responsive Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 flex-shrink-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Profile</h1>
      </header>

      {/* Divider Line */}
      <hr className="my-4 sm:my-6 border-gray-200 flex-shrink-0" />

      {/* Main Content Area - Responsive Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 overflow-hidden">
        <ProfileSidebar />
        <div className="flex-1 overflow-hidden min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};