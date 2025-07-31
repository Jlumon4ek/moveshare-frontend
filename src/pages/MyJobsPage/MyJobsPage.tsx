import { MyJobsWidget } from '../../widgets/MyJobsWidget/ui/MyJobsWidget';
import { Button } from '../../shared/ui/Button/Button';

export const MyJobsPage = () => {
    const user = {
        name: 'Tolebi Baitassov',
        role: 'Carrier'
    };

    return (
        <div className="h-full flex flex-col">
            <header className="flex justify-between items-center flex-shrink-0">
                <h1 className="text-3xl font-bold text-gray-800">My Jobs</h1>
                <div className="flex items-center gap-4">
                    <Button size="sm">+ Post New Job</Button>
                    <div className="flex items-center gap-3 text-right">
                        <div>
                            <p className="font-semibold text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.role}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                    </div>
                </div>
            </header>
            
            <div className="flex-1 mt-6 overflow-hidden">
                <MyJobsWidget />
            </div>
        </div>
    );
};