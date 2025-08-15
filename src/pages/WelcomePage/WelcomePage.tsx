// src/pages/WelcomePage/WelcomePage.tsx
import { DashboardSummary } from '../../widgets/DashboardSummary/ui/DashboardSummary';
import { GettingStarted } from '../../widgets/GettingStarted/ui/GettingStarted';
import { WhoIsMoveShareFor } from '../../widgets/WhoIsMoveShareFor/ui/WhoIsMoveShareFor';
import { Faq } from '../../widgets/Faq/ui/Faq';
import { authStore } from '../../shared/lib/auth/authStore';

export const WelcomePage = () => {
  const { user } = authStore.getState();

  return (
    <div className="flex flex-col pb-2"> 
      <header className="flex-shrink-0 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.username}!</h1>
      </header>
      
      <DashboardSummary />
      
      <GettingStarted />

      <WhoIsMoveShareFor />

      <Faq />
    </div>
  );
};