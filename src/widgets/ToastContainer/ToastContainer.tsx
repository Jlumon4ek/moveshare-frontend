import { useState, useEffect } from 'react';
import { toastStore, type Toast } from '../../shared/lib/toast/toastStore';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import cn from 'classnames';

const icons = {
  success: <CheckCircle size={20} />,
  error: <XCircle size={20} />,
  info: <Info size={20} />,
};

const toastStyles = {
    success: 'bg-green-50 text-green-700',
    error: 'bg-red-50 text-red-700',
    info: 'bg-blue-50 text-blue-700',
}

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = toastStore.subscribe(setToasts);
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed top-0 right-0 p-4 space-y-3 z-[100]">
      {toasts.map(toast => (
        <div 
            key={toast.id}
            className={cn(
                'flex items-center gap-3 p-4 rounded-lg shadow-lg animate-fade-in-down',
                toastStyles[toast.type]
            )}
        >
          {icons[toast.type]}
          <div className="font-medium">{toast.message}</div>
          <button onClick={() => toastStore.hide(toast.id)} className="ml-auto opacity-70 hover:opacity-100">
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};