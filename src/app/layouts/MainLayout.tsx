import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../widgets/Sidebar/ui/Sidebar';

export const MainLayout = () => {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-8"> {/* <-- Removed overflow-y-auto from here */}
        <Outlet />
      </main>
    </div>
  );
};