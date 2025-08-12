import { useState, useEffect } from 'react';
import { JobCard } from '../../entities/Job/ui/JobCard';
import { JobFilters } from '../../features/job/filters/ui/JobFilters';
import { jobsApi, type Job, type AvailableJobsParams } from '../../shared/api/jobs';
import { Pagination } from '../../shared/ui/Pagination/Pagination';
import { ClaimJobModal } from '../../features/claim-job/ui/ClaimjobModal';
import { JobDetailsModal } from '../../widgets/JobDetailsModal/ui/JobDetailsModal';
import { SlidersHorizontal, X } from 'lucide-react';

type JobCardType = Job & {
  isHotDeal?: boolean;
  isNew?: boolean;
};

const ITEMS_PER_PAGE = 12;

export const AvailableJobsPage = () => {
  const [jobs, setJobs] = useState<JobCardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [filters, setFilters] = useState<AvailableJobsParams>({});

  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params: AvailableJobsParams = {
            page: currentPage,
            limit: ITEMS_PER_PAGE,
            ...filters,
        };
        const response = await jobsApi.getAvailableJobs(params);
        const receivedJobs = response.jobs || []; 
        const jobsWithExtras = receivedJobs.map((job, index) => ({
          ...job,
          isHotDeal: index % 3 === 0,
          isNew: index < 2 && currentPage === 1,
        }));
        setJobs(jobsWithExtras);
        setTotalJobs(response.pagination.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [currentPage, filters]);

  const handlePageChange = (page: number) => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
  };

  const handleFiltersChange = (newFilters: AvailableJobsParams) => {
    setFilters(newFilters);
    setCurrentPage(1);
    if (window.innerWidth < 1024) {
      setIsFiltersOpen(false);
    }
  };

  const handleClaimJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsClaimModalOpen(true);
    setIsDetailsModalOpen(false);
  };
  
  const handleViewDetailsClick = (job: Job) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsClaimModalOpen(false);
    setIsDetailsModalOpen(false);
    setSelectedJob(null);
  };

  const renderContent = () => {
    if (isLoading) return <div className="text-center text-gray-500 py-20">Loading jobs...</div>;
    if (error) return <div className="text-center text-red-500 py-20">{error}</div>;
    if (jobs.length === 0) return <div className="text-center text-gray-500 py-20">No available jobs found.</div>;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
        {jobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            onClaimClick={handleClaimJobClick}
            onViewDetailsClick={handleViewDetailsClick}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Responsive Header */}
      <header className="flex-shrink-0 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Available Jobs</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Mobile Search/Filter Toggle */}
          <button 
            className="lg:hidden flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 flex-1 sm:flex-none justify-center"
            onClick={() => setIsFiltersOpen(true)}
          >
            <SlidersHorizontal size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>Filters</span>
          </button>
        </div>
      </header>
      
      <div className="flex-1 flex gap-4 sm:gap-6 lg:gap-8 overflow-hidden">
        {/* Desktop Filters - Original Structure */}
        <div className="hidden lg:block flex-shrink-0 pb-4">
            <JobFilters onFiltersChange={handleFiltersChange} />
        </div>

        {/* Mobile Filters - Improved Drawer */}
        <div className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ${isFiltersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsFiltersOpen(false)}></div>
        <aside className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${isFiltersOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}>
          <div className="flex flex-col h-full">
            {/* Mobile Filter Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Filter Jobs</h2>
              <button 
                onClick={() => setIsFiltersOpen(false)} 
                className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
            
            {/* Filter Content */}
            <div className="flex-1 overflow-hidden">
              <JobFilters onFiltersChange={handleFiltersChange} />
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar">
          {/* Jobs Grid/List */}
          <div className="flex-grow px-2 sm:px-0 pb-0">
            {renderContent()}
          </div>
          
          {/* Responsive Pagination */}
          {!isLoading && totalJobs > ITEMS_PER_PAGE && (
              <div className="mt-4 sm:mt-6 flex-shrink-0 px-2 sm:px-0 mb-0">
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
      
      {isClaimModalOpen && selectedJob && (
        <ClaimJobModal job={selectedJob} onClose={handleCloseModal} />
      )}

      {isDetailsModalOpen && selectedJob && (
          <JobDetailsModal 
            jobId={selectedJob.id}
            isOpen={isDetailsModalOpen}
            onClose={handleCloseModal}
            onClaimJob={handleClaimJobClick}
          />
      )}
    </div>
  );
};