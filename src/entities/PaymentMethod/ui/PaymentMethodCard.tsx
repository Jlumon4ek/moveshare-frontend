import { Landmark, CreditCard } from 'lucide-react';
import { Button } from '../../../shared/ui/Button/Button';
import cn from 'classnames';
import type { Card } from '../../../shared/api/payments';

interface PaymentMethodCardProps {
  card: Card;
  onRemoveClick: () => void;
  onSetDefaultClick: () => void;
}

export const PaymentMethodCard = ({ 
  card,
  onRemoveClick,
  onSetDefaultClick
}: PaymentMethodCardProps) => {
  const isBankAccount = card.card_brand === 'Bank Account';

  return (
    <div className={cn(
      'p-4 border rounded-xl relative', 
      { 'border-primary bg-primary/5': card.is_default, 'border-gray-200': !card.is_default }
    )}>
      {card.is_default && (
        <div className="absolute top-3 right-3 text-xs font-bold text-white bg-primary px-2 py-0.5 rounded-full">
          DEFAULT
        </div>
      )}

      <div className="flex gap-4">
        <div className={cn(
          'p-3 rounded-lg h-fit',
          { 'bg-blue-100 text-primary': card.is_default, 'bg-gray-100 text-gray-500': !card.is_default }
        )}>
          {isBankAccount ? <Landmark size={20} /> : <CreditCard size={20} />}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 capitalize">{card.card_brand}</h3>
          <p className="text-sm text-gray-500">**** **** **** {card.card_last4}</p>
          <p className="text-sm text-gray-500">Expires: {card.card_exp_month}/{card.card_exp_year}</p>
          
          <div className="mt-4 flex gap-2">
            {!card.is_default && <Button onClick={onSetDefaultClick} variant="outline" size="sm" className="py-1 px-3 text-xs">Set as Default</Button>}
            <Button onClick={onRemoveClick} variant="outline" size="sm" className="py-1 px-3 text-xs hover:bg-red-50 hover:border-red-500 hover:text-red-600">Remove</Button>
          </div>
        </div>
      </div>
    </div>
  );
};