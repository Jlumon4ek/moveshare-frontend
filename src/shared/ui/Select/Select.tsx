import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const Select = ({ label, options, className = '', ...props }: SelectProps) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">{label}</label>
      <div className="relative">
        <select
          className={`
            w-full px-4 py-3 bg-gray-100 border-0 rounded-lg appearance-none
            text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary/20
            transition-all duration-200
            ${className}
          `}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDown 
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
          size={20} 
        />
      </div>
    </div>
  );
};