// src/shared/ui/Accordion/ui/Accordion.tsx
import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import cn from 'classnames';

interface AccordionProps {
  title: string;
  children: ReactNode;
  startOpen?: boolean;
}

export const Accordion = ({ title, children, startOpen = false }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(startOpen);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-primary/80 text-white hover:bg-primary transition-colors"
      >
        <span className="font-semibold text-left">{title}</span>
        <ChevronDown
          size={20}
          className={cn('transform transition-transform duration-300', {
            'rotate-180': isOpen,
          })}
        />
      </button>
      {isOpen && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};