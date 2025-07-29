import { ToggleSwitch } from '../../../shared/ui/ToggleSwitch/ui/ToggleSwitch';

const notificationSettings = [
    { 
        title: "New Job Matches", 
        description: "Get notified when new jobs match your fleet availability",
        enabled: true 
    },
    { 
        title: "Job Claims", 
        description: "When someone claims your job or you claim a job",
        enabled: true 
    },
    { 
        title: "Messages", 
        description: "When you receive new messages",
        enabled: true 
    },
    { 
        title: "Payment Updates", 
        description: "When payments are sent or received",
        enabled: true 
    },
    { 
        title: "System Updates", 
        description: "Important platform updates and announcements",
        enabled: false 
    },
];

export const NotificationSettings = () => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Notification Preferences
            </h2>

            <div className="divide-y divide-gray-200">
                {notificationSettings.map((setting, index) => (
                    <div key={index} className="flex justify-between items-center py-4">
                        <div>
                            <p className="font-medium text-gray-800">{setting.title}</p>
                            <p className="text-sm text-gray-500">{setting.description}</p>
                        </div>
                        <ToggleSwitch initialChecked={setting.enabled} />
                    </div>
                ))}
            </div>
        </div>
    );
};