import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UpcomingSchedule } from '../../UpcomingSchedule/ui/UpcomingSchedule';
import { DashboardMessageItem } from '../../../entities/DashboardMessage/ui/DashboardMessageItem';
import { chatsApi, type Chat } from '../../../shared/api/chats';
import { Button } from '../../../shared/ui/Button/Button';

export const DashboardActivity = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecentChats = async () => {
            try {
                const response = await chatsApi.getChats(5, 0);
                setChats(response.chats);
            } catch (error) {
                console.error("Failed to fetch recent chats:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecentChats();
    }, []);

    const handleMessageClick = (chatId: number) => {
        navigate('/chats', { state: { openChatId: chatId } });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
            <div className="lg:col-span-2">
                <UpcomingSchedule />
            </div>
            <div className="lg:col-span-3">
                <div className="bg-white p-6 rounded-2xl shadow-sm h-full flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-gray-800">Messages</h3>
                        <Button variant="outline" size="sm" onClick={() => navigate('/chats')}>View All</Button>
                    </div>
                    <div>
                        {isLoading ? (
                            <p className="text-gray-500">Loading messages...</p>
                        ) : chats.length > 0 ? (
                            chats.map(chat => (
                                <DashboardMessageItem 
                                    key={chat.id}
                                    id={chat.id} // <-- ИСПРАВЛЕНИЕ: Передаем id
                                    name={chat.other_user_name}
                                    message={chat.last_message}
                                    time={new Date(chat.last_message_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    avatarUrl={`https://i.pravatar.cc/150?u=${chat.other_user_id}`}
                                    unreadCount={chat.unread_count}
                                    onClick={handleMessageClick} // <-- ИСПРАВЛЕНИЕ: onClick теперь берет id из компонента
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-8">No recent messages.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};