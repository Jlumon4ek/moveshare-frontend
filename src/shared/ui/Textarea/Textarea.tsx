import { type TextareaHTMLAttributes, forwardRef, useRef, useEffect, type ChangeEvent } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', onChange, ...props }) => {
    const localRef = useRef<HTMLTextAreaElement>(null);
    
    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (localRef.current) {
        localRef.current.style.height = 'auto';
        localRef.current.style.height = `${e.target.scrollHeight}px`;
      }
      if (onChange) {
        onChange(e);
      }
    };

    useEffect(() => {
        if(localRef.current) {
            localRef.current.style.height = 'auto';
            localRef.current.style.height = `${localRef.current.scrollHeight}px`;
        }
    }, [])

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={localRef}
          className={`
            w-full px-4 py-3 bg-gray-100 border-0 rounded-lg
            text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary/20
            transition-all duration-200
            resize-none overflow-hidden
            ${error ? 'ring-2 ring-red-500' : ''}
            ${className}
          `}
          onInput={handleInput}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';