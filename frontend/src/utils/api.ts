import { config } from '@/config';
import axios from 'axios';

const api = axios.create({
  baseURL: config.api.baseUrl || 'http://example.com',
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      // handle unauthorized error
    }
    return Promise.reject(error);
  },
);

export default api;
