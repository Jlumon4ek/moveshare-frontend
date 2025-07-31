import { apiRequest } from './config';
import { authStore } from '../lib/auth/authStore';

export interface Truck {
  id: number;
  truck_name: string;
  license_plate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  length: number;
  width: number;
  height: number;
  max_weight: number;
  truck_type: string;
  climate_control: boolean;
  liftgate: boolean;
  pallet_jack: boolean;
  security_system: boolean;
  refrigerated: boolean;
  furniture_pads: boolean;
  photo_urls: string[];
}

interface TrucksApiResponse {
  trucks: Truck[];
}

export const trucksApi = {
  getTrucks: async (): Promise<TrucksApiResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
        throw new Error('Not authorized');
    }

    return apiRequest('/trucks/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },


  createTruck: async (formData: FormData): Promise<Truck> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
      throw new Error('Not authorized');
    }
    return apiRequest('/trucks/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData,
    });
  },

  deleteTruck: async (id: number): Promise<void> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
      throw new Error('Not authorized');
    }

    return apiRequest(`/trucks/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },
};