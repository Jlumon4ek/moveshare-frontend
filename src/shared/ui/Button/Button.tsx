import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
    variant?: 'primary' | 'secondary' | 'text' | 'success' | 'outline' | 'danger'; 
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) => {
  const baseClasses = `
    font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2
    focus:outline-none focus:ring-2 focus:ring-primary/20
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    text: 'text-primary hover:text-primary/80 bg-transparent',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500/20',
    outline: 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500/20',
    danger: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90 focus:ring-red-500/20',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };
  
  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};