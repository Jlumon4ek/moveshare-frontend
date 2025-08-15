import { useState, useEffect } from 'react';
import { CalendarCheck, BarChart3, Bell } from 'lucide-react';
import { SummaryCard } from '../../../entities/SummaryCard/ui/SummaryCard';
import { jobsApi } from '../../../shared/api/jobs';

export const DashboardSummary = () => {
  const [workStats, setWorkStats] = useState({
    completed_jobs: 0,
    earnings: 0,
    upcoming_jobs: 0,
  });
  const [todaySchedule, setTodaySchedule] = useState<{
    id: number;
    pickup_time_from: string;
    job_type: string;
    number_of_bedrooms: string;
  }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScheduleLoading, setIsScheduleLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stats, schedule] = await Promise.all([
          jobsApi.getUserWorkStats(),
          jobsApi.getTodaySchedule()
        ]);
        setWorkStats(stats);
        setTodaySchedule(schedule);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Keep default values if API fails
      } finally {
        setIsLoading(false);
        setIsScheduleLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch {
      return timeString;
    }
  };

  const formatJobDescription = (job: { id: number; job_type: string; number_of_bedrooms: string }) => {
    const capitalizedType = job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1);
    return `Job #${job.id}: ${job.number_of_bedrooms} bedroom ${capitalizedType}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SummaryCard icon={<CalendarCheck size={24} />} title="Today's Schedule">
        {isScheduleLoading ? (
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              <span>-</span>
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              <span>-</span>
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ) : todaySchedule.length > 0 ? (
          <div className="space-y-3 text-sm">
            {todaySchedule.map((job) => (
              <p key={job.id}>
                <span className="font-bold">{formatTime(job.pickup_time_from)}</span> - {formatJobDescription(job)}
              </p>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            <p>No jobs scheduled for today</p>
          </div>
        )}
      </SummaryCard>

      {/* Performance Card */}
      <SummaryCard icon={<BarChart3 size={24} />} title="Performance">
        {isLoading ? (
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <span>Completed Jobs:</span>
              <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between">
              <span>Earnings:</span>
              <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between">
              <span>Upcoming Jobs:</span>
              <div className="w-6 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-sm text-gray-700">
            <p>Completed Jobs: <span className="font-bold text-gray-900">{workStats.completed_jobs}</span></p>
            <p>Earnings: <span className="font-bold text-green-600">${workStats.earnings.toLocaleString()}</span></p>
            <p>Upcoming Jobs: <span className="font-bold text-gray-900">{workStats.upcoming_jobs}</span></p>
          </div>
        )}
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