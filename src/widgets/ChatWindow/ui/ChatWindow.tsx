// src/widgets/ChatWindow/ui/ChatWindow.tsx
import { ChevronLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MessageBubble, type Message } from '../../../entities/Message/ui/MessageBubble';
import { SendMessageForm } from '../../../features/SendMessageForm/ui/SendMessageForm';

// Моковые данные для сообщений
const mockMessages: Message[] = [
    {
        id: 1,
        text: "Hi there! We're interested in claiming your Chicago to Indianapolis job. Can you confirm the exact dimensions?",
        time: "6:30 pm",
        isOwnMessage: false
    },
    {
        id: 2,
        text: "Yes, it's standard furniture - total volume about 1,200 cu ft. Fits easily in a 40' truck.",
        time: "6:34 pm",
        isOwnMessage: true
    },
    {
        id: 3,
        text: "Perfect! We have a 40' trailer returning empty on that route. We can offer $1,850 for the job.",
        time: "6:38 pm",
        isOwnMessage: false
    },
    {
        id: 4,
        text: "That works for us. I'll mark it as claimed in the system. The pickup details are all in the job listing - let me know if you need anything else.",
        time: "6:34 pm",
        isOwnMessage: true
    },
     {
        id: 5,
        text: "Great! We'll send our driver info once the deposit clears. Looking forward to working with you.",
        time: "6:38 pm",
        isOwnMessage: false
    },
]

export const ChatWindow = () => {
    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <header className="p-4 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <button className="text-gray-500 hover:text-gray-800 lg:hidden">
                        <ChevronLeft size={24} />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                    <div>
                        <h3 className="font-bold text-gray-900">TransAtlantic Logistics</h3>
                        <p className="text-sm text-gray-500">
                            Job <Link to="#" className="text-primary hover:underline">#MS-4821</Link>: Chicago, IL → Indianapolis, IN
                        </p>
                    </div>
                </div>
            </header>
            
            {/* Warning */}
            <div className="bg-yellow-50 text-yellow-800 text-sm p-3 flex items-center gap-2 flex-shrink-0">
                <AlertTriangle size={18} />
                <p>
                    <span className="font-semibold">Remember:</span> Sharing contact details before payment violates our Terms of Service
                </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {mockMessages.map(msg => (
                    <MessageBubble key={msg.id} {...msg} />
                ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 flex-shrink-0">
                <SendMessageForm />
            </div>
        </div>
    )
}