import { useRef, useEffect } from 'react';
import { StyleManager } from '../utils/StyleManager';

interface UseAutocompleteManagerProps {
  isLoaded: boolean;
  value: string;
  name?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
}

export const useAutocompleteManager = ({
  isLoaded,
  value,
  name,
  placeholder,
  onChange,
  onPlaceSelected
}: UseAutocompleteManagerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<{ 
    placeAutocomplete: HTMLElement; 
    styleInterval?: number;
    customInput?: HTMLInputElement;
  } | null>(null);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) {
      return;
    }

    const initializeAutocomplete = () => {
      try {
        if (!window.google?.maps?.places?.PlaceAutocompleteElement) {
          console.error('PlaceAutocompleteElement not available. Retrying in 500ms...');
          setTimeout(initializeAutocomplete, 500);
          return;
        }

        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement({
          types: ['address']
        });

        StyleManager.addGlobalStyles();
        StyleManager.hideGooglePlacesElement(placeAutocomplete);
        
        setTimeout(() => {
          const googleInput = placeAutocomplete.querySelector('input');
          if (googleInput) {
            StyleManager.hideGoogleInput(googleInput as HTMLInputElement);
          }
        }, 100);
        
        const customInput = document.createElement('input');
        customInput.style.cssText = StyleManager.getCustomInputStyles();
        StyleManager.forceTextColor(customInput);
        customInput.placeholder = placeholder;
        customInput.value = value || '';
        
        if (value && value.length > 0) {
          customInput.setAttribute('data-has-value', 'true');
        }
        
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.appendChild(customInput);
        wrapper.appendChild(placeAutocomplete);

        let googleInput: HTMLInputElement | null = null;
        
        setTimeout(() => {
          googleInput = placeAutocomplete.querySelector('input');
          if (googleInput) {
            googleInput.value = value || '';
          }
        }, 200);
        
        const forceTextColor = () => {
          StyleManager.forceTextColor(customInput);
        };
        
        customInput.addEventListener('input', (e) => {
          const inputValue = (e.target as HTMLInputElement).value;
          forceTextColor();
          
          if (inputValue.length > 0) {
            customInput.placeholder = '';
          } else {
            customInput.placeholder = placeholder;
          }
          
          if (googleInput) {
            googleInput.value = inputValue;
            googleInput.focus();
            googleInput.dispatchEvent(new InputEvent('input', { bubbles: true }));
            
            setTimeout(() => {
              customInput.focus();
            }, 10);
          }
          
          const syntheticEvent = {
            target: {
              name: name || '',
              value: inputValue
            }
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        });
        
        const styleInterval = setInterval(() => {
          forceTextColor();
          StyleManager.hideGooglePlacesElement(placeAutocomplete);
        }, 200);
        
        customInput.addEventListener('focus', () => {
          StyleManager.applyFocusStyle(customInput);
        });
        
        customInput.addEventListener('blur', () => {
          StyleManager.removeFocusStyle(customInput);
        });

        placeAutocomplete.addEventListener('gmp-placeselect', (event: Event) => {
          const customEvent = event as CustomEvent<{ place: google.maps.places.PlaceResult }>;
          const place = customEvent.detail.place;
          if (place && place.formatted_address) {
            customInput.value = place.formatted_address;
            customInput.placeholder = '';
            customInput.focus();
            
            const syntheticEvent = {
              target: {
                name: name || '',
                value: place.formatted_address
              }
            } as React.ChangeEvent<HTMLInputElement>;
            
            onChange(syntheticEvent);
            
            if (onPlaceSelected) {
              onPlaceSelected(place);
            }
          }
        });

        if (containerRef.current) {
          containerRef.current.appendChild(wrapper);
        }

        autocompleteRef.current = { placeAutocomplete, styleInterval, customInput };
      } catch (error) {
        console.error('Error initializing Google Places Autocomplete:', error);
      }
    };

    initializeAutocomplete();

    return () => {
      const currentAutocomplete = autocompleteRef.current?.placeAutocomplete;
      const currentStyleInterval = autocompleteRef.current?.styleInterval;
      const currentContainer = containerRef.current;
      
      if (currentStyleInterval) {
        clearInterval(currentStyleInterval);
      }
      
      if (currentAutocomplete && 'remove' in currentAutocomplete) {
        (currentAutocomplete as HTMLElement & { remove(): void }).remove();
      }
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [isLoaded, onChange, onPlaceSelected, name, placeholder, value]);

  useEffect(() => {
    if (autocompleteRef.current?.customInput) {
      const customInput = autocompleteRef.current.customInput;
      customInput.value = value;
      
      if (value && value.length > 0) {
        customInput.placeholder = '';
      } else {
        customInput.placeholder = placeholder;
      }
      
      const googleInput = autocompleteRef.current.placeAutocomplete.querySelector('input');
      if (googleInput) {
        googleInput.value = value;
      }
    }
  }, [value, placeholder]);

  return { containerRef };
};