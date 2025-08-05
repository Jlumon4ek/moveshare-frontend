import { Briefcase, Calendar, MapPin, Paperclip, UploadCloud } from 'lucide-react';
import { JobProgressTracker } from '../../../features/JobProgressTracker/ui/JobProgressTracker';
import { DocumentPreview } from '../../../entities/DocumentPreview/ui/DocumentPreview';
import { Button } from '../../../shared/ui/Button/Button';

const jobData = {
    title: 'Furniture Delivery',
    id: 'MS-4821',
    payout: 1850,
    currentStep: 3,
    route: { origin: 'Chicago, IL', destination: 'Indianapolis, IN', distance: '183 miles', duration: '3 hours' },
    schedule: { pickup: 'Aug 12, 2023', delivery: 'Aug 14, 2023', truckSize: "Medium (40')", cargo: 'Household Furniture' },
    contact: { company: 'TransAtlantic Logistics', person: 'John Smith', phone: '(312) 555-0198', email: 'john@transatlantic.com' },
    documents: ['Bill of Lading.pdf', 'Insurance.pdf', 'Contract.pdf']
};


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

export const ClaimedJobCard = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{jobData.title}</h2>
          <p className="text-sm text-gray-500">Job #{jobData.id}</p>
        </div>
        <span className="text-xl font-bold text-gray-800">${jobData.payout.toLocaleString()}</span>
      </div>

      <div className="mb-8">
        <JobProgressTracker currentStep={jobData.currentStep} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoBlock title="Route Details" icon={<MapPin size={16}/>}>
            <p><strong>Origin:</strong> {jobData.route.origin}</p>
            <p><strong>Destination:</strong> {jobData.route.destination}</p>
            <p><strong>Distance:</strong> {jobData.route.distance}</p>
            <p><strong>Est. Duration:</strong> {jobData.route.duration}</p>
          </InfoBlock>
          <InfoBlock title="Schedule" icon={<Calendar size={16}/>}>
            <p><strong>Pickup Date:</strong> {jobData.schedule.pickup}</p>
            <p><strong>Delivery Date:</strong> {jobData.schedule.delivery}</p>
            <p><strong>Truck Size:</strong> {jobData.schedule.truckSize}</p>
            <p><strong>Cargo Type:</strong> {jobData.schedule.cargo}</p>
          </InfoBlock>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-sm flex items-center gap-2 mb-2"><Briefcase size={16}/> Contact Information</h4>
            <div className="text-sm space-y-1">
                <p><strong>Company:</strong> {jobData.contact.company}</p>
                <p><strong>Contact:</strong> {jobData.contact.person}</p>
                <p><strong>Phone:</strong> {jobData.contact.phone}</p>
                <p><strong>Email:</strong> {jobData.contact.email}</p>
            </div>
          </div>
      </div>
      
      <div className="mb-8">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4"><Paperclip size={20}/> Documents</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {jobData.documents.map(doc => <DocumentPreview key={doc} name={doc}/>)}
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