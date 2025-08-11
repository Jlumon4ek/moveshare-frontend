import { Shield, CheckCircle, DollarSign } from 'lucide-react';

export const TrustSafety = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#60A5FA]/10 rounded-xl flex items-center justify-center">
                    <Shield size={20} className="text-[#60A5FA]" />
                </div>
                <h3 className="text-sm font-bold text-gray-800">Trust & Safety</h3>
            </div>
            
            <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs">
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-gray-700">Verified Creator</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                    <Shield size={16} className="text-[#60A5FA]" />
                    <span className="text-gray-700">Payment Protected</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                    <DollarSign size={16} className="text-green-500" />
                    <span className="text-gray-700">Secure Transaction</span>
                </div>
            </div>
        </div>
    );
};