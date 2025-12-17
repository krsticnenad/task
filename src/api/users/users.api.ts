import { apiClient } from "../api.client";
import { API_ROUTES } from "../api.config";
import type { User } from "./users.types";

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
  getAll: () =>
    apiClient<User[]>(API_ROUTES.USERS.GET.path, {
      method: API_ROUTES.USERS.GET.method,
    }),

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
