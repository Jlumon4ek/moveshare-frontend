// src/widgets/GettingStarted/ui/GettingStarted.tsx
import { Video, FileText, PlayCircle } from 'lucide-react';

const guideSteps = [
    {
        title: 'Complete your profile',
        description: 'Add company details and verification documents'
    },
    {
        title: 'Set your preferences',
        description: 'Define routes, truck types, and availability'
    },
    {
        title: 'Post or claim jobs',
        description: 'Create new jobs or find existing ones that match your schedule'
    },
    {
        title: 'Connect with partners',
        description: 'Use our secure messaging to coordinate details'
    },
    {
        title: 'Get paid securely',
        description: 'All transactions protected through our payment system'
    }
];


export const GettingStarted = () => {
    return (
        <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-800">Getting Started with MoveShare</h2>
            <div className="w-16 h-0.5 bg-primary mt-2 mb-4" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Video Tutorial */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <Video size={20} className="text-primary"/>
                        <h3 className="font-semibold text-gray-800">Video Tutorial</h3>
                    </div>
                    <div className="relative aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                        {/* Placeholder for video thumbnail */}
                        <img 
                            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop"
                            alt="Two women discussing work at a desk with a laptop"
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                         <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
                        <button className="relative text-white/80 hover:text-white transition-colors">
                            <PlayCircle size={64} />
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                        Watch a 3-minute walkthrough of our platform to learn how to maximize your earnings with MoveShare.
                    </p>
                </div>

                {/* Quick Start Guide */}
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <FileText size={20} className="text-primary"/>
                        <h3 className="font-semibold text-gray-800">Quick Start Guide</h3>
                    </div>
                    <div className="space-y-4">
                        {guideSteps.map((step, index) => (
                             <div key={index} className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full flex items-center justify-center">
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-800">{step.title}</h4>
                                    <p className="text-xs text-gray-500">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};