import { Button } from '../../shared/ui/Button/Button';
import { JobDocuments } from '../../widgets/JobDocuments/ui/JobDocuments';
import { JobInfoGrid } from '../../widgets/JobInfoGrid/ui/JobInfoGrid';
import { JobStatusStepper } from '../../widgets/JobStatusStepper/ui/JobStatusStepper';

export const JobDetailsPage = () => {
    return (
        <div>
            {/* Здесь можно будет добавить табы */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                {/* Job Header */}
                <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Furniture Delivery</h1>
                        <p className="text-sm text-gray-500">Job #MS-4821</p>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">$1,850</span>
                </div>
                
                <JobStatusStepper currentStep={3} />
                
                <JobInfoGrid />

                <JobDocuments />

                {/* Footer Actions */}
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                    <Button variant="outline">Open Chat</Button>
                    <Button variant="primary">Mark as Delivered</Button>
                </div>
            </div>
        </div>
    );
};