import { HttpMethod } from "./api.types";

/**
 * Base URL for API requests.
 */
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL as string;

/**
 * Centralized definition of API routes and methods.
 *
 * This objects provides a way to reference backend endpoints across the application.
 */
export const API_ROUTES = {
  USERS: {
    GET: {
      method: HttpMethod.GET,
      path: "/users",
    },
    DELETE: {
      method: HttpMethod.DELETE,
      path: "/users/:id",
    },
  },
} as const;
