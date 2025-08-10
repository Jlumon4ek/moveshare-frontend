import { DollarSign, MapPin, Users, Weight } from 'lucide-react';

interface JobQuickStatsProps {
    cutAmount: number;
    distanceMiles: number;
    estimatedCrewAssistants: string;
    weightLbs: number;
}

export const JobQuickStats = ({
    cutAmount,
    distanceMiles,
    estimatedCrewAssistants,
    weightLbs
}: JobQuickStatsProps) => {
    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                    <DollarSign size={20} className="text-green-600" />
                    <span className="text-xs font-bold text-green-700">Your Cut</span>
                </div>
                <p className="text-lg font-bold text-green-800">${cutAmount.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-[#60A5FA]/10 to-[#60A5FA]/20 p-4 rounded-2xl border border-[#60A5FA]/30">
                <div className="flex items-center gap-3 mb-2">
                    <MapPin size={20} className="text-[#60A5FA]" />
                    <span className="text-xs font-bold text-[#3B82F6]">Distance</span>
                </div>
                <p className="text-lg font-bold text-[#1E40AF]">{distanceMiles} mi</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-2xl border border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                    <Users size={20} className="text-purple-600" />
                    <span className="text-xs font-bold text-purple-700">Crew</span>
                </div>
                <p className="text-lg font-bold text-purple-800">{estimatedCrewAssistants}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-2xl border border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                    <Weight size={20} className="text-orange-600" />
                    <span className="text-xs font-bold text-orange-700">Weight</span>
                </div>
                <p className="text-lg font-bold text-orange-800">{(weightLbs / 1000).toFixed(1)}k lbs</p>
            </div>
        </div>
    );
};