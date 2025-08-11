import { MapPin, Building, Home } from 'lucide-react';

interface JobLocationsProps {
    pickupAddress: string;
    deliveryAddress: string;
    pickupBuildingType: string;
    deliveryBuildingType: string;
    pickupFloor: number;
    deliveryFloor: number;
    pickupWalkDistance: string;
    deliveryWalkDistance: string;
}

export const JobLocations = ({
    pickupAddress,
    deliveryAddress,
    pickupBuildingType,
    deliveryBuildingType,
    pickupFloor,
    deliveryFloor,
    pickupWalkDistance,
    deliveryWalkDistance
}: JobLocationsProps) => {
    const formatBuildingType = (buildingType: string) => {
        switch(buildingType) {
            case 'stairs_and_elevator': return 'Stairs & Elevator';
            case 'stairs': return 'Stairs';
            case 'elevator': return 'Elevator';
            default: return buildingType;
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#60A5FA]/10 rounded-xl flex items-center justify-center">
                    <MapPin size={20} className="text-[#60A5FA]" />
                </div>
                <h3 className="text-sm font-bold text-gray-800">Locations</h3>
            </div>
            
            <div className="space-y-6">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-bold text-green-700 uppercase tracking-wide">Pickup</span>
                    </div>
                    <div className="pl-5 space-y-2">
                        <p className="text-sm font-medium text-gray-800">{pickupAddress}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Building size={14} />
                            <span>{formatBuildingType(pickupBuildingType)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Home size={14} />
                            <span>Floor {pickupFloor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <MapPin size={14} />
                            <span>{pickupWalkDistance}</span>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-xs font-bold text-red-700 uppercase tracking-wide">Delivery</span>
                    </div>
                    <div className="pl-5 space-y-2">
                        <p className="text-sm font-medium text-gray-800">{deliveryAddress}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Building size={14} />
                            <span>{formatBuildingType(deliveryBuildingType)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Home size={14} />
                            <span>Floor {deliveryFloor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <MapPin size={14} />
                            <span>{deliveryWalkDistance}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};