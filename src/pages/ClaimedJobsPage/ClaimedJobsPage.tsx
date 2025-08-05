import { useState } from 'react';
import cn from 'classnames';
import { ClaimedJobCard } from '../../widgets/ClaimedJobCard/ui/ClaimedJobCard';

const TABS = [
    { name: 'Active', count: 3 },
    { name: 'In Transit', count: 1 },
    { name: 'Completed', count: 12 },
    { name: 'Disputed', count: 2 },
];

const user = {
    name: 'Tolebi Baitassov',
    role: 'Carrier'
};

export const ClaimedJobsPage = () => {
    const [activeTab, setActiveTab] = useState('Active');

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <header className="flex justify-between items-center flex-shrink-0">
                <h1 className="text-3xl font-bold text-gray-800">Claimed Jobs</h1>
                <div className="flex items-center gap-3 text-right">
                    <div>
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                </div>
            </header>

            {/* Tabs and Refresh Button Bar */}
            <div className="flex justify-between items-center mt-4 pt-2 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center gap-4">
                    {TABS.map(tab => (
                        <button 
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={cn(
                                "py-2 px-1 text-sm font-medium transition-colors -mb-px", // -mb-px to align with border
                                {
                                    'border-b-2 border-primary text-primary': activeTab === tab.name,
                                    'text-gray-500 hover:text-gray-700 border-b-2 border-transparent': activeTab !== tab.name,
                                }
                            )}
                        >
                            {tab.name} 
                            <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5 ml-2">{tab.count}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto pt-6">
                <div className="space-y-6">
                    {activeTab === 'Active' && (
                        <>
                            <ClaimedJobCard />
                            <ClaimedJobCard />
                        </>
                    )}
                    {activeTab !== 'Active' && (
                        <div className="text-center text-gray-500 py-20">
                            No jobs in this category.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};