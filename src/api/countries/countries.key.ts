/**
 * Query keys for countries-lreated React Query
 *
 * Provides type-safe identifiers for caching.
 */
export const CountriesKeys = {
  /**
   * Key for fetching all countries.
   */
  all: ["countries"] as const,
};
