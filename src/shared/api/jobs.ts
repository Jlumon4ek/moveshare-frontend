import { apiRequest } from './config';
import { authStore } from '../lib/auth/authStore';

export interface Job {
    id: number;
    user_id: number;
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
    created_at: string;
    updated_at: string;
    distance_miles: number;
}


interface JobsApiResponse {
  jobs: Job[];
  total: number;
}

export interface AvailableJobsParams {
    limit?: number;
    offset?: number;
    pickup_location?: string;
    delivery_location?: string;
    pickup_date_start?: string;
    pickup_date_end?: string;
    truck_size?: string;
}


export const jobsApi = {
  getMyJobs: async (): Promise<JobsApiResponse> => {
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

  getAvailableJobs: async (params: AvailableJobsParams = {}): Promise<JobsApiResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
      throw new Error('Not authorized');
    }
    
    const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== '') {
                acc[key] = String(value);
            }
            return acc;
        }, {} as Record<string, string>)
    ).toString();

    return apiRequest(`/jobs/available?${queryString}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },
};