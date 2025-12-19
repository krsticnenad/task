import { useQuery } from "@tanstack/react-query";
import { countriesApi } from "./countries.api";
import { CountriesKeys } from "./countries.key";

/**
 * React Query hook for fetching the list of countries.
 *
 * Uses {@link CountriesKeys.all} as the query key and {@link countriesApi.getAll}
 * as the query function.
 *
 * @returns React Query results object with countries data.
 */
export const useCountriesQuery = () => {
  return useQuery({
    queryKey: CountriesKeys.all,
    queryFn: () => countriesApi.getAll(),
  });
};
