import { type TextareaHTMLAttributes, forwardRef, useRef, useCallback, type ChangeEvent } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', onChange, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);


    const combinedRef = useCallback((node: HTMLTextAreaElement) => {
      internalRef.current = node;
      
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }

      if (node) {
        node.style.height = 'auto';
        node.style.height = `${node.scrollHeight}px`;
      }
    }, [ref]);

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (internalRef.current) {
        internalRef.current.style.height = 'auto';
        internalRef.current.style.height = `${e.target.scrollHeight}px`;
      }
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={combinedRef}
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