import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  loginWithGoogle: (credential: string) =>
    api.post('/auth/google', { credential }),
  register: (name: string, email: string, password: string, role: string) =>
    api.post('/auth/register', { name, email, password, role }),
};

// Listings API
export const listingsAPI = {
  getAll: () => api.get('/listings'),
  getById: (id: string) => api.get(`/listings/${id}`),
  create: (data: any) => api.post('/listings', data),
  update: (id: string, data: any) => api.put(`/listings/${id}`, data),
  delete: (id: string) => api.delete(`/listings/${id}`),
  getHostStats: () => api.get('/listings/host/stats'),
  getHostListings: () => api.get('/listings/host'),
};

// Bookings API
export const bookingsAPI = {
  create: (data: any) => api.post('/bookings', data),
  getAll: () => api.get('/bookings'),
  updateStatus: (id: string, status: string) =>
    api.put(`/bookings/${id}/status`, { status }),
  getHostBookings: () => api.get('/bookings/host'),
  getGuestBookings: () => api.get('/bookings/guest'),
};

// Search API
export const searchAPI = {
  search: (params: any) => api.get('/search', { params }),
};

// Payments API
export const paymentsAPI = {
  createPaymentIntent: (bookingId: string) =>
    api.post(`/payments/create-intent/${bookingId}`),
  confirmPayment: (bookingId: string, paymentIntentId: string) =>
    api.post(`/payments/confirm/${bookingId}`, { paymentIntentId }),
};

export default api; 