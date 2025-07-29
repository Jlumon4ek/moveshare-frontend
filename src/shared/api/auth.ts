import { apiRequest } from './config';

export interface SignInRequest {
  identifier: string;
  password: string;
}

export interface SignInResponse {
  user_id: number;
  username: string;
  email: string;
  access_token: string;
  refresh_token: string;
}

export interface SignUpRequest {
  email: string;
  username: string;
  password: string;
}

export const authApi = {
  signIn: async (data: SignInRequest): Promise<SignInResponse> => {
    return apiRequest('/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  signUp: async (data: SignUpRequest): Promise<SignInResponse> => {
    return apiRequest('/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};