// src/widgets/DashboardActivity/ui/DashboardActivity.tsx
import { UpcomingSchedule } from '../../UpcomingSchedule/ui/UpcomingSchedule';
import { DashboardMessageItem } from '../../../entities/DashboardMessage/ui/DashboardMessageItem';

const mockDashboardMessages = [
  { 
      id: 1, 
      name: 'City Movers Inc', 
      message: 'Can we schedule the pickup f...', 
      time: '10:24 AM', 
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop',
      unreadCount: 2 
  },
  { 
      id: 2, 
      name: 'Quick Move Solutions', 
      message: 'Thanks for the smooth handoff!', 
      time: 'Yesterday', 
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
      unreadCount: 0 
  },
  { 
      id: 3, 
      name: 'Relocation Pro LLC', 
      message: 'The client approved the additi...', 
      time: 'Jun 14', 
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
      unreadCount: 0 
  },
  { 
      id: 4, 
      name: 'Nationwide Logistics', 
      message: 'Can we partner for the Chica...', 
      time: 'Jun 13', 
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29130?q=80&w=1974&auto=format&fit=crop',
      unreadCount: 1 
  },
  { 
      id: 5, 
      name: 'Fast Delivery Services', 
      message: 'Payment has been processed', 
      time: 'Jun 12', 
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
      unreadCount: 0 
  },
];


export const DashboardActivity = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
            <div className="lg:col-span-2">
                <UpcomingSchedule />
            </div>
            <div className="lg:col-span-3">
                <div className="bg-white p-6 rounded-2xl shadow-sm h-full">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Messages</h3>
                    <div>
                        {mockDashboardMessages.map(msg => (
                            <DashboardMessageItem 
                                key={msg.id}
                                name={msg.name}
                                message={msg.message}
                                time={msg.time}
                                avatarUrl={msg.avatarUrl}
                                unreadCount={msg.unreadCount}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};