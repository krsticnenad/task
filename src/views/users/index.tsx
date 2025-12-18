import type { SortOrder } from "@/api/api.types";
import { useUsersQuery } from "@/api/users/use-users-query";
import { DEFAULT_ROWS_PER_PAGE_OPTIONS } from "@/constants/table.defaults";
import { UsersTable } from "@/features/users";
import { useUpdateSearchParams } from "@/hooks/use-update-users-search-params";
import { useUsersSearchParams } from "@/hooks/use-users-search-params";
import { preloadImages } from "@/utils/preload-images";
import type {
  DataTablePageEvent,
  DataTableSortEvent,
} from "primereact/datatable";
import { useEffect } from "react";

export function UsersView() {
  const searchParams = useUsersSearchParams();
  const { data: users, isLoading } = useUsersQuery(searchParams);
  const { setSearchParams } = useUpdateSearchParams();

  const usersData = users?.data ?? [];
  const totalRecords = users?.totalRecords;

  useEffect(() => {
    if (!usersData.length) return;

    preloadImages(usersData, "avatar");
  }, [usersData]);

  return (
    <UsersTable
      scrollable
      scrollHeight="578px"
      first={(searchParams.page - 1) * searchParams.limit}
      data={usersData}
      loading={isLoading}
      rows={searchParams.limit}
      totalRecords={totalRecords}
      rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE_OPTIONS}
      lazy
      onPageChange={(event: DataTablePageEvent) => {
        const page = event.first / event.rows + 1;
        const limit = event.rows;
        setSearchParams({ page, limit });
      }}
      onSort={(event: DataTableSortEvent) => {
        const clickedField = event.sortField === searchParams.sort;
        const order: SortOrder = clickedField
          ? searchParams.order === "asc"
            ? "desc"
            : "asc"
          : "asc";
        setSearchParams({
          sort: event.sortField,
          order: order,
        });
      }}
    />
  );
}
