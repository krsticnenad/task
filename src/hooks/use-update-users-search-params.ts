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
   * Update a single query param in the URL.
   *
   * @param key - Name of the parameter
   * @param value - Value to set
   */
  const setSearchParam = (
    key: keyof ListQueryParams,
    value: string | number | undefined
  ) => {
    const newParams = new URLSearchParams(_searchParams);
    newParams.set(key, String(value));
    _setSearchParams(newParams);
  };

  /**
   * Update multiple query parameters in the URL ad once.
   *
   * @param params - Object with key-value to update
   */
  const setSearchParams = (
    params: Partial<Record<keyof ListQueryParams, string | number>>
  ) => {
    const newParams = new URLSearchParams(_searchParams);
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, String(value));
    });
    _setSearchParams(newParams);
  };

  return { setSearchParam, setSearchParams, _searchParams };
}
