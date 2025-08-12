import { apiRequest } from './config';
import { authStore } from '../lib/auth/authStore';

// Interface describing the card data structure
export interface Card {
  id: number;
  user_id: number;
  stripe_payment_method_id: string;
  stripe_customer_id: string;
  card_last4: string;
  card_brand: string;
  card_exp_month: number;
  card_exp_year: number;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePaymentIntentRequest {
  job_id: number;
  payment_method_id?: number;
  amount_cents: number;
  description: string;
}

// Интерфейс для ответа от Payment Intent
export interface PaymentIntentResponse {
  payment_intent_id: string;
  client_secret: string;
  status: string;
}

// Interface for the API response when fetching cards
interface CardsApiResponse {
  cards: Card[];
  total_cards: number;
  success: boolean;
}

// Interface for the request to add a new card
export interface AddCardRequest {
  payment_method_id: string;
}

export interface ConfirmPaymentRequest {
  payment_intent_id: string;
}

export interface AddCardResponse {
    payment_method: Card;
    message: string;
    success: boolean;
}

// API object with methods for card operations
export const paymentApi = {
  /**
   * Fetch all payment cards for the user
   */
  getCards: async (): Promise<CardsApiResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
      throw new Error('Not authorized');
    }

    return apiRequest('/payment/cards', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },

  /**
   * Add a new payment card
   */
  addCard: async (data: AddCardRequest): Promise<AddCardResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) throw new Error('Not authorized');

    return apiRequest('/payment/cards', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },

  setDefaultCard: async (cardId: number): Promise<{ message: string; success: boolean }> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
      throw new Error('Not authorized');
    }

    return apiRequest(`/payment/cards/${cardId}/default`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },


  deleteCard: async (cardId: number): Promise<{ message: string; success: boolean }> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
      throw new Error('Not authorized');
    }

    return apiRequest(`/payment/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },

  createPaymentIntent: async (data: CreatePaymentIntentRequest): Promise<PaymentIntentResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
      throw new Error('Not authorized');
    }

    return apiRequest('/payment/create-intent', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },

  /**
   * Подтверждение платежа
   */
  confirmPayment: async (data: ConfirmPaymentRequest): Promise<{ message: string; success: boolean }> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
      throw new Error('Not authorized');
    }

    return apiRequest('/payment/confirm-payment', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};