import { useState, useEffect, useRef } from 'react';
import { ArrowRight, X, PlusCircle, CreditCard, Check, ChevronDown } from 'lucide-react';
import type { Job } from '../../../shared/api/jobs';
import { Button } from '../../../shared/ui/Button/Button';
import { Checkbox } from '../../../shared/ui/Checkbox/Checkbox';
import { Link } from 'react-router-dom';
import { PaymentSuccess } from './PaymentSuccess';
import { jobsApi } from '../../../shared/api/jobs';
import { toastStore } from '../../../shared/lib/toast/toastStore';
import { paymentApi, type Card } from '../../../shared/api/payments';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleConfirmPayment = async () => {
    if (!selectedCardId) {
        toastStore.show("Please select a payment method.", "error");
        return;
    }
    setIsProcessing(true);
    try {
      const intentResponse = await paymentApi.createPaymentIntent({
          job_id: job.id,
          payment_method_id: selectedCardId,
          amount_cents: claimFee * 100,
          description: `Claim fee for Job #${job.id}`
      });
      await paymentApi.confirmPayment({
          payment_intent_id: intentResponse.payment_intent_id,
      });
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
  
  const selectedCard = cards.find(card => card.id === selectedCardId);
  const getCardIcon = () => <CreditCard size={20} className="text-gray-600" />;
  const jobTitle = `${job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)} Move`;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {isPaymentSuccessful ? (
              <PaymentSuccess job={job} onClose={onClose} />
            ) : (
            <>
                <header className="bg-primary text-white p-6 text-center relative flex-shrink-0 z-10">
                  <h2 className="text-2xl font-bold">Claim Job</h2>
                  <p className="text-white/90">You will earn ${(job.payment_amount || 0).toLocaleString()}</p>
                  <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white"><X size={24} /></button>
                </header>

                <div className="flex-1 p-6 space-y-6 overflow-y-auto hide-scrollbar">
                    <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                        <p className="font-bold text-gray-800">For Job #{job.id}: {jobTitle}</p>
                        <p className="text-sm text-gray-600">{job.additional_services_description || 'No description provided.'}</p>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold text-lg text-gray-800 mb-3">Payment Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-gray-500">Description</span><span className="text-gray-500">Amount</span></div>
                            <div className="flex justify-between items-center"><span className="text-gray-800">Fixed Claim Fee</span><span className="font-semibold text-gray-800">${claimFee.toFixed(2)}</span></div>
                        </div>
                        <hr className="my-3"/>
                        <div className="flex justify-between items-center"><span className="font-bold text-gray-800">Total to Pay Now</span><span className="font-bold text-primary text-lg">${claimFee.toFixed(2)}</span></div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-lg text-xs text-gray-600">
                        MoveShare charges a ${claimFee.toFixed(2)} fixed fee per job to cover platform operating costs. You'll receive ${(job.payment_amount || 0).toLocaleString()} after completing this job.
                    </div>
                    
                    <Checkbox checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)}>
                        I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </Checkbox>

                    <div className="relative" ref={dropdownRef}>
                        <h3 className="font-semibold text-lg text-gray-800 mb-3">Select Payment Method</h3>
                        {isLoadingCards ? ( <p className="text-sm text-gray-500 text-center">Loading cards...</p> ) 
                        : cards.length > 0 ? (
                            <div>
                                {selectedCard && (
                                    <div className="w-full bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                      <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3"><div className="flex items-center gap-3">{getCardIcon()}<div><div className="flex items-center gap-2"><span className="font-medium text-gray-800">{selectedCard.card_brand}</span><span className="text-gray-600">**** {selectedCard.card_last4}</span>{selectedCard.is_default && (<span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">Default</span>)}</div><div className="text-sm text-gray-500">Expires {String(selectedCard.card_exp_month).padStart(2, '0')}/{selectedCard.card_exp_year}</div></div></div></div>
                                          <ChevronDown size={20} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                      </div>
                                    </div>
                                )}
                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
                                        {cards.map((card) => (
                                            <div key={card.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0" onClick={() => { setSelectedCardId(card.id); setIsDropdownOpen(false); }}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">{getCardIcon()}<div><span className="font-medium text-gray-800">{card.card_brand}</span><span className="text-gray-600"> **** {card.card_last4}</span></div></div>
                                                    {selectedCardId === card.id && <Check size={20} className="text-primary" />}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors text-primary border-t border-gray-200" onClick={() => { setIsAddCardModalOpen(true); setIsDropdownOpen(false); }}>
                                            <div className="flex items-center gap-3"><PlusCircle size={20} /><span className="font-medium">Add New Card</span></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Button variant="outline" fullWidth onClick={() => setIsAddCardModalOpen(true)}><PlusCircle size={16} /> Add a New Card</Button>
                        )}
                    </div>
                </div>

                <div className="p-6 pt-2 flex-shrink-0 bg-white">
                    <Button fullWidth size="md" onClick={handleConfirmPayment} disabled={!isAgreed || !selectedCardId || isProcessing}>
                        {isProcessing ? 'Processing…' : 'Confirm Payment'} <ArrowRight size={16}/>
                    </Button>
                </div>
            </>
            )}
        </div>
      </div>

      {isAddCardModalOpen && (
          <AddPaymentMethodModal isOpen={isAddCardModalOpen} onClose={() => setIsAddCardModalOpen(false)} onSuccess={() => { fetchCards(); setIsAddCardModalOpen(false); }} />
      )}
    </>
  );
};