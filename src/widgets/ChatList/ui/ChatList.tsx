// src/widgets/ChatList/ui/ChatList.tsx
import { Search } from 'lucide-react';
import { Input } from '../../../shared/ui/Input/Input';
import { ChatItem } from '../../../entities/ChatItem/ui/ChatItem';
import type { Chat } from '../../../shared/api/chats'; 

interface ChatListProps {
  chats: Chat[];
  activeChatId: number | null;
  onSelectChat: (id: number) => void;
}

export const ChatList = ({ chats, activeChatId, onSelectChat }: ChatListProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col p-4 sm:p-5">
      <div className="relative mb-4">
        <Input placeholder="Search chats..." className="pl-10" />
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar -mr-2 sm:-mr-3 pr-2 sm:pr-3">
        <div className="space-y-2">
            {chats.map(chat => (
                <ChatItem 
                    key={chat.id}
                    name={chat.other_user_name}
                    lastMessage={chat.last_message}
                    time={new Date(chat.last_message_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    unreadCount={chat.unread_count}
                    isActive={chat.id === activeChatId}
                    onClick={() => onSelectChat(chat.id)}
                />
            ))}
        </div>
      </div>
    </div>
  );
};

