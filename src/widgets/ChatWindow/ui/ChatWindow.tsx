import { ChevronLeft, AlertTriangle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MessageBubble } from '../../../entities/Message/ui/MessageBubble';
import { SendMessageForm } from '../../../features/SendMessageForm/ui/SendMessageForm';
import { chatsApi, type Message, type Chat } from '../../../shared/api/chats';
import { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import { useWebSocket } from '../../../shared/lib/websocket/useWebSocket';
import { toastStore } from '../../../shared/lib/toast/toastStore';
import { authStore } from '../../../shared/lib/auth/authStore';

const InitialLoadingIndicator = ({ text }: { text: string }) => (
    <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin h-6 w-6 text-primary mr-2" />
        <span>{text}</span>
    </div>
);

interface ChatWindowProps {
    chat: Chat;
}

const MESSAGE_LIMIT = 30;

export const ChatWindow = ({ chat }: ChatWindowProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isSending, setIsSending] = useState(false);
    
    const isLoadingMoreRef = useRef(false);
    const paginationRef = useRef({ hasNext: true, offset: 0 });
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const scrollHeightRef = useRef(0);

    const handleIncomingMessage = useCallback((newMessage: Message) => {
        setMessages(prev => {
            if (prev.some(msg => msg.id === newMessage.id)) {
                return prev;
            }
            return [...prev, newMessage];
        });
    }, []);

    useWebSocket(chat.id, handleIncomingMessage);

    const loadMessages = useCallback(async (currentOffset: number, abortSignal: AbortSignal) => {
        try {
            const response = await chatsApi.getChatMessages(chat.id, MESSAGE_LIMIT, currentOffset, { signal: abortSignal });
            if (abortSignal.aborted) return null;
            
            const newMessages = response.messages || [];
            const sortedMessages = newMessages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            
            return { newMessages: sortedMessages, hasNext: response.pagination.has_next };
        } catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                setError('Failed to fetch messages');
            }
            return null;
        }
    }, [chat.id]);
    
    useEffect(() => {
        const abortController = new AbortController();
        setIsInitialLoad(true);
        setMessages([]);
        setError(null);
        paginationRef.current = { hasNext: true, offset: 0 };
        loadMessages(0, abortController.signal).then((result) => {
            if (result) {
                setMessages(result.newMessages);
                paginationRef.current = { hasNext: result.hasNext, offset: result.newMessages.length };
            }
            setIsInitialLoad(false);
        });
        return () => abortController.abort();
    }, [chat.id, loadMessages]);

    useLayoutEffect(() => {
        if (!isInitialLoad && messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [isInitialLoad]);

    const handleScroll = async () => {
        const container = messageContainerRef.current;
        if (!container || isLoadingMoreRef.current || !paginationRef.current.hasNext) return;
        if (container.scrollTop === 0) {
            isLoadingMoreRef.current = true;
            scrollHeightRef.current = container.scrollHeight;
            const result = await loadMessages(paginationRef.current.offset, new AbortController().signal);
            if (result && result.newMessages.length > 0) {
                setMessages(prev => [...result.newMessages, ...prev]);
                paginationRef.current = { 
                    hasNext: result.hasNext, 
                    offset: paginationRef.current.offset + result.newMessages.length 
                };
            } else {
                 paginationRef.current.hasNext = false;
            }
        }
    };
    
    useLayoutEffect(() => {
        const container = messageContainerRef.current;
        if (container && isLoadingMoreRef.current) {
            container.scrollTop = container.scrollHeight - scrollHeightRef.current;
            isLoadingMoreRef.current = false;
        }
    }, [messages]);

    const handleSendMessage = async (messageText: string) => {
        setIsSending(true);
        const currentUser = authStore.getState().user;

        const tempId = Date.now();
        const optimisticMessage: Message = {
            id: tempId,
            sender_id: currentUser?.user_id || -1,
            sender_name: currentUser?.username || "You",
            message_text: messageText,
            message_type: 'text',
            is_read: false,
            is_from_me: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        setMessages(prev => [...prev, optimisticMessage]);

        setTimeout(() => {
            if (messageContainerRef.current) {
                messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
            }
        }, 0);

        try {
            const response = await chatsApi.sendMessage(chat.id, {
                message_text: messageText,
                message_type: 'text',
            });
            setMessages(prev => prev.map(msg => msg.id === tempId ? response.message : msg));
        } catch (err) {
            console.error("Failed to send message:", err);
            toastStore.show('Failed to send message.', 'error');
            setMessages(prev => prev.filter(msg => msg.id !== tempId));
        } finally {
            setIsSending(false);
        }
    };

    if (isInitialLoad) {
        return <InitialLoadingIndicator text="Loading chat..." />;
    }
    
    if (error) {
        return <div className="flex items-center justify-center h-full text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col h-full">
            <header className="p-4 border-b border-gray-200 flex-shrink-0">
                 <div className="flex items-center gap-4">
                    <button className="text-gray-500 hover:text-gray-800 lg:hidden"> <ChevronLeft size={24} /> </button>
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                    <div>
                        <h3 className="font-bold text-gray-900">{chat.other_user_name}</h3>
                        <p className="text-sm text-gray-500">
                            Job <Link to="#" className="text-primary hover:underline">#{chat.job_id}</Link>: {chat.job_title}
                        </p>
                    </div>
                </div>
            </header>
            
            <div className="bg-yellow-50 text-yellow-800 text-sm p-3 flex items-center gap-2 flex-shrink-0">
                <AlertTriangle size={18} />
                <p>
                    <span className="font-semibold">Remember:</span> Sharing contact details before payment violates our Terms of Service
                </p>
            </div>

            <div ref={messageContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && !isInitialLoad && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">No messages in this chat yet. Say hello!</p>
                    </div>
                )}
                {messages.map(msg => (
                    <MessageBubble 
                        key={msg.id} 
                        text={msg.message_text}
                        time={new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        isOwnMessage={msg.is_from_me}
                    />
                ))}
            </div>

            <div className="p-4 border-t border-gray-200 flex-shrink-0">
                <SendMessageForm onSend={handleSendMessage} disabled={isSending} />
            </div>
        </div>
    );
};