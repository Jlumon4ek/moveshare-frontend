import { useState, useEffect } from 'react';
import { JobCard } from '../../entities/Job/ui/JobCard';
import { JobFilters } from '../../features/job/filters/ui/JobFilters';
import { jobsApi, type Job, type AvailableJobsParams } from '../../shared/api/jobs';
import { Pagination } from '../../shared/ui/Pagination/Pagination';
import { ClaimJobModal } from '../../features/claim-job/ui/ClaimjobModal';

type JobCardType = Job & {
  distance: number;
  isHotDeal?: boolean;
  isNew?: boolean;
};

const ITEMS_PER_PAGE = 12; // Количество работ на одной странице

export const AvailableJobsPage = () => {
  const [jobs, setJobs] = useState<JobCardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params: AvailableJobsParams = {
            limit: ITEMS_PER_PAGE,
            offset: (currentPage - 1) * ITEMS_PER_PAGE,
        };
        const response = await jobsApi.getAvailableJobs(params);

        // Добавляем доп. поля, как и раньше
        const jobsWithExtras = response.jobs.map((job, index) => ({
          ...job,
          distance: job.distance_miles,
          isHotDeal: index % 3 === 0,
          isNew: index < 2 && currentPage === 1,
        }));
        
        setJobs(jobsWithExtras);
        setTotalJobs(response.total); // Сохраняем общее количество работ
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage]); // Перезапускаем эффект при изменении currentPage

  const handlePageChange = (page: number) => {
      setCurrentPage(page);
      window.scrollTo(0, 0); // Прокручиваем наверх при смене страницы
  }

  const handleClaimJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsClaimModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsClaimModalOpen(false);
    setSelectedJob(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center text-gray-500 py-20">Loading jobs...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500 py-20">{error}</div>;
    }

    if (jobs.length === 0) {
      return <div className="text-center text-gray-500 py-20">No available jobs found.</div>;
    }

    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} onClaimClick={handleClaimJobClick} />
        ))}
      </div>
    );
  };
  
  return (
    <div className="h-full flex flex-col">
      <header className="flex-shrink-0 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Available Jobs</h1>
      </header>
      
      <div className="flex-1 flex gap-6 overflow-hidden">
        <div className="flex-shrink-0">
          <JobFilters />
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar">
          <div className="flex-grow">
            {renderContent()}
          </div>
          
          {/* Отображаем пагинацию, если работ больше, чем на одной странице */}
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
      
      {isClaimModalOpen && selectedJob && (
        <ClaimJobModal
          job={selectedJob}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};