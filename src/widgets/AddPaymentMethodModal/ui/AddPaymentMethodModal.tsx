// src/widgets/AddPaymentMethodModal/ui/AddPaymentMethodModal.tsx

import { useState } from 'react';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './CheckoutForm';
import { X, CreditCard } from 'lucide-react';

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Этот callback будет вызываться после успешного добавления карты
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const AddPaymentMethodModal = ({ isOpen, onClose, onSuccess }: AddPaymentMethodModalProps) => {
  const [error, setError] = useState<string | null>(null);
  
  if (!isOpen) {
    return null;
  }

  const options: StripeElementsOptions = {
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#60A5FA',
        borderRadius: '0.5rem',
        fontFamily: 'Onest, sans-serif',
      },
    },
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 flex justify-between items-center border-b border-gray-200">
            <div className="flex items-center gap-3">
                <CreditCard className="text-primary" size={24}/>
                <h2 className="text-xl font-bold text-gray-800">Add Payment Method</h2>
            </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={24} />
          </button>
        </header>

        <div className="p-6">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm 
              onClose={onClose} 
              setError={setError} 
              onSuccess={onSuccess} // Передаем callback в дочерний компонент
            />
          </Elements>
          {error && <div className="text-red-500 text-sm mt-4 text-center">{error}</div>}
        </div>
      </div>
    </div>
  );
};