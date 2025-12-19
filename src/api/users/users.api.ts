import { apiClient } from "../api.client";
import { API_ROUTES } from "../api.config";
import type { ListQueryParams } from "../api.types";
import { USER_SORT_MAP, type User, type UserSortKey } from "./users.types";

/**
 * API methods related to user.
 *
 * Provide a typed interface for interacting with user-related endpoints.
 */
export const usersApi = {
  /**
   * Fetches the list of users.
   *
   * @returns A promise that resolves with an array of users.
   */
  getAll: (params?: ListQueryParams) => {
    function resolveUserSort(
      sort?: ListQueryParams["sort"]
    ): string | undefined {
      if (!sort) return undefined;
      return USER_SORT_MAP[sort as UserSortKey] ?? sort;
    }

    const queryParams: Record<string, any> = {
      _page: params?.page,
      _limit: params?.limit,
      _sort: resolveUserSort(params?.sort),
      _order: params?.order,
    };

    if (params?.country) {
      queryParams["country.id"] = params.country;
    }

    if (params?.role) {
      queryParams["role.name"] = params.role;
    }

    return apiClient<User[]>(`${API_ROUTES.USERS.GET.path}`, {
      method: API_ROUTES.USERS.GET.method,
      params: queryParams,
    });
  },

  /**
   * Delete a user.
   *
   * @param id - The ID of the user to delete.
   *
   * @returns A promise that resovled when the user is deleted.
   */
  delete: (id: string) =>
    apiClient<void>(API_ROUTES.USERS.DELETE.path.replace(":id", id), {
      method: API_ROUTES.USERS.DELETE.method,
    }),
};
