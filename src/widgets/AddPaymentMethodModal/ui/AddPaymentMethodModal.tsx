import { useState } from 'react';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './CheckoutForm';

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // <-- ADDED: Callback for success
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const AddPaymentMethodModal = ({ isOpen, onClose, onSuccess }: AddPaymentMethodModalProps) => {
  const [error, setError] = useState<string | null>(null);
  
  if (!isOpen) {
    return null;
  }

  const options: StripeElementsOptions = {
    // ... (options remain the same)
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
            {/* ... (header remains the same) */}
        </header>

        <div className="p-6">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm 
              onClose={onClose} 
              setError={setError}
              onSuccess={onSuccess} // <-- PASS DOWN: Pass the callback
            />
          </Elements>
          {error && <div className="text-red-500 text-sm mt-4 text-center">{error}</div>}
        </div>
      </div>
    </div>
  );
};