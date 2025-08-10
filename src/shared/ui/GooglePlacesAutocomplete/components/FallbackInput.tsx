import { useState } from 'react';

interface FallbackInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
}

export const FallbackInput = ({ 
  placeholder, 
  value, 
  onChange, 
  name, 
  required 
}: FallbackInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  return (
    <input
      className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      name={name}
      required={required}
      autoComplete="off"
    />
  );
};