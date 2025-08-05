// src/pages/ChatsPage/ChatsPage.tsx
import { useState } from 'react';
import { ChatList, type Chat } from '../../widgets/ChatList/ui/ChatList';
import { ChatWindow } from '../../widgets/ChatWindow/ui/ChatWindow';

// Моковые данные для списка чатов
const mockChats: Chat[] = [
  {
    id: 1,
    name: 'NorthStar Movers',
    lastMessage: 'Do you have the bill of lading read...',
    time: '10:30AM',
    avatar: '', // Заглушка для аватара
    unreadCount: 0,
  },
  {
    id: 2,
    name: 'Peak Movers',
    lastMessage: 'Can we reschedule for Friday inste...',
    time: 'Yesterday',
    avatar: '',
    unreadCount: 0,
  },
  {
    id: 3,
    name: 'Peak Movers',
    lastMessage: 'Can we reschedule for Friday?',
    time: 'Jul 28',
    avatar: '',
    unreadCount: 2,
  },
];

// Моковые данные пользователя для хедера
const user = {
    name: 'Tolebi Baitassov',
    role: 'Carrier'
};

export const ChatsPage = () => {
  const [activeChatId, setActiveChatId] = useState(1);
  const activeChat = mockChats.find(c => c.id === activeChatId);

  return (
    <div className="h-full flex flex-col">
        {/* --- НАЧАЛО НОВОГО БЛОКА --- */}
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
        {/* --- КОНЕЦ НОВОГО БЛОКА --- */}

        {/* Основной контент */}
        <div className="flex-1 flex flex-row gap-6 overflow-hidden">
            {/* Левая колонка (список чатов) */}
            <div className="w-full max-w-sm flex-shrink-0 lg:flex flex-col hidden">
                <ChatList
                chats={mockChats}
                activeChatId={activeChatId}
                onSelectChat={setActiveChatId}
                />
            </div>
            
            {/* Правая колонка (окно чата) */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col">
                {activeChat ? <ChatWindow /> : 
                <div className="p-8 text-center text-gray-500 flex items-center justify-center h-full">
                    Выберите чат, чтобы начать общение
                </div>
                }
            </div>
        </div>
    </div>
  );
};