import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../Button/Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
  confirmText?: string;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = "Confirm",
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl text-center flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white mb-4">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="text-gray-500 mt-2 mb-6">
          {children}
        </div>

        <div className="w-full flex gap-3">
          <Button variant="outline" size="md" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" size="md" fullWidth onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};