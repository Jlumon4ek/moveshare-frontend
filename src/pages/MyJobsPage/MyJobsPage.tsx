import { useState } from 'react';
import { MyJobsWidget } from '../../widgets/MyJobsWidget/ui/MyJobsWidget';
import { Button } from '../../shared/ui/Button/Button';
import { PostJobModal } from '../../widgets/PostJobModal/ui/PostJobModal';

export const MyJobsPage = () => {
    const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleJobCreated = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <>
            <div className="h-full flex flex-col">
                <header className="flex justify-between items-center flex-shrink-0">
                    <h1 className="text-3xl font-bold text-gray-800">My Jobs</h1>
                    <div className="flex items-center gap-4">
                        <Button size="sm" onClick={() => setIsPostJobModalOpen(true)}>+ Post New Job</Button>
                    </div>
                </header>
                
                <div className="flex-1 mt-6 overflow-hidden">
                    <MyJobsWidget key={refreshKey} />
                </div>
            </div>
            
            <PostJobModal
                isOpen={isPostJobModalOpen}
                onClose={() => setIsPostJobModalOpen(false)}
                onSuccess={handleJobCreated}
            />
        </>
    );
};