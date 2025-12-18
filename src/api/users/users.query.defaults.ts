import { DEFAULT_ROWS_PER_PAGE } from "@/constants/table.defaults";
import type { ListQueryParams } from "../api.types";

/**
 * Default query parameter values for the users list endpoint.
 *
 * These values are used as a fallback when corresponding query parameters
 * are not present in the URL.
 */
export const USERS_QUERY_DEFAULTS: Required<ListQueryParams> = {
  page: 1,
  limit: DEFAULT_ROWS_PER_PAGE,
  sort: "id",
  order: "asc",
};
