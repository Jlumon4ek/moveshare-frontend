import { CreditCard } from 'lucide-react';

interface PaymentMethodSnippetProps {
    cardType: string;
    last4: string;
    expiryDate: string;
}

export const PaymentMethodSnippet = ({ cardType, last4, expiryDate }: PaymentMethodSnippetProps) => {
    return (
        <div className="w-full text-left bg-gray-100 p-4 rounded-lg my-4">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-md shadow-sm">
                    <CreditCard size={24} className="text-gray-600" />
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{cardType} ending in {last4}</p>
                    <p className="text-sm text-gray-500">Expires {expiryDate}</p>
                </div>
            </div>
        </div>
    );
};