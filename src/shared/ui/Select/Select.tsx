import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select = ({ label, options, className = '', ...props }: SelectProps) => {
  return (
    <div>
      {label && <label className="block text-sm font-semibold text-gray-800 mb-2">{label}</label>}
      <div className={`
        relative flex items-center w-full bg-gray-100 rounded-lg
        focus-within:ring-2 focus-within:ring-primary/20
        transition-all duration-200
        ${className}
      `}>
        <select
          className={`
            w-full pl-4 pr-10 py-3 bg-transparent border-0 appearance-none
            text-gray-900 placeholder-gray-400
            focus:outline-none
          `}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown 
              className="text-gray-400" 
              size={20} 
            />
        </div>
      </div>
    </div>
  );
};