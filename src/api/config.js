const isBrowser = typeof window !== 'undefined';
const isLocalhost =
  isBrowser &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '::1');

export const PROD_API_URL = 'https://redberrychemicals-api-8pjv.vercel.app/api';
export const LOCAL_API_URL = 'http://localhost:5000/api';

// Automatic detection: localhost uses local port 5000, live domain uses Vercel API (No .env needed)
export const BASE_URL = isLocalhost ? LOCAL_API_URL : PROD_API_URL;

// Server host without /api prefix
export const BACKEND_SERVER_URL = BASE_URL.replace(/\/api\/?$/, '');

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
  },
  PRODUCTS: {
    GET_ALL: '/products',
    GET_BY_ID: (id) => `/products/${id}`,
  },
  SUB_PRODUCTS: {
    GET_ALL: '/sub-products',
    GET_BY_ID: (id) => `/sub-products/${id}`,
    GET_BY_PRODUCT_ID: (productId) => `/sub-products/by-product/${productId}`,
  },
  INQUIRIES: {
    GET_ALL: '/inquiries',
    GET_BY_ID: (id) => `/inquiries/${id}`,
    CREATE: '/inquiries',
    UPDATE: (id) => `/inquiries/${id}`,
    DELETE: (id) => `/inquiries/${id}`,
  },
  REVIEWS: {
    GET_ALL: '/reviews',
    GET_BY_ID: (id) => `/reviews/${id}`,
    CREATE: '/reviews',
    UPDATE: (id) => `/reviews/${id}`,
    DELETE: (id) => `/reviews/${id}`,
  },
  UPLOAD: '/upload',
};
