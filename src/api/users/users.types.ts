export interface Country {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
}

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
