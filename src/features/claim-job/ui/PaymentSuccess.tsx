import { Check } from 'lucide-react';
import type { Job } from '../../../shared/api/jobs';
import { Button } from '../../../shared/ui/Button/Button';

interface PaymentSuccessProps {
  job: Job;
  onClose: () => void;
}

export const PaymentSuccess = ({ job, onClose }: PaymentSuccessProps) => {
  const transactionDetails = {
    id: 'TX-789456123',
    paymentMethod: 'Visa ending in 1234',
    date: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    }),
  };

  return (
    <div className="p-8 flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-4">
        <Check size={32} />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
      <p className="text-gray-600 mt-2">
        Your payment of $30.00 for claiming the Job #{job.id} has been processed successfully.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 w-full text-left my-6 text-sm">
        <div className="flex justify-between py-1">
            <span className="text-gray-500">Transaction ID</span>
            <span className="font-medium text-gray-800">{transactionDetails.id}</span>
        </div>
         <div className="flex justify-between py-1">
            <span className="text-gray-500">Payment Method</span>
            <span className="font-medium text-gray-800">{transactionDetails.paymentMethod}</span>
        </div>
         <div className="flex justify-between py-1">
            <span className="text-gray-500">Date</span>
            <span className="font-medium text-gray-800">{transactionDetails.date}</span>
        </div>
      </div>

      <div className="w-full flex gap-3">
        <Button fullWidth>View Receipt</Button>
        <Button variant="outline" fullWidth onClick={onClose}>Message Company</Button>
      </div>
    </div>
  );
};