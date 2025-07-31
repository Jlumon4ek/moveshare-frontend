import { apiRequest } from './config';
import { authStore } from '../lib/auth/authStore';

export interface CompanyData {
  address: string;
  city: string;
  company_description: string;
  company_name: string;
  contact_person: string;
  dot_number: string;
  email_address: string;
  mc_license_number: string;
  phone_number: string;
  state: string;
  zip_code: string;
}

export const companyApi = {
  getCompanyInfo: async (): Promise<CompanyData> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
        throw new Error('Not authorized');
    }

    return apiRequest('/company/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  },

  updateCompanyInfo: async (data: CompanyData): Promise<CompanyData> => {
    const { accessToken } = authStore.getState();
    if (!accessToken) {
      throw new Error('Not authorized');
    }

    return apiRequest('/company/', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  },
};