import type { ListQueryParams } from "../api.types";

/**
 * Default query parameter values for the users list endpoint.
 *
 * These values are used as a fallback when corresponding query parameters
 * are not present in the URL.
 */
export const USERS_QUERY_DEFAULTS: Required<ListQueryParams> = {
  page: 1,
  limit: 10,
  sort: "id",
  order: "asc",
};
