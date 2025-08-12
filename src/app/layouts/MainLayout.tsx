import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../widgets/Sidebar/ui/Sidebar';
import { Menu } from 'lucide-react';

export const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 px-4 md:px-8 pt-4 md:pt-8 pb-0 overflow-y-auto">
        <button 
          className="lg:hidden p-2 mb-4 text-gray-600 hover:text-primary focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={28} />
        </button>
        <Outlet />
      </main>
    </div>
  );
};