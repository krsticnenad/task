import type { ListQueryParams, SortOrder } from "@/api/api.types";
import { USERS_QUERY_DEFAULTS } from "@/api/users/users.query.defaults";
import {
  MAX_ROWS_PER_PAGE,
  MIN_PAGE,
  MIN_ROWS_PER_PAGE,
  VALID_ORDERS,
} from "@/constants/table.defaults";
import { useValidatedQueryParam } from "./use-validate-query-params";

/**
 * Hook for reading and vlidation user-related query params from the URL.
 *
 * @returns An object with validated query params:
 * - `page`: current page number
 * - `limit`: number of items per page
 * - `sort`: field used for sorting
 * - `order`: sort order
 */
export function useUsersSearchParams(): Required<ListQueryParams> {
  const page = useValidatedQueryParam<number>(
    "page",
    USERS_QUERY_DEFAULTS.page,
    {
      numericOptions: { min: MIN_PAGE },
    }
  );

  const limit = useValidatedQueryParam<number>(
    "limit",
    USERS_QUERY_DEFAULTS.limit,
    {
      numericOptions: { min: MIN_ROWS_PER_PAGE, max: MAX_ROWS_PER_PAGE },
    }
  );

  const sort = useValidatedQueryParam<string>(
    "sort",
    USERS_QUERY_DEFAULTS.sort,
    {
      validValues: ["firstName", "lastName", "email", "role", "country"],
    }
  );

  const order = useValidatedQueryParam<SortOrder>(
    "order",
    USERS_QUERY_DEFAULTS.order,
    {
      validValues: VALID_ORDERS,
    }
  );

  return {
    page,
    limit,
    sort,
    order,
  };
}
