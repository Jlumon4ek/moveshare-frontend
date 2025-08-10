import React from 'react';
import { DollarSign } from 'lucide-react';

interface PaymentBreakdownProps {
    paymentAmount: number;
    cutAmount: number;
}

export const PaymentBreakdown = ({
    paymentAmount,
    cutAmount
}: PaymentBreakdownProps) => {
    return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <DollarSign size={20} className="text-green-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-800">Payment</h3>
            </div>
            
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Payout</span>
                    <span className="text-sm font-bold text-gray-800">${paymentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Your Cut</span>
                    <span className="text-sm font-bold text-green-600">${cutAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Platform Fee</span>
                    <span className="text-gray-500">${(paymentAmount - cutAmount).toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};