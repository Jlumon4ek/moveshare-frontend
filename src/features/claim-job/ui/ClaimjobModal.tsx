import { useState, useEffect } from 'react';
import { ArrowRight, X, PlusCircle } from 'lucide-react';
import type { Job } from '../../../shared/api/jobs';
import { Button } from '../../../shared/ui/Button/Button';
import { Checkbox } from '../../../shared/ui/Checkbox/Checkbox';
import { Link } from 'react-router-dom';
import { PaymentSuccess } from './PaymentSuccess';
import { jobsApi } from '../../../shared/api/jobs';
import { toastStore } from '../../../shared/lib/toast/toastStore';
import { paymentApi, type Card } from '../../../shared/api/payments';
import { Select } from '../../../shared/ui/Select/Select';
import { AddPaymentMethodModal } from '../../../widgets/AddPaymentMethodModal/ui/AddPaymentMethodModal';

interface ClaimJobModalProps {
  job: Job;
  onClose: () => void;
}

export const ClaimJobModal = ({ job, onClose }: ClaimJobModalProps) => {
  const claimFee = 30.00;
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | undefined>();
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

  const fetchCards = async () => {
    setIsLoadingCards(true);
    try {
        const response = await paymentApi.getCards();
        const activeCards = response.cards ? response.cards.filter(c => c.is_active) : [];
        setCards(activeCards);
        
        const defaultCard = activeCards.find(c => c.is_default);
        if (defaultCard) {
            setSelectedCardId(defaultCard.id);
        } else if (activeCards.length > 0) {
            setSelectedCardId(activeCards[0].id);
        }
    } catch (error) {
        toastStore.show("Could not load payment methods", "error");
    } finally {
        setIsLoadingCards(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleConfirmPayment = async () => {
    if (!selectedCardId) {
        toastStore.show("Please select a payment method.", "error");
        return;
    }
    setIsProcessing(true);
    try {
      // 1. Создаем Payment Intent на бэкенде
      const intentResponse = await paymentApi.createPaymentIntent({
          job_id: job.id,
          payment_method_id: selectedCardId,
          amount_cents: claimFee * 100, // Сумма в центах
          description: `Claim fee for Job #${job.id}`
      });

      // 2. Подтверждаем платеж на бэкенде
      await paymentApi.confirmPayment({
          payment_intent_id: intentResponse.payment_intent_id,
      });

      // 3. Клеймим работу
      const claimResponse = await jobsApi.claimJob(job.id);
      
      toastStore.show(claimResponse.message || 'Job claimed successfully!', 'success');
      setIsPaymentSuccessful(true);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to claim job.';
      toastStore.show(errorMessage, 'error');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const cardOptions = cards.map(card => ({
      value: String(card.id),
      label: `${card.card_brand} **** ${card.card_last4} ${card.is_default ? '(Default)' : ''}`
  }));

  const jobTitle = `${job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)} Move`;

  return (
    <>
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
                <p className="text-white/90">You will earn ${(job.payment_amount || 0).toLocaleString()}</p>
                <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
                    <X size={24} />
                </button>
                </div>

                {/* Form Body */}
                <div className="p-6 space-y-6">
                    <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                        <p className="font-bold text-gray-800">For Job #{job.id}: {jobTitle}</p>
                        <p className="text-sm text-gray-600">{job.additional_services_description || 'No description provided.'}</p>
                    </div>
                    
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

                    <div className="bg-gray-100 p-3 rounded-lg text-xs text-gray-600">
                        MoveShare charges a ${claimFee.toFixed(2)} fixed fee per job to cover platform operating costs. You'll receive ${(job.payment_amount || 0).toLocaleString()} after completing this job.
                    </div>
                    
                    <Checkbox checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)}>
                        I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </Checkbox>

                    <div>
                        <h3 className="font-semibold text-lg text-gray-800 mb-3">Select Payment Method</h3>
                        {isLoadingCards ? (
                            <p className="text-sm text-gray-500 text-center">Loading cards...</p>
                        ) : cards.length > 0 ? (
                            <Select 
                                options={cardOptions}
                                value={String(selectedCardId)}
                                onChange={(e) => setSelectedCardId(Number(e.target.value))}
                            />
                        ) : (
                            <Button variant="outline" fullWidth onClick={() => setIsAddCardModalOpen(true)}>
                                <PlusCircle size={16} /> Add a New Card
                            </Button>
                        )}
                    </div>

                    <Button fullWidth size="md" onClick={handleConfirmPayment} disabled={!isAgreed || !selectedCardId || isProcessing}>
                        {isProcessing ? 'Processing…' : 'Confirm Payment'} <ArrowRight size={16}/>
                    </Button>
                </div>
            </>
            )}
        </div>
      </div>

      {isAddCardModalOpen && (
          <AddPaymentMethodModal 
            isOpen={isAddCardModalOpen}
            onClose={() => setIsAddCardModalOpen(false)}
            onSuccess={() => {
                fetchCards();
                setIsAddCardModalOpen(false);
            }}
          />
      )}
    </>
  );
};