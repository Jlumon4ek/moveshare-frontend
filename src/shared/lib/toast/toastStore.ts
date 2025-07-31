import type { ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: ReactNode;
  type: ToastType;
}

type Listener = (toasts: Toast[]) => void;

class ToastStore {
  private toasts: Toast[] = [];
  private listeners: Listener[] = [];
  private idCounter = 0;

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l([...this.toasts]));
  }

  show(message: ReactNode, type: ToastType = 'info', duration = 3000) {
    const id = this.idCounter++;
    this.toasts = [...this.toasts, { id, message, type }];
    this.notify();

    setTimeout(() => this.hide(id), duration);
  }

  hide(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  }
}

export const toastStore = new ToastStore();