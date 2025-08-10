import { useState } from 'react';
import { PaymentMethodCard } from '../../../entities/PaymentMethod/ui/PaymentMethodCard';
import { Button } from '../../../shared/ui/Button/Button';
import { ConfirmationModal } from '../../../shared/ui/ConfirmationModal/ConfirmationModal';
import { PaymentMethodSnippet } from '../../../entities/PaymentMethod/ui/PaymentMethodSnippet';
import { AddPaymentMethodModal } from '../../AddPaymentMethodModal/ui/AddPaymentMethodModal'; // <-- ИМПОРТ

const mockPaymentMethods = [
    { 
        id: 1, 
        isDefault: true, 
        cardType: 'Bank Account', 
        last4: '1234', 
        bankName: "Chase Bank", 
        accountType: "Business Checking", 
        routingLast4: "0720",
        expiryDate: '12/25'  
    },
    { 
        id: 2, 
        isDefault: false, 
        cardType: 'Mastercard', 
        last4: '5678', 
        bankName: "Capital One",  
        accountType: "Credit Card", 
        routingLast4: "N/A", 
        expiryDate: '11/24'
    },
];


export const PaymentSettings = () => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // <-- НОВОЕ СОСТОЯНИЕ
  const [selectedMethod, setSelectedMethod] = useState<(typeof mockPaymentMethods)[0] | null>(null);

  const handleRemoveClick = (method: (typeof mockPaymentMethods)[0]) => {
    setSelectedMethod(method);
    setIsRemoveModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (!selectedMethod) return;
    console.log("Removing:", selectedMethod.cardType, selectedMethod.last4);
    setIsRemoveModalOpen(false);
    setSelectedMethod(null);
  };

  return (
    <>
      <div className="bg-white p-8 rounded-2xl shadow-sm h-full">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Payment Settings
          </h2>
          {/* ОБНОВЛЕННЫЙ ОБРАБОТЧИК */}
          <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
            + Add Payment Method
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockPaymentMethods.map(method => (
            <PaymentMethodCard
              key={method.id}
              onRemoveClick={() => handleRemoveClick(method)}
              isDefault={method.isDefault}
              cardType={method.cardType}
              last4={method.last4}
              bankName={method.bankName}
              accountType={method.accountType}
              routingLast4={method.routingLast4}
              expiryDate={method.expiryDate}
            />
          ))}
        </div>
      </div>

      {/* Модальное окно для удаления (без изменений) */}
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
                cardType={selectedMethod.cardType}
                last4={selectedMethod.last4}
                expiryDate={selectedMethod.expiryDate || ''}
            />
        </ConfirmationModal>
      )}

      {/* НОВОЕ МОДАЛЬНОЕ ОКНО */}
      <AddPaymentMethodModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
};