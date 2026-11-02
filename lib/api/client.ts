import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Create and configure the axios instance
 */
function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 30_000,
  });

  // Request interceptor - add auth token if available
  client.interceptors.request.use(
    (config) => {
      // Check sessionStorage first, then localStorage (mirrors admin dashboard)
      if (typeof window !== "undefined") {
        const authData =
          sessionStorage.getItem("auth") ?? localStorage.getItem("auth");
        if (authData) {
          const { token } = JSON.parse(authData) as { token: string };
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor - handle errors consistently
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError<ApiError>) => {
      // Extract error message from response
      const message =
        error.response?.data?.message ??
        error.message ??
        "An unexpected error occurred";

      const status = error.response?.status ?? 500;

      // Handle specific error cases
      if (status === 401) {
        // Unauthorized - clear auth data from both storages
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth");
          sessionStorage.removeItem("auth");
          void fetch("/api/auth/cookie", { method: "DELETE" }).catch(
            (cookieError: unknown) => {
              console.error("Could not clear authentication cookie", cookieError);
            },
          );
        }
      }

      // Handle rate limiting (429 Too Many Requests)
      if (status === 429) {
        console.warn("Rate limit exceeded. Please try again later.");
      }

      return Promise.reject(
        new ApiError(message, status, error.response?.data),
      );
    },
  );

  return client;
}

/**
 * Configured axios instance for API requests
 */
export const apiClient = createApiClient();

/**
 * Helper function to build query string from params
 */
export function buildQueryParams(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}
