import { User, Briefcase, Clock, MessageSquare } from 'lucide-react';
import { StatCard } from '../../entities/StatCard/ui/StatCard';

// Mock data based on the design
const statsData = [
  {
    title: 'Total Users',
    value: '1,254',
    icon: <User size={24} className="text-blue-500" />,
    iconBgClass: 'bg-blue-100',
    change: undefined,
    changeDescription: 'from last month',
  },
  {
    title: 'Active Jobs',
    value: '548',
    icon: <Briefcase size={24} className="text-green-500" />,
    iconBgClass: 'bg-green-100',
    change: undefined,
    changeDescription: 'currently ongoing',
  },
  {
    title: 'Pending Approvals',
    value: '42',
    icon: <Clock size={24} className="text-yellow-500" />,
    iconBgClass: 'bg-yellow-100',
    change: undefined,
    changeDescription: 'new this week',
  },
  {
    title: 'Chat Conversations',
    value: '1,287',
    icon: <MessageSquare size={24} className="text-purple-500" />,
    iconBgClass: 'bg-purple-100',
    change: undefined,
    changeDescription: 'total on platform',
  },
];

export const AdminStatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconBgClass={stat.iconBgClass}
          change={stat.change}
          changeDescription={stat.changeDescription}
        />
      ))}
    </div>
  );
};