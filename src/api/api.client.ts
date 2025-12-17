import { API_BASE_URL } from "./api.config";
import type { HttpMethod } from "./api.types";

/**
 * Configuration options for an API request.
 */
interface RequestOptions extends RequestInit {
  method: HttpMethod;
  body?: any;
  headers?: HeadersInit;
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * Generic HTTP client for making API requests.
 *
 * @typeParam T - Expected response payload type.
 * @param path - API endpoint path.
 * @param options - Request configuration options.
 *
 * @returns A promise that resolves with the JSON parsed.
 * @throws Error if the request fails or the response status is not OK.
 */
export async function apiClient<T>(
  path: string,
  options: RequestOptions
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const conf: RequestOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };

  if (options.body) {
    conf.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, conf);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  console.log("Response", response);

  return response.json() as Promise<T>;
}
