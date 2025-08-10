import { useGoogleMapsLoader, useAutocompleteManager } from './hooks';
import { FallbackInput } from './components';

interface GooglePlacesAutocompleteProps {
  label?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

declare global {
  interface Window {
    google?: {
      maps?: {
        places?: {
          PlaceAutocompleteElement?: new (options?: { types?: string[] }) => HTMLElement;
          PlaceResult: {
            formatted_address?: string;
            [key: string]: any;
          };
        };
      };
    };
  }
  
  namespace google {
    namespace maps {
      namespace places {
        interface PlaceResult {
          formatted_address?: string;
          [key: string]: any;
        }
      }
    }
  }
}

export const GooglePlacesAutocomplete = ({
  label,
  name,
  value,
  onChange,
  onPlaceSelected,
  placeholder = "Enter address",
  required = false,
  error,
  className
}: GooglePlacesAutocompleteProps) => {
  const isLoaded = useGoogleMapsLoader();
  const { containerRef } = useAutocompleteManager({
    isLoaded,
    value,
    name,
    placeholder,
    onChange,
    onPlaceSelected
  });

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div 
        ref={containerRef}
        className={`
          ${error ? 'ring-2 ring-red-500' : ''}
        `}
        style={{ minHeight: '48px' }}
      >
        {!isLoaded && (
          <FallbackInput
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            required={required}
          />
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};