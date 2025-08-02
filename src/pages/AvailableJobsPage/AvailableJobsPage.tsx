import { JobCard } from '../../entities/Job/ui/JobCard';
import { JobFilters } from '../../features/job/filters/ui/JobFilters';
import type { Job } from '../../shared/api/jobs';

const mockJob: Job & { distance: number; isHotDeal?: boolean; isNew?: boolean; } = {
  id: 1,
  job_title: '2 Bedroom Delivery',
  distance: 125,
  isHotDeal: true,
  isNew: true,
  pickup_location: 'Chicago, IL',
  delivery_location: 'Indianapolis, IN',
  pickup_date: '2023-08-12T00:00:00.000Z',
  delivery_date: '2023-08-14T00:00:00.000Z',
  truck_size: 'Medium',
  weight_lb: 4200,
  volume_cu_ft: 1200,
  payout_amount: 1850,
  description: '',
  cargo_type: '',
  urgency: '',
  pickup_time_window: '',
  delivery_time_window: '',
  loading_assistance: false,
  early_delivery_bonus: 0,
  payment_terms: '',
  liftgate: false,
  fragile_items: false,
  climate_control: false,
  assembly_required: false,
  extra_insurance: false,
  additional_packing: false,
  status: 'active',
  distance_miles: 125,
};

const mockJob2 = { ...mockJob, id: 2, isNew: false, payout_amount: 2100 };

export const AvailableJobsPage = () => {
  return (
    <div className="h-full flex flex-col">
      <header className="flex-shrink-0 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Available Jobs</h1>
      </header>
      
      <div className="flex-1 flex gap-6 overflow-hidden">
        <div className="flex-shrink-0">
          <JobFilters />
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar">
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                <JobCard job={mockJob} />
                <JobCard job={mockJob2} />
                <JobCard job={mockJob2} />
                <JobCard job={mockJob2} />
                <JobCard job={mockJob2} />
            </div>
        </div>
      </div>
    </div>
  );
};