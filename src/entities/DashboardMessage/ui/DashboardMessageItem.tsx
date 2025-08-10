interface DashboardMessageItemProps {
    id: number; // <-- ДОБАВЛЕНО
    avatarUrl: string;
    name: string;
    message: string;
    time: string;
    unreadCount: number;
    onClick: (id: number) => void; // <-- ДОБАВЛЕНО
}

export const DashboardMessageItem = ({ id, avatarUrl, name, message, time, unreadCount, onClick }: DashboardMessageItemProps) => {
    return(
        <div 
            onClick={() => onClick(id)} // <-- ДОБАВЛЕНО
            className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
        >
            <img src={avatarUrl} alt={name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
                <p className="font-bold text-gray-800">{name}</p>
                <p className="text-sm text-gray-500 truncate">{message}</p>
            </div>
            <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">{time}</p>
                {unreadCount > 0 && (
                    <span className="bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                        {unreadCount}
                    </span>
                )}
            </div>
        </div>
    );
};