/* ============================================
   SUB-PRODUCT API SERVICES
   FILE: src/api/subProductApi.js
   ============================================ */

import apiClient from './apiClient';
import { ENDPOINTS } from './config';

/**
 * Fetch All Sub-Products from Backend API
 * @param {Object} params - Query parameters (e.g. productId, search)
 * @returns {Promise<Object>}
 */
export const getSubProductsApi = async (params = {}) => {
  const response = await apiClient.get(ENDPOINTS.SUB_PRODUCTS.GET_ALL, { params });
  return response.data;
};

/**
 * Fetch Single Sub-Product By ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export const getSubProductByIdApi = async (id) => {
  const response = await apiClient.get(ENDPOINTS.SUB_PRODUCTS.GET_BY_ID(id));
  return response.data;
};

/**
 * Fetch Sub-Products belonging to a specific parent Product ID
 * @param {string} productId
 * @returns {Promise<Object>}
 */
export const getSubProductsByProductIdApi = async (productId) => {
  const response = await apiClient.get(ENDPOINTS.SUB_PRODUCTS.GET_BY_PRODUCT_ID(productId));
  return response.data;
};

/**
 * Create New Sub-Product via Backend API
 * @param {Object} subProductData
 * @returns {Promise<Object>}
 */
export const createSubProductApi = async (subProductData) => {
  const response = await apiClient.post(ENDPOINTS.SUB_PRODUCTS.GET_ALL, subProductData);
  return response.data;
};

/**
 * Update Existing Sub-Product via Backend API
 * @param {string} id
 * @param {Object} subProductData
 * @returns {Promise<Object>}
 */
export const updateSubProductApi = async (id, subProductData) => {
  const response = await apiClient.put(ENDPOINTS.SUB_PRODUCTS.GET_BY_ID(id), subProductData);
  return response.data;
};

/**
 * Delete Sub-Product via Backend API
 * @param {string} id
 * @returns {Promise<Object>}
 */
export const deleteSubProductApi = async (id) => {
  const response = await apiClient.delete(ENDPOINTS.SUB_PRODUCTS.GET_BY_ID(id));
  return response.data;
};
