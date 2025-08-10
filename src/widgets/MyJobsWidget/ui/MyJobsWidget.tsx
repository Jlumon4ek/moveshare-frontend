// src/widgets/MyJobsWidget/ui/MyJobsWidget.tsx

import { useState, useEffect, useMemo } from 'react';
import { jobsApi, type Job } from '../../../shared/api/jobs';
import { Checkbox } from '../../../shared/ui/Checkbox/Checkbox';
import { Button } from '../../../shared/ui/Button/Button';
import { Eye } from 'lucide-react';
import cn from 'classnames';

type Status = 'active' | 'pending' | 'completed' | 'canceled';
const TABS: Status[] = ['active', 'pending', 'completed', 'canceled'];

const statusStyles: Record<Status, string> = {
    active: 'bg-blue-100 text-blue-700',
    pending: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-green-100 text-green-700',
    canceled: 'bg-red-100 text-red-700',
};

export const MyJobsWidget = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<Status>('pending'); // Изменено на pending
    const [selectedJobs, setSelectedJobs] = useState<number[]>([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setIsLoading(true);
                const response = await jobsApi.getMyJobs();
                setJobs(response.jobs || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = useMemo(() => jobs.filter(job => job.job_status === activeTab), [jobs, activeTab]);
    const jobCounts = useMemo(() => {
        return TABS.reduce((acc, status) => {
            acc[status] = jobs.filter(job => job.job_status === status).length;
            return acc;
        }, {} as Record<Status, number>);
    }, [jobs]);

    const handleSelectJob = (id: number) => {
        setSelectedJobs(prev => 
            prev.includes(id) ? prev.filter(jobId => jobId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedJobs.length === filteredJobs.length) {
            setSelectedJobs([]);
        } else {
            setSelectedJobs(filteredJobs.map(job => job.id));
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading jobs...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 px-6">
                {TABS.map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "py-3 px-4 text-sm font-medium capitalize transition-colors",
                            {
                                'border-b-2 border-primary text-primary': activeTab === tab,
                                'text-gray-500 hover:text-gray-700': activeTab !== tab,
                            }
                        )}
                    >
                        {tab} <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5 ml-1">{jobCounts[tab] || 0}</span>
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto">
                <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-gray-50">
                        <tr>
                            <th className="p-3 w-12"><Checkbox checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0} onChange={handleSelectAll} children={undefined} /></th>
                            <th className="p-3 text-left font-medium text-gray-600">Job ID</th>
                            <th className="p-3 text-left font-medium text-gray-600">Route</th>
                            <th className="p-3 text-left font-medium text-gray-600">Dates</th>
                            <th className="p-3 text-left font-medium text-gray-600">Truck Size</th>
                            <th className="p-3 text-left font-medium text-gray-600">Payout</th>
                            <th className="p-3 text-left font-medium text-gray-600">Status</th>
                            <th className="p-3 text-left font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJobs.map(job => (
                            <tr key={job.id} className="border-b border-gray-200">
                                <td className="p-3"><Checkbox checked={selectedJobs.includes(job.id)} onChange={() => handleSelectJob(job.id)} children={undefined} /></td>
                                <td className="p-3 font-medium text-gray-800">#{job.id}</td>
                                <td className="p-3 text-gray-600">{job.pickup_address} → {job.delivery_address}</td>
                                <td className="p-3 text-gray-600">{new Date(job.pickup_date).toLocaleDateString()} - {new Date(job.delivery_date).toLocaleDateString()}</td>
                                <td className="p-3 text-gray-600 capitalize">{job.truck_size}</td>
                                <td className="p-3 text-gray-600">${job.payment_amount.toLocaleString()}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[job.job_status]}`}>
                                        {job.job_status}
                                    </span>
                                </td>
                                <td className="p-3"><button className="text-gray-400 hover:text-primary"><Eye size={18}/></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Bulk Actions Footer */}
            {selectedJobs.length > 0 && (
                <div className="flex-shrink-0 p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                    <p className="text-sm text-gray-600">{selectedJobs.length} jobs selected</p>
                    <div className="flex gap-3">
                        <Button variant="danger" size="sm">Cancel Selected</Button>
                        <Button variant="outline" size="sm">Export to CSV</Button>
                    </div>
                </div>
            )}
        </div>
    );
};