// src/widgets/MyJobsWidget/ui/MyJobsWidget.tsx

import { useState, useEffect, useMemo } from 'react';
import { jobsApi, type Job } from '../../../shared/api/jobs';
import { Checkbox } from '../../../shared/ui/Checkbox/Checkbox';
import { Button } from '../../../shared/ui/Button/Button';
import { JobDetailsModal } from '../../JobDetailsModal/ui/JobDetailsModal';
import { Eye, MapPin, Calendar, Truck, DollarSign, Trash2, AlertTriangle, X } from 'lucide-react';
import cn from 'classnames';

type Status = 'active' | 'pending' | 'completed' | 'canceled';
const TABS: Status[] = ['active', 'pending', 'completed', 'canceled'];

const statusStyles: Record<Status, string> = {
    active: 'bg-blue-50 text-blue-700 border border-blue-200',
    pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    canceled: 'bg-red-50 text-red-700 border border-red-200',
};

export const MyJobsWidget = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<Status>('pending'); // Изменено на pending
    const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
    const [deletingJobs, setDeletingJobs] = useState<Set<number>>(new Set());
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; jobId: number | null; jobDetails?: Job }>({ 
        isOpen: false, 
        jobId: null 
    });
    const [jobDetailsModal, setJobDetailsModal] = useState<{ isOpen: boolean; jobId: number | null }>({
        isOpen: false,
        jobId: null
    });
    const [isExporting, setIsExporting] = useState(false);

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

    useEffect(() => {
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

    const handleDeleteJob = (jobId: number) => {
        const jobDetails = jobs.find(job => job.id === jobId);
        setDeleteModal({ 
            isOpen: true, 
            jobId, 
            jobDetails 
        });
    };

    const handleViewJobDetails = (jobId: number) => {
        setJobDetailsModal({
            isOpen: true,
            jobId
        });
    };

    const handleExportJobs = async () => {
        if (selectedJobs.length === 0) return;

        setIsExporting(true);
        try {
            const blob = await jobsApi.exportJobs(selectedJobs);
            
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            
            // Generate filename with current date
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD format
            link.download = `my-jobs-${dateStr}.csv`;
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            // Clear selection after successful export
            setSelectedJobs([]);
        } catch (error) {
            console.error('Failed to export jobs:', error);
            // You could add a toast notification here for better UX
        } finally {
            setIsExporting(false);
        }
    };

    const confirmDeleteJob = async () => {
        const { jobId } = deleteModal;
        if (!jobId) return;

        setDeletingJobs(prev => new Set([...prev, jobId]));
        
        try {
            await jobsApi.deleteJob(jobId);
            setJobs(prev => prev.filter(job => job.id !== jobId));
            setSelectedJobs(prev => prev.filter(id => id !== jobId));
            setDeleteModal({ isOpen: false, jobId: null });
        } catch (err) {
            console.error('Failed to delete job:', err);
            // Error will be shown in the modal
        } finally {
            setDeletingJobs(prev => {
                const next = new Set(prev);
                next.delete(jobId);
                return next;
            });
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col">
                <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                        {TABS.map(tab => (
                            <div key={tab} className="flex-1 py-2 px-4 bg-gray-200 rounded-md animate-pulse h-10"></div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500">Loading your jobs...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col">
                <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load jobs</h3>
                        <p className="text-red-500 text-center mb-4">{error}</p>
                        <Button variant="primary" size="sm" onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col overflow-hidden">
            {/* Header with Tabs */}
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                    {TABS.map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "flex-1 py-2 px-4 text-sm font-medium capitalize transition-all duration-200 rounded-md",
                                {
                                    'bg-white text-primary shadow-sm': activeTab === tab,
                                    'text-gray-600 hover:text-gray-900 hover:bg-gray-200': activeTab !== tab,
                                }
                            )}
                        >
                            {tab} 
                            <span className={cn(
                                "ml-2 text-xs rounded-full px-2 py-0.5",
                                activeTab === tab ? 'bg-primary/10 text-primary' : 'bg-gray-300 text-gray-600'
                            )}>
                                {jobCounts[tab] || 0}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Enhanced Table */}
            <div className="flex-1 overflow-y-auto">
                <table className="w-full">
                    <thead className="sticky top-0 bg-white shadow-sm z-10">
                        <tr className="border-b border-gray-200">
                            <th className="p-4 w-12">
                                <Checkbox 
                                    checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0} 
                                    onChange={handleSelectAll} 
                                    children={undefined} 
                                />
                            </th>
                            <th className="p-4 text-left font-semibold text-gray-700">Job ID</th>
                            <th className="p-4 text-left font-semibold text-gray-700">Route</th>
                            <th className="p-4 text-left font-semibold text-gray-700">Schedule</th>
                            <th className="p-4 text-left font-semibold text-gray-700">Vehicle</th>
                            <th className="p-4 text-left font-semibold text-gray-700">Payment</th>
                            <th className="p-4 text-left font-semibold text-gray-700">Status</th>
                            <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJobs.map((job, index) => (
                            <tr key={job.id} className={cn(
                                "border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150",
                                index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                            )}>
                                <td className="p-4">
                                    <Checkbox 
                                        checked={selectedJobs.includes(job.id)} 
                                        onChange={() => handleSelectJob(job.id)} 
                                        children={undefined} 
                                    />
                                </td>
                                <td className="p-4">
                                    <span className="font-bold text-gray-900 text-base">#{job.id}</span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-start gap-2">
                                        <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{job.pickup_address}</p>
                                            <p className="text-sm text-gray-500 truncate">→ {job.delivery_address}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {new Date(job.pickup_date).toLocaleDateString('en-US', { 
                                                    month: 'short', 
                                                    day: 'numeric' 
                                                })}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                to {new Date(job.delivery_date).toLocaleDateString('en-US', { 
                                                    month: 'short', 
                                                    day: 'numeric' 
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Truck size={16} className="text-gray-400" />
                                        <span className="text-sm font-medium text-gray-900 capitalize">
                                            {job.truck_size}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <DollarSign size={16} className="text-green-600" />
                                        <span className="text-sm font-bold text-green-600">
                                            {job.payment_amount.toLocaleString()}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={cn(
                                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize",
                                        statusStyles[job.job_status]
                                    )}>
                                        <div className={cn(
                                            "w-2 h-2 rounded-full mr-2",
                                            job.job_status === 'active' && 'bg-blue-600',
                                            job.job_status === 'pending' && 'bg-amber-600',
                                            job.job_status === 'completed' && 'bg-emerald-600',
                                            job.job_status === 'canceled' && 'bg-red-600'
                                        )} />
                                        {job.job_status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <button 
                                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors duration-150"
                                            onClick={() => handleViewJobDetails(job.id)}
                                            title="View job details"
                                        >
                                            <Eye size={18}/>
                                        </button>
                                        <button 
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                            onClick={() => handleDeleteJob(job.id)}
                                            disabled={deletingJobs.has(job.id)}
                                            title="Delete job"
                                        >
                                            {deletingJobs.has(job.id) ? (
                                                <div className="w-4 h-4 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin" />
                                            ) : (
                                                <Trash2 size={18}/>
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {/* Empty State */}
                {filteredJobs.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 px-6">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Truck size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} jobs</h3>
                        <p className="text-gray-500 text-center">
                            {activeTab === 'pending' 
                                ? "You don't have any pending jobs at the moment." 
                                : `No ${activeTab} jobs found.`
                            }
                        </p>
                    </div>
                )}
            </div>
            
            {/* Enhanced Bulk Actions Footer */}
            {selectedJobs.length > 0 && (
                <div className="flex-shrink-0 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-t border-primary/20">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">{selectedJobs.length}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-700">
                                {selectedJobs.length} job{selectedJobs.length > 1 ? 's' : ''} selected
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-white"
                                onClick={handleExportJobs}
                                disabled={isExporting || selectedJobs.length === 0}
                            >
                                {isExporting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin" />
                                        Exporting...
                                    </div>
                                ) : (
                                    'Export to CSV'
                                )}
                            </Button>
                            <Button variant="danger" size="sm">
                                Cancel Selected
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setDeleteModal({ isOpen: false, jobId: null })}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div className="px-6 py-4 bg-red-50 border-b border-red-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                        <AlertTriangle size={20} className="text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-red-900">Delete Job</h3>
                                        <p className="text-sm text-red-700">This action cannot be undone</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setDeleteModal({ isOpen: false, jobId: null })}
                                    className="p-1 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-6 py-6">
                            {deleteModal.jobDetails && (
                                <div className="mb-6">
                                    <p className="text-gray-600 mb-6">
                                        Are you sure you want to delete this job? This will permanently remove all data associated with:
                                    </p>
                                    
                                    {/* Enhanced Job Card */}
                                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-sm">
                                        {/* Header with Job ID and Status */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center border">
                                                    <Truck size={20} className="text-gray-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-900">Job #{deleteModal.jobDetails.id}</h4>
                                                    <p className="text-sm text-gray-500 capitalize">{deleteModal.jobDetails.truck_size} Truck</p>
                                                </div>
                                            </div>
                                            <span className={cn(
                                                "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold capitalize",
                                                statusStyles[deleteModal.jobDetails.job_status]
                                            )}>
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full mr-2",
                                                    deleteModal.jobDetails.job_status === 'active' && 'bg-blue-600',
                                                    deleteModal.jobDetails.job_status === 'pending' && 'bg-amber-600',
                                                    deleteModal.jobDetails.job_status === 'completed' && 'bg-emerald-600',
                                                    deleteModal.jobDetails.job_status === 'canceled' && 'bg-red-600'
                                                )} />
                                                {deleteModal.jobDetails.job_status}
                                            </span>
                                        </div>

                                        {/* Route Information */}
                                        <div className="mb-4">
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="flex flex-col items-center mt-1">
                                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                    <div className="w-0.5 h-6 bg-gray-300 my-1"></div>
                                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="mb-2">
                                                        <p className="text-xs font-medium text-green-700 mb-1">PICKUP</p>
                                                        <p className="text-sm font-medium text-gray-900">{deleteModal.jobDetails.pickup_address}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-red-700 mb-1">DELIVERY</p>
                                                        <p className="text-sm font-medium text-gray-900">{deleteModal.jobDetails.delivery_address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Schedule and Payment */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white rounded-lg p-4 border">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Calendar size={16} className="text-blue-500" />
                                                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Schedule</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {new Date(deleteModal.jobDetails.pickup_date).toLocaleDateString('en-US', { 
                                                            month: 'short', 
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        to {new Date(deleteModal.jobDetails.delivery_date).toLocaleDateString('en-US', { 
                                                            month: 'short', 
                                                            day: 'numeric' 
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="bg-white rounded-lg p-4 border">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <DollarSign size={16} className="text-green-500" />
                                                    <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Payment</span>
                                                </div>
                                                <div>
                                                    <p className="text-lg font-bold text-green-600">
                                                        ${deleteModal.jobDetails.payment_amount.toLocaleString()}
                                                    </p>
                                                    <p className="text-xs text-gra  y-500">Total amount</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setDeleteModal({ isOpen: false, jobId: null })}
                                disabled={deleteModal.jobId ? deletingJobs.has(deleteModal.jobId) : false}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="danger" 
                                size="sm"
                                onClick={confirmDeleteJob}
                                disabled={deleteModal.jobId ? deletingJobs.has(deleteModal.jobId) : false}
                            >
                                {deleteModal.jobId && deletingJobs.has(deleteModal.jobId) ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Deleting...
                                    </div>
                                ) : (
                                    <>
                                        <Trash2 size={16} />
                                        Delete Job
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Job Details Modal */}
            {jobDetailsModal.isOpen && jobDetailsModal.jobId && (
                <JobDetailsModal
                    jobId={jobDetailsModal.jobId}
                    isOpen={jobDetailsModal.isOpen}
                    onClose={() => setJobDetailsModal({ isOpen: false, jobId: null })}
                />
            )}
        </div>
    );
};