// src/shared/lib/websocket/useWebSocket.ts
import { useEffect, useRef, useCallback } from 'react';
import { authStore } from '../auth/authStore';
import type { Message } from '../../api/chats'; // Предполагаем, что Message импортируется отсюда

interface WebSocketMessage {
    type: 'message' | 'error';
    data: Message;
    chat_id: number;
}

export const API_BASE_URL = 'localhost:8080/api';


export const useWebSocket = (chatId: number | null, onMessage: (message: Message) => void) => {
    const ws = useRef<WebSocket | null>(null);

    const connect = useCallback(() => {
        if (!chatId) return;

        const { accessToken } = authStore.getState();
        if (!accessToken) {
            console.error('WebSocket: No access token found.');
            return;
        }

        // Формируем URL для WebSocket
        const wsUrl = `ws://${API_BASE_URL}/chats/${chatId}/ws?token=${accessToken}`;
        
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            console.log(`WebSocket connected to chat ${chatId}`);
        };

        ws.current.onmessage = (event) => {
            try {
                const messageData: WebSocketMessage = JSON.parse(event.data);
                if (messageData.type === 'message' && messageData.data) {
                    onMessage(messageData.data);
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.current.onclose = () => {
            console.log(`WebSocket disconnected from chat ${chatId}`);
        };

    }, [chatId, onMessage]);

    useEffect(() => {
        connect();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [connect]);

    const sendMessage = (messageText: string) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            const payload = {
                message_text: messageText,
                message_type: 'text',
            };
            ws.current.send(JSON.stringify(payload));
        } else {
            console.error('WebSocket is not connected.');
        }
    };

    return { sendMessage };
};