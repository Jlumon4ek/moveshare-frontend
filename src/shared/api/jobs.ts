import { apiRequest } from './config';
import { authStore } from '../lib/auth/authStore';

export interface JobsApiParams {
    page?: number;
    limit?: number;
}

export interface Job {
    id: number;
    contractor_id: number;
    job_type: string;
    number_of_bedrooms: string;
    packing_boxes: boolean;
    bulky_items: boolean;
    inventory_list: boolean;
    hoisting: boolean;
    additional_services_description?: string;
    estimated_crew_assistants: string;
    truck_size: string;
    pickup_address: string;
    pickup_floor?: number;
    pickup_building_type: string;
    pickup_walk_distance: string;
    delivery_address: string;
    delivery_floor?: number;
    delivery_building_type: string;
    delivery_walk_distance: string;
    distance_miles: number;
    job_status: 'active' | 'pending' | 'completed' | 'canceled'; // Используем существующие статусы
    pickup_date: string;
    pickup_time_from: string;
    pickup_time_to: string;
    delivery_date: string;
    delivery_time_from: string;
    delivery_time_to: string;
    cut_amount: number;
    payment_amount: number;
    weight_lbs: number;
    volume_cu_ft: number;
    created_at: string;
    updated_at: string;
}


interface PaginatedJobsResponse {
  jobs: Job[] | null; // Разрешаем jobs быть null
  pagination: {
    limit: number;
    page: number;
    total: number;
    total_pages: number;
  };
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
  createJob: async (payload: any): Promise<any> => {
      const { accessToken } = authStore.getState();
      if (!accessToken) throw new Error('Not authorized');

      return apiRequest('/jobs/post-new-job/', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
      });
  },

  
  getMyJobs: async (): Promise<PaginatedJobsResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
        throw new Error('Not authorized');
    }

    return apiRequest('/jobs/my-jobs/', { 
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },

  getAvailableJobs: async (params: AvailableJobsParams = {}): Promise<PaginatedJobsResponse> => {
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

    return apiRequest(`/jobs/available-jobs/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },


  claimJob: async (jobId: number): Promise<{ message: string }> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
        throw new Error('Not authorized');
    }

    return apiRequest(`/jobs/claim-job/${jobId}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },


  getClaimedJobs: async (params: JobsApiParams = {}): Promise<PaginatedJobsResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) throw new Error('Not authorized');
    
    const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== '') acc[key] = String(value);
            return acc;
        }, {} as Record<string, string>)
    ).toString();

    return apiRequest(`/jobs/claimed-jobs/`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  },

};