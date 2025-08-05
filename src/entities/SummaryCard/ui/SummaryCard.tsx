import type { ReactNode } from 'react';

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export const SummaryCard = ({ icon, title, children }: SummaryCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-full">
      <div className="flex items-center gap-3">
        <div className="text-primary">{icon}</div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <div className="w-full h-0.5 bg-blue-200 mt-3 mb-4" />
      <div>
        {children}
      </div>
    </div>
  );
};