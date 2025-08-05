import { Accordion } from '../../../shared/ui/Accordion/ui/Accordion';

const faqData = [
  {
    question: 'How does MoveShare verify movers?',
    answer: (
        <div className="prose prose-sm max-w-none text-gray-600">
            <p>We conduct a comprehensive 4-step verification process for all movers:</p>
            <ul>
                <li>Business license validation</li>
                <li>Insurance verification ($1M minimum liability)</li>
                <li>Background checks on company principals</li>
                <li>Industry reference checks</li>
            </ul>
        </div>
    )
  },
  {
    question: 'What are the insurance requirements to join?',
    answer: <p className="text-gray-600">All carriers are required to maintain a minimum of $1,000,000 in liability insurance. We verify this upon registration and periodically thereafter.</p>
  },
  {
    question: 'How are payments handled? Is it secure?',
    answer: <p className="text-gray-600">All payments are processed securely through Stripe, a certified PCI Level 1 Service Provider. Your financial details are never stored on our servers.</p>
  },
  {
    question: "What happens if there's a dispute with a job?",
    answer: <p className="text-gray-600">MoveShare offers a dispute resolution process. If you have an issue with a job, you can file a dispute through your dashboard, and our support team will mediate to find a fair solution.</p>
  },
];

export const Faq = () => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-gray-800">Frequently Asked Questions</h2>
      <div className="w-16 h-0.5 bg-primary mt-2 mb-4" />
      
      <div className="bg-slate-50 p-6 rounded-2xl">
        <div className="space-y-4">
            {faqData.map((item, index) => (
                <Accordion key={index} title={item.question} startOpen={index === 0}>
                    {item.answer}
                </Accordion>
            ))}
        </div>
      </div>
    </section>
  );
};