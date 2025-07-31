import { Truck as TruckIcon, Trash2 } from 'lucide-react';
import type { Truck } from '../../../shared/api/trucks';

interface TruckCardProps {
  truck: Truck;
  onDelete: (id: number) => void;
}

const formatFeatures = (truck: Truck) => {
    const features = [];
    if (truck.climate_control) features.push('Climate Control');
    if (truck.liftgate) features.push('Liftgate');
    if (truck.pallet_jack) features.push('Pallet Jack');
    if (truck.security_system) features.push('Security System');
    if (truck.refrigerated) features.push('Refrigerated');
    if (truck.furniture_pads) features.push('Furniture Pads');
    return features.join(', ') || 'N/A';
};

export const TruckCard = ({ truck, onDelete }: TruckCardProps) => {
  const truckDetails = [
    { label: 'Type:', value: truck.truck_type },
    { label: 'Size:', value: `${truck.length} ft` },
    { label: 'Capacity:', value: `${truck.max_weight.toLocaleString()} lbs` },
    { label: 'Features:', value: formatFeatures(truck) },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 p-3 rounded-xl">
          <TruckIcon className="text-primary" size={24} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 text-lg">{truck.truck_name}</h3>
            <button 
              onClick={() => onDelete(truck.id)} 
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            {truckDetails.map(detail => (
              <div key={detail.label} className="grid grid-cols-2">
                <span className="text-gray-500">{detail.label}</span>
                <span className="font-medium text-gray-700">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};