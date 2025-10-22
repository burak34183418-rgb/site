import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories/'),
  getById: (id) => api.get(`/categories/${id}/`),
  create: (data) => api.post('/categories/', data),
  update: (id, data) => api.put(`/categories/${id}/`, data),
  delete: (id) => api.delete(`/categories/${id}/`),
};

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products/', { params }),
  getById: (id) => api.get(`/products/${id}/`),
  create: (data) => api.post('/products/', data),
  update: (id, data) => api.put(`/products/${id}/`, data),
  delete: (id) => api.delete(`/products/${id}/`),
  uploadImage: (productId, formData) => {
    return api.post(`/products/${productId}/images/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteImage: (productId, imageIndex) => api.delete(`/products/${productId}/images/${imageIndex}/`),
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact/', data),
  getAll: (params) => api.get('/contact/', { params }),
  markRead: (id) => api.put(`/contact/${id}/mark-read/`),
  delete: (id) => api.delete(`/contact/${id}/`),
};

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  getMe: () => api.get('/auth/me/'),
};

export default api;
