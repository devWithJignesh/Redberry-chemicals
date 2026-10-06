/* ============================================
   IMAGE UPLOAD API SERVICE
   FILE: src/api/uploadApi.js
   Uploads images to local server folder and returns URLs
   ============================================ */

import { BASE_URL, ENDPOINTS } from './config';

export const uploadImagesApi = async (imagesArray, folder = 'subproduct') => {
  try {
    const url = `${BASE_URL}${ENDPOINTS.UPLOAD}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        images: imagesArray,
        folder,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading images to server folder:', error);
    return { success: false, data: { urls: [] } };
  }
};

export const uploadSingleImageApi = async (base64Image, folder = 'subproduct') => {
  try {
    const url = `${BASE_URL}${ENDPOINTS.UPLOAD}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image,
        folder,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading image to server folder:', error);
    return { success: false, data: { url: base64Image } };
  }
};
