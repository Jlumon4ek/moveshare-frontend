import { Briefcase, DollarSign, Truck, Star } from 'lucide-react';
import { StatCard } from '../../../entities/StatCard/ui/StatCard';
import { useEffect, useState } from 'react';
import { jobsApi } from '../../../shared/api/jobs'; // Update with correct path

interface JobStats {
  active_jobs_count: number;
  new_jobs_this_week: number;
  status_distribution: Record<string, number>;
}

export const StatsGrid = () => {
  const [jobStats, setJobStats] = useState<JobStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await jobsApi.getJobStats();
        setJobStats(stats);
      } catch (error) {
        console.error('Error fetching job stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  const statsData = [
    {
      title: 'Active Jobs',
      value: jobStats?.active_jobs_count.toString() || '0',
      icon: <Briefcase size={24} className="text-blue-500" />,
      iconBgClass: 'bg-blue-100',
      change: jobStats?.new_jobs_this_week.toString() || '0',
      changeDescription: 'new this week',
    },
    {
      title: 'Monthly Earnings',
      value: '$8,450', // Keep hardcoded as this data isn't in the API response
      icon: <DollarSign size={24} className="text-green-500" />,
      iconBgClass: 'bg-green-100',
      change: '15%',
      changeDescription: 'from last month',
    },
    {
      title: 'Truck Utilization',
      value: '78%', // Keep hardcoded as this data isn't in the API response
      icon: <Truck size={24} className="text-orange-500" />,
      iconBgClass: 'bg-orange-100',
      change: '12%',
      changeDescription: 'improvement',
    },
    {
      title: 'Your Rating',
      value: '4.8/5', // Keep hardcoded as this data isn't in the API response
      icon: <Star size={24} className="text-purple-500" />,
      iconBgClass: 'bg-purple-100',
      change: undefined,
      changeDescription: '24 reviews',
    },
  ];

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