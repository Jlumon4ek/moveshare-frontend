import { useState, useEffect } from 'react';

export const useGoogleMapsLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google?.maps?.places?.PlaceAutocompleteElement) {
        setIsLoaded(true);
        return;
      }

      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        const checkLibraryLoaded = () => {
          if (window.google?.maps?.places?.PlaceAutocompleteElement) {
            setIsLoaded(true);
          } else {
            setTimeout(checkLibraryLoaded, 100);
          }
        };
        checkLibraryLoaded();
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        const checkLibraryLoaded = () => {
          if (window.google?.maps?.places?.PlaceAutocompleteElement) {
            setIsLoaded(true);
          } else {
            setTimeout(checkLibraryLoaded, 100);
          }
        };
        checkLibraryLoaded();
      };
      script.onerror = () => {
        console.error('Failed to load Google Maps script');
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  return isLoaded;
};