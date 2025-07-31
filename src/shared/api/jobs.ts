import { apiRequest } from './config';
import { authStore } from '../lib/auth/authStore';

export interface Job {
    id: number;
    job_title: string;
    description: string;
    cargo_type: string;
    urgency: string;
    pickup_location: string;
    delivery_location: string;
    weight_lb: number;
    volume_cu_ft: number;
    truck_size: string;
    loading_assistance: boolean;
    pickup_date: string;
    pickup_time_window: string;
    delivery_date: string;
    delivery_time_window: string;
    payout_amount: number;
    early_delivery_bonus: number;
    payment_terms: string;
    liftgate: boolean;
    fragile_items: boolean;
    climate_control: boolean;
    assembly_required: boolean;
    extra_insurance: boolean;
    additional_packing: boolean;
    status: 'active' | 'pending' | 'completed' | 'canceled';
    distance_miles: number;
}

interface MyJobsApiResponse {
  jobs: Job[];
}

export const jobsApi = {
  getMyJobs: async (): Promise<MyJobsApiResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
        throw new Error('Not authorized');
    }

    return apiRequest('/jobs/my', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },
};