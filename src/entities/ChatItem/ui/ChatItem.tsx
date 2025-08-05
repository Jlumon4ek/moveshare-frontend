import cn from 'classnames';

interface ChatItemProps {
    name: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
    isActive: boolean;
    onClick: () => void;
}

export const ChatItem = ({ name, lastMessage, time, unreadCount, isActive, onClick }: ChatItemProps) => {
    return (
        <div 
            onClick={onClick}
            className={cn(
                'flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors',
                {
                    'bg-primary/10': isActive,
                    'hover:bg-gray-50': !isActive,
                }
            )}
        >
            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
            <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-800 truncate">{name}</h4>
                    <span className="text-xs text-gray-400 flex-shrink-0">{time}</span>
                </div>
                <div className="flex justify-between items-start mt-1">
                    <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
                    {unreadCount > 0 && (
                        <span className="bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 ml-2">
                            {unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}