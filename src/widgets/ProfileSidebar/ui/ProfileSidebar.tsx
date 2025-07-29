import { NavLink } from 'react-router-dom';
import { Building2, Truck, CreditCard, Bell, Lock, ShieldCheck, Camera } from 'lucide-react';

const profileNavLinks = [
    { to: '/profile/company', icon: Building2, label: 'Company Information' },
    { to: '/profile/fleet', icon: Truck, label: 'Fleet Management' },
    { to: '/profile/payment', icon: CreditCard, label: 'Payment Settings' },
    { to: '/profile/notifications', icon: Bell, label: 'Notifications' },
    { to: '/profile/security', icon: Lock, label: 'Security' },
    { to: '/profile/verification', icon: ShieldCheck, label: 'Verification' },
];

export const ProfileSidebar = () => {
    const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-3 rounded-lg text-sm transition-colors ${
      isActive
        ? 'bg-primary/10 text-primary font-semibold'
        : 'text-gray-500 hover:bg-gray-100'
    }`;

    return (
        <aside className="w-80 flex-shrink-0 bg-white p-6 rounded-2xl shadow-sm self-start">
            <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-bold">
                        TL
                    </div>
                    <button className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800">
                        <Camera size={16} />
                    </button>
                </div>
                <h2 className="text-xl font-bold text-gray-800">TransAtlantic Logistics</h2>
                <p className="text-sm text-gray-500">contact@transatlantic.com</p>
                <div className="mt-2 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Verified Account
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-6 text-center">
                <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-2xl font-bold text-primary">42</p>
                    <p className="text-xs text-gray-500">Jobs Completed</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-2xl font-bold text-primary">4.8</p>
                    <p className="text-xs text-gray-500">Avg. Rating</p>
                </div>
            </div>
            
            <nav className="flex flex-col gap-2">
                {profileNavLinks.map(link => (
                    <NavLink to={link.to} key={link.to} className={linkClasses} end>
                        <link.icon size={20} />
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};