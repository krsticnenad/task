import type { User } from "@/api/users/users.types";
import type { TableColumn } from "@/components/table";

export const usersTableColumns: TableColumn<User>[] = [
  {
    field: "firstName",
    header: "First Name",
    sortable: true,
  },
  {
    field: "lastName",
    header: "Last Name",
    sortable: true,
  },
  {
    field: "email",
    header: "Email",
  },
];
