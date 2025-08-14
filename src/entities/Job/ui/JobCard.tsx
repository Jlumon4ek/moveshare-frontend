// src/entities/Job/ui/JobCard.tsx
import { ArrowRight, Calendar, Weight, Truck, Maximize } from 'lucide-react';
import type { Job } from '../../../shared/api/jobs';
import { Button } from '../../../shared/ui/Button/Button';
import { JobTag } from './JobTag';
import { RouteMap } from '../../../shared/ui/RouteMap/RouteMap';

interface JobCardProps {
  job: Job & {
    isHotDeal?: boolean;
    isNew?: boolean;
  };
  onClaimClick: (job: Job) => void;
  onViewDetailsClick: (job: Job) => void; // Новый пропс
}

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
  <div className="bg-gray-50 p-2.5 sm:p-3 rounded-lg flex items-start gap-2 sm:gap-3">
    <Icon className="text-gray-400 mt-1 flex-shrink-0" size={14} />
    <div className="min-w-0 flex-1">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800 text-sm break-words">{value}</p>
    </div>
  </div>
);


export const JobCard = ({ job, onClaimClick, onViewDetailsClick }: JobCardProps) => {
  const formattedDates = `${new Date(job.pickup_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(job.delivery_date).toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`;
  const jobTitle = `${job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)} Move #${job.id}`;

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full font-sans">
      {/* Responsive Header */}
      <div className="flex justify-between items-start mb-3 gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 break-words">{jobTitle}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-1 sm:gap-2 mt-1">
            <span className="whitespace-nowrap">{job.distance_miles} mi from you</span>
            {job.isHotDeal && (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-gray-300">•</span>
                <span className="text-red-500 font-medium">Hot deal</span>
              </div>
            )}
          </div>
        </div>
        {job.isNew && (
          <div className="bg-primary text-white text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full flex-shrink-0">
            <span className="hidden sm:inline">New Listing</span>
            <span className="sm:hidden">New</span>
          </div>
        )}
      </div>

      {/* Responsive Route Display */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between font-semibold text-gray-700 mb-4 gap-2">
        <span className="text-sm sm:text-base truncate flex-1">{job.pickup_address}</span>
        <ArrowRight size={16} className="text-gray-400 mx-auto sm:mx-2 flex-shrink-0 rotate-90 sm:rotate-0" />
        <span className="text-sm sm:text-base truncate flex-1 sm:text-right">{job.delivery_address}</span>
      </div>

      <div className="mb-4">
        <RouteMap 
          pickupAddress={job.pickup_address}
          deliveryAddress={job.delivery_address}
          className="w-full rounded-lg"
        />
      </div>

      {/* Responsive Details Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
        <DetailItem icon={Calendar} label="Dates" value={formattedDates} />
        <DetailItem icon={Truck} label="Truck Size" value={`${job.truck_size}`} />
        <DetailItem icon={Weight} label="Weight" value={`${job.weight_lbs.toLocaleString()} lbs`} />
        <DetailItem icon={Maximize} label="Volume" value={`${job.volume_cu_ft.toLocaleString()} cu ft`} />
      </div>

      {/* Responsive Tags */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4">
        <JobTag type="verified">
          <span className="hidden sm:inline">Verified Mover</span>
          <span className="sm:hidden">Verified</span>
        </JobTag>
        <JobTag type="payment">
          <span className="hidden sm:inline">Payment Protected</span>
          <span className="sm:hidden">Protected</span>
        </JobTag>
        <JobTag type="escrow">Escrow</JobTag>
      </div>

      {/* Responsive Footer */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-3 sm:pt-4 border-t border-gray-100 gap-3 sm:gap-2">
        <span className="text-lg sm:text-xl font-bold text-gray-900 text-center sm:text-left">
          ${job.payment_amount.toLocaleString()}
        </span>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetailsClick(job)}
            className="w-full sm:w-auto text-sm"
          >
            <span className="hidden sm:inline">View Details</span>
            <span className="sm:hidden">Details</span>
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onClaimClick(job)}
            className="w-full sm:w-auto text-sm font-medium"
          >
            Claim Job
          </Button>
        </div>
      </div>
    </div>
  );
};