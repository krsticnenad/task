import type { User } from "@/api/users/users.types";
import type { TableColumn } from "@/components/table";
import { Avatar } from "primereact/avatar";

export const usersTableColumns: TableColumn<User>[] = [
  {
    field: "id",
    header: "ID",
  },
  {
    field: "avatar",
    header: "Avatar",
    body: (user: User) => <Avatar image={user.avatar} />,
  },
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
