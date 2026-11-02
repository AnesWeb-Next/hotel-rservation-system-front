/**
 * Standard API success response
 */
declare interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
  token?: string;
}

/**
 * Standard API error response
 */
declare interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string | string[] | Record<string, unknown>;
}

/**
 * Pagination metadata
 */
declare interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Paginated API response
 */
declare interface ApiPaginatedResponse<T = unknown> {
  success: true;
  message: string;
  data: T[];
  pagination: PaginationMeta;
  totalPages?: number;
  total?: number;
}

/**
 * Combined API response type
 */
declare type ApiResponse<T = unknown> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse;

/**
 * Pagination query parameters
 */
declare interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  [key: string]: unknown;
}

/**
 * Login response with token
 */
declare interface LoginResponse {
  success: true;
  message: string;
  data: Omit<UserI, "password">;
  token: string;
}

/**
 * List of items with pagination info
 */
declare interface ListOf<T> {
  list: T[];
  total: number;
  page: number;
  limit: number;
}
