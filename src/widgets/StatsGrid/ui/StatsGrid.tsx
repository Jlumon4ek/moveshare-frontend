import { Briefcase, DollarSign, Truck, Star } from 'lucide-react';
import { StatCard } from '../../../entities/StatCard/ui/StatCard';

const statsData = [
  {
    title: 'Active Jobs',
    value: '7',
    icon: <Briefcase size={24} className="text-blue-500" />,
    iconBgClass: 'bg-blue-100',
    change: '2',
    changeDescription: 'new this week',
  },
  {
    title: 'Monthly Earnings',
    value: '$8,450',
    icon: <DollarSign size={24} className="text-green-500" />,
    iconBgClass: 'bg-green-100',
    change: '15%',
    changeDescription: 'from last month',
  },
  {
    title: 'Truck Utilization',
    value: '78%',
    icon: <Truck size={24} className="text-orange-500" />,
    iconBgClass: 'bg-orange-100',
    change: '12%',
    changeDescription: 'improvement',
  },
  {
    title: 'Your Rating',
    value: '4.8/5',
    icon: <Star size={24} className="text-purple-500" />,
    iconBgClass: 'bg-purple-100',
    change: undefined, // No percentage change
    changeDescription: '24 reviews',
  },
];

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map(stat => (
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