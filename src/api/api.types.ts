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
 * Defines the sorting order for list-based API requests.
 *
 * - `asc` - Sort results in ascending order
 * - `desc` - Sort results in descending order
 */
export type SortOrder = "asc" | "desc";

/**
 * Params for sorting API requests.
 */
export interface SortParams {
  sort?: string;
  order?: SortOrder;
}

/**
 * Combined query parameters for list endpoints.
 *
 * Includes pagination and sorting options.
 */
export type ListQueryParams = PaginationParams & SortParams;

/**
 * Geneeric API response wrapper.
 */
export interface ApiResult<T> {
  data: T;
  totalRecords?: number;
}
