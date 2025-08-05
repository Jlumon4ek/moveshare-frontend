import { Check } from 'lucide-react';
import cn from 'classnames';

const steps = ['Claimed', 'Documents Shared', 'In Transit', 'Completed'];

interface JobProgressTrackerProps {
  currentStep: number;
}

export const JobProgressTracker = ({ currentStep }: JobProgressTrackerProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep >= stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <div key={step} className={cn("flex items-center", { 'flex-1': index < steps.length -1 })}>
              <div className="flex flex-col items-center">
                <div
                  className={cn("w-8 h-8 rounded-full flex items-center justify-center", {
                    'bg-primary text-white': isCompleted,
                    'bg-gray-200 text-gray-500': !isCompleted,
                  })}
                >
                  {isCompleted && !isActive ? <Check size={20} /> : <span className="font-bold">{stepNumber}</span>}
                </div>
                <p className="text-xs text-center mt-2">{step}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className={cn("h-0.5 w-full", {
                    'bg-primary': isCompleted,
                    'bg-gray-200': !isCompleted
                })}/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};