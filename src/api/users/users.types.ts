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
