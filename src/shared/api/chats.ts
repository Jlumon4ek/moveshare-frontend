import { apiRequest } from './config';
import { authStore } from '../lib/auth/authStore';

export interface Chat {
  id: number;
  job_id: number;
  job_title: string;
  other_user_id: number;
  other_user_name: string;
  other_user_role: string;
  last_message: string;
  last_message_time: string;
  last_message_type: string;
  unread_count: number;
  is_last_msg_from_me: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

interface SendMessageResponse {
  message: Message;
  success: boolean;
}

interface ChatsApiResponse {
  chats: Chat[];
  total: number;
}

export interface Message {
  id: number;
  sender_id: number;
  sender_name: string;
  message_text: string;
  message_type: string;
  is_read: boolean;
  is_from_me: boolean;
  created_at: string;
  updated_at: string;
}

interface MessagesApiResponse {
  messages: Message[];
  pagination: {
    has_next: boolean;
    limit: number;
    offset: number;
    total: number;
  };
}


export interface CreateChatPayload {
  job_id: number;
  participant_id: number;
}

interface CreateChatResponse {
  chat_id: number;
  message: string;
  success: boolean;
}

export interface NewMessagePayload {
  message_text: string;
  message_type: 'text';
}


export const chatsApi = {
  getChats: async (_limit: number, _offset: number): Promise<ChatsApiResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
      throw new Error('Not authorized');
    }

    return apiRequest(`/chats/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },

  getChatMessages: async (chatId: number, limit: number, offset: number, options: RequestInit = {}): Promise<MessagesApiResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
      throw new Error('Not authorized');
    }

    return apiRequest(`/chats/${chatId}/messages?limit=${limit}&offset=${offset}&order=desc`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      ...options,
    });
  },

  sendMessage: async (chatId: number, payload: NewMessagePayload): Promise<SendMessageResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
      throw new Error('Not authorized');
    }

    return apiRequest(`/chats/${chatId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });
  },

  createChat: async (payload: CreateChatPayload): Promise<CreateChatResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
        throw new Error('Not authorized');
    }

    return apiRequest('/chats/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
    });
  },
};