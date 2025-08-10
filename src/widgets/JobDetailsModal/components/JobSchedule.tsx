import { Calendar, Clock } from 'lucide-react';

interface JobScheduleProps {
    pickupDate: string | number | Date;
    deliveryDate: string | number | Date;
    pickupTimeFrom: string | number | Date;
    pickupTimeTo: string | number | Date;
    deliveryTimeFrom: string | number | Date;
    deliveryTimeTo: string | number | Date;
}

export const JobSchedule = ({
    pickupDate,
    deliveryDate,
    pickupTimeFrom,
    pickupTimeTo,
    deliveryTimeFrom,
    deliveryTimeTo
}: JobScheduleProps) => {
    const formatTime = (timeString: string | number | Date) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    };
    
    const formatTimeRange = (fromTime: string | number | Date, toTime: string | number | Date) => {
        return `${formatTime(fromTime)} - ${formatTime(toTime)}`;
    };

    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#60A5FA]/10 rounded-xl flex items-center justify-center">
                    <Calendar size={20} className="text-[#60A5FA]" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Schedule</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <h4 className="text-sm font-bold text-green-700">Pickup</h4>
                    </div>
                    <div className="pl-6 space-y-3">
                        <div className="flex items-center gap-3">
                            <Calendar size={16} className="text-gray-400" />
                            <span className="text-sm font-medium">{formatDate(pickupDate)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-600">{formatTimeRange(pickupTimeFrom, pickupTimeTo)}</span>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <h4 className="text-sm font-bold text-red-700">Delivery</h4>
                    </div>
                    <div className="pl-6 space-y-3">
                        <div className="flex items-center gap-3">
                            <Calendar size={16} className="text-gray-400" />
                            <span className="text-sm font-medium">{formatDate(deliveryDate)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-600">{formatTimeRange(deliveryTimeFrom, deliveryTimeTo)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};