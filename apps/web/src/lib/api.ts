import axios from 'axios';

// Create a configured Axios instance pointing to our Node.js backend
// Using window.location.hostname allows testing on mobile devices via local IP
export const api = axios.create({
  baseURL: `http://${window.location.hostname}:5000/api/v1`,
  headers: {
    'Content-Type': 'application/json'
  }
});

import { useAuthStore } from '../stores/authStore';

// Interceptor to attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const state = useAuthStore.getState();
  const token = state.token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Abstraction layer for clean component code
export const AuthAPI = {
  requestOtp: (data: any) => api.post('/auth/login', data),
  verifyOtp: (data: any) => api.post('/auth/verify-otp', data)
};
export const CustomerAPI = {
  getLaundries: () => api.get('/customer/laundries'),
  placeOrder: (orderData: any) => api.post('/customer/orders', orderData),
  getOrders: () => api.get('/customer/orders')
};

export const LaundryAPI = {
  getPendingOrders: () => api.get('/laundry/orders/pending'),
  getAllOrders: () => api.get('/laundry/orders'),
  updateStatus: (id: string, status: string) => api.patch(`/laundry/orders/${id}/status`, { status })
};

export const DeliveryAPI = {
  getAssignments: () => api.get('/delivery/assignments'),
  acceptAssignment: (id: string) => api.patch(`/delivery/assignments/${id}/accept`),
  getActiveDelivery: () => api.get('/delivery/active'),
  updateStatus: (id: string, status: string) => api.patch(`/delivery/${id}/status`, { status })
};

export const AdminAPI = {
  getStats: () => api.get('/admin/stats'),
  getLaundries: () => api.get('/admin/laundries'),
  getDeliveryPartners: () => api.get('/admin/delivery-partners'),
  getOrders: () => api.get('/admin/orders')
};
