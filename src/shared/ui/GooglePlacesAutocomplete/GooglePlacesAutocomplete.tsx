import { useRef } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { Input } from '../../ui/Input/Input';

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

const libraries: "places"[] = ['places'];

export const GooglePlacesAutocomplete = (props: GooglePlacesAutocompleteProps) => {
  const { label, name, value, onChange, onPlaceSelected, placeholder, required, error, className } = props;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_Maps_API_KEY, // Ключ считывается здесь
    libraries,
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address) {
        const syntheticEvent = {
          target: { name: name || '', value: place.formatted_address }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
        onPlaceSelected?.(place);
      }
    }
  };

  if (loadError) {
    return <div className="p-4 text-red-500 bg-red-50 rounded-lg">Ошибка загрузки карт. Убедитесь, что API ключ корректен и сервер перезапущен.</div>;
  }

  if (!isLoaded) {
    return (
      <div className={className}>
         <Input {...props} />
      </div>
    );
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{ types: ['address'] }}
      >
        <Input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          error={error}
          autoComplete="off"
        />
      </Autocomplete>
       {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};