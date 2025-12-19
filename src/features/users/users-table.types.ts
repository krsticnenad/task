import type { User } from "@/api/users/users.types";
import type { RootTableProps } from "@/components/table";

export interface UsersTableProps extends Omit<RootTableProps<User>, "dataKey"> {
  onDelete?: (id: string) => void;
}
