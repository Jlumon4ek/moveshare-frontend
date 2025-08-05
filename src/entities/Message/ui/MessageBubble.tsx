import cn from 'classnames';
import { MoreVertical } from 'lucide-react';

export interface Message {
    id: number;
    text: string;
    time: string;
    isOwnMessage: boolean;
}

export const MessageBubble = ({ text, time, isOwnMessage }: Message) => {
    return (
        <div className={cn('flex items-end gap-2', { 'justify-end': isOwnMessage })}>
            {!isOwnMessage && <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"/>}
            <div 
                className={cn(
                    'max-w-lg p-3 rounded-2xl relative group',
                    {
                        'bg-primary text-white rounded-br-lg': isOwnMessage,
                        'bg-gray-100 text-gray-800 rounded-bl-lg': !isOwnMessage,
                    }
                )}
            >
                <p className="text-sm">{text}</p>
                <div className="flex justify-end items-center mt-1">
                    <span className={cn('text-xs', { 
                        'text-white/70': isOwnMessage,
                        'text-gray-500': !isOwnMessage,
                    })}>
                        {time}
                    </span>
                </div>
            </div>
             <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={18} />
            </button>
        </div>
    );
};