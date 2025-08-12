import { useState, useEffect } from 'react';
import { PaymentMethodCard } from '../../../entities/PaymentMethod/ui/PaymentMethodCard';
import { Button } from '../../../shared/ui/Button/Button';
import { ConfirmationModal } from '../../../shared/ui/ConfirmationModal/ConfirmationModal';
import { PaymentMethodSnippet } from '../../../entities/PaymentMethod/ui/PaymentMethodSnippet';
import { AddPaymentMethodModal } from '../../AddPaymentMethodModal/ui/AddPaymentMethodModal';
import { paymentApi, type Card } from '../../../shared/api/payments';
import { toastStore } from '../../../shared/lib/toast/toastStore';

export const PaymentSettings = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<Card | null>(null);

  const fetchCards = async () => {
    try {
      setIsLoading(true);
      const response = await paymentApi.getCards();
      setCards(response.cards || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payment methods.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleRemoveClick = (method: Card) => {
    setSelectedMethod(method);
    setIsRemoveModalOpen(true);
  };

  const handleConfirmRemove = async () => {
    if (!selectedMethod) return;

    try {
      await paymentApi.deleteCard(selectedMethod.id);
      toastStore.show('Payment method removed successfully!', 'success');
      fetchCards(); // Refresh the list
    } catch (err) {
      toastStore.show(err instanceof Error ? err.message : 'Failed to remove card.', 'error');
    } finally {
      setIsRemoveModalOpen(false);
      setSelectedMethod(null);
    }
  };
  
  const handleSetDefault = async (card: Card) => {
    try {
        await paymentApi.setDefaultCard(card.id);
        toastStore.show('Default payment method updated!', 'success');
        fetchCards(); // Refresh the list to show the new default
    } catch (err) {
        toastStore.show(err instanceof Error ? err.message : 'Failed to set default card.', 'error');
    }
  };


  
  const renderContent = () => {
    if (isLoading) {
      return <div className="p-8 text-center text-gray-500">Loading payment methods...</div>;
    }

    if (error) {
      return <div className="p-8 text-center text-red-500">{error}</div>;
    }

    if (cards.length === 0) {
      return <div className="p-8 text-center text-gray-500">No payment methods added yet.</div>;
    }

    return cards.map(card => (
      <PaymentMethodCard
        key={card.id}
        card={card}
        onRemoveClick={() => handleRemoveClick(card)}
        onSetDefaultClick={() => handleSetDefault(card)}
      />
    ));
  };


  return (
    <>
      <div className="bg-white p-8 rounded-2xl shadow-sm h-full">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Payment Settings
          </h2>
          <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
            + Add Payment Method
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderContent()}
        </div>
      </div>

      {selectedMethod && (
        <ConfirmationModal
          isOpen={isRemoveModalOpen}
          onClose={() => setIsRemoveModalOpen(false)}
          onConfirm={handleConfirmRemove}
          title="Remove Payment Method"
          confirmText="Remove Payment Method"
        >
            <p>Are you sure you want to remove this payment method? This action cannot be undone.</p>
            <PaymentMethodSnippet 
                cardType={selectedMethod.card_brand}
                last4={selectedMethod.card_last4}
                expiryDate={`${selectedMethod.card_exp_month}/${selectedMethod.card_exp_year}`}
            />
        </ConfirmationModal>
      )}

      <AddPaymentMethodModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
};