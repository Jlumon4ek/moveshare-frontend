import React from 'react';
import { X } from 'lucide-react';
import { jobsApi, type Job } from '../../../shared/api/jobs';
import {
    JobDetailsHeader,
    JobQuickStats,
    JobSchedule,
    JobDetails,
    AdditionalServices,
    JobLocations,
    JobCreator,
    PaymentBreakdown,
    TrustSafety,
    JobDetailsFooter
} from '../components';

interface JobDetailsModalProps {
    jobId: number;
    isOpen: boolean;
    onClose: () => void;
}

export const JobDetailsModal = ({ jobId, isOpen, onClose }: JobDetailsModalProps) => {
    const [job, setJob] = React.useState<Job | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const loadJobData = async () => {
            if (!isOpen || !jobId) return;
            
            setIsLoading(true);
            setError(null);
            
            try {
                const jobData = await jobsApi.getJobDetails(jobId);
                setJob(jobData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load job details');
            } finally {
                setIsLoading(false);
            }
        };
        
        loadJobData();
    }, [jobId, isOpen]);

    if (!isOpen) return null;
    
    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                    <div className="text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading job details...</p>
                    </div>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <X size={24} className="text-red-600" />
                        </div>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button 
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    if (!job) return null;

    // Безопасное извлечение данных
    const jobData = job.job || job;
    
    const cutAmount = jobData?.cut_amount ?? 0;
    const paymentAmount = jobData?.payment_amount ?? 0;
    const distanceMiles = jobData?.distance_miles ?? 0;
    const weightLbs = jobData?.weight_lbs ?? 0;
    const volumeCuFt = jobData?.volume_cu_ft ?? 0;
    const numberOfBedrooms = jobData?.number_of_bedrooms ?? 'N/A';
    const jobType = jobData?.job_type ?? 'Unknown';
    const truckSize = jobData?.truck_size ?? 'unknown';
    const estimatedCrewAssistants = jobData?.estimated_crew_assistants ?? '0';
    const contractorId = jobData?.contractor_id ?? 'Unknown';
    const jobStatus = jobData?.job_status ?? 'unknown';
    const pickupAddress = jobData?.pickup_address ?? 'Not specified';
    const deliveryAddress = jobData?.delivery_address ?? 'Not specified';
    const pickupDate = jobData?.pickup_date ?? new Date();
    const deliveryDate = jobData?.delivery_date ?? new Date();
    const pickupTimeFrom = jobData?.pickup_time_from ?? '00:00:00';
    const pickupTimeTo = jobData?.pickup_time_to ?? '00:00:00';
    const deliveryTimeFrom = jobData?.delivery_time_from ?? '00:00:00';
    const deliveryTimeTo = jobData?.delivery_time_to ?? '00:00:00';
    const pickupBuildingType = jobData?.pickup_building_type ?? 'unknown';
    const deliveryBuildingType = jobData?.delivery_building_type ?? 'unknown';
    const pickupFloor = jobData?.pickup_floor ?? 1;
    const deliveryFloor = jobData?.delivery_floor ?? 1;
    const pickupWalkDistance = jobData?.pickup_walk_distance ?? 'Unknown';
    const deliveryWalkDistance = jobData?.delivery_walk_distance ?? 'Unknown';
    const createdAt = jobData?.created_at ?? new Date();
    const additionalServicesDescription = jobData?.additional_services_description ?? '';
    const packingBoxes = jobData?.packing_boxes ?? false;
    const bulkyItems = jobData?.bulky_items ?? false;
    const inventoryList = jobData?.inventory_list ?? false;
    const hoisting = jobData?.hoisting ?? false;

    const jobTitle = `${numberOfBedrooms} Bedroom ${jobType.charAt(0).toUpperCase() + jobType.slice(1)} Move`;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
                
                <JobDetailsHeader
                    jobTitle={jobTitle}
                    pickupAddress={pickupAddress}
                    deliveryAddress={deliveryAddress}
                    paymentAmount={paymentAmount}
                    pickupDate={pickupDate}
                    truckSize={truckSize}
                    onClose={onClose}
                />

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <div className="lg:col-span-2 space-y-8">
                            <JobQuickStats
                                cutAmount={cutAmount}
                                distanceMiles={distanceMiles}
                                estimatedCrewAssistants={estimatedCrewAssistants}
                                weightLbs={weightLbs}
                            />

                            <JobSchedule
                                pickupDate={pickupDate}
                                deliveryDate={deliveryDate}
                                pickupTimeFrom={pickupTimeFrom}
                                pickupTimeTo={pickupTimeTo}
                                deliveryTimeFrom={deliveryTimeFrom}
                                deliveryTimeTo={deliveryTimeTo}
                            />

                            <JobDetails
                                jobType={jobType}
                                numberOfBedrooms={numberOfBedrooms}
                                volumeCuFt={volumeCuFt}
                                weightLbs={weightLbs}
                                truckSize={truckSize}
                                jobId={jobData.id}
                            />

                            <AdditionalServices
                                packingBoxes={packingBoxes}
                                bulkyItems={bulkyItems}
                                inventoryList={inventoryList}
                                hoisting={hoisting}
                                additionalServicesDescription={additionalServicesDescription}
                            />
                        </div>

                        <div className="space-y-6">
                            <JobLocations
                                pickupAddress={pickupAddress}
                                deliveryAddress={deliveryAddress}
                                pickupBuildingType={pickupBuildingType}
                                deliveryBuildingType={deliveryBuildingType}
                                pickupFloor={pickupFloor}
                                deliveryFloor={deliveryFloor}
                                pickupWalkDistance={pickupWalkDistance}
                                deliveryWalkDistance={deliveryWalkDistance}
                            />

                            <JobCreator
                                contractorId={contractorId}
                                createdAt={createdAt}
                                jobStatus={jobStatus}
                            />

                            <PaymentBreakdown
                                paymentAmount={paymentAmount}
                                cutAmount={cutAmount}
                            />

                            <TrustSafety />
                        </div>
                    </div>
                </div>

                <JobDetailsFooter
                    cutAmount={cutAmount}
                    truckSize={truckSize}
                    distanceMiles={distanceMiles}
                    onClose={onClose}
                />
            </div>
        </div>
    );
};