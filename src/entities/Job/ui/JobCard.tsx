import { ArrowRight, Calendar, Weight, Truck, Maximize } from 'lucide-react';
import type { Job } from '../../../shared/api/jobs';
import { Button } from '../../../shared/ui/Button/Button';
import { JobTag } from './JobTag';
import JobCardMap from '../../../shared/assets/icons/job-card-map.svg';

interface JobCardProps {
  job: Job & {
    distance: number;
    isHotDeal?: boolean;
    isNew?: boolean;
    
  };
}

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
  <div className="bg-gray-50 p-3 rounded-lg flex items-start gap-3">
    <Icon className="text-gray-400 mt-1" size={16} />
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800 text-sm">{value}</p>
    </div>
  </div>
);


export const JobCard = ({ job }: JobCardProps) => {
  const formattedDates = `${new Date(job.pickup_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(job.delivery_date).toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`;

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full font-sans">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{job.job_title}</h3>
          <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
            <span>{job.distance} mi from you</span>
            {job.isHotDeal && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-red-500 font-medium">Hot deal</span>
              </>
            )}
          </div>
        </div>
        {job.isNew && (
          <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
            New Listing
          </div>
        )}
      </div>

      {/* Route */}
      <div className="flex items-center justify-between font-semibold text-gray-700 mb-4">
        <span>{job.pickup_location}</span>
        <ArrowRight size={20} className="text-gray-400" />
        <span>{job.delivery_location}</span>
      </div>

      {/* Map */}
      <div className="mb-4">
        <img src={JobCardMap} alt="Route Map" className="w-full h-auto rounded-lg object-cover" />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <DetailItem icon={Calendar} label="Dates" value={formattedDates} />
        <DetailItem icon={Truck} label="Truck Size" value={`${job.truck_size}`} />
        <DetailItem icon={Weight} label="Weight" value={`${job.weight_lb.toLocaleString()} lbs`} />
        <DetailItem icon={Maximize} label="Volume" value={`${job.volume_cu_ft.toLocaleString()} cu ft`} />
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 mb-4">
        <JobTag type="verified">Verified Mover</JobTag>
        <JobTag type="payment">Payment Protected</JobTag>
        <JobTag type="escrow">Escrow</JobTag>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <span className="text-xl font-bold text-gray-900">${job.payout_amount.toLocaleString()}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">View Details</Button>
          <Button variant="primary" size="sm">Claim Job</Button>
        </div>
      </div>
    </div>
  );
};