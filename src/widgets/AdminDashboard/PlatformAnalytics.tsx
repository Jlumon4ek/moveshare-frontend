import { Button } from '../../shared/ui/Button/Button';
import { Dot } from 'lucide-react';

const topCompanies = [
  'Relocation Pro LLC - 42 jobs',
  'Nationwide Logistics - 38 jobs',
  'City Movers Inc - 35 jobs',
  'Express Movers - 28 jobs',
  'Coastal Relocation - 24 jobs',
];

const busiestRoutes = [
  'New York to Boston - 28 jobs',
  'Los Angeles to San Francisco - 24 jobs',
  'Chicago to Detroit - 18 jobs',
  'Miami to Orlando - 15 jobs',
  'Dallas to Houston - 12 jobs',
];

export const PlatformAnalytics = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Platform Analytics</h2>
        <Button variant="outline" size="sm">Last 30 Days</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Top Performing Companies</h3>
          <ul className="space-y-2">
            {topCompanies.map((item) => (
              <li key={item} className="flex items-center text-sm text-gray-600">
                <Dot className="text-gray-400" size={20} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Busiest Routes</h3>
          <ul className="space-y-2">
            {busiestRoutes.map((item) => (
              <li key={item} className="flex items-center text-sm text-gray-600">
                <Dot className="text-gray-400" size={20} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};