import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChatList } from '../../widgets/ChatList/ui/ChatList';
import { ChatWindow } from '../../widgets/ChatWindow/ui/ChatWindow';
import { chatsApi, type Chat } from '../../shared/api/chats';
import { ArrowLeft } from 'lucide-react';
import cn from 'classnames';

export const ChatsPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  
  const location = useLocation();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        const response = await chatsApi.getChats(20, 0);
        setChats(response.chats);

        const chatToOpen = location.state?.openChatId;
        if (chatToOpen && response.chats.some(chat => chat.id === chatToOpen)) {
            setActiveChatId(chatToOpen);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch chats');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, [location.state]);

  const activeChat = chats.find(c => c.id === activeChatId);

  const handleSelectChat = (chatId: number) => {
    setActiveChatId(chatId);
  };

  const handleBackToList = () => {
    setActiveChatId(null);
  };

  return (
    <div className="h-full flex flex-col">
        <header className="flex justify-between items-center flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Chats</h1>
        </header>

        <hr className="my-4 sm:my-6 border-gray-200 flex-shrink-0" />

        <div className="flex-1 flex flex-row gap-6 overflow-hidden">
            {/* Chat List */}
            <div className={cn(
                "w-full lg:w-80 lg:flex flex-col flex-shrink-0 transition-transform duration-300 ease-in-out",
                {
                    'block': activeChatId === null,
                    'hidden lg:flex': activeChatId !== null,
                }
            )}>
                {isLoading && <p>Loading chats...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && (
                    <ChatList
                        chats={chats}
                        activeChatId={activeChatId}
                        onSelectChat={handleSelectChat}
                    />
                )}
            </div>
            
            {/* Chat Window */}
            <div className={cn(
                "flex-1 bg-white rounded-2xl shadow-sm flex-col",
                {
                    'flex': activeChatId !== null,
                    'hidden lg:flex': activeChatId === null,
                }
            )}>
                {activeChat ? (
                    <>
                        <button 
                            className="lg:hidden p-4 border-b border-gray-200 flex items-center gap-2 text-gray-600 hover:text-primary"
                            onClick={handleBackToList}
                        >
                            <ArrowLeft size={20} />
                            <span>Back to Chats</span>
                        </button>
                        <ChatWindow chat={activeChat} />
                    </>
                ) : (
                    <div className="p-8 text-center text-gray-500 flex items-center justify-center h-full">
                        Выберите чат, чтобы начать общение
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};