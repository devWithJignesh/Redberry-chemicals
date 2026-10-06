/* ============================================
   PRODUCT API SERVICES
   FILE: src/api/productApi.js
   ============================================ */

import apiClient from './apiClient';
import { ENDPOINTS } from './config';

/**
 * Fetch Paginated & Filtered Products from Backend API
 * @param {Object} params - { page, limit, search, category }
 * @returns {Promise<Object>} API Response data
 */
export const getProductsApi = async (params = {}) => {
  const response = await apiClient.get(ENDPOINTS.PRODUCTS.GET_ALL, { params });
  return response.data;
};

/**
 * Fetch Single Product By ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export const getProductByIdApi = async (id) => {
  const response = await apiClient.get(ENDPOINTS.PRODUCTS.GET_BY_ID(id));
  return response.data;
};

/**
 * Create New Product via Backend API
 * @param {Object} productData
 * @returns {Promise<Object>}
 */
export const createProductApi = async (productData) => {
  const response = await apiClient.post(ENDPOINTS.PRODUCTS.GET_ALL, productData);
  return response.data;
};

/**
 * Update Existing Product via Backend API
 * @param {string} id
 * @param {Object} productData
 * @returns {Promise<Object>}
 */
export const updateProductApi = async (id, productData) => {
  const response = await apiClient.put(ENDPOINTS.PRODUCTS.GET_BY_ID(id), productData);
  return response.data;
};

/**
 * Delete Product via Backend API
 * @param {string} id
 * @returns {Promise<Object>}
 */
export const deleteProductApi = async (id) => {
  const response = await apiClient.delete(ENDPOINTS.PRODUCTS.GET_BY_ID(id));
  return response.data;
};
