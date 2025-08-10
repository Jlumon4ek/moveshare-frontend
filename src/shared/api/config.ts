import { authStore } from '../lib/auth/authStore';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  
  const originalRequest = async () => {
    const url = `${API_BASE_URL}${endpoint}`;
    const { accessToken } = authStore.getState();

    const isFormData = options.body instanceof FormData;
  
    const config: RequestInit = {
      ...options,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        'Accept': 'application/json',
        ...options.headers,
      },
    };

    // Добавляем токен авторизации, если он есть
    if (accessToken) {
        config.headers = { ...config.headers, 'Authorization': `Bearer ${accessToken}` };
    }

    return fetch(url, config);
  };

  try {
    let response = await originalRequest();

    // --- ЛОВИМ ОШИБКУ ИСТЕКШЕГО ТОКЕНА ---
    if (response.status === 401) {
      if (isRefreshing) {
        // Если уже идет процесс обновления, добавляем запрос в очередь
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
        .then(token => {
            options.headers = { ...options.headers, 'Authorization': `Bearer ${token}` };
            return apiRequest(endpoint, options); // Повторяем запрос с новым токеном
        });
      }

      isRefreshing = true;
      const { refreshToken } = authStore.getState();

      if (!refreshToken) {
        authStore.clearAuth();
        return Promise.reject(new Error("Session expired. No refresh token."));
      }
      
      try {
        // --- ОТПРАВЛЯЕМ ЗАПРОС НА ОБНОВЛЕНИЕ ---
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!refreshResponse.ok) {
          // Если и refresh token истек, выходим из системы
          authStore.clearAuth();
          return Promise.reject(new Error("Session expired. Please log in again."));
        }

        const newTokens = await refreshResponse.json();
        authStore.setTokens(newTokens); // Сохраняем новые токены
        processQueue(null, newTokens.access_token); // Выполняем запросы из очереди
        
        // Повторяем оригинальный запрос с новым токеном
        response = await originalRequest();

      } catch (e) {
        processQueue(e as Error, null);
        authStore.clearAuth();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      throw new Error(errorData.message);
    }

    if (response.status === 204) {
      return;
    }

    return await response.json();

  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};