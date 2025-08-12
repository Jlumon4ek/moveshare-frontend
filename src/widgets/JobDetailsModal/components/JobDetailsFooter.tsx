import { Package } from 'lucide-react';
import { type Job } from '../../../shared/api/jobs';

interface JobDetailsFooterProps {
    cutAmount: number;
    truckSize: string;
    distanceMiles: number;
    onClose: () => void;
    job: Job;
    onClaimJob: (job: Job) => void;
}

export const JobDetailsFooter = ({
    cutAmount,
    truckSize,
    distanceMiles,
    job,
    onClaimJob
}: JobDetailsFooterProps) => {
    const formatTruckSize = (truckSize: string) => {
        switch(truckSize) {
            case 'small': return 'Small (12-14ft)';
            case 'medium': return 'Medium (16-20ft)';
            case 'large': return 'Large (22-26ft)';
            default: return truckSize;
        }
    };

    return (
        <div className="bg-gray-50 border-t border-gray-200 p-4 flex-shrink-0 rounded-b-2xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <div className="text-lg font-bold text-green-600">${cutAmount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Your Earnings</div>
                    </div>
                    <div className="w-px h-12 bg-gray-200"></div>
                    <div className="text-center">
                        <div className="text-sm font-bold text-gray-800">{formatTruckSize(truckSize)}</div>
                        <div className="text-xs text-gray-500">Required Truck</div>
                    </div>
                    <div className="w-px h-12 bg-gray-200"></div>
                    <div className="text-center">
                        <div className="text-sm font-bold text-gray-800">{distanceMiles} miles</div>
                        <div className="text-xs text-gray-500">Total Distance</div>
                    </div>
                </div>
                
                <div className="flex items-center">
                    {onClaimJob && (
                        <button 
                            onClick={() => onClaimJob(job)}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
                        >
                            <Package size={20} />
                            Claim Job
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};