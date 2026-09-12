import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from './store/useAuthStore';

export const userApi = axios.create({
  baseURL: 'http://localhost:8081/api/v1',
});

export const lmsApi = axios.create({
  baseURL: 'http://localhost:8082/api/v1',
});

const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

setupInterceptors(userApi);
setupInterceptors(lmsApi);
