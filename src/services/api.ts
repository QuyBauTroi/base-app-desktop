import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';

// API Response type
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  statusCode: number;
}

// Error response type
export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
}

// Token storage keys
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Token management
export const TokenService = {
  getAccessToken: (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY),

  setTokens: (accessToken: string, refreshToken?: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  },

  clearTokens: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  isAuthenticated: (): boolean => !!localStorage.getItem(ACCESS_TOKEN_KEY),
};

// Create axios instance
const createApiClient = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - Add auth token
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = TokenService.getAccessToken();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log request in development
      if (import.meta.env.DEV) {
        console.log(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`);
      }

      return config;
    },
    (error: AxiosError) => {
      console.error('❌ [Request Error]', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor - Handle responses and errors
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development
      if (import.meta.env.DEV) {
        console.log(`✅ [API Response] ${response.config.url}`, response.status);
      }

      return response;
    },
    async (error: AxiosError<ApiErrorResponse>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Handle 401 Unauthorized - Token refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = TokenService.getRefreshToken();

          if (refreshToken) {
            // Call refresh token API
            const response = await axios.post(`${baseURL}/auth/refresh`, {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;
            TokenService.setTokens(accessToken, newRefreshToken);

            // Retry original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            return instance(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed - clear tokens and redirect to login
          TokenService.clearTokens();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      // Handle other errors
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';

      if (import.meta.env.DEV) {
        console.error(`❌ [API Error] ${error.config?.url}`, {
          status: error.response?.status,
          message: errorMessage,
        });
      }

      // You can show toast notification here
      // toast.error(errorMessage);

      return Promise.reject(error);
    }
  );

  return instance;
};

// API Base URL - can be configured via environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Export configured API client
export const apiClient = createApiClient(API_BASE_URL);

// Convenience methods
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((res) => res.data),
};

export default apiClient;
