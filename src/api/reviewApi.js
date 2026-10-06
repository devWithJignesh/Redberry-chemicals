/* ============================================
   CUSTOMER REVIEWS API SERVICE
   FILE: src/api/reviewApi.js
   ============================================ */

import { BASE_URL, ENDPOINTS } from './config';

export const getReviewsApi = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.REVIEWS.GET_ALL}${query ? `?${query}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching customer reviews:', error);
    return { success: false, data: [] };
  }
};

export const getReviewByIdApi = async (id) => {
  try {
    const url = `${BASE_URL}${ENDPOINTS.REVIEWS.GET_BY_ID(id)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching review with ID ${id}:`, error);
    return { success: false, data: null };
  }
};

export const createReviewApi = async (reviewData) => {
  try {
    const url = `${BASE_URL}${ENDPOINTS.REVIEWS.CREATE}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating review:', error);
    return { success: false, message: error.message };
  }
};

export const updateReviewApi = async (id, updateData) => {
  try {
    const url = `${BASE_URL}${ENDPOINTS.REVIEWS.UPDATE(id)}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating review with ID ${id}:`, error);
    return { success: false, message: error.message };
  }
};

export const deleteReviewApi = async (id) => {
  try {
    const url = `${BASE_URL}${ENDPOINTS.REVIEWS.DELETE(id)}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error deleting review with ID ${id}:`, error);
    return { success: false, message: error.message };
  }
};
