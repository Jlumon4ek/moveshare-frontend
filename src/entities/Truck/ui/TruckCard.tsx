import { Truck } from 'lucide-react';

export interface TruckData {
  name: string;
  type: string;
  size: string;
  capacity: string;
  features: string;
}

interface TruckCardProps {
  truck: TruckData;
}

export const TruckCard = ({ truck }: TruckCardProps) => {
  const truckDetails = [
    { label: 'Type:', value: truck.type },
    { label: 'Size:', value: truck.size },
    { label: 'Capacity:', value: truck.capacity },
    { label: 'Features:', value: truck.features },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 p-3 rounded-xl">
          <Truck className="text-primary" size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{truck.name}</h3>
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