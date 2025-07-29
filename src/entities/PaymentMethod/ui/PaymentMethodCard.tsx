import { Landmark, CreditCard } from 'lucide-react';
import { Button } from '../../../shared/ui/Button/Button';
import cn from 'classnames';

interface PaymentMethodCardProps {
  isDefault?: boolean;
  cardType: string;
  last4: string;
  bankName?: string;
  accountType?: string;
  routingLast4?: string;
  expiryDate?: string; 
  onRemoveClick: () => void;
}

export const PaymentMethodCard = ({ 
  isDefault = false, 
  cardType,
  last4,
  bankName,
  accountType,
  routingLast4,
  onRemoveClick 
}: PaymentMethodCardProps) => {
  const isBankAccount = cardType === 'Bank Account';

  return (
    <div className={cn(
      'p-4 border rounded-xl relative', 
      { 'border-primary bg-primary/5': isDefault, 'border-gray-200': !isDefault }
    )}>
      {isDefault && (
        <div className="absolute top-3 right-3 text-xs font-bold text-white bg-primary px-2 py-0.5 rounded-full">
          DEFAULT
        </div>
      )}

      <div className="flex gap-4">
        <div className={cn(
          'p-3 rounded-lg h-fit',
          { 'bg-blue-100 text-primary': isDefault, 'bg-gray-100 text-gray-500': !isDefault }
        )}>
          {isBankAccount ? <Landmark size={20} /> : <CreditCard size={20} />}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{cardType}</h3>
          <p className="text-sm text-gray-500">******** {last4}</p>
          
          {/* Этот блок был изменен */}
          <div className="mt-4 space-y-1 text-sm">
            <p><span className="text-gray-500">Bank Name:</span> <span className="font-medium text-gray-700">{bankName}</span></p>
            <p><span className="text-gray-500">Account Type:</span> <span className="font-medium text-gray-700">{accountType}</span></p>
            <p><span className="text-gray-500">Routing Number:</span> <span className="font-medium text-gray-700">********{routingLast4}</span></p>
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="py-1 px-3 text-xs">Edit</Button>
            {!isDefault && <Button variant="outline" size="sm" className="py-1 px-3 text-xs">Set as Default</Button>}
            <Button onClick={onRemoveClick} variant="outline" size="sm" className="py-1 px-3 text-xs hover:bg-red-50 hover:border-red-500 hover:text-red-600">Remove</Button>
          </div>
        </div>
      </div>
    </div>
  );
};