import { useUsersQuery } from "@/api/users/use-users-query";
import { DEFAULT_ROWS_PER_PAGE_OPTIONS } from "@/constants/table.defaults";
import { UsersTable } from "@/features/users";
import { useUsersSearchParams } from "@/hooks/use-users-search-params";

export function UsersView() {
  const searchParams = useUsersSearchParams();
  const { data: users, isLoading } = useUsersQuery(searchParams);

  const usersData = users?.data ?? [];
  const totalRecords = users?.totalRecords;

  return (
    <UsersTable
      users={usersData}
      isLoading={isLoading}
      rows={searchParams.limit}
      totalRecords={totalRecords}
      rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE_OPTIONS}
    />
  );
}
