import { useUsersQuery } from "@/api/users/use-users-query";
import { UsersTable } from "@/features/users";

export function UsersView() {
  const { data: users = [], isLoading } = useUsersQuery({});

  return <UsersTable users={users} isLoading={isLoading} />;
}
