import axios from 'axios';
import { IApiResponse } from './type';
import { addTokenToLocalStorage, getTokenFromLocalStorage } from '@/ultils/client';

const instance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 15000,
});

const instanceExternal = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 15000,
});

const refreshToken = async () => {
  try {
    const response = await instance.get('/api/auth/refresh');

    return response.data;
  } catch (error) {
    console.log('[Error:]', error);
  }
};

instance.interceptors.request.use(
  function (config) {
    const access_token = getTokenFromLocalStorage();

    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      window.location.pathname = '/login';
    }

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const resp = await refreshToken();

      const access_token = resp.response.accessToken;

      addTokenToLocalStorage(access_token);

      instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      return instance(originalRequest);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Error:]', error.response?.data);
    }
  }
);

function get<T, R = IApiResponse<T>>(route: string, params?: object, Authorization?: string): Promise<R> {
  return instance.get(route, { params, headers: { Authorization } });
}

function getExternal<T, R = IApiResponse<T>>(route: string, params?: object, Authorization?: string): Promise<R> {
  return instanceExternal.get(route, { params, headers: { Authorization } });
}

function post<T, R = IApiResponse<T>>(route: string, data?: object, config?: object): Promise<R> {
  return instance.post(route, data, config);
}

function put<T, R = IApiResponse<T>>(route: string, data?: object, config?: object): Promise<R> {
  return instance.put(route, data, config);
}

function del<T, R = IApiResponse<T>>(route: string, config?: object): Promise<R> {
  return instance.delete(route, config);
}

function upload<T, R = IApiResponse<T>>(route: string, data: object): Promise<R> {
  return instance.post(route, data, {
    formSerializer: {
      indexes: true,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export { get, post, put, del, upload, getExternal };
