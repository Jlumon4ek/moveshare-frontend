// src/pages/ClaimedJobsPage/ClaimedJobsPage.tsx
import { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { ClaimedJobCard } from '../../widgets/ClaimedJobCard/ui/ClaimedJobCard';
import { jobsApi, type Job } from '../../shared/api/jobs';
import { Pagination } from '../../shared/ui/Pagination/Pagination';

// Определяем возможные статусы
type JobStatus = 'active' | 'pending' | 'completed' | 'canceled';

// Extend Job type with mapped status
type MappedJob = Omit<Job, 'job_status'> & {
    job_status: JobStatus;
};
const TABS: JobStatus[] = ['active', 'pending', 'completed', 'canceled'];

// Map backend status to frontend status
const mapJobStatus = (backendStatus: string): JobStatus => {
    switch (backendStatus) {
        case 'claimed':
        case 'in_progress':
            return 'active';
        case 'pending':
            return 'pending';
        case 'completed':
            return 'completed';
        case 'disputed':
        case 'rejected':
        case 'cancelled':
        case 'canceled':
            return 'canceled';
        default:
            return 'active'; // fallback
    }
};

const ITEMS_PER_PAGE = 10;


export const ClaimedJobsPage = () => {
    const [activeTab, setActiveTab] = useState<JobStatus>('active');
    const [jobs, setJobs] = useState<MappedJob[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);

    useEffect(() => {
        const fetchClaimedJobs = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await jobsApi.getClaimedJobs({ 
                    page: currentPage, 
                    limit: ITEMS_PER_PAGE 
                });
                // Map backend statuses to frontend statuses
                const mappedJobs = (response.jobs || []).map(job => ({
                    ...job,
                    job_status: mapJobStatus(job.job_status)
                }));
                setJobs(mappedJobs);
                setTotalJobs(response.pagination.total);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch claimed jobs');
            } finally {
                setIsLoading(false);
            }
        };
        fetchClaimedJobs();
    }, [currentPage]);

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => job.job_status === activeTab);
    }, [jobs, activeTab]);

    const jobCounts = useMemo(() => {
        return TABS.reduce((acc, status) => {
            acc[status] = jobs.filter(job => job.job_status === status).length;
            return acc;
        }, {} as Record<JobStatus, number>);
    }, [jobs]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleTabChange = (tab: JobStatus) => {
        setActiveTab(tab);
        setCurrentPage(1); // Reset to first page when switching tabs
    };


    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <header className="flex justify-between items-center flex-shrink-0">
                <h1 className="text-3xl font-bold text-gray-800">Claimed Jobs</h1>

            </header>

            {/* Tabs and Refresh Button Bar */}
            <div className="flex justify-between items-center mt-4 pt-2 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center gap-4">
                    {TABS.map(tab => (
                        <button 
                            key={tab}
                            onClick={() => handleTabChange(tab)}
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
            <div className="flex-1 overflow-y-auto pt-6 flex flex-col">
                <div className="flex-grow space-y-6">
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
                
                {/* Pagination */}
                {!isLoading && totalJobs > ITEMS_PER_PAGE && (
                    <div className="mt-6 flex-shrink-0">
                        <Pagination 
                            currentPage={currentPage}
                            totalItems={totalJobs}
                            itemsPerPage={ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};