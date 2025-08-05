import { Upload, Download, CheckCircle2 } from 'lucide-react';
import type { ReactNode } from 'react';

const postingBenefits = [
    "Monetize overflow jobs you can't handle",
    "Expand your coverage area without buying new trucks",
    "Subcontract with trusted, vetted partners",
    "Reduce operational costs and increase profitability",
    "Access a network of reliable movers nationwide"
];

const claimingBenefits = [
    "Access a steady stream of verified jobs",
    "Fill your empty return trips and earn more",
    "Get paid instantly and securely with Stripe",
    "Grow your business without marketing costs",
    "Build your reputation in the moving industry"
];

// Небольшой компонент для пункта списка
const BenefitItem = ({ children }: { children: ReactNode }) => (
    <div className="flex items-start gap-3">
        <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
        <span className="text-gray-700">{children}</span>
    </div>
);

export const WhoIsMoveShareFor = () => {
    return (
        <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-800">Who Is MoveShare For?</h2>
            <div className="w-16 h-0.5 bg-primary mt-2 mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* For Movers Posting Jobs */}
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <Upload size={24} className="text-primary"/>
                        <h3 className="text-lg font-semibold text-gray-800">For Movers Posting Jobs</h3>
                    </div>
                    <div className="space-y-3">
                        {postingBenefits.map((text, index) => (
                            <BenefitItem key={index}>{text}</BenefitItem>
                        ))}
                    </div>
                </div>
                
                {/* For Movers Claiming Jobs */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <Download size={24} className="text-primary"/>
                        <h3 className="text-lg font-semibold text-gray-800">For Movers Claiming Jobs</h3>
                    </div>
                    <div className="space-y-3">
                        {claimingBenefits.map((text, index) => (
                            <BenefitItem key={index}>{text}</BenefitItem>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};