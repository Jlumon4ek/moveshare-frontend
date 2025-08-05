import { CalendarCheck, BarChart3, Bell } from 'lucide-react';
import { SummaryCard } from '../../../entities/SummaryCard/ui/SummaryCard';

export const DashboardSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SummaryCard icon={<CalendarCheck size={24} />} title="Today's Schedule">
        <div className="space-y-3 text-sm">
          <p><span className="font-bold">2:00 PM</span> - Job #4512: Office relocation</p>
          <p><span className="font-bold">5:30 PM</span> - Meeting with logistics partners</p>
        </div>
      </SummaryCard>

      {/* Performance Card */}
      <SummaryCard icon={<BarChart3 size={24} />} title="Performance">
        <div className="space-y-2 text-sm text-gray-700">
          <p>Completed Jobs: <span className="font-bold text-gray-900">24</span></p>
          <p>Earnings: <span className="font-bold text-green-600">$8,450</span></p>
          <p>Upcoming Jobs: <span className="font-bold text-gray-900">7</span></p>
        </div>
      </SummaryCard>

      {/* Notifications Card */}
      <SummaryCard icon={<Bell size={24} />} title="Notifications">
         <div className="space-y-2 text-sm text-gray-700">
          <p>New job matches your route: <span className="font-bold text-gray-900">Boston to NYC</span></p>
          <p>Payment received: <span className="font-bold text-gray-900">$1,200</span></p>
          <p>New message from <span className="font-bold text-gray-900">City Movers Inc</span></p>
        </div>
      </SummaryCard>
    </div>
  );
};