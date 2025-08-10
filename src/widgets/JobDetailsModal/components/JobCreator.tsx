import React from 'react';
import { Award, Star, CheckCircle, Phone, Mail } from 'lucide-react';

interface JobCreatorProps {
    contractorId: string | number;
    createdAt: string | number | Date;
    jobStatus: string;
}

export const JobCreator = ({
    contractorId,
    createdAt,
    jobStatus
}: JobCreatorProps) => {
    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Award size={20} className="text-yellow-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-800">Job Creator</h3>
            </div>
            
            <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#60A5FA] to-[#3B82F6] text-white font-bold flex items-center justify-center rounded-xl text-sm">
                    #{contractorId.toString().slice(-2)}
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-800 mb-1">Creator #{contractorId}</h4>
                    <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4].map((star) => (
                            <Star key={star} size={14} className="text-yellow-400 fill-yellow-400" />
                        ))}
                        <Star size={14} className="text-gray-300" />
                        <span className="text-xs text-gray-600 ml-1">4.2</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-500" />
                        <span className="text-green-700 text-xs font-medium">Verified</span>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-3 rounded-xl text-center">
                    <p className="text-xs text-gray-500 mb-1">Posted</p>
                    <p className="text-xs font-bold text-gray-800">{formatDate(createdAt)}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl text-center">
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <p className="text-xs font-bold text-green-600 capitalize">{jobStatus}</p>
                </div>
            </div>
            
            <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 text-[#60A5FA] hover:bg-[#60A5FA]/10 py-2 px-3 rounded-xl transition-colors text-xs font-medium">
                    <Phone size={14} />
                    Call
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 text-[#60A5FA] hover:bg-[#60A5FA]/10 py-2 px-3 rounded-xl transition-colors text-xs font-medium">
                    <Mail size={14} />
                    Message
                </button>
            </div>
        </div>
    );
};