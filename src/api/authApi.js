/* ============================================
   AUTH API SERVICES
   FILE: src/api/authApi.js
   ============================================ */

import apiClient from './apiClient';
import { ENDPOINTS } from './config';

/**
 * Call Backend Login API
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} API Response data
 */
export const loginApi = async (credentials) => {
  const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
  return response.data;
};
