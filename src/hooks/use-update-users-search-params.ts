import type { ListQueryParams } from "@/api/api.types";
import { useSearchParams } from "react-router-dom";

/**
 * Custom hook for updatein URL query params.
 *
 * Provides methods to set a single query param or multiple params at once.
 */
export function useUpdateSearchParams() {
  const [_searchParams, _setSearchParams] = useSearchParams();

  /**
   * Applies a controlled update to the current URL search params.
   * Centralized place for all query param mutations.
   *
   * @param handler - A function that receives th current URLSearchParams
   */
  const updateParams = (handler: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(_searchParams);
    handler(params);
    _setSearchParams(params);
  };

  /**
   * Update a single query param in the URL.
   *
   * @param key - Name of the parameter
   * @param value - Value to set
   */
  const setSearchParam = (
    key: keyof ListQueryParams,
    value: string | number | undefined
  ) => {
    updateParams((params) => {
      params.set(key, String(value));
    });
  };

  /**
   * Update multiple query parameters in the URL ad once.
   *
   * @param params - Object with key-value to update
   */
  const setSearchParams = (
    values: Partial<Record<keyof ListQueryParams, string | number>>
  ) => {
    updateParams((params) => {
      Object.entries(values).forEach(([key, value]) => {
        params.set(key, String(value));
      });
    });
  };

  /**
   * Removes a single quert param from the URL
   *
   * @param key - The name of the query parameter to remove.
   */
  const removeSearchParam = (key: keyof ListQueryParams) => {
    updateParams((params) => {
      params.delete(key);
    });
  };

  /**
   * Removes multiple query params from the URL.
   *
   * @param keys - A list of query param names to remove.
   */
  const removeSearchParams = (keys: (keyof ListQueryParams)[]) => {
    updateParams((params) => {
      keys.forEach((key: keyof ListQueryParams) => {
        params.delete(key);
      });
    });
  };

  return {
    setSearchParam,
    setSearchParams,
    removeSearchParam,
    removeSearchParams,
  };
}
