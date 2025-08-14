import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';

interface RouteMapProps {
  pickupAddress: string;
  deliveryAddress: string;
  className?: string;
}

const libraries: "places"[] = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '200px',
  borderRadius: '8px'
};

const defaultCenter = {
  lat: 39.8283,
  lng: -98.5795
};

export const RouteMap = ({ pickupAddress, deliveryAddress, className }: RouteMapProps) => {
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_Maps_API_KEY,
    libraries,
  });

  const calculateRoute = useCallback(async () => {
    if (!isLoaded || !window.google) return;
    
    // Debug logging
    console.log('RouteMap: Calculating route from', pickupAddress, 'to', deliveryAddress);

    try {
      setError(null);
      const directionsService = new window.google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: pickupAddress,
          destination: deliveryAddress,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (results, status) => {
          console.log('RouteMap: Directions response status:', status);
          if (status === 'OK' && results) {
            console.log('RouteMap: Route calculated successfully');
            setDirectionsResponse(results);
            setShowFallback(false);
          } else {
            console.error('RouteMap: Directions request failed due to ' + status);
            
            // Provide more specific error messages
            let errorMessage = 'Route unavailable';
            switch (status) {
              case 'ZERO_RESULTS':
                errorMessage = 'No route found between locations';
                break;
              case 'OVER_QUERY_LIMIT':
                errorMessage = 'API quota exceeded';
                break;
              case 'REQUEST_DENIED':
                errorMessage = 'Directions API access denied - check API key permissions';
                break;
              case 'INVALID_REQUEST':
                errorMessage = 'Invalid route request';
                break;
              case 'UNKNOWN_ERROR':
                errorMessage = 'Server error - please try again';
                break;
              default:
                errorMessage = `Route unavailable: ${status}`;
            }
            
            setError(errorMessage);
            setDirectionsResponse(null);
            setShowFallback(true);
          }
        }
      );
    } catch (err) {
      console.error('RouteMap: Error calculating route:', err);
      setError('Unable to calculate route');
      setDirectionsResponse(null);
      setShowFallback(true);
    }
  }, [isLoaded, pickupAddress, deliveryAddress]);

  useEffect(() => {
    if (isLoaded && pickupAddress && deliveryAddress) {
      calculateRoute();
    }
  }, [calculateRoute, isLoaded, pickupAddress, deliveryAddress]);

  if (loadError) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center p-4 ${className}`}>
        <span className="text-gray-500 text-sm">Map unavailable</span>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center p-4 animate-pulse ${className}`} style={{ height: '200px' }}>
        <span className="text-gray-400 text-sm">Loading map...</span>
      </div>
    );
  }

  if (error && !showFallback) {
    return (
      <div className={`bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4 ${className}`} style={{ height: '200px' }}>
        <span className="text-gray-500 text-sm text-center">{error}</span>
        <span className="text-gray-400 text-xs mt-1">Check console for details</span>
      </div>
    );
  }

  // Show a simple route display when directions fail
  if (showFallback) {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-200 ${className}`} style={{ height: '200px' }}>
        <div className="h-full flex flex-col justify-center">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Route Preview</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-green-700 mb-1">FROM</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{pickupAddress}</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-8 h-0.5 bg-blue-400"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full mx-1"></div>
              <div className="w-8 h-0.5 bg-blue-400"></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-red-700 mb-1">TO</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{deliveryAddress}</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <span className="text-xs text-gray-500">Interactive map unavailable</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={10}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
        }}
      >
        {directionsResponse && (
          <DirectionsRenderer 
            directions={directionsResponse}
            options={{
              suppressMarkers: false,
              polylineOptions: {
                strokeColor: '#3B82F6',
                strokeOpacity: 1,
                strokeWeight: 4,
              },
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};