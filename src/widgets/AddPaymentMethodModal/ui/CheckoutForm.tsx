import { useState, type FormEvent } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from '../../../shared/ui/Button/Button';
import { Input } from '../../../shared/ui/Input/Input';
import { Checkbox } from '../../../shared/ui/Checkbox/Checkbox';
import { authStore } from '../../../shared/lib/auth/authStore';
import { paymentApi } from '../../../shared/api/payments';
import { toastStore } from '../../../shared/lib/toast/toastStore';

interface CheckoutFormProps {
  onClose: () => void;
  setError: (error: string | null) => void;
  onSuccess: () => void;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#374151", // text-gray-700
      fontFamily: 'Onest, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#9ca3af", // text-gray-400
      },
    },
    invalid: {
      color: "#ef4444", // text-red-500
      iconColor: "#ef4444",
    },
  },
};

export const CheckoutForm = ({ onClose, setError, onSuccess }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [isDefault, setIsDefault] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
        setIsProcessing(false);
        return;
    }

    const userEmail = authStore.getState().user?.email;

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: name,
        email: userEmail,
      },
    });

    if (stripeError) {
      setError(stripeError.message ?? "An unknown error occurred.");
      setIsProcessing(false);
      return;
    }
    
    if (paymentMethod) {
      try {
        await paymentApi.addCard({ payment_method_id: paymentMethod.id });
        toastStore.show('Payment method added successfully!', 'success');
        onSuccess();
        onClose();
      } catch (apiError) {
        const message = apiError instanceof Error ? apiError.message : 'Could not save payment method.';
        setError(message);
      }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input 
          label="Cardholder Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
        </label>
        <div className="p-4 bg-gray-100 rounded-lg">
             <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      <div>
          <Checkbox
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
          >
            Set as default payment method
          </Checkbox>
      </div>
      
      <div className="flex items-center gap-3 pt-2">
        <Button variant="outline" type="button" fullWidth onClick={onClose} disabled={isProcessing}>
            Cancel
        </Button>
        <Button type="submit" fullWidth disabled={!stripe || isProcessing}>
          {isProcessing ? 'Processing…' : 'Add Card'}
        </Button>
      </div>
    </form>
  );
};