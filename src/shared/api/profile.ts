import { apiRequest } from './config';
import { authStore } from '../lib/auth/authStore';

export interface ProfilePhotoResponse {
  message: string;
  photo_url?: string;
}

export interface UserRatingStats {
  user_id: number;
  average_rating: number | null;
  total_reviews: number;
  five_stars: number;
  four_stars: number;
  three_stars: number;
  two_stars: number;
  one_star: number;
}

export interface UserRatingResponse {
  stats: UserRatingStats;
}

export const profileApi = {
  uploadProfilePhoto: async (file: File): Promise<ProfilePhotoResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) throw new Error('Not authorized');

    const formData = new FormData();
    formData.append('photo', file);

    return apiRequest('/user/upload-profile-photo', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData,
    });
  },

  getProfilePhoto: async (userId: number): Promise<{ photo_url: string }> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) throw new Error('Not authorized');

    return apiRequest(`/user/profile-photo/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },

  deleteProfilePhoto: async (): Promise<ProfilePhotoResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) throw new Error('Not authorized');

    return apiRequest('/user/profile-photo', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },

  getUserRatingStats: async (userId: number): Promise<UserRatingResponse> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) throw new Error('Not authorized');

    return apiRequest(`/reviews/stats/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },
};