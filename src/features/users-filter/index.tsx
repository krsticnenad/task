import { useCountriesQuery } from "@/api/countries/use-countries-hooks";
import { useRolesQuery } from "@/api/roles/use-roles-hooks";
import type { ListQueryParams } from "@/api/api.types";
import { Dropdown } from "primereact/dropdown";
import { useMemo } from "react";

interface UsersFiltersProps {
  searchParams: ListQueryParams;
  onFilterChange: (
    key: keyof ListQueryParams,
    value: string | number | null
  ) => void;
}

export function UsersFilters({
  searchParams,
  onFilterChange,
}: UsersFiltersProps) {
  const { data: countries } = useCountriesQuery();
  const { data: roles } = useRolesQuery();

  const countriesOptions = useMemo(() => {
    if (!countries?.data) return [];
    return [...countries.data].sort((a, b) => a.name.localeCompare(b.name));
  }, [countries?.data]);

  const rolesOptions = useMemo(() => {
    if (!roles?.data) return [];
    return [...roles.data].sort((a, b) => a.name.localeCompare(b.name));
  }, [roles?.data]);

  return (
    <div className="flex w-full gap-3 align-items-center justify-content-end">
      {" "}
      <Dropdown
        variant="filled"
        showClear
        placeholder="Filter by Role"
        value={searchParams.role ?? null}
        options={rolesOptions}
        optionLabel="name"
        optionValue="name"
        onChange={(e) => onFilterChange("role", e.value)}
      />{" "}
      <Dropdown
        variant="filled"
        filter
        showClear
        placeholder="Filter by Country"
        value={searchParams.country ? Number(searchParams.country) : null}
        options={countriesOptions}
        optionLabel="name"
        optionValue="id"
        onChange={(e) => onFilterChange("country", e.value)}
      />{" "}
    </div>
  );
}
