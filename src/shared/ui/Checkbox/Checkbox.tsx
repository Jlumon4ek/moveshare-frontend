import type { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children: ReactNode;
}

export const Checkbox = ({ children, className = '', ...props }: CheckboxProps) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        className={`
          w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded
          focus:ring-primary focus:ring-2
          ${className}
        `}
        {...props}
      />
      <span className="text-sm text-gray-700">{children}</span>
    </label>
  );
};