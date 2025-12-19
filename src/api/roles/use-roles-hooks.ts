import { useQuery } from "@tanstack/react-query";
import { RolesKeys } from "./roles.key";
import { rolesApi } from "./roles.api";

/**
 * React Query hook for fetching the list of countries.
 *
 * Uses {@link CountriesKeys.all} as the query key and {@link countriesApi.getAll}
 * as the query function.
 *
 * @returns React Query results object with countries data.
 */
export const useRolesQuery = () => {
  return useQuery({
    queryKey: RolesKeys.all,
    queryFn: () => rolesApi.getAll(),
  });
};
