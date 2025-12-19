import type { ListQueryParams, SortOrder } from "@/api/api.types";
import { USERS_QUERY_DEFAULTS } from "@/api/users/users.query.defaults";
import {
  MAX_ROWS_PER_PAGE,
  MIN_PAGE,
  MIN_ROWS_PER_PAGE,
  VALID_ORDERS,
} from "@/constants/table.defaults";
import { useValidatedQueryParam } from "./use-validate-query-params";
import type { UserSortKey } from "@/api/users/users.types";

/**
 * Hook for reading and validation user-related query params from the URL.
 *
 * @returns An object with validated query params:
 * - `page`: current page number
 * - `limit`: number of items per page
 * - `sort`: field used for sorting
 * - `order`: sort order
 * - `country`: optional country filter
 * - `role`: optional role filter
 */
export function useUsersSearchParams(): ListQueryParams &
  Required<Pick<ListQueryParams, "page" | "limit" | "sort" | "order">> {
  const page =
    useValidatedQueryParam<number>("page", USERS_QUERY_DEFAULTS.page, {
      numericOptions: { min: MIN_PAGE },
    }) ?? USERS_QUERY_DEFAULTS.page;

  const limit =
    useValidatedQueryParam<number>("limit", USERS_QUERY_DEFAULTS.limit, {
      numericOptions: { min: MIN_ROWS_PER_PAGE, max: MAX_ROWS_PER_PAGE },
    }) ?? USERS_QUERY_DEFAULTS.limit;

  const sort =
    useValidatedQueryParam<UserSortKey>(
      "sort",
      USERS_QUERY_DEFAULTS.sort as UserSortKey,
      {
        validValues: ["firstName", "lastName", "email", "role", "country"],
      }
    ) ?? USERS_QUERY_DEFAULTS.sort;

  const order =
    useValidatedQueryParam<SortOrder>("order", USERS_QUERY_DEFAULTS.order, {
      validValues: VALID_ORDERS,
    }) ?? USERS_QUERY_DEFAULTS.order;

  const country = useValidatedQueryParam<number>("country", 0, {
    numericOptions: { min: 1 },
  });

  const role = useValidatedQueryParam<string>("role", "", {
    numericOptions: { min: 1 },
  });

  return {
    page,
    limit,
    sort,
    order,
    country,
    role,
  };
}
