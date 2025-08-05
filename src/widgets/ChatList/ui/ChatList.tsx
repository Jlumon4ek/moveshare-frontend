// src/widgets/ChatList/ui/ChatList.tsx
import { Search } from 'lucide-react';
import { Input } from '../../../shared/ui/Input/Input';
import { ChatItem } from '../../../entities/ChatItem/ui/ChatItem';

export interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unreadCount: number;
}

interface ChatListProps {
  chats: Chat[];
  activeChatId: number;
  onSelectChat: (id: number) => void;
}

export const ChatList = ({ chats, activeChatId, onSelectChat = () => {} }: ChatListProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col p-5">
      <div className="relative mb-4">
        <Input placeholder="Search" className="pl-10" />
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar -mr-3 pr-3">
        <div className="space-y-2">
            {chats.map(chat => (
                <ChatItem 
                    key={chat.id}
                    name={chat.name}
                    lastMessage={chat.lastMessage}
                    time={chat.time}
                    unreadCount={chat.unreadCount}
                    isActive={chat.id === activeChatId}
                    onClick={() => onSelectChat(chat.id)}
                />
            ))}
        </div>
      </div>
    </div>
  );
};