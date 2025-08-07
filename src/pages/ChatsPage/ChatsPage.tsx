// src/pages/ChatsPage/ChatsPage.tsx
import { useState, useEffect } from 'react';
import { ChatList } from '../../widgets/ChatList/ui/ChatList';
import { ChatWindow } from '../../widgets/ChatWindow/ui/ChatWindow';
import { chatsApi, type Chat } from '../../shared/api/chats';

const user = {
    name: 'Tolebi Baitassov',
    role: 'Carrier'
};

export const ChatsPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        const response = await chatsApi.getChats(20, 0);
        setChats(response.chats);
        if (response.chats.length > 0) {
          setActiveChatId(response.chats[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch chats');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, []);

  const activeChat = chats.find(c => c.id === activeChatId);

  return (
    <div className="h-full flex flex-col">
        <header className="flex justify-between items-center flex-shrink-0">
            <h1 className="text-3xl font-bold text-gray-800">Chats</h1>
            <div className="flex items-center gap-3 text-right">
                <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-200" />
            </div>
        </header>

        <hr className="my-4 border-gray-200 flex-shrink-0" />

        {/* Основной контент */}
        <div className="flex-1 flex flex-row gap-6 overflow-hidden">
            {/* Левая колонка (список чатов) */}
            <div className="w-full max-w-sm flex-shrink-0 lg:flex flex-col hidden">
                {isLoading && <p>Loading chats...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && (
                    <ChatList
                        chats={chats}
                        activeChatId={activeChatId}
                        onSelectChat={setActiveChatId}
                    />
                )}
            </div>
            
            {/* Правая колонка (окно чата) */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col">
                {activeChat ? <ChatWindow chat={activeChat} /> : 
                <div className="p-8 text-center text-gray-500 flex items-center justify-center h-full">
                    Выберите чат, чтобы начать общение
                </div>
                }
            </div>
        </div>
    </div>
  );
};