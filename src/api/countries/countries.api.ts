import { apiClient } from "../api.client";
import { API_ROUTES } from "../api.config";
import type { Country } from "./countries.types";

/**
 * API methods related to countries.
 *
 * Provide a typed interface for interacting with countries-related endpoints.
 */
export const countriesApi = {
  /**
   * Fetches the list of countries.
   *
   * @returns A promise that resolves with an array of countries.
   */
  getAll: () =>
    apiClient<Country[]>(`${API_ROUTES.COUNTRIES.GET.path}`, {
      method: API_ROUTES.COUNTRIES.GET.method,
    }),
};
