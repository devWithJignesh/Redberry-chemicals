/* ============================================
   INQUIRY API SERVICE
   FILE: src/api/inquiryApi.js
   ============================================ */

import { BASE_URL, ENDPOINTS } from './config';

export const getInquiriesApi = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.INQUIRIES.GET_ALL}${query ? `?${query}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return { success: false, data: [] };
  }
};

export const getInquiryByIdApi = async (id) => {
  try {
    const url = `${BASE_URL}${ENDPOINTS.INQUIRIES.GET_BY_ID(id)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching inquiry with ID ${id}:`, error);
    return { success: false, data: null };
  }
};

export const createInquiryApi = async (inquiryData) => {
  try {
    const url = `${BASE_URL}${ENDPOINTS.INQUIRIES.CREATE}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inquiryData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return { success: false, message: error.message };
  }
};

export const updateInquiryApi = async (id, updateData) => {
  try {
    const url = `${BASE_URL}${ENDPOINTS.INQUIRIES.UPDATE(id)}`;
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
    console.error(`Error updating inquiry with ID ${id}:`, error);
    return { success: false, message: error.message };
  }
};

export const deleteInquiryApi = async (id) => {
  try {
    const url = `${BASE_URL}${ENDPOINTS.INQUIRIES.DELETE(id)}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error deleting inquiry with ID ${id}:`, error);
    return { success: false, message: error.message };
  }
};
