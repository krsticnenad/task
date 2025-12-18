import type { User } from "@/api/users/users.types";

export interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
  rows?: number;
  totalRecords?: number;
  rowsPerPageOptions?: number[];
  onPageChange?: () => void;
  onDelete?: (id: string) => void;
}
