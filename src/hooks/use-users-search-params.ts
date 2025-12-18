import type { ListQueryParams, SortOrder } from "@/api/api.types";
import { USERS_QUERY_DEFAULTS } from "@/api/users/users.query.defaults";
import {
  MAX_ROWS_PER_PAGE,
  MIN_PAGE,
  MIN_ROWS_PER_PAGE,
} from "@/constants/table.defaults";
import { useSearchParams } from "react-router-dom";

export function useUsersSearchParams(): Required<ListQueryParams> {
  const [searchParams] = useSearchParams();

  const validOrders: SortOrder[] = ["asc", "desc"];
  const order = searchParams.get("order");
  const validatedOrder: SortOrder = validOrders.includes(order as SortOrder)
    ? (order as SortOrder)
    : USERS_QUERY_DEFAULTS.order;

  return {
    page: Math.max(
      Number(searchParams.get("page") || USERS_QUERY_DEFAULTS.page),
      MIN_PAGE
    ),
    limit: Math.min(
      Math.max(
        Number(searchParams.get("limit") || USERS_QUERY_DEFAULTS.limit),
        MIN_ROWS_PER_PAGE
      ),
      MAX_ROWS_PER_PAGE
    ),
    sort: searchParams.get("sort") || USERS_QUERY_DEFAULTS.sort,
    order: validatedOrder,
  };
}
