// src/pages/ClaimedJobsPage/ClaimedJobsPage.tsx
import { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { ClaimedJobCard } from '../../widgets/ClaimedJobCard/ui/ClaimedJobCard';
import { jobsApi, type Job } from '../../shared/api/jobs';

// Определяем возможные статусы
type JobStatus = 'active' | 'in_progress' | 'completed' | 'disputed' | 'rejected' | 'cancelled';
const TABS: JobStatus[] = ['active', 'in_progress', 'completed', 'disputed'];

const user = {
    name: 'Tolebi Baitassov',
    role: 'Carrier'
};

export const ClaimedJobsPage = () => {
    const [activeTab, setActiveTab] = useState<JobStatus>('active');
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClaimedJobs = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await jobsApi.getClaimedJobs({ page: 1, limit: 10 });
                setJobs(response.jobs || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch claimed jobs');
            } finally {
                setIsLoading(false);
            }
        };
        fetchClaimedJobs();
    }, []);

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => job.job_status.replace('_', ' ') === activeTab);
    }, [jobs, activeTab]);

    const jobCounts = useMemo(() => {
        return TABS.reduce((acc, status) => {
            acc[status] = jobs.filter(job => job.job_status.replace('_', ' ') === status).length;
            return acc;
        }, {} as Record<JobStatus, number>);
    }, [jobs]);


    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <header className="flex justify-between items-center flex-shrink-0">
                <h1 className="text-3xl font-bold text-gray-800">Claimed Jobs</h1>
                <div className="flex items-center gap-3 text-right">
                    <div>
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                </div>
            </header>

            {/* Tabs and Refresh Button Bar */}
            <div className="flex justify-between items-center mt-4 pt-2 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center gap-4">
                    {TABS.map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "py-2 px-1 text-sm font-medium transition-colors -mb-px capitalize",
                                {
                                    'border-b-2 border-primary text-primary': activeTab === tab,
                                    'text-gray-500 hover:text-gray-700 border-b-2 border-transparent': activeTab !== tab,
                                }
                            )}
                        >
                            {tab.replace('_', ' ')}
                            <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5 ml-2">{jobCounts[tab] || 0}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto pt-6">
                <div className="space-y-6">
                    {isLoading && <p className="text-center text-gray-500 py-20">Loading claimed jobs...</p>}
                    {error && <p className="text-center text-red-500 py-20">{error}</p>}
                    {!isLoading && !error && (
                        filteredJobs.length > 0 ? (
                            filteredJobs.map(job => <ClaimedJobCard key={job.id} job={job} />)
                        ) : (
                            <div className="text-center text-gray-500 py-20">
                                No jobs in this category.
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};