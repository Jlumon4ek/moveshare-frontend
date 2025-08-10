// src/widgets/JobDetailsModal/ui/JobDetailsModal.tsx

import { Button } from '../../../shared/ui/Button/Button';
import type { Job } from '../../../shared/api/jobs';

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

// Вспомогательные компоненты для стилизации
const SectionTitle = ({ title }: { title: string }) => (
    <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
);

const DetailItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div>
        <p className="text-sm text-gray-400 font-medium">{label}</p>
        <p className="font-semibold text-gray-900">{value}</p>
    </div>
);

const ServiceTag = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg">
        {children}
    </span>
);

const TrustTag = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-100 text-blue-700 text-sm font-semibold text-center py-2 px-4 rounded-lg">
        {children}
    </div>
);


export const JobDetailsModal = ({ isOpen, onClose, job }: JobDetailsModalProps) => {
    if (!isOpen) return null;

    const jobTitle = `${job.number_of_bedrooms} Bedroom ${job.job_type} move`;

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" 
            onClick={onClose}
        >
            <div 
                className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <header className="bg-primary text-white p-6 rounded-t-2xl flex-shrink-0">
                    <button onClick={onClose} className="text-sm opacity-80 mb-2 hover:opacity-100">Back to Available Jobs</button>
                    <h2 className="text-2xl font-bold">{jobTitle}</h2>
                    <p className="font-medium">{job.pickup_address} → {job.delivery_address}</p>
                </header>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12">
                        {/* Левая колонка */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <SectionTitle title="Job Details" />
                                <div className="grid grid-cols-2 gap-y-5 gap-x-4 border-b border-gray-200 pb-8">
                                    <DetailItem label="Job ID" value="#MS-4821" />
                                    <DetailItem label="Posted" value="2 hours ago" />
                                    <DetailItem label="Distance" value="183 miles (295 km)" />
                                    <DetailItem label="Estimated Time" value="3 hours 15 minutes" />
                                    <DetailItem label="Truck Size" value="Medium (22')" />
                                    <DetailItem label="Cargo Type" value="Household Goods" />
                                    <DetailItem label="Weight" value="4,200 lbs (1,905 kg)" />
                                    <DetailItem label="Volume" value="1,200 cu ft (34 m³)" />
                                </div>
                            </div>
                            <div>
                                <SectionTitle title="Schedule" />
                                <div className="grid grid-cols-2 gap-y-5 gap-x-4 border-b border-gray-200 pb-8">
                                     <DetailItem label="Pickup Date" value="August 12, 2023" />
                                    <DetailItem label="Pickup Time" value="7:00 AM - 12:00 PM" />
                                    <DetailItem label="Delivery Date" value="August 14, 2023" />
                                    <DetailItem label="Delivery Time" value="1:00 PM - 5:00 PM" />
                                </div>
                            </div>
                            <div>
                                <SectionTitle title="Additional Services" />
                                <div className="flex flex-wrap gap-3">
                                    <ServiceTag>Packing Boxes</ServiceTag>
                                    <ServiceTag>Bulky Items</ServiceTag>
                                    <ServiceTag>Inventory List</ServiceTag>
                                    <ServiceTag>Hoisting</ServiceTag>
                                </div>
                                <div className="mt-4 text-sm text-gray-600 border border-gray-200 rounded-lg p-3 bg-gray-50 min-h-[80px]">
                                    Brief description of the additional services indicated above...
                                </div>
                            </div>
                             <div className="pt-8 border-t border-gray-200">
                                <SectionTitle title="Payment Details" />
                                <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                                    <DetailItem label="Payout" value="$1,500" />
                                    <DetailItem label="Platform Fee" value="$30" />
                                    <DetailItem label="CUT" value="$300" />
                                </div>
                            </div>
                        </div>

                        {/* Правая колонка */}
                        <div className="space-y-8">
                             <div>
                                <SectionTitle title="Locations" />
                                <div className="space-y-5">
                                    <div className="space-y-3">
                                        <DetailItem label="Pickup Address" value="838 Broadway, New York, NY 10003" />
                                        <DetailItem label="House/Stairs/Elevator (Pickup)" value="Stairs (Floor 3)" />
                                        <DetailItem label="Estimated Walk Distance (Pickup)" value="100-200 ft" />
                                    </div>
                                    <div className="space-y-3">
                                        <DetailItem label="Delivery Address" value="838 Broadway, New York, NY 10003" />
                                        <DetailItem label="House/Stairs/Elevator (Delivery)" value="Stairs (Floor 3)" />
                                        <DetailItem label="Estimated Walk Distance (Delivery)" value="100-200 ft" />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-8 border-t border-gray-200">
                                <SectionTitle title="Company Information" />
                                {/* --- ОБНОВЛЕННЫЙ БЛОК --- */}
                                <div className="bg-gray-100 p-4 rounded-xl space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-200 text-primary font-bold flex items-center justify-center rounded-lg text-xl">
                                            TL
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-lg">TransAtlantic Logistics</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded-full text-xs">Verified Mover</span>
                                                <span className="text-sm text-gray-500">42 reviews</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Average Response Time</p>
                                            <p className="font-semibold text-gray-800">45 minutes</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Completed Jobs</p>
                                            <p className="font-semibold text-gray-800">126</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-8 border-t border-gray-200">
                                <SectionTitle title="Trust & Safety" />
                                <div className="grid grid-cols-2 gap-3">
                                    <TrustTag>Verified Mover</TrustTag>
                                    <TrustTag>Payment Protected</TrustTag>
                                    <TrustTag>Escrow Service</TrustTag>
                                    <TrustTag>Photo Proof Required</TrustTag>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="p-4 bg-white border-t border-gray-200 flex justify-end gap-3 rounded-b-2xl flex-shrink-0">
                    <Button variant="outline" size="md" onClick={onClose}>Close</Button>
                    <Button variant="primary" size="md">Claim Job</Button>
                </footer>
            </div>
        </div>
    );
};