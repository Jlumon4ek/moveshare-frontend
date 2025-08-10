import { apiRequest } from './config';

export interface ReviewStats {
  user_id: number;
  average_rating: number | null;
  total_reviews: number;
  five_stars: number;
  four_stars: number;
  three_stars: number;
  two_stars: number;
  one_star: number;
}

export interface CreateReviewRequest {
  job_id: number;
  rating: number;
  comment: string;
}

export interface Review {
  id: number;
  job_id: number;
  reviewer_id: number;
  reviewee_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewResponse {
  message: string;
  review: Review;
}

export const reviewsApi = {
  /**
   * Fetch review statistics for a specific user
   * Note: Authorization header is automatically added by apiRequest
   */
  getStats: async (userId: number): Promise<ReviewStats> => {
    return apiRequest(`/reviews/stats/${userId}`, {
      method: 'GET',
    });
  },

  /**
   * Create a new review for a job
   */
  create: async (reviewData: CreateReviewRequest): Promise<CreateReviewResponse> => {
    return apiRequest('/reviews/', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },
};