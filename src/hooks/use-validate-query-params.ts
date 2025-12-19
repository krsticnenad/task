import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

interface NumericValidationOptions {
  min?: number;
  max?: number;
}

/**
 * Hook for reading and validating a query parameter from the URL.
 *
 * @template T - type of the valid values
 * @param key - the name of the query parameter
 * @param defaultValue - value to use if URL param is missing or invalid
 * @param options - either validValues (for enums) or numericOptions
 * @returns Validated query parameter of type T
 */
export function useValidatedQueryParam<T extends string | number | undefined>(
  key: string,
  defaultValue: T,
  options?: { validValues?: T[]; numericOptions?: NumericValidationOptions }
): T | undefined {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const rawValue = searchParams.get(key);

    if (rawValue === null) return defaultValue;
    if (rawValue === null && defaultValue === undefined) return undefined;

    if (typeof defaultValue === "number") {
      let numValue = Number(rawValue);
      if (isNaN(numValue)) return defaultValue;

      if (options?.numericOptions?.min !== undefined)
        numValue = Math.max(numValue, options.numericOptions.min);
      if (options?.numericOptions?.max !== undefined)
        numValue = Math.min(numValue, options.numericOptions.max);

      return numValue as T;
    }

    if (options?.validValues) {
      return options.validValues.includes(rawValue as T)
        ? (rawValue as T)
        : defaultValue;
    }

    return rawValue as T;
  }, [key, searchParams, defaultValue, options]);
}
