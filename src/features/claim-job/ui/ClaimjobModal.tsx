// src/features/claim-job/ui/ClaimJobModal.tsx
import { useState } from 'react';
import { ArrowRight, CreditCard, X } from 'lucide-react';
import type { Job } from '../../../shared/api/jobs';
import { Button } from '../../../shared/ui/Button/Button';
import { Checkbox } from '../../../shared/ui/Checkbox/Checkbox';
import { Link } from 'react-router-dom';
import { PaymentSuccess } from './PaymentSuccess'; //  ДОБАВЬТЕ ИМПОРТ

interface ClaimJobModalProps {
  job: Job;
  onClose: () => void;
}

export const ClaimJobModal = ({ job, onClose }: ClaimJobModalProps) => {
  const claimFee = 30.00;
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); //  ДОБАВЬТЕ СОСТОЯНИЕ
  const [isAgreed, setIsAgreed] = useState(false);

  const handleConfirmPayment = () => {
    setIsPaymentSuccessful(true);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {isPaymentSuccessful ? (
          <PaymentSuccess job={job} onClose={onClose} />
        ) : (
          <>
            {/* Header */}
            <div className="bg-primary text-white p-6 text-center relative">
              <h2 className="text-2xl font-bold">Claim Job</h2>
              <p className="text-white/90">You will earn ${job.payout_amount.toLocaleString()}</p>
              <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
                  <X size={24} />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 space-y-6">
                {/* Job Info */}
                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                    <p className="font-bold text-gray-800">For Job #{job.id}: {job.job_title}</p>
                    <p className="text-sm text-gray-600">{job.description}</p>
                </div>
                
                {/* Payment Details */}
                <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">Payment Details</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Description</span>
                            <span className="text-gray-500">Amount</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-800">Fixed Claim Fee</span>
                            <span className="font-semibold text-gray-800">${claimFee.toFixed(2)}</span>
                        </div>
                    </div>
                    <hr className="my-3"/>
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800">Total to Pay Now</span>
                        <span className="font-bold text-primary text-lg">${claimFee.toFixed(2)}</span>
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-gray-100 p-3 rounded-lg text-xs text-gray-600">
                    MoveShare charges a ${claimFee.toFixed(2)} fixed fee per job to cover platform operating costs. You'll receive ${job.payout_amount.toLocaleString()} after completing this job.
                </div>
                
                {/* Agreement */}
                <Checkbox checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)}>
                    I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </Checkbox>

                {/* Payment Method */}
                <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">Select Payment Method</h3>
                    <div className="border border-gray-200 rounded-xl p-3 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-md">
                                <CreditCard size={20} className="text-gray-500" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">Visa ending in 1234</p>
                                <p className="text-xs text-gray-500">Expires 12/2025</p>
                            </div>
                        </div>
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Default</span>
                    </div>
                </div>

                {/* Confirm Button */}
                <Button fullWidth size="md" onClick={handleConfirmPayment} disabled={!isAgreed}>
                    Confirm Payment <ArrowRight size={16}/>
                </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};