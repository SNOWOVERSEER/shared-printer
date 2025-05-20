import useAuthStore from '@/store/authStore';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';


const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().user?.access_token;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {

        if (error.response?.status === 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }


        const errorMessage =
            (error.response?.data as any)?.detail || // fastapi
            error.message ||
            'request failed';

        return Promise.reject(new Error(errorMessage));
    }
);

// 封装GET请求
export const get = <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.get(url, { params, ...config });
};

// 封装POST请求
export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.post(url, data, config);
};

// 封装PUT请求
export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.put(url, data, config);
};

// 封装DELETE请求
export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.delete(url, config);
};

// 封装上传文件的POST请求
export const uploadFile = <T>(url: string, file: File, config?: AxiosRequestConfig): Promise<T> => {
    const formData = new FormData();
    formData.append('file', file);

    return axiosInstance.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        ...config,
    });
};

export default axiosInstance;