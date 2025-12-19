import type { Country } from "../countries/countries.types";
import type { Role } from "../roles/roles.types";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  country: Country;
  role: Role;
  remove: () => void;
}

export type UserSortKey = Exclude<keyof User, "id" | "avatar" | "remove">;

/**
 * Maps semantic sort keys used in the UI and URL
 * to actual backend field paths.
 */
export const USER_SORT_MAP: Partial<Record<UserSortKey, string>> = {
  country: "country.name",
  role: "role.name",
};
