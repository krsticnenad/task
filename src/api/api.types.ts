/**
 * Collection of supported HTTP methods.
 */
export const HttpMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

/**
 * Union type representing all supported HTTP methods.
 */
export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];

/**
 * Params for pagination API requests.
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Params for sorting API requests.
 */
export interface SortParams {
  sort?: string;
  order?: "asc" | "desc";
}

/**
 * Combined query parameters for list endpoints.
 *
 * Includes pagination and sorting options.
 */
export type ListQueryParams = PaginationParams & SortParams;
