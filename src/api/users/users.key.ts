import type { ListQueryParams } from "../api.types";
import { USERS_QUERY_DEFAULTS } from "./users.query.defaults";

/**
 * Query keys for user-lreated React Query
 *
 * Provides type-safe identifiers for caching.
 */
export const UsersKeys = {
  /**
   * Key for fetching all users.
   */
  all: ["users"] as const,
  list: (params: ListQueryParams = USERS_QUERY_DEFAULTS) =>
    [
      "users",
      params.limit,
      params.order,
      params.page,
      params.sort,
      params.country,
      params.role,
    ] as const,
};
