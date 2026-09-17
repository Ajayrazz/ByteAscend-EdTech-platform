import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from './store/useAuthStore';

export const userApi = axios.create({
  baseURL: 'http://localhost:8081/api/v1',
});

export const lmsApi = axios.create({
  baseURL: 'http://localhost:8082/api/v1',
});

export const dsaApi = axios.create({
  baseURL: 'http://localhost:8083/api',
});

const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    console.log("Interceptor sending token:", token ? token.substring(0, 10) + '...' : 'NO TOKEN');
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  });
};

setupInterceptors(userApi);
setupInterceptors(lmsApi);
setupInterceptors(dsaApi);
