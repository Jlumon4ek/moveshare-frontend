import { Calendar, MapPin } from 'lucide-react';
import { Button } from '../../../shared/ui/Button/Button';

const scheduleData = [
  {
    date: 'Today, 2:00 PM',
    location: 'New York Office',
    title: 'Job #4512: Office Relocation',
    client: 'TechStart Inc.'
  },
  {
    date: 'Tomorrow, 9:00 AM',
    location: 'Boston Warehouse',
    title: 'Job #4503: Equipment Delivery',
    client: 'Manufacturing Solutions'
  },
  {
    date: 'Jun 28, 1:30 PM',
    location: 'Philadelphia Residence',
    title: 'Job #4508: Residential Move',
    client: 'Johnson Family'
  },
];

export const UpcomingSchedule = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Upcoming Schedule</h3>
                <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
                {scheduleData.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <div className="flex items-center gap-1.5"><Calendar size={14}/> {item.date}</div>
                            <div className="flex items-center gap-1.5"><MapPin size={14}/> {item.location}</div>
                        </div>
                        <h4 className="font-bold text-gray-800">{item.title}</h4>
                        <p className="text-sm text-gray-500">Client: {item.client}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};