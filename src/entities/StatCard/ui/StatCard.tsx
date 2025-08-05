// src/entities/StatCard/ui/StatCard.tsx
import type { ReactNode } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  iconBgClass: string;
  change?: string;
  changeDescription?: string;
}

export const StatCard = ({ title, value, icon, iconBgClass, change, changeDescription }: StatCardProps) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="text-sm text-gray-500">{title}</div>
        <div className={`p-3 rounded-xl ${iconBgClass}`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        <div className="flex items-center gap-1 text-sm mt-1">
          {change ? (
             <>
                <ArrowUp size={16} className="text-green-500"/>
                <span className="text-green-500 font-semibold">{change}</span>
                <span className="text-gray-500">{changeDescription}</span>
             </>
          ) : (
            <>
                <MessageCircle size={14} className="text-gray-400"/>
                <span className="text-gray-500">{changeDescription}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};