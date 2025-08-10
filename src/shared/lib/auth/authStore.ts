interface User {
  user_id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

class AuthStore {
  private state: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  };

  private listeners: Array<() => void> = [];

  constructor() {
    this.loadFromStorage();
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  private loadFromStorage() {
    try {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      const user = localStorage.getItem('user');

      if (accessToken && user) {
        this.state = {
          accessToken,
          refreshToken,
          user: JSON.parse(user),
          isAuthenticated: true,
        };
      }
    } catch (error) {
      console.error('Error loading auth from storage:', error);
      this.clearAuth();
    }
  }

  private saveToStorage() {
    try {
      if (this.state.accessToken && this.state.user) {
        localStorage.setItem('access_token', this.state.accessToken);
        localStorage.setItem('user', JSON.stringify(this.state.user));
        
        if (this.state.refreshToken) {
          localStorage.setItem('refresh_token', this.state.refreshToken);
        }
      }
    } catch (error) {
      console.error('Error saving auth to storage:', error);
    }
  }

  setAuth(tokens: { access_token: string; refresh_token: string }, user: User) {
    this.state = {
      user,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      isAuthenticated: true,
    };
    
    this.saveToStorage();
    this.notify();
  }

  // НОВЫЙ МЕТОД ДЛЯ ОБНОВЛЕНИЯ ТОКЕНОВ
  setTokens(tokens: { access_token: string; refresh_token: string }) {
    if (!this.state.user) return; // Не обновляем, если нет пользователя

    this.state = {
      ...this.state,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      isAuthenticated: true,
    };
    
    this.saveToStorage();
    this.notify();
  }


  clearAuth() {
    this.state = {
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    };
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    // Перезагружаем страницу для редиректа на /sign-in
    // Это самый надежный способ сбросить все состояния приложения
    window.location.reload(); 
    
    this.notify();
  }

  getState() {
    return { ...this.state };
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export const authStore = new AuthStore();