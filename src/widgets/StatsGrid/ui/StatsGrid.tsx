import { Briefcase, DollarSign, Truck, Star } from 'lucide-react';
import { StatCard } from '../../../entities/StatCard/ui/StatCard';
import { useEffect, useState } from 'react';
import { jobsApi } from '../../../shared/api/jobs'; // Update with correct path
import { reviewsApi, type ReviewStats } from '../../../shared/api/reviews';
import { authStore } from '../../../shared/lib/auth/authStore';

interface JobStats {
  active_jobs_count: number;
  new_jobs_this_week: number;
  status_distribution: Record<string, number>;
}

export const StatsGrid = () => {
  const [jobStats, setJobStats] = useState<JobStats | null>(null);
  const [reviewStats, setReviewStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await jobsApi.getJobStats();
        setJobStats(stats);
        
        const authState = authStore.getState();
        if (authState.user?.user_id) {
          const ratings = await reviewsApi.getAverage(authState.user.user_id);
          setReviewStats(ratings);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
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
      value: `$${(0).toLocaleString()}`, // Keep hardcoded as this data isn't in the API response
      icon: <DollarSign size={24} className="text-green-500" />,
      iconBgClass: 'bg-green-100',
      change: '0',
      changeDescription: 'from last month',
    },
    {
      title: 'Truck Utilization',
      value: 'Soon',
      icon: <Truck size={24} className="text-orange-500" />,
      iconBgClass: 'bg-orange-100',
      change: undefined,
      changeDescription: 'coming soon',
    },
    {
      title: 'Your Rating',
      value: reviewStats?.average_rating ? `${reviewStats.average_rating.toFixed(1)}/5` : 'No ratings',
      icon: <Star size={24} className="text-purple-500" />,
      iconBgClass: 'bg-purple-100',
      change: undefined,
      changeDescription: `${reviewStats?.total_reviews || 0} reviews`,
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