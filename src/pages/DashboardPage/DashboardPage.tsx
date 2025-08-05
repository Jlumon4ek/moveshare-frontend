import { StatsGrid } from '../../widgets/StatsGrid/ui/StatsGrid';
import { DashboardCharts } from '../../widgets/DashboardCharts/ui/DashboardCharts';
import { DashboardActivity } from '../../widgets/DashboardActivity/ui/DashboardActivity'; //  ДОБАВЬТЕ ИМПОРТ

export const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <StatsGrid />
      <DashboardCharts />
      <DashboardActivity /> {/* ДОБАВЬТЕ ЭТОТ КОМПОНЕНТ */}
    </div>
  );
};