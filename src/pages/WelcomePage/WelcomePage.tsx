// src/pages/WelcomePage/WelcomePage.tsx
import { DashboardSummary } from '../../widgets/DashboardSummary/ui/DashboardSummary';
import { GettingStarted } from '../../widgets/GettingStarted/ui/GettingStarted';
import { WhoIsMoveShareFor } from '../../widgets/WhoIsMoveShareFor/ui/WhoIsMoveShareFor';
import { Faq } from '../../widgets/Faq/ui/Faq';

export const WelcomePage = () => {
  const user = {
    name: 'Tolebi', 
  };

  return (
    // 👇 Уменьшаем отступ до pb-12
    <div className="flex flex-col pb-2"> 
      <header className="flex-shrink-0 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h1>
        <p className="text-gray-500 mt-1">Here's a summary of your activity today.</p>
      </header>
      
      <DashboardSummary />
      
      <GettingStarted />

      <WhoIsMoveShareFor />

      <Faq />
    </div>
  );
};