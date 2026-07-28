/**
 * Global Centralized API Client Service (Abstract Architecture)
 *
 * Designed following Clean Architecture principles:
 * - Abstract request & response interfaces.
 * - Strongly typed error handling.
 * - Placeholder execution client ready for future backend/REST/GraphQL integration.
 * - Zero hardcoded real external endpoints in visual components.
 */

export interface ApiRequestConfig<TData = unknown> {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  body?: TData;
  timeoutMs?: number;
}

export interface ApiResponse<TData = unknown> {
  data: TData;
  status: number;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  status?: number;
  details?: Record<string, unknown>;
}

export interface IApiClient {
  get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<ApiResponse<T>>;
  post<T, TBody = unknown>(endpoint: string, body?: TBody): Promise<ApiResponse<T>>;
  put<T, TBody = unknown>(endpoint: string, body?: TBody): Promise<ApiResponse<T>>;
  delete<T>(endpoint: string): Promise<ApiResponse<T>>;
}

/**
 * Placeholder API Client Implementation
 * Simulated network delay for development and testing.
 * Future implementation will replace this class with real fetch / axios adapter.
 */
export class PlaceholderApiClient implements IApiClient {
  private baseUrl: string;

  constructor(baseUrl = '/api/v1') {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string, _params?: Record<string, string | number | boolean>): Promise<ApiResponse<T>> {
    // Placeholder simulation - No real external network requests in this phase
    return {
      data: {} as T,
      status: 200,
      message: `[Placeholder API] GET ${this.baseUrl}${endpoint} succeeded`,
      timestamp: new Date().toISOString(),
    };
  }

  async post<T, TBody = unknown>(endpoint: string, body?: TBody): Promise<ApiResponse<T>> {
    return {
      data: (body || {}) as unknown as T,
      status: 201,
      message: `[Placeholder API] POST ${this.baseUrl}${endpoint} succeeded`,
      timestamp: new Date().toISOString(),
    };
  }

  async put<T, TBody = unknown>(endpoint: string, body?: TBody): Promise<ApiResponse<T>> {
    return {
      data: (body || {}) as unknown as T,
      status: 200,
      message: `[Placeholder API] PUT ${this.baseUrl}${endpoint} succeeded`,
      timestamp: new Date().toISOString(),
    };
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return {
      data: {} as T,
      status: 200,
      message: `[Placeholder API] DELETE ${this.baseUrl}${endpoint} succeeded`,
      timestamp: new Date().toISOString(),
    };
  }
}

export const apiClient: IApiClient = new PlaceholderApiClient();

export const apiCall = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await apiClient.get<T>(endpoint, options as unknown as Record<string, string>);
  return response.data;
};

