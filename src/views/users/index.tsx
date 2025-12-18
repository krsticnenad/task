import { useUsersQuery } from "@/api/users/use-users-query";
import { UsersTable } from "@/features/users";
import { useUsersSearchParams } from "@/hooks/use-users-search-params";

export function UsersView() {
  const searchParams = useUsersSearchParams();
  const { data: users = [], isLoading } = useUsersQuery(searchParams);

  return (
    <UsersTable users={users} isLoading={isLoading} rows={searchParams.limit} />
  );
}
