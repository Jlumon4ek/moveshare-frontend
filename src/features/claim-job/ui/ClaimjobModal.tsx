import { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import type { Job } from '../../../shared/api/jobs';
import { Button } from '../../../shared/ui/Button/Button';
import { Checkbox } from '../../../shared/ui/Checkbox/Checkbox';
import { Link } from 'react-router-dom';
import { PaymentSuccess } from './PaymentSuccess';
import { jobsApi } from '../../../shared/api/jobs';
import { toastStore } from '../../../shared/lib/toast/toastStore';
import { paymentApi, type Card } from '../../../shared/api/payments'; // Импорт API и типа карты
import { Select } from '../../../shared/ui/Select/Select'; // Импорт компонента Select

interface ClaimJobModalProps {
  job: Job;
  onClose: () => void;
}

export const ClaimJobModal = ({ job, onClose }: ClaimJobModalProps) => {
  const claimFee = 30.00; // $30.00
  const claimFeeCents = 3000; // 30.00 в центах

  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Состояния для карт
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [isLoadingCards, setIsLoadingCards] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoadingCards(true);
        const response = await paymentApi.getCards();
        const fetchedCards = response.cards || [];
        setCards(fetchedCards);
        
        // Находим карту по умолчанию и устанавливаем ее как выбранную
        const defaultCard = fetchedCards.find(card => card.is_default);
        if (defaultCard) {
          setSelectedCardId(String(defaultCard.id));
        } else if (fetchedCards.length > 0) {
          // Если нет карты по умолчанию, выбираем первую
          setSelectedCardId(String(fetchedCards[0].id));
        }
      } catch (err) {
        toastStore.show(err instanceof Error ? err.message : 'Failed to load payment methods.', 'error');
      } finally {
        setIsLoadingCards(false);
      }
    };

    fetchCards();
  }, []);


  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    try {
      // Шаг 1: Создание Payment Intent
      const intentResponse = await paymentApi.createPaymentIntent({
        job_id: job.id,
        payment_method_id: Number(selectedCardId),
        amount_cents: claimFeeCents,
        description: `Payment for moving job #${job.id}`,
      });

      // Шаг 2: Подтверждение платежа
      await paymentApi.confirmPayment({
        payment_intent_id: intentResponse.payment_intent_id,
      });

      // Шаг 3: Финальное подтверждение получения работы
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

  const jobTitle = `${job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)} Move`;

  // Форматируем карты для компонента Select
  const cardOptions = cards.map(card => ({
      value: String(card.id),
      label: `${card.card_brand} **** ${card.card_last4} (Expires ${card.card_exp_month}/${card.card_exp_year})`
  }));

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
              <p className="text-white/90">You will earn ${(job.payment_amount || 0).toLocaleString()}</p>
              <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
                  <X size={24} />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 space-y-6">
                {/* Job Info */}
                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                    <p className="font-bold text-gray-800">For Job #{job.id}: {jobTitle}</p>
                    <p className="text-sm text-gray-600">{job.additional_services_description || 'No description provided.'}</p>
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
                    MoveShare charges a ${claimFee.toFixed(2)} fixed fee per job to cover platform operating costs. You'll receive ${(job.payment_amount || 0).toLocaleString()} after completing this job.
                </div>
                
                {/* Agreement */}
                <Checkbox checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)}>
                    I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </Checkbox>

                {/* Payment Method */}
                <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">Select Payment Method</h3>
                    {isLoadingCards ? (
                        <p className="text-sm text-gray-500">Loading cards...</p>
                    ) : (
                        <Select
                            name="paymentMethod"
                            value={selectedCardId}
                            onChange={(e) => setSelectedCardId(e.target.value)}
                            options={cardOptions}
                        />
                    )}
                </div>

                {/* Confirm Button */}
                <Button fullWidth size="md" onClick={handleConfirmPayment} disabled={!isAgreed || isProcessing || isLoadingCards || cards.length === 0}>
                    {isProcessing ? 'Processing...' : 'Confirm Payment'} <ArrowRight size={16}/>
                </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};