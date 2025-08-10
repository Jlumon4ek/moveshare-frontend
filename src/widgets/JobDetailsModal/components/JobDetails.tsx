import { Package } from 'lucide-react';

interface JobDetailsProps {
    jobType: string;
    numberOfBedrooms: string | number;
    volumeCuFt: number;
    weightLbs: number;
    truckSize: string;
    jobId: number | string;
}

export const JobDetails = ({
    jobType,
    numberOfBedrooms,
    volumeCuFt,
    weightLbs,
    truckSize,
    jobId
}: JobDetailsProps) => {
    const formatTruckSize = (truckSize: string) => {
        switch(truckSize) {
            case 'small': return 'Small (12-14ft)';
            case 'medium': return 'Medium (16-20ft)';
            case 'large': return 'Large (22-26ft)';
            default: return truckSize;
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Package size={20} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Job Details</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Job Type</p>
                    <p className="text-sm font-bold capitalize">{jobType}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Bedrooms</p>
                    <p className="text-sm font-bold">{numberOfBedrooms}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Volume</p>
                    <p className="text-sm font-bold">{volumeCuFt.toLocaleString()} cu ft</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Weight</p>
                    <p className="text-sm font-bold">{weightLbs.toLocaleString()} lbs</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Truck Size</p>
                    <p className="text-sm font-bold">{formatTruckSize(truckSize)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Job ID</p>
                    <p className="text-sm font-bold">#{jobId}</p>
                </div>
            </div>
        </div>
    );
};