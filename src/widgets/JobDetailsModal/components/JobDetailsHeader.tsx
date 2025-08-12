import { MapPin, Calendar, DollarSign, Truck, Package, ArrowRight } from 'lucide-react';

interface JobDetailsHeaderProps {
    jobTitle: string;
    pickupAddress: string;
    deliveryAddress: string;
    paymentAmount: number;
    pickupDate: string | number | Date;
    truckSize: string;
    onClose: () => void;
}

export const JobDetailsHeader = ({
    jobTitle,
    pickupAddress,
    deliveryAddress,
    paymentAmount,
    pickupDate,
    truckSize,
    onClose
}: JobDetailsHeaderProps) => {
    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTruckSize = (truckSize: string) => {
        switch(truckSize) {
            case 'small': return 'Small (12-14ft)';
            case 'medium': return 'Medium (16-20ft)';
            case 'large': return 'Large (22-26ft)';
            default: return truckSize;
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-[#60A5FA] via-[#60A5FA] to-[#3B82F6] text-white p-5 rounded-t-2xl flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA]/20 to-[#3B82F6]/20"></div>
            <div className="relative">
                <div className="flex items-center justify-start mb-6">
                    <button 
                        onClick={onClose}
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    >
                        <ArrowRight size={18} className="rotate-180" />
                        <span className="text-sm font-medium">Back to Jobs</span>
                    </button>
                </div>
                
                <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                        <Package size={32} className="text-white" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold mb-3">{jobTitle}</h1>
                        <div className="flex items-center gap-3 text-white/90 mb-4">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span className="text-sm font-medium">{pickupAddress}</span>
                            </div>
                            <ArrowRight size={16} />
                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span className="text-sm font-medium">{deliveryAddress}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                                <DollarSign size={20} />
                                <span className="text-lg font-bold">${paymentAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span className="text-sm font-medium">{formatDate(pickupDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Truck size={18} />
                                <span className="text-sm font-medium">{formatTruckSize(truckSize)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};