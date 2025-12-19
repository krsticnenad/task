import { apiClient } from "../api.client";
import { API_ROUTES } from "../api.config";
import type { Role } from "./roles.types";

/**
 * API methods related to roles.
 *
 * Provide a typed interface for interacting with roles-related endpoints.
 */
export const rolesApi = {
  /**
   * Fetches the list of roles.
   *
   * @returns A promise that resolves with an array of roles.
   */
  getAll: () =>
    apiClient<Role[]>(`${API_ROUTES.ROLES.GET.path}`, {
      method: API_ROUTES.ROLES.GET.method,
    }),
};
