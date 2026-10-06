/* ============================================
   AXIOS API CLIENT INSTANCE WITH LOADER SUBSCRIBER
   FILE: src/api/apiClient.js
   ============================================ */

import axios from 'axios';
import { BASE_URL } from './config';

let onRequestStartCallback = null;
let onRequestEndCallback = null;

export const registerLoaderCallbacks = (onStart, onEnd) => {
  onRequestStartCallback = onStart;
  onRequestEndCallback = onEnd;
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach Auth Token & trigger loader start
apiClient.interceptors.request.use(
  (config) => {
    if (onRequestStartCallback) onRequestStartCallback();

    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (onRequestEndCallback) onRequestEndCallback();
    return Promise.reject(error);
  }
);

// Response Interceptor: Trigger loader end & format error responses
apiClient.interceptors.response.use(
  (response) => {
    if (onRequestEndCallback) onRequestEndCallback();
    return response;
  },
  (error) => {
    if (onRequestEndCallback) onRequestEndCallback();

    const message =
      error.response?.data?.message ||
      error.message ||
      'Server connection error. Please make sure backend server is running.';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
