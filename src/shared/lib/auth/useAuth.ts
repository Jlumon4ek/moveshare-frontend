import { useState, useEffect } from 'react';
import { authStore } from './authStore';

export const useAuth = () => {
  const [authState, setAuthState] = useState(authStore.getState());

  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setAuthState(authStore.getState());
    });

    return unsubscribe;
  }, []);

  return authState;
};