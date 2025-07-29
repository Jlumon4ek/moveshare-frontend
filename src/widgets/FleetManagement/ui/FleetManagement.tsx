import { useState } from 'react';
import { TruckCard, type TruckData } from '../../../entities/Truck/ui/TruckCard';
import { Button } from '../../../shared/ui/Button/Button';
import { AddTruckModal } from '../../../widgets/AddTruckModal/AddTruckModal';

const mockTrucks: TruckData[] = [
  { name: 'Volvo Semi', type: 'Semi-Trailer', size: '53 ft', capacity: '45,000 lbs', features: 'Liftgate, Air Ride' },
  { name: 'Ford Box Truck', type: 'Box Truck', size: '26 ft', capacity: '10,000 lbs', features: 'Liftgate' },
  { name: 'Freightliner', type: 'Flatbed', size: '48 ft', capacity: '40,000 lbs', features: 'Tarp System' },
  { name: 'Volvo Semi', type: 'Semi-Trailer', size: '53 ft', capacity: '45,000 lbs', features: 'Liftgate, Air Ride' },
  { name: 'Peterbilt 579', type: 'Semi-Trailer', size: '53 ft', capacity: '46,000 lbs', features: 'Air Ride' },
  { name: 'Kenworth T680', type: 'Semi-Trailer', size: '53 ft', capacity: '45,500 lbs', features: 'Liftgate' },
  { name: 'Volvo Semi', type: 'Semi-Trailer', size: '53 ft', capacity: '45,000 lbs', features: 'Liftgate, Air Ride' },
  { name: 'Ford Box Truck', type: 'Box Truck', size: '26 ft', capacity: '10,000 lbs', features: 'Liftgate' },
  { name: 'Freightliner', type: 'Flatbed', size: '48 ft', capacity: '40,000 lbs', features: 'Tarp System' },
  { name: 'Volvo Semi', type: 'Semi-Trailer', size: '53 ft', capacity: '45,000 lbs', features: 'Liftgate, Air Ride' },
  { name: 'Peterbilt 579', type: 'Semi-Trailer', size: '53 ft', capacity: '46,000 lbs', features: 'Air Ride' },
  { name: 'Kenworth T680', type: 'Semi-Trailer', size: '53 ft', capacity: '45,500 lbs', features: 'Liftgate' },
];

export const FleetManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white px-8 pt-6 pb-8 rounded-2xl shadow-sm h-full flex flex-col">
        <div className="flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-800">Fleet Management</h2>
          <Button onClick={() => setIsModalOpen(true)} size="sm">
            + Add Truck
          </Button>
        </div>

        <hr className="mt-6 mb-6 border-gray-200 flex-shrink-0" />
        
        <div className="flex-1 overflow-y-auto pb-6 hide-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTrucks.map((truck, index) => (
              <TruckCard key={index} truck={truck} />
            ))}
          </div>
        </div>
      </div>
      
      {isModalOpen && <AddTruckModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};