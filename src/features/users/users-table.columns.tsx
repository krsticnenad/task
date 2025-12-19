import type { User } from "@/api/users/users.types";
import type { TableColumn } from "@/components/table";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";

const roleColors: Record<number, string> = {
  1: "administrator",
  2: "engineer",
  3: "pm",
  4: "ux",
  5: "qa",
  6: "support-agent",
  7: "devops",
};

export const usersTableColumns: TableColumn<User>[] = [
  {
    field: "id",
    header: "ID",
  },
  {
    field: "avatar",
    header: "Avatar",
    body: (user: User) => (
      <Avatar
        image={user.avatar || undefined}
        icon={!user.avatar ? "pi pi-user" : undefined}
        style={{ width: "32px", height: "32px" }}
      />
    ),
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
    sortable: true,
  },
  {
    field: "role",
    header: "Role",
    sortable: true,
    body: (user: User) => {
      const roleSpecificClass = user.role
        ? `custom-role-chip--${roleColors[user.role.id]}`
        : "";
      return (
        <Chip
          className={`custom-role-chip ${roleSpecificClass}`}
          label={user.role?.name}
        />
      );
    },
  },
  {
    field: "country",
    header: "Country",
    sortable: true,
    body: (user: User) => user.country?.name || "--",
  },
];

export const usersTableActionsColumns = (
  onDelete: (id: number) => void
): TableColumn<User> => ({
  field: "remove",
  header: "Action",
  body: (user: User) => (
    <Button
      size="small"
      outlined
      icon="pi pi-trash"
      severity="danger"
      aria-label="Cancel"
      tooltip="Delete user"
      onClick={() => onDelete(user.id)}
    />
  ),
});
