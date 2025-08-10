// src/widgets/ClaimedJobCard/ui/ClaimedJobCard.tsx
import { Briefcase, Calendar, MapPin, Paperclip, UploadCloud } from 'lucide-react';
import { JobProgressTracker } from '../../../features/JobProgressTracker/ui/JobProgressTracker';
import { DocumentPreview } from '../../../entities/DocumentPreview/ui/DocumentPreview';
import { Button } from '../../../shared/ui/Button/Button';
import type { Job } from '../../../shared/api/jobs';

interface ClaimedJobCardProps {
    job: Job;
}

const InfoBlock = ({ title, icon, children }: {title: string, icon: React.ReactNode, children: React.ReactNode}) => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
            {icon} {title}
        </h4>
        <div className="text-sm space-y-1">
            {children}
        </div>
    </div>
);


export const ClaimedJobCard = ({ job }: ClaimedJobCardProps) => {
  const jobTitle = `${job.number_of_bedrooms} Bedroom ${job.job_type} move`;
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{jobTitle}</h2>
          <p className="text-sm text-gray-500">Job #{job.id}</p>
        </div>
        <span className="text-xl font-bold text-gray-800">${(job.payment_amount || 0).toLocaleString()}</span>
      </div>

      <div className="mb-8">
        <JobProgressTracker currentStep={3} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoBlock title="Route Details" icon={<MapPin size={16}/>}>
            <p><strong>Origin:</strong> {job.pickup_address}</p>
            <p><strong>Destination:</strong> {job.delivery_address}</p>
            <p><strong>Distance:</strong> {job.distance_miles.toFixed(2)} miles</p>
          </InfoBlock>
          <InfoBlock title="Schedule" icon={<Calendar size={16}/>}>
            <p><strong>Pickup Date:</strong> {new Date(job.pickup_date).toLocaleDateString()}</p>
            <p><strong>Delivery Date:</strong> {new Date(job.delivery_date).toLocaleDateString()}</p>
            <p><strong>Truck Size:</strong> {job.truck_size}</p>
            <p><strong>Cargo Type:</strong> Household Goods</p>
          </InfoBlock>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-sm flex items-center gap-2 mb-2"><Briefcase size={16}/> Contact Information</h4>
            <div className="text-sm space-y-1">
                <p><strong>Company:</strong> TransAtlantic Logistics</p>
                <p><strong>Contact:</strong> John Smith</p>
                <p><strong>Phone:</strong> (312) 555-0198</p>
                <p><strong>Email:</strong> john@transatlantic.com</p>
            </div>
          </div>
      </div>
      
      <div className="mb-8">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4"><Paperclip size={20}/> Documents</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {['Bill of Lading.pdf', 'Insurance.pdf', 'Contract.pdf'].map(doc => <DocumentPreview key={doc} name={doc}/>)}
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 cursor-pointer hover:bg-gray-50">
                <UploadCloud size={24} className="mx-auto mb-2"/>
                <p className="font-semibold">Upload Document</p>
                <p className="text-xs">Click to upload or drag & drop</p>
          </div>
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
          <Button variant="outline">Open Chat</Button>
          <Button variant="primary">Mark as Delivered</Button>
      </div>
    </div>
  );
};