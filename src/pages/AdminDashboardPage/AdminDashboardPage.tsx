import { AdminHeader } from '../../widgets/AdminDashboard/AdminHeader';
import { AdminStatsGrid } from '../../widgets/AdminDashboard/AdminStatsGrid';
import { UserManagementTable } from '../../widgets/AdminDashboard/UserManagementTable';
import { JobManagementTable } from '../../widgets/AdminDashboard/JobManagementTable';
import { SystemSettings } from '../../widgets/AdminDashboard/SystemSettings';
import { PlatformAnalytics } from '../../widgets/AdminDashboard/PlatformAnalytics';

export const AdminDashboardPage = () => {
  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <AdminHeader />
      <AdminStatsGrid />
      <UserManagementTable />
      <JobManagementTable />
      <SystemSettings />
      <PlatformAnalytics />
    </div>
  );
};