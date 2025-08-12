import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Building2, Truck, CreditCard, Bell, Lock, ShieldCheck } from 'lucide-react';
import { companyApi, type CompanyData } from '../../../shared/api/company';
import { jobsApi, type Job } from '../../../shared/api/jobs';
import { ProfilePhotoUpload } from '../../../shared/ui/ProfilePhotoUpload/ProfilePhotoUpload';
import { profileApi, type UserRatingStats } from '../../../shared/api/profile';
import { authStore } from '../../../shared/lib/auth/authStore';

const profileNavLinks = [
    { to: '/profile/company', icon: Building2, label: 'Company Information' },
    { to: '/profile/fleet', icon: Truck, label: 'Fleet Management' },
    { to: '/profile/payment', icon: CreditCard, label: 'Payment Settings' },
    { to: '/profile/notifications', icon: Bell, label: 'Notifications' },
    { to: '/profile/security', icon: Lock, label: 'Security' },
    { to: '/profile/verification', icon: ShieldCheck, label: 'Verification' },
];

export const ProfileSidebar = () => {
    const [companyData, setCompanyData] = useState<CompanyData | null>(null);
    const [completedJobsCount, setCompletedJobsCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
    const [ratingStats, setRatingStats] = useState<UserRatingStats | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch company data
                const company = await companyApi.getCompanyInfo();
                setCompanyData(company);

                // Fetch claimed jobs to count completed ones
                const response = await jobsApi.getClaimedJobs({ page: 1, limit: 1000 }); // Get all jobs for counting
                const jobs = response.jobs || [];
                const completedCount = jobs.filter((job: Job) => job.job_status === 'completed').length;
                setCompletedJobsCount(completedCount);

                // Fetch profile photo and rating stats if user ID is available
                const { user } = authStore.getState();
                if (user?.user_id) {
                    // Fetch profile photo
                    try {
                        const response = await profileApi.getProfilePhoto(user.user_id);
                        setProfilePhotoUrl(response.photo_url);
                    } catch {
                        // Photo doesn't exist or error fetching - that's ok
                        console.log('No profile photo found or error fetching');
                    }

                    // Fetch rating stats
                    try {
                        const response = await profileApi.getUserRatingStats(user.user_id);
                        setRatingStats(response.stats);
                    } catch {
                        // Rating stats don't exist or error fetching - that's ok
                        console.log('No rating stats found or error fetching');
                    }
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePhotoUpdate = (photoUrl: string | null) => {
        setProfilePhotoUrl(photoUrl);
    };

    const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg text-sm transition-colors ${
      isActive
        ? 'bg-primary/10 text-primary font-semibold'
        : 'text-gray-500 hover:bg-gray-100'
    }`;

    return (
        <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0 bg-white p-4 sm:p-6 rounded-2xl shadow-sm self-start">
            {/* Profile Header - Responsive Layout */}
            <div className="flex flex-row lg:flex-col items-center lg:text-center gap-4 lg:gap-0">
                <div className="flex-shrink-0 mb-0 lg:mb-4">
                    <ProfilePhotoUpload
                        currentPhotoUrl={profilePhotoUrl}
                        onPhotoUpdate={handlePhotoUpdate}
                        fallbackText={isLoading ? '...' : (companyData?.company_name ? 
                            companyData.company_name.substring(0, 2).toUpperCase() : 'TL')}
                    />
                </div>
                <div className="flex-1 lg:flex-none text-left lg:text-center">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        {isLoading ? 'Loading...' : companyData?.company_name || 'N/A'}
                    </h2>
                    <p className="text-sm text-gray-500 break-all lg:break-normal">
                        {isLoading ? 'Loading...' : companyData?.email_address}
                    </p>
                    <div className="mt-2 inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Verified Account
                    </div>
                </div>
            </div>

            {/* Stats Grid - Responsive */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 my-4 sm:my-6 text-center">
                <div className="bg-gray-50 rounded-xl p-2.5 sm:p-3">
                    <p className="text-xl sm:text-2xl font-bold text-primary">
                        {isLoading ? '...' : completedJobsCount}
                    </p>
                    <p className="text-xs text-gray-500">Jobs Completed</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-2.5 sm:p-3">
                    <p className="text-xl sm:text-2xl font-bold text-primary">
                        {isLoading ? '...' : 
                         ratingStats?.average_rating !== null && ratingStats?.average_rating !== undefined ? 
                         ratingStats.average_rating.toFixed(1) : 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">
                        Avg. Rating {ratingStats?.total_reviews ? `(${ratingStats.total_reviews})` : ''}
                    </p>
                </div>
            </div>
            
            {/* Navigation - Responsive */}
            <nav className="flex flex-col lg:flex-col gap-1.5 sm:gap-2">
                {/* Mobile horizontal scrolling navigation */}
                <div className="lg:hidden flex overflow-x-auto hide-scrollbar gap-2 pb-2 -mx-2 px-2">
                    {profileNavLinks.map(link => (
                        <NavLink to={link.to} key={link.to} className={({ isActive }) => 
                            `flex items-center gap-2 p-2.5 rounded-lg text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                                isActive
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-gray-500 hover:bg-gray-100'
                            }`
                        } end>
                            <link.icon size={16} />
                            <span className="text-xs">{link.label}</span>
                        </NavLink>
                    ))}
                </div>
                
                {/* Desktop vertical navigation */}
                <div className="hidden lg:flex flex-col gap-2">
                    {profileNavLinks.map(link => (
                        <NavLink to={link.to} key={link.to} className={linkClasses} end>
                            <link.icon size={20} />
                            <span>{link.label}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>
        </aside>
    );
};