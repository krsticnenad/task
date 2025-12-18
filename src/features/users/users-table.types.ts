import type { User } from "@/api/users/users.types";

export interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
  rows?: number;
  onDelete?: (id: string) => void;
}
